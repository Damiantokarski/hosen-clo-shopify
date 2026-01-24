/**
 * Hosen Carousel - JavaScript functionality
 * Auto-play carousel with touch support and accessibility
 */

class HosenCarousel {
  constructor(element) {
    this.carousel = element;
    this.track = element.querySelector('.hosen-carousel__track');
    this.slides = Array.from(element.querySelectorAll('.hosen-carousel__slide'));
    this.prevButton = element.querySelector('.hosen-carousel__nav-button--prev');
    this.nextButton = element.querySelector('.hosen-carousel__nav-button--next');
    this.dots = Array.from(element.querySelectorAll('.hosen-carousel__dot'));
    
    this.currentIndex = 0;
    this.slidesCount = this.slides.length;
    this.autoplay = element.dataset.autoplay === 'true';
    this.autoplaySpeed = parseInt(element.dataset.autoplaySpeed, 10) * 1000 || 5000;
    this.autoplayInterval = null;
    this.isPaused = false;
    
    // Touch support
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.isDragging = false;
    
    if (this.slidesCount > 1) {
      this.init();
    } else if (this.slidesCount === 1) {
      this.slides[0].classList.add('hosen-carousel__slide--active');
    }
  }
  
  init() {
    this.slides[0].classList.add('hosen-carousel__slide--active');
    this.bindEvents();
    
    if (this.autoplay) {
      this.startAutoplay();
    }
    
    // Check for touch support
    if ('ontouchstart' in window) {
      this.carousel.classList.add('hosen-carousel--touch');
    }
  }
  
  bindEvents() {
    // Navigation buttons
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.prev());
    }
    
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.next());
    }
    
    // Dots navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Pause on hover
    this.carousel.addEventListener('mouseenter', () => this.pause());
    this.carousel.addEventListener('mouseleave', () => this.resume());
    
    // Touch events
    this.carousel.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: true });
    this.carousel.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: true });
    this.carousel.addEventListener('touchend', (e) => this.onTouchEnd(e));
    
    // Keyboard navigation
    this.carousel.addEventListener('keydown', (e) => this.onKeyDown(e));
    
    // Make carousel focusable
    this.carousel.setAttribute('tabindex', '0');
    
    // Visibility change - pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.resume();
      }
    });
    
    // Reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.autoplay = false;
      this.stopAutoplay();
    }
  }
  
  goToSlide(index) {
    if (index < 0) {
      index = this.slidesCount - 1;
    } else if (index >= this.slidesCount) {
      index = 0;
    }
    
    // Remove active class from current slide
    this.slides[this.currentIndex].classList.remove('hosen-carousel__slide--active');
    this.dots[this.currentIndex]?.classList.remove('hosen-carousel__dot--active');
    
    // Update current index
    this.currentIndex = index;
    
    // Move track
    const translateX = -index * 100;
    this.track.style.transform = `translateX(${translateX}%)`;
    
    // Add active class to new slide
    this.slides[this.currentIndex].classList.add('hosen-carousel__slide--active');
    this.dots[this.currentIndex]?.classList.add('hosen-carousel__dot--active');
    
    // Reset autoplay timer
    if (this.autoplay && !this.isPaused) {
      this.resetAutoplay();
    }
  }
  
  next() {
    this.goToSlide(this.currentIndex + 1);
  }
  
  prev() {
    this.goToSlide(this.currentIndex - 1);
  }
  
  startAutoplay() {
    if (this.autoplayInterval) return;
    
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.autoplaySpeed);
  }
  
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
  
  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }
  
  pause() {
    this.isPaused = true;
  }
  
  resume() {
    this.isPaused = false;
  }
  
  onTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    this.isDragging = true;
    this.pause();
  }
  
  onTouchMove(e) {
    if (!this.isDragging) return;
    this.touchEndX = e.touches[0].clientX;
  }
  
  onTouchEnd() {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    const diff = this.touchStartX - this.touchEndX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
    
    this.resume();
    this.touchStartX = 0;
    this.touchEndX = 0;
  }
  
  onKeyDown(e) {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.prev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.next();
        break;
    }
  }
  
  destroy() {
    this.stopAutoplay();
  }
}

// Initialize all carousels on page
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.hosen-carousel');
  carousels.forEach((carousel) => {
    new HosenCarousel(carousel);
  });
});

// Fallback - initialize if DOM already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  const carousels = document.querySelectorAll('.hosen-carousel');
  carousels.forEach((carousel) => {
    if (!carousel.dataset.initialized) {
      carousel.dataset.initialized = 'true';
      new HosenCarousel(carousel);
    }
  });
}

// Shopify Section Events - reinitialize on section load
if (typeof Shopify !== 'undefined' && Shopify.designMode) {
  document.addEventListener('shopify:section:load', (e) => {
    const carousel = e.target.querySelector('.hosen-carousel');
    if (carousel) {
      new HosenCarousel(carousel);
    }
  });
}
