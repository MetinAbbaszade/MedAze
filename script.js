document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Book appointment button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function () {
            // This could open a modal, redirect to a form, etc.
            alert('Thank you for your interest! Our appointment form will open shortly.');
            // In a real app, you might redirect to a booking page:
            // window.location.href = 'booking.html';
        });
    }
});
