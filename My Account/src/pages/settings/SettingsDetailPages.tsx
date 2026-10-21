import { Check, ChevronLeft, CircleCheck, Info, Send } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomTabBar } from '../../components/layout/BottomTabBar'
import { Toast } from '../../components/common/Toast'
import { useAppState } from '../../state/AppStateContext'

const languages = ['跟随系统', '简体中文', '繁體中文', 'English', 'Español', 'Русский', 'Čeština', 'Deutsch', 'Français', 'Italiano', 'Polski', '日本語', '한국어', 'Português']

export function LanguagePage() {
  const navigate = useNavigate()
  const { data, setLanguage } = useAppState()
  return <div className="screen proto-screen"><header className="proto-header"><button onClick={() => navigate(-1)}><ChevronLeft /></button><h1>选择语言</h1><span /></header><div className="screen-scroll proto-scroll language-list">{languages.map((language) => <button key={language} className={data.settings.language === language ? 'selected' : ''} onClick={() => setLanguage(language)}><span>{language}</span>{data.settings.language === language && <Check />}</button>)}</div></div>
}

export function StoragePage() {
  const navigate = useNavigate()
  return <div className="screen proto-screen"><header className="proto-header"><button onClick={() => navigate(-1)}><ChevronLeft /></button><h1>我的空间</h1><span /></header><div className="storage-card"><div className="storage-ring"><span>已占用<strong>286 MB</strong></span></div><div className="storage-row"><span>🧊</span><strong>模型数据</strong><em>194 MB</em></div><div className="storage-row"><span>🗂️</span><strong>切片数据</strong><em>92 MB</em></div><p>▣ 数据存储在当前设备</p></div></div>
}

export function FeedbackPage() {
  const navigate = useNavigate()
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [contact, setContact] = useState('')
  const [toast, setToast] = useState('')
  const valid = Boolean(category && description.trim() && /(^1\d{10}$)|(^[^\s@]+@[^\s@]+\.[^\s@]+$)/.test(contact.trim()))
  return <div className="screen proto-screen"><header className="proto-header"><button onClick={() => navigate(-1)}><ChevronLeft /></button><h1>建议反馈</h1><span /></header><div className="screen-scroll proto-scroll feedback-page"><h2>问题分类 <b>*</b></h2><div className="category-pills">{['设备', '打印', 'AI 创作', '软件', '其他'].map((item) => <button className={category === item ? 'selected' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><h2>问题描述 <b>*</b></h2><textarea value={description} maxLength={500} onChange={(event) => setDescription(event.target.value)} placeholder="请描述你遇到的问题或提出你的宝贵建议" /><h2>联系方式 <b>*</b></h2><input value={contact} onChange={(event) => setContact(event.target.value)} placeholder="邮箱 / 手机号码" /><button className="sticky-form-button" disabled={!valid} onClick={() => setToast('提交成功，感谢你的反馈')}>提交</button></div><BottomTabBar />{toast && <Toast message={toast} onClose={() => setToast('')} />}</div>
}

export function AboutPage() {
  const navigate = useNavigate()
  return <div className="screen proto-screen about-page"><header className="proto-header transparent"><button onClick={() => navigate(-1)}><ChevronLeft /></button><h1>关于应用</h1><span /></header><main><div className="app-logo">u</div><h2>ugee maker</h2><p>1.1.24</p><section>ICP备案号<br />粤ICP备2021012595号-21A</section><footer>版权所有 Copyright © 2026-2029 ugee.<br /><a href="https://www.ugee.com">https://www.ugee.com</a></footer></main><BottomTabBar /></div>
}

export function AgreementPage({ privacy = false }: { privacy?: boolean }) {
  const navigate = useNavigate()
  return <div className="screen proto-screen agreement-page"><header className="proto-header transparent"><button onClick={() => navigate(-1)}><ChevronLeft /></button><h1>{privacy ? '隐私协议' : '用户协议'}</h1><span /></header><article className="screen-scroll"><p className="updated">更新日期：2026年9月30日</p>{privacy ? <><p>ugee maker（以下简称“我们”或“本软件”）由深圳汉王友基科技有限公司开发并运营。</p><p>我们重视并保护您的个人信息与隐私安全。本《隐私协议》旨在向您说明我们如何收集、使用、存储、共享和保护您的个人信息，以及您依法享有的相关权利。</p><h2>1. 我们收集的信息</h2><p>为保障软件正常运行并向您提供服务，我们可能收集设备信息、日志信息、账号信息以及您主动提交的反馈内容。</p><h2>2. 信息的使用</h2><p>收集的信息将用于提供和改进产品功能、保障账号与服务安全、响应您的咨询或反馈。</p><h2>3. 信息存储与保护</h2><p>我们将采取合理的安全措施保护您的个人信息。</p></> : <><p>请仔细阅读以下使用许可，如果您不同意以下任何一点，请立即停止使用本软件。</p><h2>1. 协议说明</h2><p>本《用户协议》是您与本软件版权所有人之间订立的法律协议。在使用本软件产品之前，请务必仔细阅读并充分理解本协议的全部内容。</p><h2>2. 使用许可</h2><p>您一旦安装、复制、下载、访问或以其他方式使用本软件，即表示您同意接受本协议各项条款的约束。</p><h2>3. 更新与变更</h2><p>本协议可根据服务调整进行更新，更新后的协议公布后即生效。</p></>}</article><BottomTabBar /></div>
}
