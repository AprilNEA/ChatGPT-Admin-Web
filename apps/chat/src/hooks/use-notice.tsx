import { showModal } from "@/components/ui-lib";
export function showAnnouncement() {
  showModal({
    title: "Announcement 公告",
    children: <div></div>,
    // onClose: () => {}
  });
}

export function Announcement(
  versionId: string,
  updateVersionId: (versionId: string) => void
) {
  // return fetch(`/api/announcement?versionId=${versionId}`).then((res) =>
  const versionIdNow = "20230410";
  if (versionIdNow !== versionId) {
    updateVersionId(versionIdNow);
    showAnnouncement();
  }
}
