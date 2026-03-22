document.addEventListener('DOMContentLoaded', () => {
    // Screen Management
    const navItems = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.screen');

    function switchScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove('active');
            if (screen.id === screenId) {
                screen.classList.add('active');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-screen') === screenId) {
                item.classList.add('active');
            }
        });

        // Reset scroll position
        window.scrollTo(0, 0);
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const screenId = item.getAttribute('data-screen');
            switchScreen(screenId);
        });
    });

    // Theme Engine Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeToggle.innerHTML = isLight ? '<span>DARK_MODE</span>' : '<span>LIGHT_MODE</span>';
        });
    }

    // 3D Tilt Effect for Cards
    function applyTilt() {
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                // Special handling for store cards which have a base rotation
                const isStoreCard = card.classList.contains('store-card');
                const baseRotateY = isStoreCard ? -15 : 0;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${baseRotateY + rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                const isStoreCard = card.classList.contains('store-card');
                const baseRotateY = isStoreCard ? -15 : 0;
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(${baseRotateY}deg) translateY(0)`;
            });
        });
    }
    applyTilt();

    // Initialize Primal Core (Three.js or CSS 3D)
    initPrimalCore();
});

function initPrimalCore() {
    const container = document.getElementById('primal-core-container');
    if (!container) return;

    // Simple CSS 3D Crystal for now (can be upgraded to Three.js)
    const crystal = document.createElement('div');
    crystal.className = 'primal-crystal';
    crystal.innerHTML = `
        <div class="face front"></div>
        <div class="face back"></div>
        <div class="face left"></div>
        <div class="face right"></div>
        <div class="face top"></div>
        <div class="face bottom"></div>
    `;
    container.appendChild(crystal);
}
