import { CheckCheck, CircleAlert } from 'lucide-react'
import { useState } from 'react'
import { AppHeader } from '../components/layout/AppHeader'
import { EmptyState } from '../components/common/EmptyState'
import { Toast } from '../components/common/Toast'
import { useAppState } from '../state/AppStateContext'
import { BottomTabBar } from '../components/layout/BottomTabBar'

export function NotificationsPage() {
  const { data, unreadCount, markNotificationRead, markAllNotificationsRead } = useAppState()
  const [toast, setToast] = useState('')
  return <div className="screen proto-screen"><AppHeader title="通知中心" right={unreadCount ? <button className="text-button" onClick={() => { markAllNotificationsRead(); setToast('已全部标为已读') }}>全部已读</button> : null} /><div className="screen-scroll page-body notification-page">{data.notifications.length === 0 ? <EmptyState title="暂无消息" /> : <><h2>今天</h2><div className="notice-list">{data.notifications.slice(0, 3).map((item) => <NoticeRow key={item.id} item={item} onClick={() => { markNotificationRead(item.id); setToast('消息已读') }} />)}</div><h2>更早</h2><div className="notice-list">{data.notifications.slice(3).map((item) => <NoticeRow key={item.id} item={item} onClick={() => { markNotificationRead(item.id); setToast('消息已读') }} />)}</div><p className="notice-end">—　没有更多通知了　—</p></>}</div><BottomTabBar />{toast && <Toast message={toast} onClose={() => setToast('')} />}</div>
}

function NoticeRow({ item, onClick }: { item: ReturnType<typeof useAppState>['data']['notifications'][number]; onClick: () => void }) {
  const emoji = item.type === 'creation' ? '🎨' : item.type === 'print' ? '🖨️' : item.type === 'points' ? '🪙' : item.type === 'activity' ? '🎁' : '⚙️'
  return <button onClick={onClick}><span className={`notice-icon type-${item.type}`}>{emoji}</span><span><strong>{item.title}{!item.read && <i />}</strong><small>{item.summary}</small></span><time>{item.createdAt}　›</time></button>
}
