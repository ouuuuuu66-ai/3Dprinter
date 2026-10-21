import type { ReactNode } from 'react'

export function BottomSheet({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return <div className="overlay" role="presentation" onMouseDown={onClose}><section className="bottom-sheet" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()}><div className="sheet-handle" /><h2>{title}</h2>{children}</section></div>
}
