// Gestion du thème clair/sombre
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Vérifier si un thème est déjà enregistré
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateToggleButton(savedTheme);
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', '');
        updateToggleButton('');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
        updateToggleButton('dark-theme');
    }
});

function updateToggleButton(theme) {
    const themeIcon = themeToggle.querySelector('.theme-icon');
    if (theme === 'dark-theme') {
        themeIcon.textContent = '☀️';
        themeToggle.innerHTML = '<span class="theme-icon">☀️</span> Mode Clair';
    } else {
        themeIcon.textContent = '🌙';
        themeToggle.innerHTML = '<span class="theme-icon">🌙</span> Mode Sombre';
    }
}

// Animation au survol des cartes
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 15px 30px var(--shadow-color)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 15px var(--shadow-color)';
    });
});

// Animation des boutons "Ajouter au panier"
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Animation de clic
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Message de confirmation
        const productTitle = this.closest('.product-card').querySelector('.product-title').textContent;
        showNotification(`${productTitle} a été ajouté au panier !`);
    });
});

// Animation des boutons "Voir détails"
const viewDetailsButtons = document.querySelectorAll('.view-details');

viewDetailsButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation(); // Empêche la propagation de l'événement
        const productTitle = this.closest('.product-card').querySelector('.product-title').textContent;
        showNotification(`Ouverture des détails pour ${productTitle}`);
    });
});

// Fonction pour afficher une notification
function showNotification(message) {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--accent-color);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Animation de sortie après 3 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Effet de fondu au chargement de la page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});