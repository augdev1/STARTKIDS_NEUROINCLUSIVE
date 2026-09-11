/* ==========================================================================
   INSTALADOR PWA - STARKIDS
   Permite instalar o app nativamente no Android, iPhone/iPad e Windows/Mac
   com 1 clique, sem precisar de Play Store.
   ========================================================================== */

let deferredPrompt = null;

export function initPWA() {
  // 1. Registra e atualiza o Service Worker imediatamente
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          console.log('📲 [PWA] Service Worker registrado com sucesso:', reg.scope);
          // Força verificação imediata de nova versão no servidor
          reg.update();
        })
        .catch((err) => {
          console.warn('⚠️ [PWA] Falha ao registrar Service Worker:', err.message);
        });
    });

    // Quando uma nova versão do Service Worker for ativada, recarrega para aplicar jogos novos
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        console.log('🔄 [PWA] Nova versão detectada! Atualizando aplicativo...');
        window.location.reload();
      }
    });
  }

  // 2. Captura o evento de instalação do navegador
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
  const installButtons = document.querySelectorAll('.btn-install-pwa');
  installButtons.forEach(btn => {
    btn.style.display = 'inline-flex';
    btn.onclick = async () => {
      if (!deferredPrompt) {
        alert('Para instalar no iPhone ou iPad:\n1. Toque no botão de Compartilhar (ícone com seta para cima)\n2. Selecione "Adicionar à Tela de Início" 📲');
        return;
      }
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User aceitou a instalação do StartKids');
      }
      deferredPrompt = null;
      hideInstallButtons();
    };
  });
}

function hideInstallButtons() {
  const installButtons = document.querySelectorAll('.btn-install-pwa');
  installButtons.forEach(btn => {
    btn.style.display = 'none';
  });
}

// Inicializa automaticamente se chamado
initPWA();
