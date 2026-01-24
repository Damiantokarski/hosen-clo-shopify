document.addEventListener('DOMContentLoaded', function() {
  const aboutSections = document.querySelectorAll('.hosen-about');
  
  aboutSections.forEach(function(section) {
    const tabs = section.querySelectorAll('.hosen-about__tab');
    const descriptions = section.querySelectorAll('.hosen-about__description');
    const images = section.querySelectorAll('.hosen-about__image-slide');
    
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        const index = this.dataset.tabIndex;
        
        // Remove active from all
        tabs.forEach(t => t.classList.remove('hosen-about__tab--active'));
        descriptions.forEach(d => d.classList.remove('hosen-about__description--active'));
        images.forEach(i => i.classList.remove('hosen-about__image-slide--active'));
        
        // Add active to clicked
        this.classList.add('hosen-about__tab--active');
        
        const targetDescription = section.querySelector(`[data-description-index="${index}"]`);
        const targetImage = section.querySelector(`[data-image-index="${index}"]`);
        
        if (targetDescription) targetDescription.classList.add('hosen-about__description--active');
        if (targetImage) targetImage.classList.add('hosen-about__image-slide--active');
      });
    });
  });
});
