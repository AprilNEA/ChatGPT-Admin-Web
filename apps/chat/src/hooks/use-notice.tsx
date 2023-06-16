import useSWR from "swr";
import { serverStatus } from "@caw/types";

import { showModal } from "@/components/ui-lib";
import { useNoticeStore } from "@/store";
import { Markdown } from "@/components/markdown";

export function showAnnouncement(notice: string) {
  showModal({
    title: "Announcement 公告",
    children: <Markdown content={notice} />,
    // onClose: () => {}
  });
}

export function useNotice() {
  const updateNotice = useNoticeStore((store) => store.updateNotice);

  const { data: noticeNew, isLoading } = useSWR<string | null>(
    "/api/notice",
    (url) =>
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          switch (res.status) {
            case serverStatus.success:
              return res.notice as string;
            default:
              return null;
          }
        })
  );
  if (noticeNew && updateNotice(noticeNew)) return noticeNew;
  return null;
}
