document.addEventListener('DOMContentLoaded', function() {
  const headers = document.querySelectorAll('.post h2, .post h3');

  headers.forEach(function(header) {
    const id = header.textContent.toLowerCase()
      .replace(/\s+/g, '-')     
      .replace(/[^\w-]+/g, ''); 

    header.id = id;
    const anchorLink = document.createElement('a');
    anchorLink.className = 'header-link'; 
    anchorLink.href = '#' + id;
    anchorLink.setAttribute('aria-label', 'Link to this section');
    anchorLink.innerHTML = '#'; 
    header.appendChild(anchorLink);
  });
});

const topButton = document.getElementById('back-to-top-btn');

if (topButton) {
  window.onscroll = function() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
      topButton.style.display = "block";
    } else {
      topButton.style.display = "none";
    }
  };
  topButton.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}