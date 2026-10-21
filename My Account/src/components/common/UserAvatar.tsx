import { UserRound } from 'lucide-react'

export function UserAvatar({ src, avatarKey, size = 'large' }: { src: string | null; avatarKey?: string; size?: 'small' | 'large' }) {
  const emoji = avatarKey?.includes('robot') ? '🤖' : avatarKey?.includes('dino') ? '🦖' : avatarKey?.includes('unicorn') ? '🦄' : avatarKey?.includes('boy') ? '🧑‍🚀' : '🐱'
  return <div className={`avatar avatar-${size} ${avatarKey ?? ''}`}>{src ? <img src={src} alt="用户头像" /> : avatarKey ? <span aria-label="演示头像">{emoji}</span> : <UserRound aria-label="头像占位" />}</div>
}
