import { Bell, ChevronRight, CircleHelp, FileText, Info, Languages, LockKeyhole, RefreshCw, UserRound, Database } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppHeader } from '../components/layout/AppHeader'
import { BottomTabBar } from '../components/layout/BottomTabBar'
import { useAppState } from '../state/AppStateContext'

export function SettingsPage() {
  const navigate = useNavigate()
  const { data, toggleNotifications, toggleAutoUpdate, togglePrintRecords } = useAppState()
  const rows = [
    { label: '账户信息', icon: UserRound, onClick: () => navigate('/account') },
    { label: '我的空间', icon: Database, value: '286 MB', onClick: () => navigate('/settings/storage') },
    { label: '语言切换', icon: Languages, value: data.settings.language, onClick: () => navigate('/settings/language') },
  ]
  return <div className="screen proto-screen"><AppHeader title="设置" /><div className="screen-scroll page-body settings-list with-settings-tabs"><section className="settings-profile" onClick={() => navigate('/account')}><button><UserRound /><span><strong>账户信息</strong><small>{data.user.nickname}</small></span><ChevronRight /></button></section><section>{rows.slice(1).map(({ label, icon: Icon, onClick, value }) => <button key={label} onClick={onClick}><Icon /><span>{label}</span><em>{value}</em><ChevronRight /></button>)}<label><Bell /><span>通知</span><input type="checkbox" checked={data.settings.notificationsEnabled} onChange={toggleNotifications} /></label><label><RefreshCw /><span>自动更新</span><input type="checkbox" checked={data.settings.autoUpdateEnabled} onChange={toggleAutoUpdate} /></label><button onClick={() => navigate('/settings/feedback')}><CircleHelp /><span>建议反馈</span><ChevronRight /></button><button onClick={() => navigate('/settings/about')}><Info /><span>关于应用</span><ChevronRight /></button><button onClick={() => navigate('/settings/agreement')}><FileText /><span>用户协议</span><ChevronRight /></button><button onClick={() => navigate('/settings/privacy')}><LockKeyhole /><span>隐私政策</span><ChevronRight /></button></section><p className="version-copy">当前版本 1.1.24</p><button className="demo-toggle" onClick={togglePrintRecords}>演示数据：切换我的打印{data.showPrintRecords ? '为空' : '有记录'}</button></div><BottomTabBar /></div>
}
