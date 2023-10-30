import { redirect } from 'next/navigation';

export default function NewChatPage() {
  const newSessionId = crypto.randomUUID();
  redirect(`/chat/${newSessionId}?new=true`);
}
