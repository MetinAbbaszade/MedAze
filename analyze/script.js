
const toggleSensitiveBtn = document.getElementById('toggle-sensitive');
const sensitiveData = document.querySelectorAll('.sensitive-data');
const placeholderData = document.querySelectorAll('.placeholder-data');
const timeoutWarning = document.querySelector('.timeout-warning');
const timeoutCounter = document.getElementById('timeout-counter');
const stayLoggedInBtn = document.getElementById('stay-logged-in');
const filterStatus = document.getElementById('filter-status');
const sortBy = document.getElementById('sort-by');
const resultsContainer = document.querySelector('.results-container');


let sessionTimeoutTimer;
let countdownTimer;
let timeLeft = 300; 


function init() {
    
    toggleSensitiveBtn.addEventListener('click', toggleSensitiveInfo);
    stayLoggedInBtn.addEventListener('click', resetSessionTimer);
    filterStatus.addEventListener('change', filterResults);
    sortBy.addEventListener('change', sortResults);

    
    resetSessionTimer();

    
    document.addEventListener('click', userActivity);
    document.addEventListener('mousemove', userActivity);
    document.addEventListener('keypress', userActivity);

    
    showToast('Welcome to MedAze Portal', 'success', 'fa-check-circle');
}


function toggleSensitiveInfo(e) {
    const isHidden = sensitiveData[0].classList.contains('hidden');

    sensitiveData.forEach(item => {
        item.classList.toggle('hidden', !isHidden);
    });

    placeholderData.forEach(item => {
        item.style.display = isHidden ? 'none' : 'flex';
    });

    toggleSensitiveBtn.innerHTML = isHidden
        ? '<i class="fas fa-eye-slash"></i> Hide Sensitive Data'
        : '<i class="fas fa-eye"></i> Show Sensitive Data';

    if (isHidden) {
        showToast('Sensitive data is now visible', 'info', 'fa-info-circle');
    }
}


function userActivity() {
    
    if (timeoutWarning.classList.contains('hidden')) {
        resetSessionTimer();
    }
}


function resetSessionTimer() {
    clearTimeout(sessionTimeoutTimer);
    clearInterval(countdownTimer);

    
    timeoutWarning.classList.add('hidden');

    
    timeLeft = 300;

    
    sessionTimeoutTimer = setTimeout(() => {
        showTimeoutWarning();
    }, 10 * 60 * 1000); 
}


function showTimeoutWarning() {
    timeoutWarning.classList.remove('hidden');

    
    countdownTimer = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            logout();
            return;
        }

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timeoutCounter.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}


function logout() {
    showToast('You have been logged out due to inactivity', 'warning', 'fa-exclamation-circle');
    setTimeout(() => {
        alert('Session expired. You would be redirected to login page.');
        
    }, 2000);
}


function filterResults() {
    const status = filterStatus.value;
    const resultCards = document.querySelectorAll('.result-card');

    resultCards.forEach(card => {
        if (status === 'all' || card.classList.contains(status)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    showToast(`Filtered results: ${status}`, 'info', 'fa-filter');
}


function sortResults() {
    const sortValue = sortBy.value;
    const resultCards = Array.from(document.querySelectorAll('.result-card'));

    resultCards.sort((a, b) => {
        if (sortValue === 'date-desc' || sortValue === 'date-asc') {
            const dateA = new Date(a.querySelector('.date').textContent.replace('Date: ', ''));
            const dateB = new Date(b.querySelector('.date').textContent.replace('Date: ', ''));

            return sortValue === 'date-asc' ? dateA - dateB : dateB - dateA;
        }
        else if (sortValue === 'name') {
            const nameA = a.querySelector('h3').textContent;
            const nameB = b.querySelector('h3').textContent;

            return nameA.localeCompare(nameB);
        }
    });

    
    resultsContainer.innerHTML = '';

    
    resultCards.forEach(card => {
        resultsContainer.appendChild(card);
    });

    showToast('Results sorted', 'info', 'fa-sort');
}


function showToast(message, type = 'info', icon = 'fa-info-circle') {
    const toastContainer = document.getElementById('toast-container');

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, 5000);
}


document.addEventListener('DOMContentLoaded', init);
