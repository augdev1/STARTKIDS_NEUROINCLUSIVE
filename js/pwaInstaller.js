/* ==========================================================================
   INSTALADOR PWA - STARKIDS
   Permite instalar o app nativamente no Android, iPhone/iPad e Windows/Mac
   com 1 clique, sem precisar de Play Store.
   ========================================================================== */

let deferredPrompt = null;

export function initPWA() {
  // Verifica se o aplicativo já está rodando em modo instalado (Standalone PWA)
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  if (isStandalone) {
    hideInstallButtons();
  } else {
    // No navegador (PC ou celular), exibe o botão de instalação para facilitar acesso rápido
    showInstallButtons();
  }

  // 1. Registra e atualiza o Service Worker imediatamente
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          console.log('📲 [PWA] Service Worker registrado com sucesso:', reg.scope);
          reg.update();
        })
        .catch((err) => {
          console.warn('⚠️ [PWA] Falha ao registrar Service Worker:', err.message);
        });
    });

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        console.log('🔄 [PWA] Nova versão detectada! Atualizando aplicativo...');
        window.location.reload();
      }
    });
  }

  // 2. Captura o evento nativo de instalação do navegador
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallButtons();
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    hideInstallButtons();
    console.log('🎉 [PWA] StartKids instalado com sucesso no dispositivo!');
  });
}

function showInstallButtons() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (isStandalone) return;

  const installButtons = document.querySelectorAll('.btn-install-pwa');
  installButtons.forEach(btn => {
    btn.style.display = 'flex';
    btn.onclick = async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('User aceitou a instalação do StartKids');
          hideInstallButtons();
        }
        deferredPrompt = null;
        return;
      }

      // Detecção amigável de plataforma para instrução clara
      const ua = navigator.userAgent || '';
      const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const isAndroid = /Android/.test(ua);

      if (isIOS) {
        alert('📲 Para instalar no iPhone ou iPad:\n\n1. Toque no botão de Compartilhar (ícone com seta para cima ⎋)\n2. Role um pouco para baixo e escolha "Adicionar à Tela de Início"\n3. Toque em "Adicionar" no canto superior.');
      } else if (isAndroid) {
        alert('📲 Para instalar no celular Android:\n\n1. Toque nos 3 pontinhos (menu) do navegador no topo\n2. Selecione "Instalar aplicativo" ou "Adicionar à tela inicial".');
      } else {
        alert('💻 Para instalar no Computador (Acesso Rápido):\n\n1. Olhe na barra de endereços do seu navegador (onde fica o link do site)\n2. No canto direito da barra, clique no ícone de instalar (computador com setinha ou ⊕)\n3. Confirme em "Instalar" para ter o app na sua área de trabalho!');
      }
    };
  });
  const wrapper = document.getElementById('pwaInstallHubWrapper');
  if (wrapper) wrapper.style.display = 'flex';
}

function hideInstallButtons() {
  const installButtons = document.querySelectorAll('.btn-install-pwa');
  installButtons.forEach(btn => {
    btn.style.display = 'none';
  });
  const wrapper = document.getElementById('pwaInstallHubWrapper');
  if (wrapper) wrapper.style.display = 'none';
}

// Inicializa automaticamente se chamado
initPWA();
