/**
 * Service Worker para Biss Solutions PWA
 * Versão: 1.0.0
 */

const CACHE_NAME = 'biss-solutions-v1.0.0';
const STATIC_CACHE = 'biss-static-v1.0.0';
const DYNAMIC_CACHE = 'biss-dynamic-v1.0.0';
const IMAGE_CACHE = 'biss-images-v1.0.0';

// Arquivos críticos para cache
const STATIC_ASSETS = [
  '/',
  '/home',
  '/company',
  '/clients',
  '/products',
  '/services',
  '/contact',
  '/about',
  '/privacy',
  '/terms',
  '/manifest.json',
  '/images/favicon_io/favicon-32x32.png',
  '/images/favicon_io/android-chrome-192x192.png',
  '/images/favicon_io/android-chrome-512x512.png'
];

// Estratégias de cache
const CACHE_STRATEGIES = {
  // Cache First - para arquivos estáticos
  CACHE_FIRST: ['css', 'js', 'woff', 'woff2', 'ttf', 'eot'],
  
  // Network First - para dados dinâmicos
  NETWORK_FIRST: ['api', 'json'],
  
  // Stale While Revalidate - para imagens
  STALE_WHILE_REVALIDATE: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
  
  // Network Only - para requests críticos
  NETWORK_ONLY: ['auth', 'login', 'payment']
};

// Instalar Service Worker
self.addEventListener('install', event => {
  console.log('🔧 Service Worker: Instalando...');
  
  event.waitUntil(
    Promise.all([
      // Cache de arquivos estáticos
      caches.open(STATIC_CACHE).then(cache => {
        console.log('📦 Cacheando arquivos estáticos...');
        return cache.addAll(STATIC_ASSETS.map(url => new Request(url, {cache: 'reload'})));
      }),
      
      // Cache de imagens críticas
      caches.open(IMAGE_CACHE).then(cache => {
        console.log('🖼️ Cacheando imagens críticas...');
        return cache.addAll([
          '/images/services/development.jpg',
          '/images/services/consulting.jpg',
          '/images/services/analytics.jpg',
          '/images/services/cloud.jpg',
          '/images/logo-tech-azul.png'
        ]);
      })
    ]).then(() => {
      console.log('✅ Service Worker: Instalação concluída!');
      // Força ativação imediata
      return self.skipWaiting();
    })
  );
});

// Ativar Service Worker
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker: Ativando...');
  
  event.waitUntil(
    Promise.all([
      // Limpa caches antigos
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('🗑️ Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Assume controle de todas as abas
      self.clients.claim()
    ]).then(() => {
      console.log('✅ Service Worker: Ativação concluída!');
    })
  );
});

// Interceptar requests
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Ignora requests não-HTTP
  if (!request.url.startsWith('http')) return;
  
  // Estratégia baseada no tipo de arquivo
  const fileExtension = getFileExtension(url.pathname);
  const strategy = getCacheStrategy(fileExtension, url.pathname);
  
  event.respondWith(handleRequest(request, strategy));
});

// Determinar estratégia de cache
function getCacheStrategy(extension, pathname) {
  if (CACHE_STRATEGIES.NETWORK_ONLY.some(type => pathname.includes(type))) {
    return 'NETWORK_ONLY';
  }
  
  if (CACHE_STRATEGIES.CACHE_FIRST.includes(extension)) {
    return 'CACHE_FIRST';
  }
  
  if (CACHE_STRATEGIES.NETWORK_FIRST.some(type => pathname.includes(type))) {
    return 'NETWORK_FIRST';
  }
  
  if (CACHE_STRATEGIES.STALE_WHILE_REVALIDATE.includes(extension)) {
    return 'STALE_WHILE_REVALIDATE';
  }
  
  // Padrão: Network First
  return 'NETWORK_FIRST';
}

// Obter extensão do arquivo
function getFileExtension(pathname) {
  return pathname.split('.').pop().toLowerCase();
}

// Gerenciar requests baseado na estratégia
async function handleRequest(request, strategy) {
  try {
    switch (strategy) {
      case 'CACHE_FIRST':
        return await cacheFirst(request);
      
      case 'NETWORK_FIRST':
        return await networkFirst(request);
      
      case 'STALE_WHILE_REVALIDATE':
        return await staleWhileRevalidate(request);
      
      case 'NETWORK_ONLY':
        return await fetch(request);
      
      default:
        return await networkFirst(request);
    }
  } catch (error) {
    console.error('❌ Erro no Service Worker:', error);
    return await getOfflineFallback(request);
  }
}

// Estratégia: Cache First
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    const cache = await getCache(request);
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Estratégia: Network First
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await getCache(request);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Estratégia: Stale While Revalidate
async function staleWhileRevalidate(request) {
  const cache = await getCache(request);
  const cachedResponse = await cache.match(request);
  
  // Busca nova versão em background
  const networkResponsePromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  });
  
  // Retorna cache imediatamente se disponível
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Senão, aguarda a rede
  return await networkResponsePromise;
}

// Obter cache apropriado
async function getCache(request) {
  const url = new URL(request.url);
  const extension = getFileExtension(url.pathname);
  
  if (CACHE_STRATEGIES.STALE_WHILE_REVALIDATE.includes(extension)) {
    return await caches.open(IMAGE_CACHE);
  }
  
  if (url.pathname.startsWith('/api/') || url.pathname.endsWith('.json')) {
    return await caches.open(DYNAMIC_CACHE);
  }
  
  return await caches.open(STATIC_CACHE);
}

// Fallback offline
async function getOfflineFallback(request) {
  const url = new URL(request.url);
  
  // Página offline para navegação
  if (request.destination === 'document') {
    return new Response(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <title>Offline - Biss Solutions</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0; padding: 40px 20px; text-align: center; background: #f8fafc;
          }
          .offline-container { 
            max-width: 500px; margin: 0 auto; background: white; 
            padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .offline-icon { 
            font-size: 64px; margin-bottom: 20px; color: #6b7280;
          }
          h1 { color: #1f2937; margin-bottom: 16px; }
          p { color: #6b7280; margin-bottom: 24px; line-height: 1.6; }
          .retry-btn { 
            background: #2563eb; color: white; border: none; 
            padding: 12px 24px; border-radius: 8px; font-size: 16px; 
            cursor: pointer; transition: background 0.2s;
          }
          .retry-btn:hover { background: #1d4ed8; }
        </style>
      </head>
      <body>
        <div class="offline-container">
          <div class="offline-icon">📡</div>
          <h1>Você está offline</h1>
          <p>Parece que você perdeu a conexão com a internet. Verifique sua conexão e tente novamente.</p>
          <button class="retry-btn" onclick="window.location.reload()">Tentar Novamente</button>
        </div>
      </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
  
  // Imagem placeholder para imagens
  if (request.destination === 'image') {
    return new Response(`
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif">
          Imagem Offline
        </text>
      </svg>
    `, {
      headers: { 'Content-Type': 'image/svg+xml' }
    });
  }
  
  // Fallback genérico
  return new Response('Recurso offline', { status: 503 });
}

// Notificações push
self.addEventListener('push', event => {
  console.log('📨 Push notification recebida:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação da Biss Solutions',
    icon: '/images/favicon_io/android-chrome-192x192.png',
    badge: '/images/favicon_io/favicon-32x32.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Detalhes',
        icon: '/images/favicon_io/favicon-32x32.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/images/favicon_io/favicon-32x32.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Biss Solutions', options)
  );
});

// Click em notificação
self.addEventListener('notificationclick', event => {
  console.log('🔔 Notificação clicada:', event);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Apenas fecha a notificação
  } else {
    // Click no corpo da notificação
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Mensagens do cliente
self.addEventListener('message', event => {
  console.log('💬 Mensagem recebida:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('🎉 Service Worker carregado!');
