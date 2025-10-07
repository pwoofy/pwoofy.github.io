document.addEventListener('DOMContentLoaded', function() {
  const puzzleEntries = document.querySelectorAll('.puzzle-entry');
  const allSecretsData = [];
  const totalSecretsDocumented = 111;
  let unknownCount = 0;

  puzzleEntries.forEach((entry, index) => {
    const titleElement = entry.querySelector('h2');

    if (titleElement && titleElement.textContent.includes('ExamplePuzzle')) {
      return;
    }

    const difficultyLi = Array.from(entry.querySelectorAll('li')).find(li => li.textContent.includes('Difficulty:'));
    const personalDifficultyLi = Array.from(entry.querySelectorAll('li')).find(li => li.textContent.includes('Personal Difficulty:'));

    if (titleElement && titleElement.firstChild && difficultyLi && personalDifficultyLi) {
      const id = titleElement.id;
      const title = titleElement.firstChild.textContent.replace(/\[#\d+\]$/, '').trim();
      
      let secretNumber = null;
      const fullTitleText = titleElement.textContent;
      const match = fullTitleText.match(/\[#(\d+)\]/);
      if (match) {
        secretNumber = match[1];
      }
      
      const personalDifficultyText = personalDifficultyLi.textContent.toLowerCase();
      const isPDUnknown = personalDifficultyText.includes('unknown');

      if (isPDUnknown) {
        entry.classList.add('difficulty-unknown');
        if (titleElement.getAttribute('data-text') === null) {
            titleElement.setAttribute('data-text', titleElement.textContent);
        }
        unknownCount++;
      }

      const difficultyText = difficultyLi.textContent.toLowerCase();
      const difficultyValue = parseInt(difficultyText.split(':')[1].trim(), 10) || 0;

      if (difficultyValue > 950) {
        entry.classList.add('difficulty-mythic');
      } else if (difficultyValue > 900) {
        entry.classList.add('difficulty-legendary');
      } else if (difficultyValue > 800) {
        entry.classList.add('difficulty-epic');
      } else if (difficultyValue > 700) {
        entry.classList.add('difficulty-rare');
      }

      allSecretsData.push({
        id: id,
        title: title,
        difficulty: difficultyValue,
        displayDifficulty: difficultyValue.toString(),
        isPDUnknown: isPDUnknown,
        secretNumber: secretNumber
      });
    }
  });

  allSecretsData.sort((a, b) => {
    if (a.isPDUnknown && !b.isPDUnknown) return 1;
    if (!a.isPDUnknown && b.isPDUnknown) return -1;
    return b.difficulty - a.difficulty;
  });

  const documentedCountOnPage = allSecretsData.length - unknownCount;

  const indexContainer = document.createElement('div');
  indexContainer.id = 'secret-index-container';
  indexContainer.innerHTML = `
    <div class="secret-index-header">
      <div class="secret-count">
        [${documentedCountOnPage}/${totalSecretsDocumented} DOCUMENTED]
      </div>
      <div class="secret-search">
        <input type="text" id="secret-search-input" placeholder="Search secrets..." aria-label="Search secrets">
        <span class="search-icon">🔍</span>
      </div>
    </div>
    <div id="secret-grid" class="secret-grid"></div>
  `;

  const secretGrid = indexContainer.querySelector('#secret-grid');
  allSecretsData.forEach(secret => {
    const gridItem = document.createElement('a');
    gridItem.href = '#' + secret.id;
    gridItem.classList.add('secret-grid-item');

    // ... (gradient class logic remains the same) ...
    if (secret.isPDUnknown) {
      gridItem.classList.add('difficulty-gradient-unknown');
    } else if (secret.difficulty >= 990) {
      gridItem.classList.add('difficulty-gradient-990');
    } else if (secret.difficulty >= 901 && secret.difficulty <= 989) {
      gridItem.classList.add('difficulty-gradient-901-989');
    } else if (secret.difficulty >= 801 && secret.difficulty <= 900) {
      gridItem.classList.add('difficulty-gradient-801-900');
    } else if (secret.difficulty >= 701 && secret.difficulty <= 800) {
      gridItem.classList.add('difficulty-gradient-701-800');
    } else if (secret.difficulty >= 601 && secret.difficulty <= 700) {
      gridItem.classList.add('difficulty-gradient-601-700');
    } else if (secret.difficulty >= 501 && secret.difficulty <= 600) {
      gridItem.classList.add('difficulty-gradient-501-600');
    } else if (secret.difficulty >= 401 && secret.difficulty <= 500) {
      gridItem.classList.add('difficulty-gradient-401-500');
    } else if (secret.difficulty >= 301 && secret.difficulty <= 400) {
      gridItem.classList.add('difficulty-gradient-301-400');
    } else if (secret.difficulty >= 201 && secret.difficulty <= 300) {
      gridItem.classList.add('difficulty-gradient-201-300');
    } else if (secret.difficulty >= 101 && secret.difficulty <= 200) {
      gridItem.classList.add('difficulty-gradient-101-200');
    } else if (secret.difficulty >= 1 && secret.difficulty <= 100) {
      gridItem.classList.add('difficulty-gradient-1-100');
    }
    
    const imageSrc = secret.secretNumber
      ? `/images/secretuniverse/icons/${secret.secretNumber}.png`
      : `/images/secretuniverse/icons/placeholder.png`;

    gridItem.innerHTML = `
      <div class="secret-difficulty">${secret.displayDifficulty}</div>
      <img src="${imageSrc}" 
           alt="${secret.title} icon" 
           class="secret-image-placeholder" 
           onerror="this.onerror=null; this.src='/images/secretuniverse/icons/placeholder.png';">
      <div class="secret-title">${secret.title}</div>
    `;
    secretGrid.appendChild(gridItem);
  });

  const mainArticle = document.querySelector('article.post.detailed');
  if (mainArticle) {
    mainArticle.prepend(indexContainer);
  }

  const searchInput = indexContainer.querySelector('#secret-search-input');
  searchInput.addEventListener('keyup', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const gridItems = secretGrid.querySelectorAll('.secret-grid-item');
    gridItems.forEach(item => {
      const title = item.querySelector('.secret-title').textContent.toLowerCase();
      if (title.includes(searchTerm)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});