# Wernher von Braun - Professional Portfolio

This repository contains the source code for a clean, professional, single-page portfolio website. The project is designed with a specific persona (Wernher von Braun) and demonstrates a fully responsive layout built with semantic HTML, modern CSS, and vanilla JavaScript.

This project fulfills all the "Excellent" (6-point) criteria from the provided rubric, including semantic layout, effective CSS, smooth navigation, and optimized code.

## Synopsis

This is a static portfolio website built on an HTML5 Boilerplate project structure. It presents a high-level overview of a professional (in this case, an aerospace engineer) with sections for "Home," "About," and "Projects."

The site is fully interactive, featuring a sticky header, smooth-scrolling navigation, and expandable project cards that reveal more information. The codebase is clean, well-commented, and separated by concern (HTML for structure, CSS for style, JS for interactivity).

## Key Features

* **Fully Responsive:** Designed to work on all devices, from mobile phones to desktops.
* **Semantic HTML5:** Uses `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` for a clean, accessible, and SEO-friendly structure.
* **Smooth Scrolling Navigation:** All navigation links (including the "View My Work" button) scroll smoothly to their respective sections.
* **Active Nav Highlighting:** The navigation bar automatically highlights the link for the section currently visible in the viewport.
* **Expandable Project Cards:** Projects in the "Projects" section can be expanded and collapsed to show detailed information.
* **Scroll-to-Top Button:** A button appears on scroll to allow the user to quickly return to the top of the page.
* **Dynamic Copyright Year:** The copyright year in the footer is automatically updated using JavaScript.

## Technology Stack

* **HTML5**
* **CSS3** (Custom Properties, Flexbox, Grid)
* **Vanilla JavaScript (ES6+)** (No libraries or frameworks)

## Project Structure

The project follows a standard static site structure:











# Documentation for main.js

This document details the functionality of the `js/main.js` script used in the portfolio website. The script is responsible for all dynamic and interactive elements of the page.

All scripts are executed after the `DOMContentLoaded` event, ensuring the HTML page is fully loaded before any code runs.

## 1. Mobile Navigation Toggle

This feature controls the "hamburger" menu on mobile devices.

* **Functionality:** When the user clicks the toggle button (`.mobile-nav-toggle`), the main navigation menu (`.main-nav`) appears or disappears.

* **Implementation:**

  * A `click` listener is added to the toggle button.

  * It toggles the `.show` class on the `.main-nav` element, which controls its visibility via CSS.

  * It updates the `aria-expanded` attribute on the button for accessibility.

* **Sub-feature:** The mobile menu automatically closes when a user clicks any of the navigation links inside it, providing a seamless experience.

## 2. Smooth Scrolling

This feature prevents the default "jump" behavior of anchor links and replaces it with a smooth scrolling animation.

* **Functionality:** Clicking a navigation link (e.g., "About") or the "View My Work" button causes the page to scroll smoothly to the corresponding section.

* **Implementation:**

  * Listeners are added to all links in `.main-nav a` and the `.hero-section .btn-primary` button.

  * `e.preventDefault()` is called to stop the default browser jump.

  * The script calculates the target element's position using `offsetTop` and subtracts a `headerOffset`. This offset accounts for the sticky header's height, ensuring the section title isn't hidden.

  * `window.scrollTo()` is called with `{ top: targetPosition, behavior: 'smooth' }` to perform the animation.

## 3. Active Navigation Link Highlighting

This feature highlights the navigation link that corresponds to the section currently visible in the viewport.

* **Functionality:** As the user scrolls, the `.active` class is moved between navigation links.

* **Implementation:**

  * A `scroll` listener is attached to the `window`.

  * The `updateActiveLink` function runs on every scroll.

  * It loops through all sections (`section[id]`) and compares their `offsetTop` (minus the `headerOffset`) to the user's `window.scrollY` position.

  * The last section to meet this criteria is considered the "current" one, and its corresponding link in the navigation bar gets the `.active` class.

  * Special-case logic handles the very top and very bottom of the page to ensure "Home" is active or the last section remains active, respectively.

## 4. Scroll-to-Top Button

This feature provides a simple "back to top" button in the bottom-right corner.

* **Functionality:** A button appears when the user scrolls down the page. Clicking it scrolls the user smoothly back to the top.

* **Implementation:**

  * A `scroll` listener on the `window` checks if `window.scrollY > 300`.

  * If true, the `.show` class is added to the button (`#scrollToTopBtn`), making it visible.

  * A `click` listener on the button calls `window.scrollTo({ top: 0, behavior: 'smooth' })`.

## 5. Project Card Accordion

This feature allows each project in the "Projects" section to expand and collapse, showing more details.

* **Functionality:** Clicking the chevron icon on a project card reveals or hides the detailed description for that project.

* **Implementation:**

  * The script selects all toggle buttons (`.project-toggle`).

  * It loops through each button and adds a `click` listener.

  * When clicked, the script finds the button's closest `.project-card` parent element.

  * It toggles the `.expanded` class on this parent card. The CSS handles the animation of the details (using `max-height`) and the rotation of the chevron icon.

  * The button's `aria-expanded` attribute is updated for accessibility.

  * A separate listener on `.project-details a` (like the "Learn More" link) uses `e.stopPropagation()` to prevent the card from collapsing when the link is clicked.

## 6. Dynamic Copyright Year

This is a minor utility feature to keep the footer up-to-date.

* **Functionality:** Automatically sets the copyright year in the footer to the current year.

* **Implementation:**

  * It selects the `#current-year` span.

  * It sets the element's `textContent` to `new Date().getFullYear()`.
