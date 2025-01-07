---
layout: page
title: Gallery
permalink: /gallery/
---

<div class="gallery">
  {% for image in site.data.gallery %}
    <div class="gallery-item">
      <a href="{{ image.link }}" target="_blank">
        <img src="{{ image.url }}" alt="{{ image.title }}" />
      </a>
      <div class="gallery-info">
        <p><strong>Title:</strong> {{ image.title }}</p>
        <p><strong>Artist:</strong> {{ image.artist }}</p>
        {% if image.original_link %}
          <p><a href="{{ image.original_link }}" target="_blank">Original Link</a></p>
        {% endif %}
      </div>
    </div>
  {% endfor %}
</div>