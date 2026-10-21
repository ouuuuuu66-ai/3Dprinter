import { useParams } from 'react-router-dom'
import { BottomTabBar } from '../components/layout/BottomTabBar'

const labels: Record<string, string> = { home: '首页', workspace: '工作台', create: '创作' }
export function HomePlaceholderPage() {
  const { tab = 'home' } = useParams()
  return <div className="screen"><div className="tab-placeholder"><h1>{labels[tab] ?? '页面'}</h1><p>当前阶段仅聚焦【我的】模块。</p></div><BottomTabBar /></div>
}
