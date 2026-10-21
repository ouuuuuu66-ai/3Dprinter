import { Image } from 'lucide-react'

export function PlaceholderArt({ label }: { label: string }) {
  return <div className="placeholder-art" aria-label={`${label}占位素材`}><Image /><span>{label}</span></div>
}
