---
layout: page
title: The Workbench
permalink: /tools/
---

<link rel="stylesheet" href="/assets/tools.css">

<div class="tools-intro">
  <p>AUTHENTICATED USER: <strong>GUEST</strong></p>
</div>

<h2 class="category-header">Secret Multiverse Solvers</h2>

<section class="tool-selector">
  <div class="tool-grid">
    <div class="tool-card active" onclick="switchTool('loopover', this)">
      <div class="tool-icon">🧩</div>
      <div class="tool-info">
        <h3>Loopover</h3>
        <p>A 5x5 grid with alphabets.</p>
      </div>
    </div>
    <div class="tool-card" onclick="switchTool('primes', this)">
      <div class="tool-icon">🔢</div>
      <div class="tool-info">
        <h3>Prime Factorization</h3>
        <p>Factor primes!</p>
      </div>
    </div>
    <div class="tool-card" onclick="switchTool('binary', this)">
      <div class="tool-icon">▦</div>
      <div class="tool-info">
        <h3>Binary Grid</h3>
        <p>7-Bit Grid</p>
      </div>
    </div>
    <div class="tool-card" onclick="switchTool('morse', this)">
      <div class="tool-icon">∿</div>
      <div class="tool-info">
        <h3>Morse Code</h3>
        <p>Decoder/Encoder</p>
      </div>
    </div>
  </div>
</section>

<hr class="separator">

<section id="workspace" class="workspace">
  
  <div id="view-loopover" class="tool-view active">
    <div class="tool-header">
      <h2>Loopover</h2>
      <div class="header-controls">
         <button class="cyber-btn small" id="edit-btn" onclick="toggleEditMode()">✎ EDIT MODE</button>
         <button class="cyber-btn small" onclick="importString()">📥 IMPORT</button>
      </div>
      <p id="status-text" style="font-size: 0.9em; color: #aaa; margin-top: 10px;">
        Click arrows to shift. <span id="guide-status" style="display:none; font-weight:bold; color: #ff00ff;">GUIDE ACTIVE</span>
      </p>
    </div>

    <div class="loopover-layout">
      <div class="loopover-container">
        <div class="col-controls top" id="col-controls-top"></div>
        <div class="grid-middle-row">
          <div class="row-controls left" id="row-controls-left"></div>
          <div id="loopover-grid" class="loopover-grid"></div>
          <div class="row-controls right" id="row-controls-right"></div>
        </div>
        <div class="col-controls bottom" id="col-controls-bottom"></div>
        
        <div class="tool-actions">
          <button class="cyber-btn warning" onclick="scrambleGrid()">⚠ SCRAMBLE</button>
          <button class="cyber-btn" onclick="resetGrid()">↻ RESET</button>
        </div>
      </div>

      <div class="solver-panel">
        <div class="solver-header">
          <h3>Algorithm</h3>
          <button class="cyber-btn small" onclick="calculateSolution()">SOLVE</button>
        </div>
        <div id="solver-log" class="solver-log">
          <span class="placeholder-text">Awaiting input...</span>
        </div>
        
        <div class="step-controls" id="step-controls" style="display:none;">
           <button class="step-btn" onclick="prevStep()">◄ PREV</button>
           <span id="step-counter">0 / 0</span>
           <button class="step-btn" onclick="nextStep()">NEXT ►</button>
        </div>

        <div class="solver-footer">
          <small id="move-count">0 Moves</small>
        </div>
      </div>
    </div>
  </div>

  <div id="view-primes" class="tool-view" style="display:none;">
    <div class="tool-header">
      <h2>Prime Factorization</h2>
      <p style="color: #888;">Enter a number to reduce it to its primes.</p>
    </div>

    <div class="prime-container">
      <div class="prime-input-area">
        <input type="number" id="prime-input" class="cyber-input" placeholder="Enter Number (e.g., 27)" onkeydown="if(event.key==='Enter') solvePrimes()">
        <button class="cyber-btn" onclick="solvePrimes()">ANALYZE</button>
      </div>

      <div class="prime-grid">
        <div class="prime-cell" id="p-2"><span class="p-label">2</span><span class="p-val">0</span></div>
        <div class="prime-cell" id="p-3"><span class="p-label">3</span><span class="p-val">0</span></div>
        <div class="prime-cell" id="p-5"><span class="p-label">5</span><span class="p-val">0</span></div>
        <div class="prime-cell" id="p-7"><span class="p-label">7</span><span class="p-val">0</span></div>
        <div class="prime-cell" id="p-11"><span class="p-label">11</span><span class="p-val">0</span></div>
        <div class="prime-cell" id="p-13"><span class="p-label">13</span><span class="p-val">0</span></div>
        <div class="prime-cell" id="p-17"><span class="p-label">17</span><span class="p-val">0</span></div>
        <div class="prime-cell" id="p-19"><span class="p-label">19</span><span class="p-val">0</span></div>
        <div class="prime-cell" id="p-23"><span class="p-label">23</span><span class="p-val">0</span></div>
        <div class="prime-cell" id="p-29"><span class="p-label">29</span><span class="p-val">0</span></div>
      </div>
      
      <div class="prime-footer" id="prime-result-text">
        Waiting for input...
      </div>
    </div>
  </div>

  <div id="view-binary" class="tool-view" style="display:none;">
    <div class="tool-header">
      <h2>Binary Lattice Decoder</h2>
      <p style="color: #888;">Input coordinates. Red = 1, Black = 0.</p>
    </div>

    <div class="binary-container">
      <div class="binary-controls">
        <div class="input-group">
          <label>VERTICAL (Rows)</label>
          <input type="number" id="bin-v" class="cyber-input small" placeholder="0-127">
        </div>
        <div class="input-group">
          <label>HORIZONTAL (Cols)</label>
          <input type="number" id="bin-h" class="cyber-input small" placeholder="0-127">
        </div>
      </div>

      <div class="binary-solver-layout">
        <div class="bin-corner"></div>
        <div id="bin-col-labels" class="bin-labels-top"></div>
        <div id="bin-row-labels" class="bin-labels-left"></div>
        <div id="binary-grid" class="binary-grid"></div>
      </div>
    </div>
  </div>

  <div id="view-morse" class="tool-view" style="display:none;">
    <div class="tool-header">
      <h2>Telegraph Uplink</h2>
      <p style="color: #888;">Bi-directional translation. Type in either terminal.</p>
    </div>

    <div class="morse-container">
      
      <div class="morse-panel">
        <div class="panel-label">PLAINTEXT // INPUT</div>
        <textarea id="morse-text" class="cyber-textarea" placeholder="ENTER MESSAGE..." oninput="updateMorse('text')"></textarea>
      </div>

      <div class="morse-controls">
        <button class="cyber-btn small" onclick="clearMorse()">CLEAR SYSTEM</button>
        <div class="direction-indicator">↕</div>
        <button class="cyber-btn" onclick="playMorseAudio()">🔊 TRANSMIT</button>
      </div>

      <div class="morse-panel">
        <div class="panel-label">SIGNAL // OUTPUT (. -)</div>
        <textarea id="morse-code" class="cyber-textarea" placeholder="... --- ..." oninput="updateMorse('code')"></textarea>
      </div>

    </div>
  </div>

</section>

<script src="/assets/multiverse.js"></script>

<script>
  function switchTool(toolId, card) {
    document.querySelectorAll('.tool-view').forEach(el => el.style.display = 'none');
    document.getElementById('view-' + toolId).style.display = 'block';
    
    document.querySelectorAll('.tool-card').forEach(el => el.classList.remove('active'));
    card.classList.add('active');
  }
</script>