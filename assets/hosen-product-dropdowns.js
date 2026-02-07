document.addEventListener('DOMContentLoaded', function() {
  const dropdownSections = document.querySelectorAll('.hosen-product-dropdowns');
  
  dropdownSections.forEach(function(section) {
    const toggles = section.querySelectorAll('[data-dropdown-toggle]');
    
    toggles.forEach(function(toggle) {
      toggle.addEventListener('click', function() {
        const item = this.closest('.hosen-product-dropdowns__item');
        const isOpen = item.classList.contains('hosen-product-dropdowns__item--open');
        
        // Toggle current item
        if (isOpen) {
          item.classList.remove('hosen-product-dropdowns__item--open');
        } else {
          item.classList.add('hosen-product-dropdowns__item--open');
        }
      });
    });
  });
});
