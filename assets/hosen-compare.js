/**
 * Hosen Compare - Image comparison slider
 */

class HosenCompare {
  constructor(element) {
    this.slider = element;
    this.wrapper = element.querySelector('.hosen-compare__slider-wrapper');
    this.handle = element.querySelector('.hosen-compare__slider-handle');
    this.beforeImage = element.querySelector('.hosen-compare__image--before');
    
    this.isDragging = false;
    this.sliderPosition = 50;
    
    // Get initial position from CSS variable
    const computedStyle = getComputedStyle(element.closest('.section-hosen-compare') || element);
    const startPosition = computedStyle.getPropertyValue('--slider-start');
    if (startPosition) {
      this.sliderPosition = parseFloat(startPosition);
    }
    
    this.init();
  }
  
  init() {
    this.setPosition(this.sliderPosition);
    this.bindEvents();
  }
  
  bindEvents() {
    // Mouse events
    this.wrapper.addEventListener('mousedown', (e) => this.startDrag(e));
    document.addEventListener('mousemove', (e) => this.drag(e));
    document.addEventListener('mouseup', () => this.endDrag());
    
    // Touch events
    this.wrapper.addEventListener('touchstart', (e) => this.startDrag(e), { passive: true });
    document.addEventListener('touchmove', (e) => this.drag(e), { passive: false });
    document.addEventListener('touchend', () => this.endDrag());
    
    // Click to move
    this.wrapper.addEventListener('click', (e) => this.clickToMove(e));
    
    // Keyboard support
    this.handle.setAttribute('tabindex', '0');
    this.handle.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }
  
  startDrag(e) {
    e.preventDefault();
    this.isDragging = true;
    this.wrapper.style.cursor = 'ew-resize';
  }
  
  drag(e) {
    if (!this.isDragging) return;
    
    if (e.type === 'touchmove') {
      e.preventDefault();
    }
    
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    this.updatePosition(clientX);
  }
  
  endDrag() {
    this.isDragging = false;
    this.wrapper.style.cursor = 'ew-resize';
  }
  
  clickToMove(e) {
    if (this.isDragging) return;
    this.updatePosition(e.clientX);
  }
  
  updatePosition(clientX) {
    const rect = this.wrapper.getBoundingClientRect();
    let position = ((clientX - rect.left) / rect.width) * 100;
    
    // Clamp between 5% and 95%
    position = Math.max(5, Math.min(95, position));
    
    this.setPosition(position);
  }
  
  setPosition(position) {
    this.sliderPosition = position;
    
    // Update before image clip
    this.beforeImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
    
    // Update handle position
    this.handle.style.left = `${position}%`;
  }
  
  handleKeyboard(e) {
    const step = 5;
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.setPosition(Math.max(5, this.sliderPosition - step));
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.setPosition(Math.min(95, this.sliderPosition + step));
        break;
    }
  }
}

// Initialize all compare sliders
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('[data-compare-slider]');
  sliders.forEach((slider) => {
    new HosenCompare(slider);
  });
});

// Fallback for already loaded DOM
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  const sliders = document.querySelectorAll('[data-compare-slider]');
  sliders.forEach((slider) => {
    if (!slider.dataset.initialized) {
      slider.dataset.initialized = 'true';
      new HosenCompare(slider);
    }
  });
}

// Shopify Section Events
if (typeof Shopify !== 'undefined' && Shopify.designMode) {
  document.addEventListener('shopify:section:load', (e) => {
    const slider = e.target.querySelector('[data-compare-slider]');
    if (slider) {
      new HosenCompare(slider);
    }
  });
}
