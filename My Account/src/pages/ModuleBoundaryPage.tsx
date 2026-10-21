import { Construction } from 'lucide-react'
import { AppHeader } from '../components/layout/AppHeader'

export function ModuleBoundaryPage({ title, description }: { title: string; description: string }) {
  return <div className="screen"><AppHeader title={title} /><div className="screen-scroll page-body module-boundary"><Construction /><h2>模块边界已建立</h2><p>{description}</p><small>当前不制作正式 UI，避免在缺少设计图时擅自扩展。</small></div></div>
}
