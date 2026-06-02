import { useEffect, useState } from 'react'

export default function Toast({ message, type = 'success', onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const styles = {
    success: 'bg-gray-900 text-white',
    error:   'bg-red-600 text-white',
  }

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className={`${styles[type]} px-5 py-3 rounded-2xl shadow-lg text-sm font-medium flex items-center gap-2 whitespace-nowrap`}>
        {type === 'success' ? '✓' : '✕'} {message}
      </div>
    </div>
  )
}