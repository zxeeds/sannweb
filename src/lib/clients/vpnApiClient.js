export class VpnApiClient {
  constructor(apiUrl, apiKey) {
    this.apiUrl = apiUrl
    this.apiKey = apiKey
  }

  async testConnection() {
    try {
      // Simple ping test
      const response = await fetch(`${this.apiUrl}/ping`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000
      })
      
      return response.ok
    } catch (error) {
      console.error('API Connection test failed:', error)
      return false
    }
  }

  async createAccount(data) {
    // Implementation untuk create VPN account
    const response = await fetch(`${this.apiUrl}/accounts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    
    return response.json()
  }
}
