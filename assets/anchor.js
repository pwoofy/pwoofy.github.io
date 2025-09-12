document.addEventListener('DOMContentLoaded', function() {
  // Select all h2 and h3 tags inside elements with the class "post"
  const headers = document.querySelectorAll('.post h2, .post h3');

  headers.forEach(function(header) {
    // Create a unique ID from the header text
    const id = header.textContent.toLowerCase()
      .replace(/\s+/g, '-')      // Replace spaces with hyphens
      .replace(/[^\w-]+/g, ''); // Remove all non-word chars except hyphens

    // Set the ID on the header element
    header.id = id;

    // Create the anchor link element
    const anchorLink = document.createElement('a');
    anchorLink.className = 'header-link'; // For styling
    anchorLink.href = '#' + id;
    anchorLink.setAttribute('aria-label', 'Link to this section');
    anchorLink.innerHTML = '#'; // This is the visible '#' symbol

    // Add the link to the header
    header.appendChild(anchorLink);
  });
});