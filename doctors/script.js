document.addEventListener('DOMContentLoaded', function () {
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('show');
            menuToggle.classList.toggle('active');
        });
    }

    
    const specialtyFilter = document.getElementById('specialty-filter');
    const doctorCards = document.querySelectorAll('.doctor-card');

    if (specialtyFilter && doctorCards.length) {
        specialtyFilter.addEventListener('change', function () {
            const selectedSpecialty = this.value;

            doctorCards.forEach(card => {
                if (selectedSpecialty === 'all' || card.dataset.specialty === selectedSpecialty) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    
    const bookButtons = document.querySelectorAll('.book-btn');

    bookButtons.forEach(button => {
        button.addEventListener('click', function () {
            const doctorName = this.closest('.doctor-info') ?
                this.closest('.doctor-info').querySelector('h3').textContent :
                'the selected doctor';

            alert(`Thank you for choosing ${doctorName}. Our team will contact you shortly to schedule your appointment.`);

        });
    });

    
    const ctaButton = document.querySelector('.cta-btn');

    if (ctaButton) {
        ctaButton.addEventListener('click', function () {
            alert('Our health advisors will help you find the right specialist. Please fill out the contact form or call us directly.');
    
        });
    }

    
    if (doctorCards.length) {
        doctorCards.forEach((card, index) => {
            
            card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
            card.style.opacity = '0';
        });
    }
});


document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
`);
