import { ChevronRight } from 'lucide-react'
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
        <span className="profile-copy"><strong>{data.user.nickname}</strong></span>
        <ChevronRight />
      </button>
    </section>
  )
}
