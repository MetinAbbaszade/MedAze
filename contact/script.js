document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        
        resetErrors();

        
        let isValid = validateForm();

        if (isValid) {

            
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';

            

            
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            
            
            
            
        }
    });

    
    nameInput.addEventListener('blur', function () {
        validateName();
    });

    emailInput.addEventListener('blur', function () {
        validateEmail();
    });

    messageInput.addEventListener('blur', function () {
        validateMessage();
    });

    
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
