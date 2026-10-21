import { Check, ChevronLeft, Printer, RefreshCw, Trash2, WifiOff } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal } from '../../components/common/Modal'
import { Toast } from '../../components/common/Toast'
import { BottomTabBar } from '../../components/layout/BottomTabBar'
import { useAppState } from '../../state/AppStateContext'

export function PrintListPage() {
  const navigate = useNavigate()
  const { data, deletePrintRecords } = useAppState()
  const [manage, setManage] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [confirm, setConfirm] = useState(false)
  const toggle = (id: string) => setSelected((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id])
  const records = data.showPrintRecords ? data.printRecords : []
  return <div className="screen proto-screen"><header className="proto-header"><button onClick={() => navigate(-1)}><ChevronLeft /></button><h1>我的打印</h1><button className="purple-text" onClick={() => { setManage(!manage); setSelected([]) }}>{manage ? '完成' : '管理'}</button></header><div className="screen-scroll proto-scroll with-proto-tabs"><div className="artifact-grid">{records.map((item) => <article key={item.id} className="artifact-card" onClick={() => manage && toggle(item.id)}><div className={`artwork art-${item.id}`}><span>{item.emoji}</span>{manage && <i className={selected.includes(item.id) ? 'checked' : ''}>{selected.includes(item.id) && <Check />}</i>}</div><h2>{item.name}</h2><p>最近打印：{item.printedAt}</p>{!manage && <button onClick={() => navigate(`/models/prints/connect/${item.id}`)}><Printer />再次打印</button>}</article>)}</div>{records.length === 0 && <div className="full-empty"><span>🖨️</span><h2>还没有打印作品</h2><p>完成打印后，作品会出现在这里</p></div>}</div>{manage ? <footer className="manage-bar"><button onClick={() => setSelected(selected.length === records.length ? [] : records.map((item) => item.id))}><i className={selected.length === records.length ? 'checked' : ''}>{selected.length === records.length && <Check />}</i>全选</button><button className="delete-button" disabled={!selected.length} onClick={() => setConfirm(true)}><Trash2 />删除</button></footer> : <BottomTabBar />}{confirm && <DeleteDialog onCancel={() => setConfirm(false)} onConfirm={() => { deletePrintRecords(selected); setSelected([]); setConfirm(false); setManage(false) }} />}</div>
}

function DeleteDialog({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return <div className="overlay"><section className="delete-dialog"><span>🗑️</span><h2>确定删除？</h2><p>删除后不可恢复。</p><div><button onClick={onCancel}>取消</button><button onClick={onConfirm}>确认删除</button></div></section></div>
}

export function PrinterConnectPage() {
  const navigate = useNavigate()
  const { printId } = useParams()
  const [connected, setConnected] = useState(false)
  const [toast, setToast] = useState('')
  const printers = [{ name: 'UG-15', status: '设备未连接', bad: true }, { name: 'UG-02', status: '已离线', bad: false }]
  return <div className="screen proto-screen"><header className="proto-header"><button onClick={() => navigate(-1)}><ChevronLeft /></button><h1>连接打印机</h1><span /></header><div className="screen-scroll proto-scroll printer-page"><h2>我的打印机（3）</h2>{printers.map((item) => <article className="printer-row" key={item.name}><span>🖨️</span><div><strong>{item.name}</strong><small className={item.bad ? 'bad' : ''}>● {item.status}</small></div><button onClick={() => { setConnected(true); setToast(`${item.name} 已重新连接`) }}><RefreshCw />重新连接</button></article>)}<button className="expand-button">⌄ 展开</button><h2>同一网络内可用打印机</h2>{['营销组', 'Ugee Funbox'].map((name) => <article className="printer-row available" key={name}><span>🖨️</span><div><strong>{name}</strong><small>● 空闲</small></div><button onClick={() => { setConnected(true); setToast(`${name} 已连接`) }}>连接</button></article>)}</div><button className="sticky-gradient" onClick={() => connected ? navigate(`/workbench/printing/${printId}`) : setToast('请先连接可用打印机')}>{connected ? '发送打印任务' : '配置新的打印机'}</button>{toast && <Toast message={toast} onClose={() => setToast('')} />}</div>
}

export function PrintingPage() {
  const navigate = useNavigate()
  const { data } = useAppState()
  const { printId } = useParams()
  const item = useMemo(() => data.printRecords.find((record) => record.id === printId) ?? data.creationRecords.find((record) => record.id === printId) ?? data.sliceRecords.find((record) => record.id === printId) ?? data.printRecords[0], [data.printRecords, data.creationRecords, data.sliceRecords, printId])
  const [paused, setPaused] = useState(false)
  return <div className="screen proto-screen printing-page"><div className="printer-status"><span>🖨️</span><div><strong>UG-07</strong><small>● {paused ? '已暂停' : '打印中'}</small></div><button>⇄</button><button>⚙️<small>设置</small></button></div><div className="camera-stage"><span>{item.emoji}</span><b>延时摄影 ›</b><em>摄像头</em></div><section className="print-progress"><h1><Printer />打印中</h1><article><div className="artwork"><span>{item.emoji}</span></div><div><h2>{item.name}</h2><p>◷ 预计时间　2 h 21 min</p><p>◉ 耗材用量　33.6 g</p></div></article><div className="progress-copy"><span>打印进度<strong>12%</strong></span><span>剩余时间<strong>1 h 56 min</strong></span></div><div className="progress-track"><i /></div><div className="print-actions"><button onClick={() => setPaused(!paused)}>{paused ? '▶ 继续' : 'Ⅱ 暂停'}</button><button onClick={() => navigate('/mine')}>× 取消</button></div></section><BottomTabBar /></div>
}
