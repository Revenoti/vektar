import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return }
    let frame = 0
    let observer
    let targetId
    try { targetId = decodeURIComponent(hash.slice(1)) } catch { return }
    const findTarget = () => {
      const target = document.getElementById(targetId)
      if (!target) return false
      observer?.disconnect()
      frame = requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }))
      return true
    }
    // Lazy route and sandbox chunks can mount after navigation's first frame.
    // Observe only until this navigation's target exists; never scroll a stale route.
    if (!findTarget()) {
      observer = new MutationObserver(findTarget)
      observer.observe(document.getElementById('root'), { childList: true, subtree: true })
    }
    return () => { observer?.disconnect(); cancelAnimationFrame(frame) }
  }, [pathname, hash])
  return null
}
