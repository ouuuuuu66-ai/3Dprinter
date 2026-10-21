import { ChevronRight, Download, Eye, Heart, Share2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Printer } from 'lucide-react'
import { useAppState } from '../../state/AppStateContext'

export function ModelCard({ mode = 'prints' }: { mode?: 'prints' | 'creations' | 'slices' | 'favorites' | 'videos' }) {
  const navigate = useNavigate()
  const { data } = useAppState()
  const [toast, setToast] = useState('')
  const isCreation = mode === 'creations'
  const isSlice = mode === 'slices'
  const isFavorite = mode === 'favorites'
  const isVideo = mode === 'videos'
  const [loadingSlice, setLoadingSlice] = useState<{ id: string; name: string } | null>(null)
  const creationHighlights = ['c1', 'c7', 'c2', 'c4'].map((id) => data.creationRecords.find((item) => item.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item))
  if (isFavorite) {
    const favorites = data.showFavoriteRecords ? data.favoriteRecords.slice(0, 4) : []
    return <section className="content-card model-section"><div className="section-title"><h2>我的收藏</h2><button onClick={() => navigate('/models/favorites')}>查看全部 <ChevronRight /></button></div>{favorites.length ? <div className="model-grid favorite-home-grid">{favorites.map((item) => <article key={item.id} className="favorite-card"><div className="favorite-art"><span>{item.emoji}</span><b><Heart fill="currentColor" /></b></div><h2>{item.name}</h2><p><span><em>{item.authorEmoji}</em>{item.author}</span><span><Download />{item.downloads}</span><span><Heart fill="currentColor" />{item.likes}</span></p></article>)}</div> : <div className="empty-print-home"><span>📦 ⭐</span><h3>这里还是空的哦</h3><p>完成相关操作后，内容会出现在这里</p></div>}</section>
  }
  if (isVideo) {
    const videos = data.videoRecords.slice(0, 4)
    return <section className="content-card model-section"><div className="section-title"><h2>模型视频</h2><button onClick={() => navigate('/models/videos')}>查看全部 <ChevronRight /></button></div>{videos.length ? <div className="model-grid home-video-grid">{videos.map((item) => <article key={item.id} className="home-video-card"><button onClick={() => navigate(`/models/videos/${item.id}`)}><span className="video-emoji">{item.emoji}</span><i>{item.duration}</i><strong>{item.name}</strong></button><Share2 /></article>)}</div> : <div className="empty-print-home"><span>📦 🎬</span><h3>这里还是空的哦</h3><p>完成相关操作后，内容会出现在这里</p></div>}</section>
  }
  const records = isSlice ? (data.showSliceRecords ? data.sliceRecords.slice(0, 4) : []) : isCreation ? (data.showCreationRecords ? creationHighlights : []) : (data.showPrintRecords ? data.printRecords.slice(0, 4) : [])
  const openItem = (id: string) => {
    if (isCreation && id === 'c2') {
      setToast('模型打开失败，请稍后重试')
      window.setTimeout(() => setToast(''), 2200)
      return
    }
    navigate(isSlice ? `/models/slices/${id}` : isCreation ? `/models/creations/${id}` : '/models/prints')
  }
  const printSlice = (id: string, name: string) => {
    setLoadingSlice({ id, name })
    window.setTimeout(() => navigate(`/models/prints/connect/${id}`), 900)
  }
  return (
    <section className="content-card model-section">
      <div className="section-title"><h2>{isSlice ? '我的切片' : isCreation ? '我的创作' : '我的打印作品'}</h2><button onClick={() => navigate(isSlice ? '/models/slices' : isCreation ? '/models/creations' : '/models/prints')}>查看全部 <ChevronRight /></button></div>
      {records.length ? <div className="model-grid">{records.map((item) => <article key={item.id} className={`home-model-card ${isSlice ? 'home-slice-card' : ''}`}><button onClick={() => openItem(item.id)}><span className="art-emoji">{item.emoji}</span><strong>{item.name}</strong></button>{isSlice ? <div className="home-slice-actions"><button onClick={() => navigate(`/models/slices/${item.id}`)}><Eye />预览</button><button onClick={() => printSlice(item.id, item.name)}><Printer />打印</button></div> : <button className="reprint-button" onClick={() => navigate(isCreation ? `/models/creations/${item.id}` : `/models/prints/connect/${item.id}`)}><Printer />{isCreation ? '去打印' : '再次打印'}</button>}</article>)}</div> : <div className="empty-print-home"><span>{isSlice || isCreation ? '📦 ⭐' : '🖨️ 🐱'}</span><h3>{isSlice || isCreation ? '这里还是空的哦' : '还没有打印作品'}</h3><p>{isSlice || isCreation ? '完成相关操作后，内容会出现在这里' : '打印成功的模型会展示在这里，快去创作并完成第一次打印吧'}</p></div>}
      {toast && <div className="inline-toast">❕ {toast}</div>}
      {loadingSlice && <div className="slice-loading"><strong>12%</strong><i><b /></i><span>{loadingSlice.name}</span></div>}
    </section>
  )
}
