import { Inbox } from 'lucide-react'

export function EmptyState({ title = '暂无内容' }: { title?: string }) {
  return <div className="empty-state"><Inbox /><p>{title}</p></div>
}
