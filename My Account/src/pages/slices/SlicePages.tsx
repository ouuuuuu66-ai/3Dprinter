import { Check, ChevronLeft, Clock3, Eye, Pencil, Printer, Ruler, Trash2, Weight } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BottomTabBar } from '../../components/layout/BottomTabBar'
import { useAppState } from '../../state/AppStateContext'

export function SliceListPage() {
  const navigate = useNavigate()
  const { data, deleteSliceRecords, renameSliceRecord } = useAppState()
  const [manage, setManage] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [confirm, setConfirm] = useState(false)
  const [renaming, setRenaming] = useState<string | null>(null)
  const record = data.sliceRecords.find((item) => item.id === renaming)
  const records = data.showSliceRecords ? data.sliceRecords : []
  const toggle = (id: string) => setSelected((ids) => ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id])

  return <div className="screen proto-screen"><header className="proto-header"><button onClick={() => navigate(-1)}><ChevronLeft /></button><h1>我的切片</h1><button className="purple-text" onClick={() => { setManage(!manage); setSelected([]) }}>{manage ? '完成' : '管理'}</button></header><div className="screen-scroll proto-scroll with-proto-tabs"><div className="artifact-grid slice-grid">{records.map((item) => <article key={item.id} className="artifact-card slice-card" onClick={() => manage && toggle(item.id)}><div className="artwork slice-art"><small>🧊</small><span>{item.emoji}</span>{manage && <i className={selected.includes(item.id) ? 'checked' : ''}>{selected.includes(item.id) && <Check />}</i>}</div><h2>{item.name}<button className="rename-icon" onClick={(event) => { event.stopPropagation(); setRenaming(item.id) }}><Pencil /></button></h2><p className="slice-meta"><span><Clock3 />{item.printTime}</span><span><Weight />{item.material}</span></p>{!manage && <div className="slice-actions"><button onClick={() => navigate(`/models/slices/${item.id}`)}><Eye />预览</button><button onClick={() => navigate(`/models/prints/connect/${item.id}`)}><Printer />打印</button></div>}</article>)}</div>{records.length === 0 && <div className="full-empty creation-empty"><span>📦</span><h2>这里还是空的哦</h2><p>完成相关操作后，内容会出现在这里</p></div>}</div>{manage ? <footer className="manage-bar"><button onClick={() => setSelected(selected.length === records.length ? [] : records.map((item) => item.id))}><i className={selected.length === records.length && records.length ? 'checked' : ''}>{selected.length === records.length && records.length > 0 && <Check />}</i>全选</button><button className="delete-button" disabled={!selected.length} onClick={() => setConfirm(true)}><Trash2 />删除</button></footer> : <BottomTabBar />}{confirm && <DeleteSliceDialog onCancel={() => setConfirm(false)} onConfirm={() => { deleteSliceRecords(selected); setSelected([]); setConfirm(false); setManage(false) }} />}{record && <RenameSheet name={record.name} onClose={() => setRenaming(null)} onConfirm={(name) => { renameSliceRecord(record.id, name); setRenaming(null) }} />}</div>
}

function DeleteSliceDialog({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return <div className="overlay"><section className="delete-dialog"><span>🗑️</span><h2>确认删除？</h2><p>删除后不可恢复。</p><div><button onClick={onCancel}>取消</button><button onClick={onConfirm}>确认删除</button></div></section></div>
}

function RenameSheet({ name, onClose, onConfirm }: { name: string; onClose: () => void; onConfirm: (name: string) => void }) {
  const [value, setValue] = useState(name)
  return <div className="overlay sheet-overlay"><section className="rename-sheet"><button className="sheet-close" onClick={onClose}>×</button><h2>给模型取个名字</h2><label><input value={value} maxLength={20} onChange={(event) => setValue(event.target.value)} autoFocus /><small>{value.length}/20</small></label><button className="sticky-gradient" disabled={!value.trim()} onClick={() => onConfirm(value.trim())}>确定</button></section></div>
}

export function SlicePreviewPage() {
  const navigate = useNavigate()
  const { sliceId } = useParams()
  const { data } = useAppState()
  const item = data.sliceRecords.find((entry) => entry.id === sliceId) ?? data.sliceRecords[0]
  return <div className="screen proto-screen creation-preview slice-preview"><header className="proto-header transparent"><button onClick={() => navigate(-1)}><ChevronLeft /></button><h1>{item.name}</h1><span /></header><section className="model-spec slice-spec"><p><span>🖨️</span>Ugee Funbox</p><p><Ruler />{item.dimensions}</p><p><Clock3 />{item.printTime}</p><p><Weight />{item.material}</p></section><div className="model-stage"><div className="wire-cube"><span>{item.emoji}</span></div><small>120mm</small></div><div className="layer-slider"><b>500</b><i /></div><button className="sticky-gradient creation-print" onClick={() => navigate(`/models/prints/connect/${item.id}`)}><Printer />打印</button></div>
}
