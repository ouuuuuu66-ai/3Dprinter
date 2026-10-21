import { useEffect } from 'react'

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 1800)
    return () => window.clearTimeout(timer)
  }, [onClose])
  return <div className="toast" role="status">{message}</div>
}
