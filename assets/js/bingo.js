document.addEventListener("DOMContentLoaded", () => {
  
  
  const yearButtons = document.querySelectorAll('.year-btn');
  const boardContainers = document.querySelectorAll('.bingo-board-container');

  yearButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      
      yearButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      
      boardContainers.forEach(board => board.classList.add('hidden-board'));
      
      
      const targetId = btn.getAttribute('data-target');
      document.getElementById(targetId).classList.remove('hidden-board');
    });
  });

  
  const tickedCells = document.querySelectorAll(".bingo-cell.ticked");
  const modal = document.getElementById("bingo-modal");
  const closeModalBtn = document.getElementById("close-modal");
  
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalImageContainer = document.getElementById("modal-image-container");
  const modalImage = document.getElementById("modal-image");

  
  tickedCells.forEach(cell => {
    cell.addEventListener("click", () => {
      
      const title = cell.getAttribute("data-title");
      const desc = cell.getAttribute("data-desc");
      const imgSrc = cell.getAttribute("data-image");

      
      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      
      if (imgSrc && imgSrc.trim() !== "") {
        modalImage.src = imgSrc;
        modalImageContainer.classList.remove("hidden");
      } else {
        modalImage.src = "";
        modalImageContainer.classList.add("hidden");
      }

      
      modal.classList.remove("hidden");
    });
  });

  
  const closeModal = () => {
    modal.classList.add("hidden");
  };

  closeModalBtn.addEventListener("click", closeModal);

  
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
});