---
layout: page
title: New Years Bingo
permalink: /bingo/
---

<link rel="stylesheet" href="/assets/css/bingo.css">
<script src="/assets/js/bingo.js" defer></script>
each year i do a bingo. there's a lot of aspects that go into these, like rhythm games, hobbies, stuff i like, stuff that defines me, i try to make it harder each year.

<div class="scrapbook-wrapper">

  
  <div class="bingo-switcher">
    <button class="year-btn active" data-target="board-2026">2026</button>
    <button class="year-btn" data-target="board-2025">2025</button>
  </div>
  
  
  <div id="board-2026" class="bingo-board-container">
    <div class="bingo-board">
      <div class="scrapbook-title">
        <div class="tape"></div>
        <h1>pwoofy's 2026 scrapbook bingo</h1>
      </div>

      <div class="bingo-grid">
        {% for cell in site.data.bingo2026 %}
          <div class="bingo-cell {% if cell.ticked == true %}ticked{% endif %} {% if cell.free_space %}free-space{% endif %}" 
            {% if cell.ticked == true %}
            data-title="{{ cell.title | escape }}" 
            data-desc="{{ cell.desc | escape }}" 
            data-image="{{ cell.image }}"
            {% endif %}>
        <span>
            {% if cell.short_title %}{{ cell.short_title }}{% else %}{{ cell.title }}{% endif %}
        </span>
        </div>
        {% endfor %}
      </div>
    </div>
  </div>

  
  <div id="board-2025" class="bingo-board-container hidden-board">
    <div class="bingo-board theme-2025">
      <div class="title-2025">
        <h1>pwoofy new year<br>bingo</h1>
        <hr class="gold-line">
        <p>let's see how much of these i'll do</p>
      </div>

      <div class="bingo-grid">
        {% for cell in site.data.bingo2025 %}
          <div class="bingo-cell {% if cell.ticked == true %}ticked{% endif %} {% if cell.free_space %}free-space{% endif %}" 
            {% if cell.ticked == true %}
            data-title="{{ cell.title | escape }}" 
            data-desc="{{ cell.desc | escape }}" 
            data-image="{{ cell.image }}"
            {% endif %}>
        <span>
            {% if cell.short_title %}{{ cell.short_title }}{% else %}{{ cell.title }}{% endif %}
        </span>
        </div>
        {% endfor %}
      </div>
    </div>
  </div>

</div>


<div id="bingo-modal" class="modal-overlay hidden">
  <div class="modal-content scrapbook-paper">
    <button id="close-modal" class="close-btn">&times;</button>
    <h2 id="modal-title">Title</h2>
    <div id="modal-image-container" class="hidden">
      <img id="modal-image" src="" alt="Bingo Memory">
    </div>
    <p id="modal-desc">Description goes here.</p>
  </div>
</div>