// Condição serviceWorker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(() => console.log('Service Worker registrado com sucesso!')).catch(error => console.error('Erro ao registrar o service Worker: ', error));
}

// Animação de loading com tela se abrindo
window.addEventListener("load", () => {
  const overlay = document.getElementById("loading-overlay");
  if (overlay) {
    // Inicia a animação após um pequeno atraso
    setTimeout(() => {
      overlay.classList.add("open");
      setTimeout(() => {
        overlay.remove();
      }, 800); // Duração da animação + segurança
    }, 1500);
  }
});

// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const navbar = document.querySelector('.navbar');

// Alternar o menu no mobile
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Mudança de cor da navbar ao rolar a página
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Fecha o menu mobile quando o mouse sai de cima dele
menu.addEventListener('mouseleave', () => {
    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Função para fechar todos os modais
function fecharModais() {
    const modais = document.querySelectorAll('.modal');
    modais.forEach(modal => {
        modal.style.display = 'none';
    });
}

// Função para abrir o modal específico
function abrirModal(id) {
    fecharModais();  // Fecha todos os modais primeiro
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'flex'; // Exibe o modal selecionado
    }
}

// Adicionando os eventos para abrir os modais
document.querySelectorAll('.menu a').forEach(item => {
    item.addEventListener('click', (event) => {
        // Extrair o ID do modal a partir do atributo 'onclick'
        const modalId = event.target.getAttribute('onclick').split("'")[1];
        abrirModal(modalId);
        
        // Fechar o menu após o clique em um item
        if (window.innerWidth <= 768) {  // Fechar o menu apenas em telas pequenas
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Fechar o modal ao clicar fora
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {  // Fechar apenas se clicar fora do conteúdo do modal
            modal.style.display = 'none';
        }
    });
});


