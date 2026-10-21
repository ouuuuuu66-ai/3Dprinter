import { Camera, Check, ChevronLeft, Mail, Phone, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomTabBar } from '../../components/layout/BottomTabBar'
import { Toast } from '../../components/common/Toast'
import { useAppState } from '../../state/AppStateContext'

const avatars = [
  { key: 'boy-space', emoji: '🧑‍🚀' }, { key: 'dino-green', emoji: '🦖' }, { key: 'unicorn-pink', emoji: '🦄' }, { key: 'cat-purple', emoji: '🐱' },
  { key: 'robot-blue', emoji: '🤖' }, { key: 'cat-white', emoji: '🐰' }, { key: 'bear-brown', emoji: '🐻' }, { key: 'girl-star', emoji: '🧚' },
]

export function SystemAvatarPage() {
  const navigate = useNavigate()
  const { data, setAvatar } = useAppState()
  const [selected, setSelected] = useState(data.user.avatarKey)
  return <div className="screen proto-screen"><header className="proto-header"><button onClick={() => navigate(-1)}><ChevronLeft /></button><h1>系统头像</h1><button className="purple-text" onClick={() => { setAvatar(selected); navigate(-1) }}>完成</button></header><div className="avatar-picker">{avatars.map((avatar) => <button key={avatar.key} className={selected === avatar.key ? 'selected' : ''} onClick={() => setSelected(avatar.key)}><span>{avatar.emoji}</span>{selected === avatar.key && <i><Check /></i>}</button>)}</div><BottomTabBar /></div>
}

export function GalleryPage() {
  const navigate = useNavigate()
  const { setAvatar } = useAppState()
  const [selected, setSelected] = useState(0)
  const photos = ['🐱', '🐶', '👧', '🧸', '🏞️', '🌷', '👦', '🐥', '😺', '🐕', '🌻', '🐈']
  return <div className="screen proto-screen"><header className="proto-header"><button onClick={() => navigate(-1)}><ChevronLeft /></button><h1>相册</h1><button className="purple-text" onClick={() => { setAvatar(selected === 0 ? 'cat-album' : `album-${selected}`); navigate('/account') }}>完成</button></header><h2 className="album-title">最近项目⌄</h2><div className="photo-grid">{photos.map((photo, index) => <button key={index} className={selected === index ? 'selected' : ''} onClick={() => setSelected(index)}><span>{photo}</span>{selected === index && <i><Check /></i>}</button>)}</div></div>
}

export function UsernamePage() {
  const navigate = useNavigate()
  const { data, updateNickname } = useAppState()
  const [name, setName] = useState(data.user.nickname)
  const [toast, setToast] = useState('')
  const valid = name.trim().length >= 2 && name.trim().length <= 20 && /^[\u4e00-\u9fa5a-zA-Z0-9_-]+$/.test(name.trim()) && !/1\d{10}/.test(name)
  return <div className="screen proto-screen username-page"><header className="proto-header"><button onClick={() => navigate(-1)}><ChevronLeft /></button><h1>修改用户名</h1><span /></header><section><label>用户名</label><div><input value={name} maxLength={20} onChange={(event) => setName(event.target.value)} autoFocus /><button onClick={() => setName('')}><X /></button></div><p>2-20个字符，支持中英文、数字 <em>{name.length}/20</em></p><small>请勿填写手机号等个人隐私信息</small></section><button className="sticky-gradient" disabled={!valid || name.trim() === data.user.nickname} onClick={() => { updateNickname(name.trim()); setToast('用户名已保存'); window.setTimeout(() => navigate(-1), 500) }}>保存</button>{toast && <Toast message={toast} onClose={() => setToast('')} />}</div>
}

export function LoginPage() {
  const [english, setEnglish] = useState(false)
  const navigate = useNavigate()
  return <div className="screen login-page"><header><button onClick={() => navigate('/mine')}><X /></button><button onClick={() => setEnglish(!english)}>{english ? 'English' : '跟随系统'}</button></header><div className="login-hero"><span>🤖</span><i>🚀</i><i>🦖</i><i>🐰</i><i>🚗</i></div><h1>{english ? 'Welcome to' : '欢迎来到'}<strong>ugee maker</strong></h1><button className="login-primary"><Phone />{english ? 'Log in with Phone' : '手机号登录'}　›</button><button className="login-secondary"><Mail />{english ? 'Log in with Email' : '邮箱登录'}　›</button><p>{english ? 'Continue with' : '第三方登录'}</p><div className="socials"><button>微</button><button>Q</button></div><label><input type="checkbox" />{english ? 'I have read and agree to the Terms of Service and Privacy Policy' : '已阅读并同意我们的《用户服务协议》、《隐私政策》'}</label></div>
}
