/**
 * Format date to readable string
 * @param {string|Date} dateString 
 * @returns {string}
 */
export function formatDate(dateString) {
  if (!dateString) return 'N/A'
  
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'Invalid Date'
    
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (error) {
    return 'Invalid Date'
  }
}

/**
 * Format date and time to readable string
 * @param {string|Date} dateString 
 * @returns {string}
 */
export function formatDateTime(dateString) {
  if (!dateString) return 'N/A'
  
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'Invalid Date'
    
    return date.toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return 'Invalid Date'
  }
}

/**
 * Check if date is expired
 * @param {string|Date} dateString 
 * @returns {boolean}
 */
export function isExpired(dateString) {
  if (!dateString) return false
  
  try {
    const date = new Date(dateString)
    return date <= new Date()
  } catch (error) {
    return false
  }
}

/**
 * Check if date is expiring soon
 * @param {string|Date} dateString 
 * @param {number} days 
 * @returns {boolean}
 */
export function isExpiringSoon(dateString, days = 7) {
  if (!dateString) return false
  
  try {
    const expiredDate = new Date(dateString)
    const checkDate = new Date()
    checkDate.setDate(checkDate.getDate() + days)
    return expiredDate <= checkDate && expiredDate > new Date()
  } catch (error) {
    return false
  }
}

/**
 * Generate UUID v4
 * @returns {string}
 */
export function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * Generate random string
 * @param {number} length 
 * @returns {string}
 */
export function generateRandomString(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Generate random password
 * @param {number} length 
 * @returns {string}
 */
export function generatePassword(length = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Format file size
 * @param {number} bytes 
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Format currency (IDR)
 * @param {number} amount 
 * @returns {string}
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

/**
 * Format number with thousand separator
 * @param {number} number 
 * @returns {string}
 */
export function formatNumber(number) {
  return new Intl.NumberFormat('id-ID').format(number)
}

/**
 * Capitalize first letter
 * @param {string} string 
 * @returns {string}
 */
export function capitalize(string) {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

/**
 * Truncate text
 * @param {string} text 
 * @param {number} length 
 * @returns {string}
 */
export function truncate(text, length = 50) {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {string|Date} dateString 
 * @returns {string}
 */
export function getRelativeTime(dateString) {
  if (!dateString) return 'N/A'
  
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)
    
    if (diffInSeconds < 60) return 'Baru saja'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} bulan yang lalu`
    return `${Math.floor(diffInSeconds / 31536000)} tahun yang lalu`
  } catch (error) {
    return 'N/A'
  }
}

/**
 * Get days until expiry
 * @param {string|Date} dateString 
 * @returns {number}
 */
export function getDaysUntilExpiry(dateString) {
  if (!dateString) return 0
  
  try {
    const expiredDate = new Date(dateString)
    const now = new Date()
    const diffInTime = expiredDate.getTime() - now.getTime()
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24))
    return diffInDays
  } catch (error) {
    return 0
  }
}

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate URL format
 * @param {string} url 
 * @returns {boolean}
 */
export function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Sleep/delay function
 * @param {number} ms 
 * @returns {Promise}
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Debounce function
 * @param {Function} func 
 * @param {number} wait 
 * @returns {Function}
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Copy text to clipboard
 * @param {string} text 
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const result = document.execCommand('copy')
      textArea.remove()
      return result
    }
  } catch (error) {
    console.error('Failed to copy text:', error)
    return false
  }
}

/**
 * Download text as file
 * @param {string} content 
 * @param {string} filename 
 * @param {string} contentType 
 */
export function downloadAsFile(content, filename, contentType = 'text/plain') {
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Parse JSON safely
 * @param {string} jsonString 
 * @param {any} defaultValue 
 * @returns {any}
 */
export function safeJsonParse(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    return defaultValue
  }
}

/**
 * Get status badge color
 * @param {string} status 
 * @returns {object}
 */
export function getStatusColor(status) {
  const colors = {
    ACTIVE: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    EXPIRED: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
    SUSPENDED: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
    PENDING: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
    CANCELLED: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' }
  }
  
  return colors[status?.toUpperCase()] || colors.PENDING
}

/**
 * Generate VPN config
 * @param {object} account 
 * @returns {string}
 */
export function generateVpnConfig(account) {
  const { protocol, username, password, domain, uuid } = account
  
  switch (protocol?.toLowerCase()) {
    case 'vmess':
      return JSON.stringify({
        v: "2",
        ps: username,
        add: domain,
        port: "443",
        id: uuid,
        aid: "0",
        scy: "auto",
        net: "ws",
        type: "none",
        host: domain,
        path: "/vmess",
        tls: "tls",
        sni: domain,
        alpn: ""
      })
      
    case 'vless':
      return `vless://${uuid}@${domain}:443?encryption=none&security=tls&sni=${domain}&type=ws&host=${domain}&path=/vless#${username}`
      
    case 'trojan':
      return `trojan://${password}@${domain}:443?security=tls&sni=${domain}&type=ws&host=${domain}&path=/trojan#${username}`
      
    case 'shadowsocks':
      const auth = btoa(`${username}:${password}`)
      return `ss://${auth}@${domain}:443#${username}`
      
    default:
      return 'Unsupported protocol'
  }
}
