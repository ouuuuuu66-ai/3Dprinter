import { BadgeCheck, ChevronRight, QrCode } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../state/AppStateContext'
import { UserAvatar } from '../common/UserAvatar'

export function ProfileCard() {
  const { data } = useAppState()
  const navigate = useNavigate()
  return (
    <section className="profile-card">
      <button className="profile-main" onClick={() => navigate('/account')}>
        <UserAvatar src={data.user.avatarUrl} avatarKey={data.user.avatarKey} />
        <span className="profile-copy"><strong>{data.user.nickname}</strong><small><BadgeCheck /> 已实名认证 · 超级管理员</small><em>ID {data.user.id}</em></span>
        <ChevronRight />
      </button>
      <button className="qr-entry" onClick={() => navigate('/association-code')}><QrCode /><span>我的关联码</span></button>
    </section>
  )
}
