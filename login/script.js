document.addEventListener('DOMContentLoaded', function () {
    // Demo user data - in real application, this would be retrieved from a database
    const userData = {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1 (555) 123-4567",
        dateOfBirth: "1985-04-12",
        lastLogin: "July 15, 2023 at 09:45 AM",
        username: "user@example.com",
        password: "password123" // In real application, this would be hashed
    };

    // DOM Elements
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

    // Check if user is already logged in (using session storage for demo)
    function checkAuth() {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            showDashboard();
        }
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simple auth check for demo purposes
            if (username === userData.username && password === userData.password) {
                // In real app, this would be a server authentication
                sessionStorage.setItem('isLoggedIn', 'true');
                showDashboard();
                showToast('Login successful!', 'success');
            } else {
                showToast('Invalid username or password. Try again.', 'error');
            }
        });
    }

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            sessionStorage.removeItem('isLoggedIn');
            showLoginForm();
            showToast('Logged out successfully!', 'success');
        });
    }

    // Display dashboard after successful authentication
    function showDashboard() {
        loginContainer.classList.add('hidden');
        dashboardContainer.classList.remove('hidden');

        // Populate user data
        userNameDisplay.textContent = userData.name;
        lastLoginTime.textContent = userData.lastLogin;

        // Fill profile form with user data
        if (document.getElementById('fullName')) document.getElementById('fullName').value = userData.name;
        if (document.getElementById('email')) document.getElementById('email').value = userData.email;
        if (document.getElementById('phone')) document.getElementById('phone').value = userData.phone;
        if (document.getElementById('dateOfBirth')) document.getElementById('dateOfBirth').value = userData.dateOfBirth;
    }

    // Show login form
    function showLoginForm() {
        dashboardContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
    }

    // Tab navigation
    navTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Show relevant tab content
            const tabId = this.getAttribute('data-tab');
            dashboardTabs.forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(`${tabId}Tab`).classList.remove('hidden');
        });
    });

    // Handle profile form submission
    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Update user data (in real app, this would be sent to a server)
            userData.name = document.getElementById('fullName').value;
            userData.email = document.getElementById('email').value;
            userData.phone = document.getElementById('phone').value;
            userData.dateOfBirth = document.getElementById('dateOfBirth').value;

            // Update displayed name
            userNameDisplay.textContent = userData.name;

            showToast('Profile updated successfully!', 'success');
        });
    }

    // Handle password form submission
    if (passwordForm) {
        passwordForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Password validation
            if (currentPassword !== userData.password) {
                showToast('Current password is incorrect.', 'error');
                return;
            }

            if (newPassword !== confirmPassword) {
                showToast('New passwords do not match.', 'error');
                return;
            }

            // Update password (in real app, this would be hashed and sent to a server)
            userData.password = newPassword;

            // Reset form
            passwordForm.reset();

            showToast('Password updated successfully!', 'success');
        });
    }

    // Toast notification function
    function showToast(message, type = 'success') {
        const toastIcon = toast.querySelector('.toast-icon i');
        const toastMessage = toast.querySelector('.toast-message');

        // Set icon and colors based on message type
        if (type === 'error') {
            toastIcon.className = 'fas fa-exclamation-circle';
            toast.querySelector('.toast-icon').style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            toastIcon.style.color = 'var(--accent-red)';
        } else {
            toastIcon.className = 'fas fa-check-circle';
            toast.querySelector('.toast-icon').style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            toastIcon.style.color = 'var(--accent-green)';
        }

        // Set message
        toastMessage.textContent = message;

        // Show toast
        toast.classList.add('show');

        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Handle appointment actions
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

    // Notification actions
    const notificationActions = document.querySelectorAll('.notification-action');
    notificationActions.forEach(btn => {
        btn.addEventListener('click', function () {
            const notification = this.closest('.notification-card');
            notification.classList.remove('unread');
            showToast('Notification marked as read.', 'success');
        });
    });

    // Initialize - check if user is logged in
    checkAuth();
});
