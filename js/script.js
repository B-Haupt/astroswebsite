// Part 3 - JavaScript, Forms & SEO


// Mobile Hamburger Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {

  const navToggle = document.querySelector('.nav-toggle');
  const mainNav   = document.querySelector('.main-nav');

  if (navToggle && mainNav) {

    /* Click the hamburger button to toggle the nav */
    navToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.classList.toggle('is-active', isOpen);
    });

    /* Close the nav if the user clicks anywhere outside it */
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !mainNav.contains(e.target)) {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-active');
      }
    });

    /* Close the nav after a link is clicked on mobile */
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-active');
      });
    });
  }
  // FAQ Accordion Toggle
  const faqButtons = document.querySelectorAll('.faq-toggle');

  faqButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answerId = btn.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);
     

      /* Toggle aria-expanded state */
      btn.setAttribute('aria-expanded', !expanded);

      /* Show or hide the answer */
      if (answer) {
        answer.hidden = expanded;
      }
    });
  });

  // Favourite (Heart) Button Toggle
  const favouriteButtons = document.querySelectorAll('.btn-favourite');

  favouriteButtons.forEach(function (btn) {
    btn.setAttribute('aria-pressed', 'false');

    btn.addEventListener('click', function () {
      const favourited = btn.classList.toggle('is-favourited');
      const icon = btn.querySelector('i');

      btn.setAttribute('aria-pressed', favourited);

      if (icon) {
        icon.classList.toggle('fa-regular', !favourited);
        icon.classList.toggle('fa-solid', favourited);
      }

      const label = btn.getAttribute('aria-label');
      if (favourited) {
        btn.setAttribute('aria-label', label.replace('Add ', 'Remove ').replace(' to favourites', ' from favourites'));
      } else {
        btn.setAttribute('aria-label', label.replace('Remove ', 'Add ').replace(' from favourites', ' to favourites'));
      }
    });
  });

   // Dog Search, Filter and Pagination for Services.html
  const searchInput = document.getElementById('search-name');
  const filterAge = document.getElementById('filter-age');
  const filterSize = document.getElementById('filter-size');
  const filterBreed = document.getElementById('filter-breed');
  const dogGrid = document.getElementById('dog-listings-grid');
  const paginationNav = document.querySelector('.pagination');

  const DOGS_PER_PAGE = 3;
  let currentPage = 1;

  if (dogGrid && searchInput) {

    /* Return only the cards that match the active filters */
    function getFilteredCards() {
      const nameQuery = searchInput.value.trim().toLowerCase();
      const ageVal = filterAge.value;
      const sizeVal = filterSize.value;
      const breedVal = filterBreed.value;
      const allCards = Array.from(dogGrid.querySelectorAll('.dog-card'));

      return allCards.filter(function (card) {
        const heading = card.querySelector('h3');
        const cardName = heading ? heading.textContent.trim().toLowerCase() : '';
        const cardAge = card.dataset.age || '';
        const cardSize = card.dataset.size || '';
        const cardBreed = card.dataset.breed || '';

        return (
          (!nameQuery || cardName.includes(nameQuery)) &&
          (!ageVal || cardAge   === ageVal)  &&
          (!sizeVal || cardSize  === sizeVal) &&
          (!breedVal || cardBreed === breedVal)
        );
      });
    }

    /* Show the correct page of cards and update the pagination buttons */
    function renderPage() {
      const filtered   = getFilteredCards();
      const totalPages = Math.max(1, Math.ceil(filtered.length / DOGS_PER_PAGE));

      /* Clamp currentPage within valid range */
      if (currentPage > totalPages) currentPage = totalPages;
      if (currentPage < 1) currentPage = 1;

      /* Hide every card, then reveal only the current page slice */
      dogGrid.querySelectorAll('.dog-card').forEach(function (card) {
        card.style.display = 'none';
      });
      const start = (currentPage - 1) * DOGS_PER_PAGE;
      filtered.slice(start, start + DOGS_PER_PAGE).forEach(function (card) {
        card.style.display = '';
      });

      /* No-results message */
      let noResults = document.getElementById('no-results-message');
      if (!noResults) {
        noResults = document.createElement('p');
        noResults.id = 'no-results-message';
        noResults.className = 'no-results-msg';
        noResults.textContent = 'No dogs match your search. Try clearing a filter or searching by a different name.';
        dogGrid.after(noResults);
      }
      noResults.hidden = filtered.length > 0;

      /* Rebuild the pagination buttons */
      updatePagination(totalPages);
    }

    /* Clear and rebuild the pagination nav to match the current state */
    function updatePagination(totalPages) {
      if (!paginationNav) return;

      /* Hide the bar when everything fits on one page */
      paginationNav.style.display = totalPages <= 1 ? 'none' : 'flex';
      paginationNav.innerHTML = '';

      /* Previous button */
      const prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.className = 'btn btn-outline';
      prevBtn.setAttribute('aria-label', 'Previous page');
      prevBtn.innerHTML = '&larr; Prev';
      prevBtn.disabled = currentPage === 1;
      prevBtn.addEventListener('click', function () {
        currentPage--;
        renderPage();
        dogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      paginationNav.appendChild(prevBtn);

      /* Numbered page buttons */
      for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.type = 'button';
        pageBtn.className  = 'btn btn-outline';
        pageBtn.setAttribute('aria-label', 'Page ' + i);
        pageBtn.textContent = i;
        if (i === currentPage) {
          pageBtn.setAttribute('aria-current', 'page');
        }
        /* Wrap in IIFE so the click captures the correct page number */
        (function (pageNum) {
          pageBtn.addEventListener('click', function () {
            currentPage = pageNum;
            renderPage();
            dogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        })(i);
        paginationNav.appendChild(pageBtn);
      }

      /* Next button */
      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'btn btn-outline';
      nextBtn.setAttribute('aria-label', 'Next page');
      nextBtn.innerHTML = 'Next &rarr;';
      nextBtn.disabled = currentPage === totalPages;
      nextBtn.addEventListener('click', function () {
        currentPage++;
        renderPage();
        dogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      paginationNav.appendChild(nextBtn);
    }

    /* When a filter changes, jump back to page 1 and re-render */
    searchInput.addEventListener('input',  function () { currentPage = 1; renderPage(); });
    filterAge.addEventListener('change',   function () { currentPage = 1; renderPage(); });
    filterSize.addEventListener('change',  function () { currentPage = 1; renderPage(); });
    filterBreed.addEventListener('change', function () { currentPage = 1; renderPage(); });

    /* Initial render - show page 1 on load */
    renderPage();
  }
  // Leaflet Interactive Map
  const mapContainer = document.getElementById('shelter-map');

  if (mapContainer && typeof L !== 'undefined') {

    /* Centre the view between both locations */
    const map = L.map('shelter-map').setView([-33.8253, 18.5071], 14);

    /* OpenStreetMap tile layer - free, no API key required */
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" ' +
        'target="_blank" rel="noopener">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    /* Custom paw-print marker icon */
    const pawIcon = L.divIcon({
      html:       '<span style="font-size:2rem;line-height:1;" aria-hidden="true">🐾</span>',
      className:  'paw-marker',
      iconSize:   [36, 36],
      iconAnchor: [18, 36],
      popupAnchor:[0, -38]
    });

    /* Marker 1 - 223 Blaauwberg Road, Table View */
    const marker1 = L.marker([-33.8302, 18.5108], { icon: pawIcon })
      .addTo(map)
      .bindPopup(
        '<strong>Astro\'s Canine Rescue - Main Shelter</strong><br>' +
        '223 Blaauwberg Road<br>' +
        'Table View, Cape Town, 7439<br>' +
        '<a href="tel:+27215551234">(021) 555-1234</a>'
      );

    /* Marker 2 - 89 Janssens Avenue, Table View */
    const marker2 = L.marker([-33.8203, 18.5034], { icon: pawIcon })
      .addTo(map)
      .bindPopup(
        '<strong>Astro\'s Canine Rescue - Foster Hub</strong><br>' +
        '89 Janssens Avenue<br>' +
        'Table View, Cape Town, 7439<br>' +
        '<a href="tel:+27215551234">(021) 555-1234</a>'
      );

    setTimeout(function () {
      map.invalidateSize();
      map.fitBounds(L.latLngBounds([marker1.getLatLng(), marker2.getLatLng()]), {
        padding: [40, 40],
        maxZoom: 16
      });
    }, 250);
  }

  // Photo Gallery Lightbox for about.html
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (galleryItems.length > 0) {
    let currentIndex = 0;
    const images       = Array.from(galleryItems);

    /* Build the lightbox overlay DOM once and append to body */
    const overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image lightbox');
    overlay.style.display = 'none';

    overlay.innerHTML = '<button class="lightbox-close" id="lightbox-close" aria-label="Close lightbox">' +
        '<i class="fa-solid fa-xmark" aria-hidden="true"></i>' + '</button>' +
      '<button class="lightbox-prev" id="lightbox-prev" aria-label="Previous image">' +
        '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>' +
      '</button>' + '<div class="lightbox-content">' +
        '<img id="lightbox-img" src="" alt="" />' +
        '<p id="lightbox-caption" class="lightbox-caption"></p>' +
      '</div>' + '<button class="lightbox-next" id="lightbox-next" aria-label="Next image">' +
        '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>' + '</button>';

    document.body.appendChild(overlay);

    /* Open the lightbox at a specific index */
    function openLightbox(index) {
      currentIndex = index;
      const item = images[index];
      const img = item.querySelector('img');
      const caption = img.getAttribute('data-caption') || img.alt;
      document.getElementById('lightbox-img').src = img.src;
      document.getElementById('lightbox-img').alt = img.alt;
      document.getElementById('lightbox-caption').textContent = caption;
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      document.getElementById('lightbox-close').focus();
    }

    /* Close the lightbox */
    function closeLightbox() {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }

    /* Navigate to the previous image */
    function showPrev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      openLightbox(currentIndex);
    }

    /* Navigate to the next image */
    function showNext() {
      currentIndex = (currentIndex + 1) % images.length;
      openLightbox(currentIndex);
    }

    /* Attach click + keyboard handlers to each gallery item */
    images.forEach(function (item, index) {
      item.style.cursor = 'pointer';
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', 'Open photo in lightbox');

      item.addEventListener('click', function () { openLightbox(index); });

      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });

    /* Lightbox button controls */
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', showPrev);
    document.getElementById('lightbox-next').addEventListener('click', showNext);

    /* Close on clicking the dark overlay background */
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });

    /* Keyboard navigation — only active when lightbox is open */
    document.addEventListener('keydown', function (e) {
      if (overlay.style.display === 'none') return;
      if (e.key === 'Escape')  closeLightbox();
      if (e.key === 'ArrowLeft')  showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  }
// Enquiry Form Validation and Volunteer Response for enquiry.html
  const enquiryForm = document.getElementById('enquiry-form');

  if (enquiryForm) {
    /* Show an inline error below a form field */
    function showError(fieldId, message) {
      const field = document.getElementById(fieldId);
      let errEl = document.getElementById('err-' + fieldId);
      if (!errEl) {
        errEl = document.createElement('span');
        errEl.id = 'err-' + fieldId;
        errEl.className = 'error-message';
        errEl.setAttribute('role', 'alert');
        if (field) field.after(errEl);
      }
      errEl.textContent = message;
      if (field) {
        field.setAttribute('aria-describedby', 'err-' + fieldId);
        field.classList.add('field-error');
      }
    }

    /* Remove an inline error */
    function clearError(fieldId) {
      const field = document.getElementById(fieldId);
      const errEl = document.getElementById('err-' + fieldId);
      if (errEl)  errEl.textContent = '';
      if (field) {
        field.removeAttribute('aria-describedby');
        field.classList.remove('field-error');
      }
    }

    /* Show an error inside a fieldset (for checkbox groups) */
    function showFieldsetError(fsId, message) {
      const fs = document.getElementById(fsId);
      let errEl = document.getElementById('err-' + fsId);
      if (!errEl) {
        errEl = document.createElement('span');
        errEl.id = 'err-' + fsId;
        errEl.className = 'error-message fieldset-error';
        errEl.setAttribute('role', 'alert');
        if (fs) fs.appendChild(errEl);
      }
      errEl.textContent = message;
    }

    /* Remove a fieldset error */
    function clearFieldsetError(fsId) {
      var errEl = document.getElementById('err-' + fsId);
      if (errEl) errEl.textContent = '';
    }

    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      /* --- First Name: required, min 2 chars --- */
      const firstName = document.getElementById('first-name').value.trim();
      clearError('first-name');
      if (!firstName) {
        showError('first-name', 'First name is required.');
        isValid = false;
      } else if (firstName.length < 2) {
        showError('first-name', 'First name must be at least 2 characters long.');
        isValid = false;
      }

      /* --- Last Name: required, min 2 chars --- */
      const lastName = document.getElementById('last-name').value.trim();
      clearError('last-name');
      if (!lastName) {
        showError('last-name', 'Last name is required.');
        isValid = false;
      } else if (lastName.length < 2) {
        showError('last-name', 'Last name must be at least 2 characters long.');
        isValid = false;
      }

      /* --- Email: required, valid format --- */
      const email = document.getElementById('email').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      clearError('email');
      if (!email) {
        showError('email', 'Email address is required.');
        isValid = false;
      } else if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address (e.g. name@example.com).');
        isValid = false;
      }

      /* --- Phone: required, 10-15 digits --- */
      const phone = document.getElementById('phone').value.trim();
      const phoneRegex = /^[\d\s\+\-]{10,15}$/;
      clearError('phone');
      if (!phone) {
        showError('phone', 'Phone number is required.');
        isValid = false;
      } else if (!phoneRegex.test(phone)) {
        showError('phone', 'Please enter a valid phone number (10–15 digits, e.g. 071 234 5678).');
        isValid = false;
      }

      /* --- Address: required --- */
      const address = document.getElementById('address').value.trim();
      clearError('address');
      if (!address) {
        showError('address', 'Home address is required.');
        isValid = false;
      }

      /* --- Interests: at least one checkbox must be checked --- */
      const interests = enquiryForm.querySelectorAll('input[name="interests"]:checked');
      clearFieldsetError('interests-fieldset');
      if (interests.length === 0) {
        showFieldsetError('interests-fieldset', 'Please select at least one area of interest.');
        isValid = false;
      }

      /* --- Availability: at least one checkbox must be checked --- */
      const availability = enquiryForm.querySelectorAll('input[name="availability"]:checked');
      clearFieldsetError('availability-fieldset');
      if (availability.length === 0) {
        showFieldsetError('availability-fieldset', 'Please select at least one availability time slot.');
        isValid = false;
      }

      /* Scroll to the first error if invalid */
      if (!isValid) {
        const firstError = enquiryForm.querySelector('.error-message:not(:empty)');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      /* --- Build the personalised process response --- */
      const selectedInterests = Array.from(interests).map(function (cb) {
        return cb.closest('.form-check').querySelector('label').textContent.trim();
      });

      const selectedAvailability = Array.from(availability).map(function (cb) {
        return cb.closest('.form-check').querySelector('label').textContent.trim();
      });

      /* Calculate the next Saturday for the orientation date */
      const today = new Date();
      const dayOfWeek = today.getDay(); /* 0 = Sunday, 6 = Saturday */
      const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
      const orientationDate = new Date(today);
      orientationDate.setDate(today.getDate() + daysUntilSaturday);
      const formattedDate = orientationDate.toLocaleDateString('en-ZA', {
        weekday: 'long',
        year: 'numeric',
        month:'long',
        day: 'numeric'
      });

      /* Build the HTML response card */
      const responseEl = document.createElement('div');
      responseEl.innerHTML = '<div class="form-success-box" role="alert" aria-live="polite">' +
          '<div class="success-icon">' +'<i class="fa-solid fa-circle-check" aria-hidden="true"></i>' +
          '</div>' + '<h3>Application Received, ' + firstName + '!</h3>' +
          '<p>Thank you for applying to volunteer with <strong>Astro\'s Canine Rescue</strong>. We are thrilled to have you on board!</p>' +
          '<div class="response-summary">' +'<h4>Your Application Summary</h4>' +
            '<p><strong>Name:</strong> ' + firstName + ' ' + lastName + '</p>' +
            '<p><strong>Email:</strong> ' + email + '</p>' +
            '<p><strong>Phone:</strong> ' + phone + '</p>' +
            '<p><strong>Areas of Interest:</strong> ' + selectedInterests.join(', ') + '</p>' +
            '<p><strong>Availability:</strong> ' + selectedAvailability.join(', ') + '</p>' +
          '</div>' + '<div class="response-next-steps">' +'<h4>What Happens Next?</h4>' +
            '<ol>' +
              '<li>Our volunteer coordinator will contact you at <strong>' + email + '</strong> within <strong>3 business days</strong> to schedule a brief interview.</li>' +
              '<li>Once approved, you will be invited to our next volunteer orientation, tentatively on <strong>' + formattedDate + '</strong>.</li>' +
              '<li>After orientation you will be matched to your role' + (selectedInterests.length > 1 ? 's' : '') + ': <strong>' + selectedInterests.join(', ') + '</strong>.</li>' +
            '</ol>' +
          '</div>' +
          '<p class="response-footer">Questions? Email <a href="mailto:volunteers@astrocanine.org">volunteers@astrocanine.org</a> or call <a href="tel:+27215551234">(021) 555-1234</a>.</p>' +
        '</div>';

      /* Hide the form and show the response */
      enquiryForm.style.display = 'none';
      enquiryForm.parentNode.insertBefore(responseEl, enquiryForm.nextSibling);
      responseEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Contact Form Validation and Mailto Compilation for Contact.html
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    /* Show an inline error below a field */
    function showContactError(fieldId, message) {
      const field = document.getElementById(fieldId);
      let errEl = document.getElementById('cerr-' + fieldId);
      if (!errEl) {
        errEl = document.createElement('span');
        errEl.id = 'cerr-' + fieldId;
        errEl.className = 'error-message';
        errEl.setAttribute('role', 'alert');
        if (field) field.after(errEl);
      }
      errEl.textContent = message;
      if (field) {
        field.setAttribute('aria-describedby', 'cerr-' + fieldId);
        field.classList.add('field-error');
      }
    }

    /* Remove an inline error */
    function clearContactError(fieldId) {
      const field = document.getElementById(fieldId);
      const errEl = document.getElementById('cerr-' + fieldId);
      if (errEl)  errEl.textContent = '';
      if (field) {
        field.removeAttribute('aria-describedby');
        field.classList.remove('field-error');
      }
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      /* --- First Name: required --- */
      const firstName = document.getElementById('contact-first-name').value.trim();
      clearContactError('contact-first-name');
      if (!firstName) {
        showContactError('contact-first-name', 'First name is required.');
        isValid = false;
      }

      /* --- Last Name: required --- */
      var lastName = document.getElementById('contact-last-name').value.trim();
      clearContactError('contact-last-name');
      if (!lastName) {
        showContactError('contact-last-name', 'Last name is required.');
        isValid = false;
      }

      /* --- Email: required, valid format --- */
      const email = document.getElementById('contact-email').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      clearContactError('contact-email');
      if (!email) {
        showContactError('contact-email', 'Email address is required.');
        isValid = false;
      } else if (!emailRegex.test(email)) {
        showContactError('contact-email', 'Please enter a valid email address.');
        isValid = false;
      }

      /* --- Phone: optional, but validate format if provided --- */
      const phone = document.getElementById('contact-phone').value.trim();
      const phoneRegex = /^[\d\s\+\-]{10,15}$/;
      clearContactError('contact-phone');
      if (phone && !phoneRegex.test(phone)) {
        showContactError('contact-phone', 'Please enter a valid phone number (10–15 digits).');
        isValid = false;
      }

      /* --- Subject: required --- */
      const subject = document.getElementById('contact-subject').value;
      clearContactError('contact-subject');
      if (!subject) {
        showContactError('contact-subject', 'Please select a subject.');
        isValid = false;
      }

      /* --- Message: required, minimum 10 characters --- */
      const message = document.getElementById('contact-message').value.trim();
      clearContactError('contact-message');
      if (!message) {
        showContactError('contact-message', 'A message is required.');
        isValid = false;
      } else if (message.length < 10) {
        showContactError('contact-message', 'Your message must be at least 10 characters long.');
        isValid = false;
      }

      /* Scroll to the first error if invalid */
      if (!isValid) {
        const firstError = contactForm.querySelector('.error-message:not(:empty)');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      /* --- Build and open the pre-filled mailto: link --- */
      const subjectLabels = {
        adoption:  'Adoption Enquiry',
        volunteer: 'Volunteering',
        donation:  'Donation / Sponsorship',
        foster:    'Foster Care',
        stray:     'Found a Stray',
        general:   'General Enquiry'
      };
      const subjectLabel = subjectLabels[subject] || subject;
      const phoneInfo    = phone ? '\nPhone: ' + phone : '';

      const emailBody =
        'From: ' + firstName + ' ' + lastName + '\n' +
        'Email: ' + email + phoneInfo + '\n' +
        'Subject: ' + subjectLabel + '\n\n' +
        message;

      const mailtoLink = 'mailto:info@astrocanine.org' +
        '?subject=' + encodeURIComponent('[Astro\'s Canine Rescue] ' + subjectLabel + ' from ' + firstName + ' ' + lastName) +
        '&body='    + encodeURIComponent(emailBody);

      /* Open the user's mail client */
      window.location.href = mailtoLink;

      /* Show a confirmation message below the form */
      const confirmEl = document.createElement('div');
      confirmEl.innerHTML ='<div class="form-success-box" role="alert" aria-live="polite">' +
          '<div class="success-icon">' +
            '<i class="fa-solid fa-circle-check" aria-hidden="true"></i>' +
          '</div>' +
          '<h3>Message Ready to Send!</h3>' +
          '<p>Your email client has been opened with your message pre-filled and addressed to <strong>info@astrocanine.org</strong>.</p>' +
          '<p>Please click <strong>Send</strong> in your email client to complete your message.</p>' +
          '<p>If your email client did not open, please send directly to ' +
            '<a href="mailto:info@astrocanine.org">info@astrocanine.org</a>.' +
          '</p>' +
        '</div>';

      contactForm.style.display = 'none';
      contactForm.parentNode.insertBefore(confirmEl, contactForm.nextSibling);
      confirmEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

}); 
