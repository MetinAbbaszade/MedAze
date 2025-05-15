document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function () {
            navList.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    });

    // Add scroll animation for elements
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.service-card, .pricing-table, .doctor-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };

    // Add animation class to CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .service-card, .pricing-table, .doctor-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animated, .pricing-table.animated, .doctor-card.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Run animation check on scroll and on load
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once at load
});
