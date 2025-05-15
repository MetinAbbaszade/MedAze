document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // Form validation elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // Form submission handler
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Reset error states
        resetErrors();

        // Validate form
        let isValid = validateForm();

        if (isValid) {
            // In a real application, you would send the form data to the server here
            // For this example, we'll just show the success message

            // Hide the form and show success message
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';

            // Optional: Reset the form (if you want to allow multiple submissions)
            // contactForm.reset();

            // Optional: Scroll to the success message
            successMessage.scrollIntoView({ behavior: 'smooth' });

            // Optional: Reset the form and hide success message after a delay
            // setTimeout(() => {
            //     contactForm.style.display = 'block';
            //     successMessage.style.display = 'none';
            //     contactForm.reset();
            // }, 5000);
        }
    });

    // Input validation on blur
    nameInput.addEventListener('blur', function () {
        validateName();
    });

    emailInput.addEventListener('blur', function () {
        validateEmail();
    });

    messageInput.addEventListener('blur', function () {
        validateMessage();
    });

    // Validation functions
    function validateForm() {
        let isNameValid = validateName();
        let isEmailValid = validateEmail();
        let isMessageValid = validateMessage();

        return isNameValid && isEmailValid && isMessageValid;
    }

    function validateName() {
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Please enter your name');
            return false;
        }

        hideError(nameInput, nameError);
        return true;
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Please enter your email address');
            return false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        }

        hideError(emailInput, emailError);
        return true;
    }

    function validateMessage() {
        if (messageInput.value.trim() === '') {
            showError(messageInput, messageError, 'Please enter your message');
            return false;
        }

        hideError(messageInput, messageError);
        return true;
    }

    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function hideError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    function resetErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const inputs = document.querySelectorAll('input, textarea');

        errorElements.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });

        inputs.forEach(input => {
            input.classList.remove('error');
        });
    }
});
