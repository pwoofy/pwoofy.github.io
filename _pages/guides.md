---
layout: page
title: Guides
permalink: /guides/
---

<div class="guides-grid">
  {% for guide in site.guides %}
    <a href="{{ guide.url }}" class="guide-card">
      {% if guide.banner %}
        <div class="guide-banner" style="background-image: url('{{ guide.banner }}');"></div>
      {% endif %}
      
      <div class="guide-info">
        <h2>{{ guide.title }}</h2>
      </div>
      
    </a>
  {% endfor %}
</div>