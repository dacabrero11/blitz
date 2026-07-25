'use client'

import { useEffect } from 'react'

/**
 * Cards mount a few milliseconds apart, so their CSS loops drift out of phase.
 * This pins every beam animation to the same timeline origin so all the cards
 * rotate perfectly in step.
 */
export function BeamSync() {
  useEffect(() => {
    function sync() {
      document.querySelectorAll<HTMLElement>('.animate-beam').forEach((el) => {
        el.getAnimations().forEach((a) => {
          try {
            a.startTime = 0
          } catch {
            /* animation not ready yet — the retry below covers it */
          }
        })
      })
    }
    sync()
    const t1 = setTimeout(sync, 400)
    const t2 = setTimeout(sync, 1500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return null
}
