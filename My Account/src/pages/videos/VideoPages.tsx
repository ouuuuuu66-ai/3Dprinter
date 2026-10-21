import { Check, ChevronLeft, Download, Play, Share2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BottomSheet } from '../../components/common/BottomSheet'
import { BottomTabBar } from '../../components/layout/BottomTabBar'
import { Toast } from '../../components/common/Toast'
import { useAppState } from '../../state/AppStateContext'

export function VideoListPage() {
  const navigate = useNavigate()
  const { data, deleteVideoRecords } = useAppState()
  const [manage, setManage] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [confirm, setConfirm] = useState(false)
  const toggle = (id: string) => setSelected((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id])
  return <div className="screen proto-screen"><header className="proto-header"><button onClick={() => navigate(-1)}><ChevronLeft /></button><h1>模型视频</h1><button className="purple-text" onClick={() => { setManage(!manage); setSelected([]) }}>{manage ? '完成' : '管理'}</button></header><div className="screen-scroll proto-scroll with-proto-tabs"><div className="artifact-grid video-grid">{data.videoRecords.map((item) => <article key={item.id} className="artifact-card" onClick={() => manage ? toggle(item.id) : navigate(`/models/videos/${item.id}`)}><div className={`artwork art-${item.id}`}><span>{item.emoji}</span><em>{item.duration}</em>{manage && <i className={selected.includes(item.id) ? 'checked' : ''}>{selected.includes(item.id) && <Check />}</i>}</div><h2>{item.name}</h2>{!manage && <Share2 />}</article>)}</div>{!data.videoRecords.length && <div className="full-empty"><span>📦</span><h2>这里还是空的哦</h2><p>完成相关操作后，内容会出现在这里</p></div>}</div>{manage ? <footer className="manage-bar"><button onClick={() => setSelected(selected.length === data.videoRecords.length ? [] : data.videoRecords.map((item) => item.id))}><i className={selected.length === data.videoRecords.length ? 'checked' : ''}>{selected.length === data.videoRecords.length && <Check />}</i>全选</button><button className="delete-button" disabled={!selected.length} onClick={() => setConfirm(true)}><Trash2 />删除</button></footer> : <BottomTabBar />}{confirm && <div className="overlay"><section className="delete-dialog"><span>🗑️</span><h2>确定删除？</h2><p>删除后不可恢复。</p><div><button onClick={() => setConfirm(false)}>取消</button><button onClick={() => { deleteVideoRecords(selected); setConfirm(false); setManage(false); setSelected([]) }}>确认删除</button></div></section></div>}</div>
}

export function VideoPlayerPage() {
  const navigate = useNavigate()
  const { videoId } = useParams()
  const { data, deleteVideoRecords } = useAppState()
  const item = data.videoRecords.find((record) => record.id === videoId) ?? data.videoRecords[0]
  const [share, setShare] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [toast, setToast] = useState('')
  return <div className="screen proto-screen video-player"><header><button onClick={() => navigate(-1)}><ChevronLeft /></button><div><h1>{item?.name}</h1><p>{item?.createdAt}</p></div></header><div className="video-stage"><span>{item?.emoji}</span><button><Play /></button><div>▶　00:03 / {item?.duration}　━━━━━━　⛶</div></div><footer><button onClick={() => setShare(true)}><Share2 />分享</button><button onClick={() => setConfirm(true)}><Trash2 />删除</button></footer>{share && <BottomSheet title="分享至" onClose={() => setShare(false)}><div className="share-grid">{['WhatsApp', 'Instagram', 'Facebook', 'Telegram', 'TikTok'].map((name) => <button key={name} onClick={() => { setShare(false); setToast(`${name} 分享为演示操作`) }}><span>↗</span>{name}</button>)}<button onClick={() => { setShare(false); setToast('视频已模拟保存') }}><Download />保存视频</button></div><button className="sheet-option center" onClick={() => setShare(false)}>取消</button></BottomSheet>}{confirm && <div className="overlay"><section className="delete-dialog"><span>🗑️</span><h2>确定删除？</h2><p>删除后不可恢复。</p><div><button onClick={() => setConfirm(false)}>取消</button><button onClick={() => { if (item) deleteVideoRecords([item.id]); navigate('/models/videos') }}>确认删除</button></div></section></div>}{toast && <Toast message={toast} onClose={() => setToast('')} />}</div>
}
