/**
 * Configuração da URL da API
 */
export const API_CONFIG = {
  baseUrl: {
    local: 'http://localhost:5023',
    production: 'https://api.biss.com.br'
  },
  get apiUrl(): string {
    // Em produção, usar a URL de produção, caso contrário usar local
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'biss.com.br' || hostname === 'www.biss.com.br') {
        return this.baseUrl.production;
      }
    }
    return this.baseUrl.local;
  }
};

