import { Camera, ChevronRight, LogOut, QrCode, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomSheet } from '../components/common/BottomSheet'
import { Modal } from '../components/common/Modal'
import { Toast } from '../components/common/Toast'
import { UserAvatar } from '../components/common/UserAvatar'
import { AppHeader } from '../components/layout/AppHeader'
import { useAppState } from '../state/AppStateContext'

export function AccountPage() {
  const { data, updateNickname } = useAppState()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [avatarSheet, setAvatarSheet] = useState(false)
  const [name, setName] = useState(data.user.nickname)
  const [toast, setToast] = useState('')
  const [logoutConfirm, setLogoutConfirm] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const valid = name.trim().length >= 2 && name.trim().length <= 20 && /^[\u4e00-\u9fa5a-zA-Z0-9_-]+$/.test(name.trim())
  const save = () => { if (!valid) return; updateNickname(name.trim()); setEditing(false); setToast('用户名已更新') }
  return <div className="screen proto-screen"><AppHeader title="账户信息" /><div className="screen-scroll page-body account-page"><button className="avatar-editor" onClick={() => setAvatarSheet(true)}><UserAvatar src={data.user.avatarUrl} avatarKey={data.user.avatarKey} /><i><Camera /></i><span>已认证</span></button><section className="settings-list account-list"><button onClick={() => navigate('/account/username')}><span>用户名</span><em>{data.user.nickname}</em><ChevronRight /></button><button><span>登录邮箱</span><em>m***@ugee.com</em><ChevronRight /></button><button><span>第三方账号</span><em>未绑定</em><ChevronRight /></button><button onClick={() => navigate('/association-code')}><QrCode /><span>我的关联码</span><ChevronRight /></button></section><section className="settings-list account-list"><button><span>修改密码</span><ChevronRight /></button><button><ShieldCheck /><span>认证信息</span><em className="green">已认证</em><ChevronRight /></button></section><button className="danger-button account-logout" onClick={() => setLogoutConfirm(true)}><LogOut />退出登录</button><button className="danger-text account-delete" onClick={() => setDeleteConfirm(true)}>注销账号</button></div>{avatarSheet && <BottomSheet title="修改头像" onClose={() => setAvatarSheet(false)}><button className="sheet-option center" onClick={() => { setAvatarSheet(false); navigate('/account/avatar/system') }}>系统头像</button><button className="sheet-option center" onClick={() => { setAvatarSheet(false); navigate('/account/avatar/gallery') }}>相册</button><button className="sheet-option center" onClick={() => setAvatarSheet(false)}>取消</button></BottomSheet>}{logoutConfirm && <Modal title="确认退出登录？" onClose={() => setLogoutConfirm(false)}><p className="modal-copy">退出后将跳转至模型库登录前页面。</p><button className="danger-confirm" onClick={() => navigate('/login')}>确认退出</button></Modal>}{deleteConfirm && <div className="overlay"><section className="delete-dialog"><span>⚠️</span><h2>确认注销账号？</h2><p>注销后，该账号内的数据将被清空，且无法恢复。</p><div><button onClick={() => setDeleteConfirm(false)}>取消</button><button onClick={() => { setDeleteConfirm(false); setToast('注销为演示流程，未真实执行') }}>确认注销</button></div></section></div>}{toast && <Toast message={toast} onClose={() => setToast('')} />}</div>
}
