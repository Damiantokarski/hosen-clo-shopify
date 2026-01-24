document.addEventListener('DOMContentLoaded', function() {
  const countdownTimers = document.querySelectorAll('.hosen-countdown__timer');
  
  countdownTimers.forEach(function(timer) {
    const countdownDate = new Date(timer.dataset.countdownDate).getTime();
    
    const daysEl = timer.querySelector('[data-days]');
    const hoursEl = timer.querySelector('[data-hours]');
    const minutesEl = timer.querySelector('[data-minutes]');
    const secondsEl = timer.querySelector('[data-seconds]');
    
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      
      if (distance < 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      daysEl.textContent = days.toString().padStart(2, '0');
      hoursEl.textContent = hours.toString().padStart(2, '0');
      minutesEl.textContent = minutes.toString().padStart(2, '0');
      secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  });
});
