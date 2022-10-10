function toastMessage({ title = "", message = "", type = "info", duration = 3000 }) {
	const main = document.getElementById('toast');
	if (main) {
		const toast = document.createElement('div');
		const icons = {
			success: 'ri-checkbox-circle-line',
			info: 'ri-information-line',
			warning: 'ri-error-warning-line',
			error: 'ri-error-warning-line',
		}
		const delay = (duration / 1000).toFixed(2);
		toast.classList.add('toast', `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
		
		// Auto remove toast message
		const autoRemoveId = setTimeout(() => {
			main.removeChild(toast);
		}, duration + 1000);

		// Remove toast when clicked 
		toast.onclick = function (e) {
			if (e.target.closest(".toast__close")) {
				main.removeChild(toast);
				clearTimeout(autoRemoveId);
			}
		};

		toast.classList.add('toast');
		toast.innerHTML =
			`
				<div class="toast__icon">
					<i class="${icons[type]}"></i>
				</div>
				<div class="toast__body">
					<h3 class="toast__title">${title}</h3>
					<p class="toast__msg">${message}</p>
				</div>
				<div class="toast__close">
					<i class="ri-close-fill"></i> 
				</div>
				`;
		main.appendChild(toast);
	}
}