document.addEventListener('DOMContentLoaded', function () {
    const userData = {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1 (555) 123-4567",
        dateOfBirth: "1985-04-12",
        lastLogin: "July 15, 2025 at 09:45 AM",
        username: "user@example.com",
        password: "password123"
    };

    
    const loginContainer = document.getElementById('loginContainer');
    const dashboardContainer = document.getElementById('dashboardContainer');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const lastLoginTime = document.getElementById('lastLoginTime');
    const navTabs = document.querySelectorAll('.nav-tabs li');
    const dashboardTabs = document.querySelectorAll('.dashboard-tab');
    const profileForm = document.getElementById('profileForm');
    const passwordForm = document.getElementById('passwordForm');
    const toast = document.getElementById('toast');

   
    function checkAuth() {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            showDashboard();
        }
    }

    
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault()
            window.location.href = '../analyze/index.html'
        });
    }

    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            sessionStorage.removeItem('isLoggedIn');
            showLoginForm();
            showToast('Logged out successfully!', 'success');
        });
    }

    
    function showDashboard() {
        loginContainer.classList.add('hidden');
        dashboardContainer.classList.remove('hidden');

        
        userNameDisplay.textContent = userData.name;
        lastLoginTime.textContent = userData.lastLogin;

        
        if (document.getElementById('fullName')) document.getElementById('fullName').value = userData.name;
        if (document.getElementById('email')) document.getElementById('email').value = userData.email;
        if (document.getElementById('phone')) document.getElementById('phone').value = userData.phone;
        if (document.getElementById('dateOfBirth')) document.getElementById('dateOfBirth').value = userData.dateOfBirth;
    }

    
    function showLoginForm() {
        dashboardContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
    }

    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            
            const tabId = this.getAttribute('data-tab');
            dashboardTabs.forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(`${tabId}Tab`).classList.remove('hidden');
        });
    });

    
    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();

        
            userData.name = document.getElementById('fullName').value;
            userData.email = document.getElementById('email').value;
            userData.phone = document.getElementById('phone').value;
            userData.dateOfBirth = document.getElementById('dateOfBirth').value;

            
            userNameDisplay.textContent = userData.name;

            showToast('Profile updated successfully!', 'success');
        });
    }

    
    if (passwordForm) {
        passwordForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            
            if (currentPassword !== userData.password) {
                showToast('Current password is incorrect.', 'error');
                return;
            }

            if (newPassword !== confirmPassword) {
                showToast('New passwords do not match.', 'error');
                return;
            }

            
            userData.password = newPassword;

            
            passwordForm.reset();

            showToast('Password updated successfully!', 'success');
        });
    }

    
    function showToast(message, type = 'success') {
        const toastIcon = toast.querySelector('.toast-icon i');
        const toastMessage = toast.querySelector('.toast-message');

        
        if (type === 'error') {
            toastIcon.className = 'fas fa-exclamation-circle';
            toast.querySelector('.toast-icon').style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            toastIcon.style.color = 'var(--accent-red)';
        } else {
            toastIcon.className = 'fas fa-check-circle';
            toast.querySelector('.toast-icon').style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            toastIcon.style.color = 'var(--accent-green)';
        }

        
        toastMessage.textContent = message;

        
        toast.classList.add('show');

        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    
    const appointmentButtons = document.querySelectorAll('.appointment-actions button');
    appointmentButtons.forEach(button => {
        button.addEventListener('click', function () {
            const action = this.textContent.trim();
            const appointmentName = this.closest('.appointment-card').querySelector('h4').textContent;

            if (this.classList.contains('danger')) {
                showToast(`Request to cancel ${appointmentName} sent.`, 'error');
            } else {
                showToast(`${action} for ${appointmentName} clicked.`, 'success');
            }
        });
    });

    
    const notificationActions = document.querySelectorAll('.notification-action');
    notificationActions.forEach(btn => {
        btn.addEventListener('click', function () {
            const notification = this.closest('.notification-card');
            notification.classList.remove('unread');
            showToast('Notification marked as read.', 'success');
        });
    });

    
    checkAuth();
});
