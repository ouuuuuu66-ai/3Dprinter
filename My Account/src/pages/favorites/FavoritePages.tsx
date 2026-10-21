import { Check, ChevronLeft, Download, Heart, HeartOff } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomTabBar } from '../../components/layout/BottomTabBar'
import { useAppState } from '../../state/AppStateContext'

export function FavoriteListPage() {
  const navigate = useNavigate()
  const { data, cancelFavoriteRecords } = useAppState()
  const [manage, setManage] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [confirm, setConfirm] = useState(false)
  const records = data.showFavoriteRecords ? data.favoriteRecords : []
  const toggle = (id: string) => setSelected((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id])
  return <div className="screen proto-screen"><header className="proto-header"><button onClick={() => navigate(-1)}><ChevronLeft /></button><h1>我的收藏</h1><button className="purple-text" onClick={() => { setManage(!manage); setSelected([]) }}>{manage ? '完成' : '管理'}</button></header><div className="screen-scroll proto-scroll with-proto-tabs"><div className="artifact-grid favorite-grid">{records.map((item) => <article key={item.id} className="favorite-card" onClick={() => manage && toggle(item.id)}><div className={`favorite-art favorite-${item.id}`}><span>{item.emoji}</span>{manage ? <i className={selected.includes(item.id) ? 'checked' : ''}>{selected.includes(item.id) && <Check />}</i> : <b><Heart fill="currentColor" /></b>}</div><h2>{item.name}</h2><p><span><em>{item.authorEmoji}</em>{item.author}</span><span><Download />{item.downloads}</span><span><Heart fill="currentColor" />{item.likes}</span></p></article>)}</div>{records.length === 0 && <div className="full-empty creation-empty"><span>📦</span><h2>这里还是空的哦</h2><p>完成相关操作后，内容会出现在这里</p></div>}</div>{manage ? <footer className="manage-bar"><button onClick={() => setSelected(selected.length === records.length ? [] : records.map((item) => item.id))}><i className={selected.length === records.length && records.length ? 'checked' : ''}>{selected.length === records.length && records.length > 0 && <Check />}</i>全选</button><button className="delete-button" disabled={!selected.length} onClick={() => setConfirm(true)}><HeartOff />取消</button></footer> : <BottomTabBar />}{confirm && <div className="overlay"><section className="delete-dialog favorite-dialog"><span>💗</span><h2>确定取消？</h2><p>取消后，可在模型库重新收藏</p><div><button onClick={() => setConfirm(false)}>取消</button><button onClick={() => { cancelFavoriteRecords(selected); setSelected([]); setConfirm(false); setManage(false) }}>确定</button></div></section></div>}</div>
}
