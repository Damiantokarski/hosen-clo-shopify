document.addEventListener('DOMContentLoaded', function() {
  const hotspotSections = document.querySelectorAll('.hosen-hotspot');
  
  hotspotSections.forEach(function(section) {
    const hotspotButtons = section.querySelectorAll('.hosen-hotspot__button');
    const slides = section.querySelectorAll('.hosen-hotspot__slide');
    const arrows = section.querySelectorAll('.hosen-hotspot__arrow');
    
    // Hotspot button click - switch product card
    hotspotButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const index = this.dataset.hotspotIndex;
        
        // Remove active from all buttons and slides
        hotspotButtons.forEach(btn => btn.classList.remove('hosen-hotspot__button--active'));
        slides.forEach(slide => slide.classList.remove('hosen-hotspot__slide--active'));
        
        // Add active to clicked button and corresponding slide
        this.classList.add('hosen-hotspot__button--active');
        const targetSlide = section.querySelector(`[data-slide-index="${index}"]`);
        if (targetSlide) {
          targetSlide.classList.add('hosen-hotspot__slide--active');
        }
      });
    });
    
    // Product image slider arrows
    arrows.forEach(function(arrow) {
      arrow.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const target = this.dataset.target;
        const direction = this.dataset.arrow;
        const productSlider = section.querySelector(`[data-product-slider="${target}"]`);
        const images = productSlider.querySelectorAll('.hosen-hotspot__product-image');
        const dots = section.querySelectorAll(`[data-dots="${target}"] .hosen-hotspot__dot`);
        
        let currentIndex = 0;
        images.forEach((img, i) => {
          if (img.classList.contains('hosen-hotspot__product-image--active')) {
            currentIndex = i;
          }
        });
        
        let newIndex;
        if (direction === 'next') {
          newIndex = (currentIndex + 1) % images.length;
        } else {
          newIndex = (currentIndex - 1 + images.length) % images.length;
        }
        
        images.forEach(img => img.classList.remove('hosen-hotspot__product-image--active'));
        dots.forEach(dot => dot.classList.remove('hosen-hotspot__dot--active'));
        
        images[newIndex].classList.add('hosen-hotspot__product-image--active');
        if (dots[newIndex]) {
          dots[newIndex].classList.add('hosen-hotspot__dot--active');
        }
      });
    });
  });
});
