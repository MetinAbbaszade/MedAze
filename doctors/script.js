document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('show');
            menuToggle.classList.toggle('active');
        });
    }

    // Doctor specialty filter functionality
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

    // Appointment booking button functionality
    const bookButtons = document.querySelectorAll('.book-btn');

    bookButtons.forEach(button => {
        button.addEventListener('click', function () {
            const doctorName = this.closest('.doctor-info') ?
                this.closest('.doctor-info').querySelector('h3').textContent :
                'the selected doctor';

            alert(`Thank you for choosing ${doctorName}. Our team will contact you shortly to schedule your appointment.`);
            // In a real application, this would open a modal or redirect to a booking form
        });
    });

    // CTA button functionality
    const ctaButton = document.querySelector('.cta-btn');

    if (ctaButton) {
        ctaButton.addEventListener('click', function () {
            alert('Our health advisors will help you find the right specialist. Please fill out the contact form or call us directly.');
            // In a real application, this would redirect to a contact page or open a form modal
        });
    }

    // Add subtle animations for doctor cards
    if (doctorCards.length) {
        doctorCards.forEach((card, index) => {
            // Stagger the animation delay for a nice effect
            card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
            card.style.opacity = '0';
        });
    }
});

// Simple CSS animation for the doctor cards
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
`);
