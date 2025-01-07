---
layout: page
title: Gallery
permalink: /gallery/
---
This section of the site will be used to host images of my OC. Artists will be credited properly, and if a post exists for each of these, I will also link it there.<br>
Not every art of my OC is here, obviously. For reasons.

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
        {% if image.extra_note %}
          <p><strong>Note:</strong> {{ image.extra_note }}</p>
        {% endif %}
      </div>
    </div>
  {% endfor %}
</div>