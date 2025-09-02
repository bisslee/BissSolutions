// Service Worker para Biss Solutions
// Versão: 1.0.0
// Cache: v1

const CACHE_NAME = 'biss-solutions-v1';
const STATIC_CACHE = 'biss-static-v1';
const DYNAMIC_CACHE = 'biss-dynamic-v1';

// URLs para cache estático
const STATIC_URLS = [
  '/',
  '/home',
  '/servicos',
  '/empresa',
  '/contato',
  '/clients',
  '/offline.html',
  '/favicon.ico',
  '/images/logo-tech-azul.png',
  '/images/logo-tech-cinza.png',
  '/images/logo-biss-white.png',
  '/images/logo-biss.png',
  '/images/LogoBissSolutionBranco.png'
];

// Recursos para cache estático
const STATIC_RESOURCES = [
  '/assets/',
  '/images/',
  '/fonts/',
  'https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Estratégias de cache
const CACHE_STRATEGIES = {
  // Cache First para recursos estáticos
  STATIC_FIRST: 'static-first',
  // Network First para páginas dinâmicas
  NETWORK_FIRST: 'network-first',
  // Stale While Revalidate para recursos importantes
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Service Worker instalando...');

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Cache estático aberto');
        return cache.addAll(STATIC_URLS);
      })
      .then(() => {
        console.log('[SW] Recursos estáticos em cache');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Erro ao instalar cache estático:', error);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker ativando...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker ativado');
        return self.clients.claim();
      })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Pular requisições não-GET
  if (request.method !== 'GET') {
    return;
  }

  // Pular requisições para APIs externas
  if (url.hostname !== self.location.hostname && !url.hostname.includes('cdn')) {
    return;
  }

  // Estratégia baseada no tipo de recurso
  if (isStaticResource(request)) {
    event.respondWith(staticFirstStrategy(request));
  } else if (isPageRequest(request)) {
    event.respondWith(networkFirstStrategy(request));
  } else {
    event.respondWith(staleWhileRevalidateStrategy(request));
  }
});

// Estratégia: Cache First para recursos estáticos
async function staticFirstStrategy(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Erro na estratégia static-first:', error);
    return new Response('Erro ao carregar recurso', { status: 500 });
  }
}

// Estratégia: Network First para páginas
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Rede indisponível, tentando cache:', error);

    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fallback para página offline
    if (request.destination === 'document') {
      return caches.match('/offline.html');
    }

    return new Response('Conteúdo não disponível offline', { status: 503 });
  }
}

// Estratégia: Stale While Revalidate
async function staleWhileRevalidateStrategy(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);

    // Retorna cache imediatamente se disponível
    const fetchPromise = fetch(request).then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    });

    return cachedResponse || fetchPromise;
  } catch (error) {
    console.error('[SW] Erro na estratégia stale-while-revalidate:', error);
    return new Response('Erro ao carregar recurso', { status: 500 });
  }
}

// Verifica se é um recurso estático
function isStaticResource(request) {
  return STATIC_RESOURCES.some(resource =>
    request.url.includes(resource) ||
    request.url.includes('.css') ||
    request.url.includes('.js') ||
    request.url.includes('.png') ||
    request.url.includes('.jpg') ||
    request.url.includes('.jpeg') ||
    request.url.includes('.gif') ||
    request.url.includes('.svg') ||
    request.url.includes('.ico') ||
    request.url.includes('.woff') ||
    request.url.includes('.woff2') ||
    request.url.includes('.ttf')
  );
}

// Verifica se é uma requisição de página
function isPageRequest(request) {
  return request.destination === 'document' ||
         request.mode === 'navigate' ||
         request.url.includes(self.location.origin);
}

// Background Sync para funcionalidades offline
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);

  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Função de sincronização em background
async function doBackgroundSync() {
  try {
    // Aqui você pode implementar sincronização de dados
    // como envio de formulários offline, etc.
    console.log('[SW] Sincronização em background executada');
  } catch (error) {
    console.error('[SW] Erro na sincronização:', error);
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification recebida');

  const options = {
    body: event.data ? event.data.text() : 'Nova notificação da Biss Solutions',
    icon: '/images/logo-tech-azul.png',
    badge: '/images/logo-tech-azul.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver mais',
        icon: '/images/logo-tech-azul.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/images/logo-tech-azul.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Biss Solutions', options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notificação clicada:', event.notification.tag);

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Mensagens do app principal
self.addEventListener('message', (event) => {
  console.log('[SW] Mensagem recebida:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: '1.0.0' });
  }
});

console.log('[SW] Service Worker carregado');
