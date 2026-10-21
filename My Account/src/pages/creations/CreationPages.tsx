import { Check, ChevronLeft, Printer, Ruler, Timer, Trash2, Weight } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BottomTabBar } from '../../components/layout/BottomTabBar'
import { useAppState } from '../../state/AppStateContext'

export function CreationListPage() {
  const navigate = useNavigate()
  const { data, deleteCreationRecords } = useAppState()
  const [manage, setManage] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [confirm, setConfirm] = useState(false)
  const records = data.showCreationRecords ? data.creationRecords.slice(0, 6) : []
  const toggle = (id: string) => setSelected((ids) => ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id])

  return <div className="screen proto-screen"><header className="proto-header"><button onClick={() => navigate(-1)}><ChevronLeft /></button><h1>我的创作</h1><button className="purple-text" onClick={() => { setManage(!manage); setSelected([]) }}>{manage ? '完成' : '管理'}</button></header><div className="screen-scroll proto-scroll with-proto-tabs"><div className="artifact-grid">{records.map((item) => <article key={item.id} className="artifact-card creation-card" onClick={() => manage ? toggle(item.id) : navigate(`/models/creations/${item.id}`)}><div className={`artwork creation-art art-${item.id}`}><span>{item.emoji}</span>{manage && <i className={selected.includes(item.id) ? 'checked' : ''}>{selected.includes(item.id) && <Check />}</i>}</div><h2>{item.name}</h2><p>创建时间：{item.createdAt}</p>{!manage && <button onClick={(event) => { event.stopPropagation(); navigate(`/models/creations/${item.id}`) }}><Printer />去打印</button>}</article>)}</div>{records.length === 0 && <div className="full-empty creation-empty"><span>📦</span><h2>这里还是空的哦</h2><p>完成相关操作后，内容会出现在这里</p></div>}</div>{manage ? <footer className="manage-bar"><button onClick={() => setSelected(selected.length === records.length ? [] : records.map((item) => item.id))}><i className={selected.length === records.length && records.length ? 'checked' : ''}>{selected.length === records.length && records.length > 0 && <Check />}</i>全选</button><button className="delete-button" disabled={!selected.length} onClick={() => setConfirm(true)}><Trash2 />删除</button></footer> : <BottomTabBar />}{confirm && <div className="overlay"><section className="delete-dialog"><span>🗑️</span><h2>确定删除？</h2><p>删除后不可恢复。</p><div><button onClick={() => setConfirm(false)}>取消</button><button onClick={() => { deleteCreationRecords(selected); setSelected([]); setConfirm(false); setManage(false) }}>确认删除</button></div></section></div>}</div>
}

export function CreationPreviewPage() {
  const navigate = useNavigate()
  const { creationId } = useParams()
  const { data } = useAppState()
  const item = data.creationRecords.find((record) => record.id === creationId) ?? data.creationRecords[6] ?? data.creationRecords[0]
  return <div className="screen proto-screen creation-preview"><header className="preview-back"><button onClick={() => navigate(-1)}><ChevronLeft /></button></header><section className="model-spec"><div className="spec-title"><span>{item.emoji}</span><h1>{item.name}</h1></div><p><Ruler />{item.dimensions}</p><p><Timer />{item.printTime}</p><p><Weight />{item.material}</p></section><div className="model-stage"><div className="wire-cube"><i /><b /><em /><span>{item.emoji}</span></div><small>120mm</small></div><div className="layer-slider"><b>503</b><i /></div><button className="sticky-gradient creation-print" onClick={() => navigate(`/models/prints/connect/${item.id}`)}><Printer />打印</button></div>
}
