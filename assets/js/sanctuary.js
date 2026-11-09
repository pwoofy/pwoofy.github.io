document.addEventListener("DOMContentLoaded", () => {
  const sortButtons = document.querySelectorAll('.sort-btn');
  const indexContainer = document.getElementById('puzzle-index');
  
  if (!indexContainer) return;

  const cards = Array.from(indexContainer.getElementsByClassName('puzzle-card'));

  sortButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sortButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const sortType = btn.getAttribute('data-sort');

      cards.sort((a, b) => {
        if (sortType === 'chrono') {
          return parseInt(a.getAttribute('data-chrono')) - parseInt(b.getAttribute('data-chrono'));
        } else if (sortType === 'diff') {
          
          const diffA = parseFloat(a.getAttribute('data-diff-sub'));
          const diffB = parseFloat(b.getAttribute('data-diff-sub'));
          
          if (diffA === diffB) {
            
            return parseInt(a.getAttribute('data-chrono')) - parseInt(b.getAttribute('data-chrono'));
          }
          return diffA - diffB;
        }
      });

      indexContainer.innerHTML = '';
      cards.forEach(card => indexContainer.appendChild(card));
    });
  });

  const chronoBtn = document.querySelector('.sort-btn[data-sort="chrono"]');
  if (chronoBtn) {
    chronoBtn.click();
  }


  
  const solutionHeaders = document.querySelectorAll('h3[id^="puzzle-"]');
  
  solutionHeaders.forEach(header => {
    
    const puzzleId = header.id.split('-')[1];
    
    
    const matchingCard = document.querySelector(`.puzzle-card[data-chrono="${puzzleId}"]`);
    
    if (matchingCard) {
      
      const tierColor = matchingCard.style.getPropertyValue('--diff-color').trim();
      
      
      if (tierColor.includes('gradient')) {
        header.style.background = tierColor;
        header.style.webkitBackgroundClip = 'text';
        header.style.webkitTextFillColor = 'transparent';
        header.style.borderBottom = '1px solid #fff';
      } else {
        
        header.style.color = tierColor;
        header.style.borderBottom = `1px solid ${tierColor}`;
      }
      
      
      header.style.paddingBottom = "8px";
      header.style.marginTop = "40px";
    }
  });
});

