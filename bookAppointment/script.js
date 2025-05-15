document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('appointment-form');
    const successMessage = document.getElementById('success-message');
    const closeSuccessBtn = document.getElementById('close-success');
    const loadingSpinner = document.getElementById('loading-spinner');

    
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointmentDate').min = today;

    
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateForm()) {
            submitForm();
        }
    });

    
    closeSuccessBtn.addEventListener('click', function () {
        successMessage.classList.add('hidden');
    });

    
    function validateForm() {
        let isValid = true;

        
        const fullName = document.getElementById('fullName');
        const fullNameError = document.getElementById('fullName-error');

        if (fullName.value.trim() === '') {
            fullNameError.textContent = 'Please enter your full name';
            isValid = false;
        } else if (fullName.value.trim().length < 3) {
            fullNameError.textContent = 'Name must be at least 3 characters long';
            isValid = false;
        } else {
            fullNameError.textContent = '';
        }

        
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phone-error');
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

        if (phone.value.trim() === '') {
            phoneError.textContent = 'Please enter your phone number';
            isValid = false;
        } else if (!phoneRegex.test(phone.value.trim())) {
            phoneError.textContent = 'Please enter a valid phone number';
            isValid = false;
        } else {
            phoneError.textContent = '';
        }

        
        const email = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.value.trim() !== '' && !emailRegex.test(email.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        
        const date = document.getElementById('appointmentDate');
        const time = document.getElementById('appointmentTime');
        const dateError = document.getElementById('date-error');
        const timeError = document.getElementById('time-error');

        if (date.value === '') {
            dateError.textContent = 'Please select a date';
            isValid = false;
        } else {
            dateError.textContent = '';
        }

        if (time.value === '') {
            timeError.textContent = 'Please select a time';
            isValid = false;
        } else {
            timeError.textContent = '';
        }

        return isValid;
    }

    
    function submitForm() {
        
        loadingSpinner.classList.remove('hidden');

        
        setTimeout(function () {
            
            loadingSpinner.classList.add('hidden');

            
            successMessage.classList.remove('hidden');

            
            form.reset();

        }, 1500); call
    }

    
    document.getElementById('fullName').addEventListener('input', function () {
        const fullNameError = document.getElementById('fullName-error');
        if (this.value.trim().length >= 3) {
            fullNameError.textContent = '';
        }
    });

    document.getElementById('phone').addEventListener('input', function () {
        const phoneError = document.getElementById('phone-error');
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (phoneRegex.test(this.value.trim())) {
            phoneError.textContent = '';
        }
    });

    document.getElementById('email').addEventListener('input', function () {
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value.trim() === '' || emailRegex.test(this.value.trim())) {
            emailError.textContent = '';
        }
    });
});
