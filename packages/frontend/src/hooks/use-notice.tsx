import { showModal } from '@/components/ui-lib';

export function showAnnouncement() {
  showModal({
    title: 'Announcement 公告',
    children: (
      <div>
        <p>邀请制度已经推出，成功邀请一人可获得一次重置次数。</p>
        <p>
          首先，感激大家一直以来的支持与厚爱，近期我们的网站累计访问量已达到惊人的
          200k！为了更好地服务于大家，我们对部分功能进行了优化和升级。以下是本次更新的内容：
        </p>
        <ul>
          <li>
            新增付费计划：为了确保网站稳定运行，我们推出了两种付费计划供大家选择：
            <ul>
              <li>Pro 计划 - 15 元/月：每三小时内可享受 50 条问答额度</li>
              <li>Premium 计划 - 99 元/月：畅享无限制问答体验</li>
            </ul>
          </li>
          <li>
            同时，我们对免费计划的策略进行了调整：现在您每小时可免费获得 10
            条问答额度，而非过去的每三小时免费 25 条问答。
          </li>
          <li>增加查看三小时内消息总数功能</li>
          <li>邀请他人注册可获得重置消息限制的机会，以及购买付费计划的优惠</li>
          <li>
            接入 GPT-3.5-Turbo 模型：一直以来网站所使用的都是最先进的 GPT-4
            模型，应网友要求，现在我们也接入了 GPT-3.5-Turbo
            模型，大家可以在设置中进行调整，我们也在每条消息下方进行了提示。
          </li>
        </ul>
        <p>若您对充值流程不清楚，可以关注微信公众号: Magic万事屋</p>
      </div>
    ),
    // onClose: () => {}
  });
}

export function Announcement(
  versionId: string,
  updateVersionId: (versionId: string) => void,
) {
  // return fetch(`/api/announcement?versionId=${versionId}`).then((res) =>
  const versionIdNow = '20230410';
  if (versionIdNow !== versionId) {
    updateVersionId(versionIdNow);
    showAnnouncement();
  }
}
