import { Injectable } from '@angular/core';

export interface PWAInstallPrompt {
  prompt(): Promise<any>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private deferredPrompt: PWAInstallPrompt | null = null;
  private isInstalled = false;
  private isOnline = navigator.onLine;

  constructor() {
    this.initializePWA();
  }

  /**
   * Inicializa a PWA
   */
  private initializePWA(): void {
    // Verifica se já está instalado
    this.checkInstallationStatus();
    
    // Escuta eventos de instalação
    this.listenToInstallPrompt();
    
    // Escuta mudanças de conectividade
    this.listenToConnectivityChanges();
    
    // Registra Service Worker
    this.registerServiceWorker();
  }

  /**
   * Verifica se a PWA já está instalada
   */
  private checkInstallationStatus(): void {
    // Verifica se está rodando em modo standalone
    this.isInstalled = window.matchMedia('(display-mode: standalone)').matches ||
                      (window.navigator as any).standalone === true;
    
    // Verifica se foi adicionado à tela inicial (iOS)
    if ((window.navigator as any).standalone === true) {
      this.isInstalled = true;
    }
  }

  /**
   * Escuta o prompt de instalação
   */
  private listenToInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (e: any) => {
      console.log('📱 PWA: Prompt de instalação disponível');
      
      // Previne o prompt automático
      e.preventDefault();
      
      // Salva o prompt para uso posterior
      this.deferredPrompt = e;
      
      // Notifica que pode ser instalado
      this.notifyInstallAvailable();
    });

    // Detecta quando foi instalado
    window.addEventListener('appinstalled', () => {
      console.log('✅ PWA: Aplicativo instalado com sucesso!');
      this.isInstalled = true;
      this.deferredPrompt = null;
      this.notifyInstallSuccess();
    });
  }

  /**
   * Escuta mudanças de conectividade
   */
  private listenToConnectivityChanges(): void {
    window.addEventListener('online', () => {
      console.log('🌐 PWA: Conexão restaurada');
      this.isOnline = true;
      this.notifyConnectivityChange(true);
    });

    window.addEventListener('offline', () => {
      console.log('📡 PWA: Conexão perdida');
      this.isOnline = false;
      this.notifyConnectivityChange(false);
    });
  }

  /**
   * Registra o Service Worker
   */
  private async registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('🔧 PWA: Service Worker registrado:', registration);
        
        // Verifica atualizações
        this.checkForUpdates(registration);
        
        // Escuta mudanças no Service Worker
        this.listenToServiceWorkerChanges(registration);
        
      } catch (error) {
        console.error('❌ PWA: Erro ao registrar Service Worker:', error);
      }
    }
  }

  /**
   * Verifica atualizações do Service Worker
   */
  private checkForUpdates(registration: ServiceWorkerRegistration): void {
    registration.addEventListener('updatefound', () => {
      console.log('🔄 PWA: Nova versão disponível!');
      
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('📦 PWA: Nova versão instalada, aguardando ativação');
            this.notifyUpdateAvailable();
          }
        });
      }
    });
  }

  /**
   * Escuta mudanças no Service Worker
   */
  private listenToServiceWorkerChanges(registration: ServiceWorkerRegistration): void {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('🎯 PWA: Service Worker ativado');
      window.location.reload();
    });
  }

  /**
   * Solicita instalação da PWA
   */
  async installPWA(): Promise<boolean> {
    if (!this.deferredPrompt) {
      console.log('❌ PWA: Prompt de instalação não disponível');
      return false;
    }

    try {
      // Mostra o prompt de instalação
      this.deferredPrompt.prompt();
      
      // Aguarda a resposta do usuário
      const { outcome } = await this.deferredPrompt.userChoice;
      
      console.log(`📱 PWA: Usuário ${outcome === 'accepted' ? 'aceitou' : 'rejeitou'} a instalação`);
      
      // Limpa o prompt
      this.deferredPrompt = null;
      
      return outcome === 'accepted';
      
    } catch (error) {
      console.error('❌ PWA: Erro durante instalação:', error);
      return false;
    }
  }

  /**
   * Atualiza a PWA para nova versão
   */
  async updatePWA(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration && registration.waiting) {
          // Envia mensagem para o Service Worker ativar
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      } catch (error) {
        console.error('❌ PWA: Erro ao atualizar:', error);
      }
    }
  }

  /**
   * Solicita permissão para notificações
   */
  async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.log('❌ PWA: Notificações não suportadas');
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      return 'denied';
    }

    try {
      const permission = await Notification.requestPermission();
      console.log(`🔔 PWA: Permissão de notificação: ${permission}`);
      return permission;
    } catch (error) {
      console.error('❌ PWA: Erro ao solicitar permissão:', error);
      return 'denied';
    }
  }

  /**
   * Envia notificação push
   */
  async sendNotification(title: string, options?: NotificationOptions): Promise<void> {
    if (Notification.permission !== 'granted') {
      console.log('❌ PWA: Permissão de notificação negada');
      return;
    }

    try {
      const notification = new Notification(title, {
        icon: '/images/favicon_io/android-chrome-192x192.png',
        badge: '/images/favicon_io/favicon-32x32.png',
        ...options
      });

      // Auto-remove após 5 segundos
      setTimeout(() => {
        notification.close();
      }, 5000);

    } catch (error) {
      console.error('❌ PWA: Erro ao enviar notificação:', error);
    }
  }

  /**
   * Obtém informações da PWA
   */
  getPWAInfo() {
    return {
      isInstalled: this.isInstalled,
      isOnline: this.isOnline,
      canInstall: !!this.deferredPrompt,
      supportsPWA: 'serviceWorker' in navigator && 'PushManager' in window,
      supportsNotifications: 'Notification' in window,
      notificationPermission: 'Notification' in window ? Notification.permission : 'denied'
    };
  }

  /**
   * Notifica que a instalação está disponível
   */
  private notifyInstallAvailable(): void {
    // Pode ser usado para mostrar um banner de instalação
    window.dispatchEvent(new CustomEvent('pwa-install-available'));
  }

  /**
   * Notifica sucesso na instalação
   */
  private notifyInstallSuccess(): void {
    window.dispatchEvent(new CustomEvent('pwa-install-success'));
  }

  /**
   * Notifica que uma atualização está disponível
   */
  private notifyUpdateAvailable(): void {
    window.dispatchEvent(new CustomEvent('pwa-update-available'));
  }

  /**
   * Notifica mudança de conectividade
   */
  private notifyConnectivityChange(isOnline: boolean): void {
    window.dispatchEvent(new CustomEvent('pwa-connectivity-change', {
      detail: { isOnline }
    }));
  }

  /**
   * Limpa cache da PWA
   */
  async clearCache(): Promise<void> {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
        console.log('🗑️ PWA: Cache limpo com sucesso');
      } catch (error) {
        console.error('❌ PWA: Erro ao limpar cache:', error);
      }
    }
  }

  /**
   * Obtém tamanho do cache
   */
  async getCacheSize(): Promise<number> {
    if (!('caches' in window)) return 0;

    try {
      const cacheNames = await caches.keys();
      let totalSize = 0;

      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        
        for (const request of keys) {
          const response = await cache.match(request);
          if (response) {
            const blob = await response.blob();
            totalSize += blob.size;
          }
        }
      }

      return totalSize;
    } catch (error) {
      console.error('❌ PWA: Erro ao calcular tamanho do cache:', error);
      return 0;
    }
  }
}
