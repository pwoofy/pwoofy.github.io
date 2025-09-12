document.addEventListener('DOMContentLoaded', function() {
  // Find all the puzzle containers
  const puzzleEntries = document.querySelectorAll('.puzzle-entry');

  puzzleEntries.forEach(entry => {
    // Find the list item containing "Difficulty:"
    const difficultyLi = Array.from(entry.querySelectorAll('li')).find(li => li.textContent.includes('Difficulty:'));

    if (difficultyLi) {
      const difficultyText = difficultyLi.textContent.toLowerCase();

      // NEW: Check for "unknown" difficulty first
      if (difficultyText.includes('unknown')) {
        entry.classList.add('difficulty-unknown');
      } else {
        // This is the old logic for numbered difficulties
        const difficultyValue = parseInt(difficultyText.split(':')[1].trim(), 10);

        if (difficultyValue > 950) {
          entry.classList.add('difficulty-mythic');
        } else if (difficultyValue > 900) {
          entry.classList.add('difficulty-legendary');
        } else if (difficultyValue > 800) {
          entry.classList.add('difficulty-epic');
        } else if (difficultyValue > 700) {
          entry.classList.add('difficulty-rare');
        }
      }
    }
  });
});