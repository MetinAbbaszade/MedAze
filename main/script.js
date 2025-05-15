
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', function () {
        menu.classList.toggle('active');
        
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.classList.toggle('active');
        });
    });

    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.classList.remove('active');
                });
            }

            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            
            document.querySelectorAll('.menu a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    
    const testimonials = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (testimonials && prevBtn && nextBtn) {
        const testimonialWidth = document.querySelector('.testimonial').offsetWidth + 20; margin

        nextBtn.addEventListener('click', function () {
            testimonials.scrollBy({
                left: testimonialWidth,
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', function () {
            testimonials.scrollBy({
                left: -testimonialWidth,
                behavior: 'smooth'
            });
        });
    }

    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    
    // const animateElements = document.querySelectorAll('.service-card, .feature, .testimonial');
    // animateElements.forEach(el => {
    //     el.style.opacity = '0';
    //     el.style.transform = 'translateY(20px)';
    //     el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    //     observer.observe(el);
    // });

    
    // document.addEventListener('scroll', function () {
    //     animateElements.forEach(el => {
    //         if (isInViewport(el) && !el.classList.contains('animate')) {
    //             el.classList.add('animate');
    //             el.style.opacity = '1';
    //             el.style.transform = 'translateY(0)';
    //         }
    //     });
    // });

    
    // function isInViewport(element) {
    //     const rect = element.getBoundingClientRect();
    //     return (
    //         rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    //         rect.bottom >= 0
    //     );
    // }

    
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY + 100; 

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseover', function () {
            this.style.transform = 'translateY(-3px)';
        });

        ctaButton.addEventListener('mouseout', function () {
            this.style.transform = 'translateY(0)';
        });
    }
});
