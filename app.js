document.addEventListener('DOMContentLoaded', function() {
  // Current year for footer
  document.getElementById('year').textContent = new Date().getFullYear();


  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');


  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }


  // Close mobile menu when clicking on a link
  const navLinksElements = document.querySelectorAll('.nav-links a');
  navLinksElements.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });


  // Portfolio filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');


  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
     
      // Add active class to clicked button
      btn.classList.add('active');
     
      // Get filter value
      const filterValue = btn.getAttribute('data-filter');
     
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // Testimonials slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  const dotsContainer = document.querySelector('.testimonial-dots');
  let currentSlide = 0;


  // Create dots
  if (testimonialSlides.length > 0 && dotsContainer) {
    testimonialSlides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }


  // Show slide
  function showSlide(index) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    document.querySelectorAll('.testimonial-dots .dot').forEach(dot => dot.classList.remove('active'));
   
    testimonialSlides[index].classList.add('active');
    document.querySelectorAll('.testimonial-dots .dot')[index].classList.add('active');
    currentSlide = index;
  }


  // Go to slide
  function goToSlide(index) {
    showSlide(index);
  }


  // Next slide
  function nextSlide() {
    const newIndex = currentSlide >= testimonialSlides.length - 1 ? 0 : currentSlide + 1;
    showSlide(newIndex);
  }


  // Previous slide
  function prevSlide() {
    const newIndex = currentSlide <= 0 ? testimonialSlides.length - 1 : currentSlide - 1;
    showSlide(newIndex);
  }


  // Add event listeners for prev/next buttons
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);


  // Auto-play testimonials
  if (testimonialSlides.length > 1) {
    setInterval(() => {
      nextSlide();
    }, 5000);
  }


  // FAQ Accordion
  const accordionBtns = document.querySelectorAll('.accordion-btn');


  accordionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const isActive = this.classList.contains('active');
     
      // Close all accordions
      accordionBtns.forEach(btn => {
        btn.classList.remove('active');
      });
     
      // Open the clicked accordion if it wasn't already active
      if (!isActive) {
        this.classList.add('active');
      }
    });
  });


  // Stats counter animation
  const stats = document.querySelectorAll('.stat-value');
  let animated = false;


  function animateStats() {
    if (animated) return;
   
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;
   
    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
   
    if (isVisible) {
      animated = true;
     
      stats.forEach(stat => {
        const targetValue = parseInt(stat.getAttribute('data-value'));
        let currentValue = 0;
        const step = Math.ceil(targetValue / 50);
        const duration = 1500; // 1.5 seconds
        const interval = duration / (targetValue / step);
       
        const counter = setInterval(() => {
          currentValue += step;
          if (currentValue > targetValue) {
            currentValue = targetValue;
            clearInterval(counter);
          }
          stat.textContent = currentValue;
        }, interval);
      });
    }
  }


  // Check for stats animation on scroll
  window.addEventListener('scroll', animateStats);
  animateStats(); // Check on page load


  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const toastClose = document.querySelector('.toast-close');


  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
     
      // In a real-world scenario, you'd send the form data to your server here
      console.log('Form submitted:', {
        name: this.name.value,
        email: this.email.value,
        subject: this.subject.value,
        message: this.message.value
      });
     
      // Show success toast
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 5000);
      }
     
      // Reset form
      this.reset();
    });
  }


  // Close toast
  if (toastClose) {
    toastClose.addEventListener('click', () => {
      toast.classList.remove('show');
    });
  }


  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
     
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
     
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
document.querySelectorAll('.btn.btn-outline').forEach(btn => {
  if (btn.textContent.trim().toLowerCase() === 'our services') {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
    });
  }
});




document.querySelectorAll('.btn[href="#contact"], .btn-group .btn-primary, .btn-group .btn-outline.light').forEach(btn => {
  btn.addEventListener('click', function(e) {
    if (this.getAttribute('href') === '#contact' || this.textContent.match(/get in touch|get started|schedule a consultation/i)) {
      e.preventDefault();
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
  });document.querySelectorAll('.btn.btn-primary').forEach(btn => {
  if (btn.textContent.trim().toLowerCase() === 'get started') {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }
});
});


// whatsapp contect form
function sendToWhatsapp(e) {
    e.preventDefault();
   
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
   
    // Your WhatsApp number (international format)
    const whatsappNumber = "+201146199888";
   
    // Format the message
    const whatsappMessage =
        `*New Contact Form Message*%0a%0a` +
        `*Name:* ${encodeURIComponent(name)}%0a` +
        `*Email:* ${encodeURIComponent(email)}%0a` +
        `*Subject:* ${encodeURIComponent(subject)}%0a%0a` +
        `*Message:* ${encodeURIComponent(message)}`;
   
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
   
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
   
    // Reset form
    document.getElementById('contactForm').reset();
   
    // Show success toast
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
