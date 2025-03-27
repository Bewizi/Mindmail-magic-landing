
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Initialize with current window width if available (client-side)
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT
    }
    // Default to false for server-side rendering
    return false
  })

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Set up event listener for window resize
    window.addEventListener('resize', checkMobile)
    
    // Check once on mount to ensure the value is correct
    checkMobile()
    
    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}
