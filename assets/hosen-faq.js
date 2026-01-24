document.addEventListener('DOMContentLoaded', function() {
  const faqSections = document.querySelectorAll('.hosen-faq');
  
  faqSections.forEach(function(section) {
    const toggles = section.querySelectorAll('[data-faq-toggle]');
    
    toggles.forEach(function(toggle) {
      toggle.addEventListener('click', function() {
        const item = this.closest('.hosen-faq__item');
        const isOpen = item.classList.contains('hosen-faq__item--open');
        
        // Toggle current item
        if (isOpen) {
          item.classList.remove('hosen-faq__item--open');
        } else {
          item.classList.add('hosen-faq__item--open');
        }
      });
    });
  });
});
