window.addEventListener('load', () => {
    updateConnectionStatus()
    window.addEventListener('online', updateConnectionStatus)
    window.addEventListener('offline', updateConnectionStatus)

    function updateConnectionStatus() {
        const marker = document.querySelector('.ConnectionMarker')

        if (navigator.onLine) {
            marker.textContent = 'Online'
            marker.classList.add('ConnectionMarker--online')
        } else {
            marker.textContent = 'Offline'
            marker.classList.remove('ConnectionMarker--online')
        }
    }
})
