(function() {
  const STORAGE_KEY = 'hosen-darkmode';
  const DARK_CLASS = 'darkmode';
  
  // Initialize dark mode based on saved preference or system preference
  function initDarkMode() {
    const savedPreference = localStorage.getItem(STORAGE_KEY);
    
    if (savedPreference === 'dark') {
      document.documentElement.classList.add(DARK_CLASS);
    } else if (savedPreference === 'light') {
      document.documentElement.classList.remove(DARK_CLASS);
    } else {
      // Check system preference if no saved preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add(DARK_CLASS);
      }
    }
    
    updateToggleButton();
  }
  
  // Toggle dark mode
  function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle(DARK_CLASS);
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    updateToggleButton();
  }
  
  // Update button appearance
  function updateToggleButton() {
    const isDark = document.documentElement.classList.contains(DARK_CLASS);
    const lightIcon = document.querySelector('.darkmode-icon--light');
    const darkIcon = document.querySelector('.darkmode-icon--dark');
    
    if (lightIcon && darkIcon) {
      if (isDark) {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'flex';
      } else {
        lightIcon.style.display = 'flex';
        darkIcon.style.display = 'none';
      }
    }
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    initDarkMode();
    
    const toggleButton = document.getElementById('darkmode-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleDarkMode);
    }
    
    // Listen for system preference changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          if (e.matches) {
            document.documentElement.classList.add(DARK_CLASS);
          } else {
            document.documentElement.classList.remove(DARK_CLASS);
          }
          updateToggleButton();
        }
      });
    }
  }
})();
