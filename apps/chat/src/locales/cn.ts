const cn = {
  Index: {
    Title: "ChatGPT (GPT-4)",
    SubTitle: "欢迎关注微信公众号：",
    Submit: "提交",
    Login: "登录",
    Register: "注册",
    Success: (action: string) => `${action}成功`,
    Failed: (action: string) => `${action}失败`,
    Username: "用户名",
    Password: "密码",
    Email: "邮箱",
    GetEmailCode: "获取邮箱验证码",
    GetPhoneCode: "获取手机验证码",
    NoneData: "请确保邮箱、密码和验证码输入完整",
    EmailNonExistent: "邮箱不存在，请重新输入",
    NotYetRegister: "新用户，请先注册",
    DuplicateRegistration: "该邮箱已被注册",
    CodeError: "验证码错误",
    PasswordError: "密码错误",
  },
  UnknownError: "未知错误，请联系管理员",
  WIP: "该功能仍在开发中……",
  Error: {
    Unauthorized: "现在是未登录状态，请刷新浏览器缓存并登录。",
    TooManyRequests:
      "您的账户在三小时内的使用次数已达到最大请求数，请稍后再试。\n 如果您需要更多的使用次数，可在用户信息中查看付费计划。",
    TooFastRequests: "请求地太快啦，稍等一下（请求间隔5秒）。",
    ContentBlock: "请检查文本中的敏感词，如有误杀请联系客服。",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} 条对话`,
  },
  Chat: {
    SubTitle: (count: number) => `与 ChatGPT 的 ${count} 条对话`,
    Actions: {
      ChatList: "查看消息列表",
      CompressedHistory: "查看压缩后的历史 Prompt",
      Export: "导出聊天记录",
      Copy: "复制",
      Stop: "停止",
      Retry: "重试",
    },
    Typing: "正在输入…",
    Input: (submitKey: string) => `输入消息，${submitKey} 发送`,
    Send: "发送",
  },
  Profile: {
    Title: "用户信息",
    Plan: {
      Title: "计划",
    },
    Invite: {
      Title: "邀请他人",
      SubTitle: "成功邀请他人可获得重置次数和充值折扣",
      Code: "邀请码",
      InviteLink: "邀请链接",
      CopyInviteLink: "复制邀请链接",
      InviteeNumber: "当前邀请人数",
    },
    Upgrade: "升级",
    Reset: {
      Title: "重置当前限制",
      SubTitle: "可将固定时间内的消息条数限制清空",
      Click: (t: number) => `清空一次 剩余: ${t}`,
    },
    RateLimit: {
      Title: (t: number) => `固定时间内消息条数限制（${t}小时）`,
      TitleFree: "固定时间内消息条数限制",
      Subtitle: "总共请求的消息条数 点击查看具体请求时间",
      Interval: "请求间隔",
      IntervalDesp: "每隔几秒可请求一次",
    },
  },
  Export: {
    Title: "导出聊天记录为 Markdown",
    Copy: "全部复制",
    Download: "下载文件",
  },
  Memory: {
    Title: "上下文记忆 Prompt",
    EmptyContent: "尚未记忆",
    Copy: "全部复制",
  },
  Home: {
    NewChat: "新的聊天",
    DeleteChat: "确认删除选中的对话？",
  },
  Settings: {
    Title: "设置",
    SubTitle: "设置选项",
    Actions: {
      ClearAll: "清除所有数据",
      ResetAll: "重置所有选项",
      Close: "关闭",
    },
    Lang: {
      Name: "Language",
      Options: {
        cn: "中文",
        en: "English",
      },
    },
    Avatar: "头像",
    Account: "账号",
    Update: {
      Version: (x: string) => `当前版本：${x}`,
      IsLatest: "已是最新版本",
      CheckUpdate: "检查更新",
      IsChecking: "正在检查更新...",
      FoundUpdate: (x: string) => `发现新版本：${x}`,
      GoToUpdate: "前往更新",
    },
    SendKey: "发送键",
    Theme: "主题",
    TightBorder: "紧凑边框",
    HistoryCount: {
      Title: "附带历史消息数",
      SubTitle: "每次请求携带的历史消息数",
    },
    CompressThreshold: {
      Title: "历史消息长度压缩阈值",
      SubTitle: "当未压缩的历史消息超过该值时，将进行压缩",
    },
    Token: {
      Title: "API Key",
      SubTitle: "使用自己的 Key 可绕过受控访问限制",
      Placeholder: "OpenAI API Key",
    },
    AccessCode: {
      Title: "访问码",
      SubTitle: "现在是受控访问状态",
      Placeholder: "请输入访问码",
    },
    Model: "模型 (model)",
    Temperature: {
      Title: "随机性 (temperature)",
      SubTitle: "值越大，回复越随机",
    },
    MaxTokens: {
      Title: "单次回复限制 (max_tokens)",
      SubTitle: "单次交互所用的最大 Token 数",
    },
    PresencePenlty: {
      Title: "话题新鲜度 (presence_penalty)",
      SubTitle: "值越大，越有可能扩展到新话题",
    },
  },
  Store: {
    DefaultTopic: "新的聊天",
    BotHello: "有什么可以帮你的吗",
    Error: "出错了，稍后重试吧",
    Prompt: {
      History: (content: string) =>
        "这是 ai 和用户的历史聊天总结作为前情提要：" + content,
      Topic:
        "直接返回这句话的简要主题，不要解释，如果没有主题，请直接返回“闲聊”",
      Summarize:
        "简要总结一下你和用户的对话，用作后续的上下文提示 prompt，控制在 50 字以内",
    },
    ConfirmClearAll: "确认清除所有聊天、设置数据？",
  },
  Copy: {
    Success: "已写入剪切板",
    Failed: "复制失败，请赋予剪切板权限",
  },
};

export type LocaleType = typeof cn;

export default cn;
