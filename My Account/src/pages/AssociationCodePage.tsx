import { BadgeCheck, Clipboard, RefreshCw } from 'lucide-react'
import { useCallback, useState } from 'react'
import { AppHeader } from '../components/layout/AppHeader'
import { Toast } from '../components/common/Toast'
import { UserAvatar } from '../components/common/UserAvatar'
import { useAppState } from '../state/AppStateContext'

export function AssociationCodePage() {
  const { data } = useAppState()
  const [code, setCode] = useState('428 451')
  const [toast, setToast] = useState('')
  const closeToast = useCallback(() => setToast(''), [])
  return <div className="screen code-page proto-screen"><AppHeader title="我的关联码" /><div className="screen-scroll page-body"><section className="association-profile"><UserAvatar src={data.user.avatarUrl} avatarKey={data.user.avatarKey} /><div><h2>{data.user.nickname}</h2><p><BadgeCheck /> 已认证</p><small>账号ID：{data.user.id}</small></div></section><section className="code-card"><div className="fake-qr" aria-label="二维码演示图"><span>ugee maker</span></div><em>◷ 10分钟内有效</em><div className="invite-row"><span>邀请码</span><strong>{code.replace(' ', '')}</strong><button onClick={async () => { try { await navigator.clipboard.writeText(code.replace(' ', '')); setToast('邀请码已复制') } catch { setToast('复制失败，请手动复制') } }}><Clipboard />复制邀请码</button></div><button className="refresh-code" onClick={() => { setCode(String(Math.floor(100000 + Math.random() * 900000)).replace(/(\d{3})(\d{3})/, '$1 $2')); setToast('已刷新演示关联码') }}><RefreshCw />刷新关联码</button><section className="tip-card"><h3>ⓘ 温馨提示</h3><p>请其他家庭超级管理员扫描上方二维码，或使用邀请码发起家庭关联。</p></section></section></div>{toast && <Toast message={toast} onClose={closeToast} />}</div>
}
