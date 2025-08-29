// ===== SERVICE WORKER - AGENDA DA ISADORA =====

const CACHE_NAME = 'agenda-isadora-v1.0.0';
const STATIC_CACHE_NAME = 'agenda-isadora-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'agenda-isadora-dynamic-v1.0.0';

// Arquivos essenciais para cache
const STATIC_FILES = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json'
];

// Arquivos que podem ser cacheados dinamicamente
const CACHEABLE_EXTENSIONS = [
  '.html',
  '.css',
  '.js',
  '.json',
  '.svg',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot'
];

// ===== INSTALAÇÃO DO SERVICE WORKER =====
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cache estático aberto');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('[SW] Arquivos estáticos cacheados com sucesso');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Erro ao cachear arquivos estáticos:', error);
      })
  );
});

// ===== ATIVAÇÃO DO SERVICE WORKER =====
self.addEventListener('activate', (event) => {
  console.log('[SW] Ativando Service Worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Remove caches antigos
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName.startsWith('agenda-isadora-')) {
              console.log('[SW] Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker ativado e caches limpos');
        return self.clients.claim();
      })
      .catch((error) => {
        console.error('[SW] Erro na ativação:', error);
      })
  );
});

// ===== INTERCEPTAÇÃO DE REQUISIÇÕES =====
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Ignorar requisições não HTTP/HTTPS
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Ignorar requisições para outros domínios (exceto recursos essenciais)
  if (url.origin !== location.origin && !isEssentialExternalResource(url)) {
    return;
  }
  
  // Estratégia Cache First para arquivos estáticos
  if (isStaticFile(request.url)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // Estratégia Network First para o HTML principal
  if (request.destination === 'document') {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // Estratégia Stale While Revalidate para outros recursos
  event.respondWith(staleWhileRevalidate(request));
});

// ===== ESTRATÉGIAS DE CACHE =====

// Cache First - Prioriza o cache, fallback para rede
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Servindo do cache:', request.url);
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
      console.log('[SW] Cacheado da rede:', request.url);
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Erro em cacheFirst:', error);
    return getOfflineFallback(request);
  }
}

// Network First - Prioriza a rede, fallback para cache
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
      console.log('[SW] Atualizado da rede:', request.url);
      return networkResponse;
    }
  } catch (error) {
    console.log('[SW] Rede falhou, tentando cache:', request.url);
  }
  
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    console.log('[SW] Servindo do cache (offline):', request.url);
    return cachedResponse;
  }
  
  return getOfflineFallback(request);
}

// Stale While Revalidate - Serve do cache e atualiza em background
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  const networkResponsePromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        const cache = caches.open(DYNAMIC_CACHE_NAME);
        cache.then(c => c.put(request, networkResponse.clone()));
      }
      return networkResponse;
    })
    .catch(() => null);
  
  return cachedResponse || networkResponsePromise || getOfflineFallback(request);
}

// ===== FUNÇÕES AUXILIARES =====

// Verifica se é um arquivo estático
function isStaticFile(url) {
  return STATIC_FILES.some(file => url.endsWith(file)) ||
         CACHEABLE_EXTENSIONS.some(ext => url.includes(ext));
}

// Verifica se é um recurso externo essencial
function isEssentialExternalResource(url) {
  const essentialDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'cdn.jsdelivr.net'
  ];
  
  return essentialDomains.some(domain => url.hostname.includes(domain));
}

// Retorna fallback para quando offline
async function getOfflineFallback(request) {
  if (request.destination === 'document') {
    const cachedIndex = await caches.match('/index.html');
    if (cachedIndex) {
      return cachedIndex;
    }
  }
  
  // Fallback SVG para imagens
  if (request.destination === 'image') {
    return new Response(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="#f0f0f0"/>
        <text x="100" y="100" text-anchor="middle" font-size="16" fill="#999">
          Offline
        </text>
      </svg>`,
      {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'no-cache'
        }
      }
    );
  }
  
  // Resposta genérica offline
  return new Response(
    JSON.stringify({
      error: 'Recurso não disponível offline',
      message: 'Verifique sua conexão com a internet'
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    }
  );
}

// ===== GERENCIAMENTO DE CACHE =====

// Limpa caches antigos periodicamente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAN_CACHE') {
    cleanOldCaches();
  }
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

async function cleanOldCaches() {
  try {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
      name.startsWith('agenda-isadora-') && 
      name !== STATIC_CACHE_NAME && 
      name !== DYNAMIC_CACHE_NAME
    );
    
    await Promise.all(oldCaches.map(name => caches.delete(name)));
    console.log('[SW] Caches antigos removidos:', oldCaches);
  } catch (error) {
    console.error('[SW] Erro ao limpar caches:', error);
  }
}

// ===== SINCRONIZAÇÃO EM BACKGROUND =====

// Registra para sincronização quando voltar online
self.addEventListener('sync', (event) => {
  console.log('[SW] Evento de sincronização:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Aqui você pode implementar sincronização de dados
    // Por exemplo, enviar dados salvos localmente para um servidor
    console.log('[SW] Executando sincronização em background...');
    
    // Notificar o app principal sobre a sincronização
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'BACKGROUND_SYNC_COMPLETE',
        timestamp: Date.now()
      });
    });
  } catch (error) {
    console.error('[SW] Erro na sincronização:', error);
  }
}

// ===== NOTIFICAÇÕES PUSH =====

// Manipula notificações push (para futuras implementações)
self.addEventListener('push', (event) => {
  console.log('[SW] Notificação push recebida');
  
  const options = {
    body: 'Você tem novas tarefas para hoje!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-96.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Tarefas',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icons/xmark.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Agenda da Isadora', options)
  );
});

// Manipula cliques em notificações
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Clique em notificação:', event.action);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// ===== ATUALIZAÇÕES DO APP =====

// Detecta atualizações disponíveis
self.addEventListener('updatefound', () => {
  console.log('[SW] Atualização encontrada');
  
  const newWorker = self.registration.installing;
  
  newWorker.addEventListener('statechange', () => {
    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
      // Nova versão disponível
      console.log('[SW] Nova versão instalada');
      
      // Notificar o app principal
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'UPDATE_AVAILABLE',
            message: 'Nova versão disponível! Recarregue a página para atualizar.'
          });
        });
      });
    }
  });
});

// ===== LOGS E DEBUGGING =====

// Log de informações do Service Worker
console.log('[SW] Service Worker da Agenda da Isadora carregado');
console.log('[SW] Cache estático:', STATIC_CACHE_NAME);
console.log('[SW] Cache dinâmico:', DYNAMIC_CACHE_NAME);
console.log('[SW] Arquivos estáticos:', STATIC_FILES);

// Função para debug (pode ser chamada via DevTools)
self.debugSW = {
  getCacheNames: () => caches.keys(),
  getCacheContents: (cacheName) => {
    return caches.open(cacheName).then(cache => cache.keys());
  },
  clearAllCaches: () => {
    return caches.keys().then(names => 
      Promise.all(names.map(name => caches.delete(name)))
    );
  },
  getStats: () => {
    return {
      cacheName: CACHE_NAME,
      staticCache: STATIC_CACHE_NAME,
      dynamicCache: DYNAMIC_CACHE_NAME,
      staticFiles: STATIC_FILES.length,
      timestamp: new Date().toISOString()
    };
  }
};

// Expor funções de debug globalmente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'DEBUG') {
    const { method, args = [] } = event.data;
    
    if (self.debugSW[method]) {
      Promise.resolve(self.debugSW[method](...args))
        .then(result => {
          event.ports[0].postMessage({ success: true, result });
        })
        .catch(error => {
          event.ports[0].postMessage({ success: false, error: error.message });
        });
    } else {
      event.ports[0].postMessage({ 
        success: false, 
        error: `Método ${method} não encontrado` 
      });
    }
  }
});

// ===== TRATAMENTO DE ERROS =====

self.addEventListener('error', (event) => {
  console.error('[SW] Erro no Service Worker:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('[SW] Promise rejeitada:', event.reason);
  event.preventDefault();
});

// ===== LIMPEZA AUTOMÁTICA =====

// Limpa cache dinâmico quando fica muito grande
setInterval(async () => {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const keys = await cache.keys();
    
    // Se tiver mais de 50 itens, remove os mais antigos
    if (keys.length > 50) {
      const itemsToDelete = keys.slice(0, keys.length - 40);
      await Promise.all(itemsToDelete.map(key => cache.delete(key)));
      console.log('[SW] Cache dinâmico limpo:', itemsToDelete.length, 'itens removidos');
    }
  } catch (error) {
    console.error('[SW] Erro na limpeza automática:', error);
  }
}, 60000); // A cada minuto