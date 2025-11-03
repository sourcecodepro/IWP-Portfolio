/*
 * Custom JavaScript for Portfolio
 *
 * This file includes:
 * 1. Mobile navigation toggle
 * 2. Active navigation link highlighting on scroll
 * 3. Scroll-to-top button functionality
 * 4. Project card accordion/toggle (FIXED LOGIC)
 * 5. Dynamic copyright year
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile navigation toggle
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('show');
    });
  }

  // Get header height for calculations
  const header = document.querySelector('.site-header');
  let headerOffset = 10;
  if (header) {
    headerOffset = header.offsetHeight + 10;
  }

  // 1b. Smooth scrolling for nav links & mobile nav close
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Prevent the default anchor jump
      e.preventDefault();

      // Get the target element's ID from the href
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate the target position with header offset
        const targetPosition = targetElement.offsetTop - headerOffset;

        // Scroll smoothly to the target position
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }

      // Close mobile nav if it's open
      if (mainNav.classList.contains('show')) {
        navToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('show');
      }
    });
  });

  // 1c. Smooth scrolling for "View My Work" button
  const viewWorkButton = document.querySelector('.hero-section .btn-primary');

  if (viewWorkButton) {
    viewWorkButton.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = viewWorkButton.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate the target position with header offset
        const targetPosition = targetElement.offsetTop - headerOffset;

        // Scroll smoothly to the target position
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

  // 2. Active navigation link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinksArray = Array.from(navLinks);
  // Note: headerOffset is already defined above

  const updateActiveLink = () => {
    let currentSectionId = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerOffset;
      if (scrollY >= sectionTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Special case for top of page
    if (scrollY < sections[0].offsetTop - headerOffset) {
        currentSectionId = 'home';
    }

    // Special case for bottom of page
    if ((window.innerHeight + scrollY) >= document.body.offsetHeight - 5) {
      currentSectionId = sections[sections.length - 1].getAttribute('id');
    }

    navLinksArray.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  // Run on load and on scroll
  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink);


  // 3. Scroll-to-top button functionality
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  if (scrollToTopBtn) {
    // Show or hide the button
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    });

    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // 4. Project card accordion/toggle - *** ROBUST LOGIC ***
  // Select all toggle buttons
  const toggleButtons = document.querySelectorAll('.project-toggle');

  // Add a click listener to each button
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {

      // Find the parent .project-card element
      const card = button.closest('.project-card');

      if (card) {
        // Toggle the 'expanded' class on the card
        const isExpanded = card.classList.toggle('expanded');

        // Update the aria-expanded attribute on the button
        button.setAttribute('aria-expanded', isExpanded);
      }
    });
  });

  // Stop links inside the details from triggering the toggle
  const detailLinks = document.querySelectorAll('.project-details a');
  detailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // This prevents the click from bubbling up to the card
      e.stopPropagation();
    });
  });


  // 5. Dynamic copyright year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});

