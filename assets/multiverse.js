const SIZE = 5;
const SOLVED_STATE = "ABCDEFGHIJKLMNOPQRSTUVWXY".split('');
const SOLVE_ORDER = [
    "A","B","C","D","F", 
    "G","H","I","K","L",
    "M","N","P","Q","R",
    "S","E","J","O","U", 
    "V","W","X","Y","T"
];
const INSERT_POS = [
    [0,0],[0,1],[0,2],[0,3], 
    [1,4],[1,4],[1,4],[1,4], 
    [2,4],[2,4],[2,4],[2,4], 
    [3,4],[3,4],[3,4],[3,4], 
    [4,4],[4,4],[4,4],[4,4], 
    [4,4],[4,4],[4,4],[4,4]  
]; 

let state = {
    grid: [...SOLVED_STATE],
    isEditing: false,
    editIndex: -1,
    solution: [], 
    stepIndex: 0,
    subStepIndex: 0, 
    guideActive: false
};

document.addEventListener('DOMContentLoaded', () => {
	if(document.getElementById('loopover-grid')) {
        initUI();
        renderGrid();
    }
	const vIn = document.getElementById('bin-v');
    const hIn = document.getElementById('bin-h');
    
    if(vIn && hIn) {
        vIn.addEventListener('input', solveBinary);
        hIn.addEventListener('input', solveBinary);
        solveBinary();
    }
});

function initUI() {
    const createBtn = (symbol, id, cb) => {
        const d = document.createElement('div');
        d.className = 'arrow-btn';
        d.id = id;
        d.innerText = symbol;
        d.onclick = cb;
        return d;
    };    
    const top = document.getElementById('col-controls-top');
    const btm = document.getElementById('col-controls-bottom');
    const left = document.getElementById('row-controls-left');
    const right = document.getElementById('row-controls-right');    
	top.innerHTML = ''; btm.innerHTML = ''; left.innerHTML = ''; right.innerHTML = '';    
	for(let i=0; i<SIZE; i++) {
        top.appendChild(createBtn('▲', `col-${i}-up`, () => performMove('col', i, -1, true)));
        btm.appendChild(createBtn('▼', `col-${i}-down`, () => performMove('col', i, 1, true)));
        left.appendChild(createBtn('◄', `row-${i}-left`, () => performMove('row', i, -1, true)));
        right.appendChild(createBtn('►', `row-${i}-right`, () => performMove('row', i, 1, true)));
    }    
    
    document.addEventListener('keydown', (e) => {
        if(!state.isEditing) return;
        const key = e.key.toUpperCase();
        if(state.editIndex > -1 && key.length === 1 && key.match(/[A-Z]/)) {
            state.grid[state.editIndex] = key;
            state.editIndex = (state.editIndex + 1) % 25;
            renderGrid();
        }
    });
}

const mod = (n, m) => ((n % m) + m) % m;

function performMove(type, index, dir, isUserAction = false) {
    if(state.isEditing && isUserAction) return;    
    if(type === 'row') {
        const start = index * SIZE;
        const row = state.grid.slice(start, start + SIZE);
        const newRow = Array(SIZE);
        for(let i=0; i<SIZE; i++) {
            newRow[i] = row[mod(i - dir, SIZE)];
        }
        for(let i=0; i<SIZE; i++) state.grid[start + i] = newRow[i];
    } else {
        const col = [];
        for(let i=0; i<SIZE; i++) col.push(state.grid[i * SIZE + index]);
        const newCol = Array(SIZE);
        for(let i=0; i<SIZE; i++) {
            newCol[i] = col[mod(i - dir, SIZE)];
        }
        for(let i=0; i<SIZE; i++) state.grid[i * SIZE + index] = newCol[i];
    }    
    if(state.guideActive && isUserAction) {
        verifyGuideStep(type, index, dir);
    } else {
        if(state.guideActive && isUserAction) stopGuide(); 
    }    
    renderGrid();
}

function renderGrid() {
    const container = document.getElementById('loopover-grid');
    if(!container) return;
    container.innerHTML = '';
    
    if(state.isEditing) container.classList.add('editing');
    else container.classList.remove('editing');    
	state.grid.forEach((char, idx) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.innerText = char;
        if(!state.isEditing && char === SOLVED_STATE[idx]) {
            tile.classList.add('correct');
        }        
        if(state.isEditing && idx === state.editIndex) {
            tile.classList.add('selected');
        }        
        tile.onclick = () => {
            if(state.isEditing) {
                state.editIndex = idx;
                renderGrid();
            }
        };        
        container.appendChild(tile);
    });
}

function toggleEditMode() {
    state.isEditing = !state.isEditing;
    stopGuide();
    const btn = document.getElementById('edit-btn');
    const status = document.getElementById('status-text');
    
    if(state.isEditing) {
        state.editIndex = 0;
        btn.innerText = "✎ EDIT: ON";
        btn.style.borderColor = "#00ff00";
        status.innerText = "Type A-Y to fill grid.";
    } else {
        state.editIndex = -1;
        btn.innerText = "✎ EDIT MODE";
        btn.style.borderColor = "";
        status.innerText = "Click arrows to shift.";
    }
    renderGrid();
}

function importString() {
    const str = prompt("Enter 25 characters (A-Y) for the grid:");
    if(!str) return;
    const clean = str.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 25);
    if(clean.length !== 25) {
        alert("String must contain exactly 25 letters.");
        return;
    }
    state.grid = clean.split('');
    if(state.isEditing) toggleEditMode(); 
    stopGuide();
    renderGrid();
}

function scrambleGrid() {
    stopGuide();
    if(state.isEditing) toggleEditMode();
    for(let k=0; k<50; k++) {
        const type = Math.random() > 0.5 ? 'row' : 'col';
        const idx = Math.floor(Math.random() * SIZE);
        const dir = Math.random() > 0.5 ? 1 : -1;
        performMove(type, idx, dir, false);
    }
}

function resetGrid() {
    stopGuide();
    state.grid = [...SOLVED_STATE];
    renderGrid();
}


class SolverSim {
    constructor(initialGrid) {
        this.data = [...initialGrid];
        this.cursorX = 2;
        this.cursorY = 2;
        this.moves = [];
    }    
    adjustCursor() {
        if (this.cursorX < 0) this.cursorX += 5;
        if (this.cursorY < 0) this.cursorY += 5;
        if (this.cursorX > 4) this.cursorX -= 5;
        if (this.cursorY > 4) this.cursorY -= 5;
    }    
    deferAmount(amount) {
        if (amount >= 3) return amount - 5;
        else if (amount <= -3) return amount + 5;
        return amount;
    }    
    moveRow(row, amount) {
        if (this.cursorX === row) { this.adjustCursor(); row = this.cursorX; }
        if (this.cursorY === row) { this.adjustCursor(); row = this.cursorY; }
        amount = this.deferAmount(amount);
        const start = row * SIZE;
        const temp = this.data.slice(start, start + SIZE);
        for(let i=0; i<SIZE; i++) this.data[start + i] = temp[mod(i - amount, SIZE)];
        const absAmt = Math.abs(amount);
        for(let i=0; i<absAmt; i++) {
            if(amount > 0) {
                this.moves.push({ type: 'row', index: row, dir: 1, count: 1 });
                this.cursorX++;
            } else {
                this.moves.push({ type: 'row', index: row, dir: -1, count: 1 });
                this.cursorX--;
            }
        }
        this.adjustCursor();
    }    
    moveCol(col, amount) {
        if (this.cursorX === col) { this.adjustCursor(); col = this.cursorX; }
        if (this.cursorY === col) { this.adjustCursor(); col = this.cursorY; }        
        amount = this.deferAmount(amount);        
        const temp = [];
        for(let i=0; i<SIZE; i++) temp.push(this.data[i*SIZE + col]);
        for(let i=0; i<SIZE; i++) this.data[i*SIZE + col] = temp[mod(i + amount, SIZE)];
        const absAmt = Math.abs(amount);
        for(let i=0; i<absAmt; i++) {
            if(amount > 0) {
                this.moves.push({ type: 'col', index: col, dir: -1, count: 1 }); 
                this.cursorY--;
            } else {
                this.moves.push({ type: 'col', index: col, dir: 1, count: 1 }); 
                this.cursorY++;
            }
        }
        this.adjustCursor();
    }    
    getLoc(char) {
        const idx = this.data.indexOf(char);
        return [Math.floor(idx / SIZE), idx % SIZE];
    }    
    navigateCursor(letter) {
        let [targetY, targetX] = this.getLoc(letter);
        if (targetX > this.cursorX && targetX >= this.cursorX + 3) targetX -= 5;
        else if (targetX < this.cursorX && targetX <= this.cursorX - 3) targetX += 5;        
        if (targetY > this.cursorY && targetY >= this.cursorY + 3) targetY -= 5;
        else if (targetY < this.cursorY && targetY <= this.cursorY - 3) targetY += 5;        
        this.cursorX = mod(targetX, 5);
        this.cursorY = mod(targetY, 5);
    }    
    firstAlgorithm() {
        this.moveCol(this.cursorX, -1); 
        this.moveRow(this.cursorY, 1);  
        this.cursorY--; 
        this.cursorX--; 
        this.moveCol(this.cursorX, 1);  
        this.cursorX++; 
        this.cursorY += 2; 
    }    
    secondAlgorithm() {
        let moveDownValue = -1 * (4 - this.cursorY);
        this.moveCol(this.cursorX, moveDownValue);
        this.moveRow(this.cursorY, -1); 
        this.cursorX++; 
        this.moveCol(this.cursorX, -moveDownValue);
        this.cursorY += Math.abs(moveDownValue); 
        this.cursorX--; 
        this.moveRow(this.cursorY, 1); 
        this.moveCol(this.cursorX, 1); 
    }    
    thirdAlgorithm() {
        let moveRightValue = (4 - this.cursorX);
        this.moveRow(this.cursorY, moveRightValue);
        this.moveCol(this.cursorX, -1); 
        this.cursorY--; 
        this.moveRow(this.cursorY, -moveRightValue);
        this.cursorX += moveRightValue; 
        this.moveCol(this.cursorX, 1); 
        this.cursorY++; 
        this.moveRow(this.cursorY, -1); 
    }    
    moveItemBelowTarget(amount) {
        this.moveCol(this.cursorX, amount);
    }
}

function calculateSolution() {
    const log = document.getElementById('solver-log');
    const moveCount = document.getElementById('move-count');
    let flat = state.grid.join('');
    if(flat.split('').sort().join('') !== SOLVED_STATE.join('')) {
        log.innerHTML = `<span style="color:red">Error: Grid must contain exactly one of each letter A-Y.</span>`;
        return;
    }    
    const sim = new SolverSim(state.grid);
    for(let i=0; i<23; i++) {
        let char = SOLVE_ORDER[i];
        let targetPos = INSERT_POS[i];
        sim.navigateCursor(char);
        let targetY = targetPos[0];
        let targetX = targetPos[1];        
        if (sim.cursorY === targetY && sim.cursorX === targetX) {
            if(i > 18) sim.moveRow(targetY, -1); 
            else if(i > 17) sim.moveCol(targetX, 2); 
            else if(i > 15) sim.moveCol(targetX, 1); 
            else if(i > 3) sim.moveRow(targetY, -1); 
        } else {
            if (i < 4) { 
                if (sim.cursorY > 0) {
                    sim.moveRow(sim.cursorY, targetX - sim.cursorX);
                    sim.moveCol(sim.cursorX, sim.cursorY - targetY);
                } else {
                    sim.firstAlgorithm();
                    sim.moveRow(sim.cursorY, targetX - sim.cursorX);
                    sim.moveCol(sim.cursorX, sim.cursorY - targetY);
                }
            } else if (i < 16) { 
                if (targetY === sim.cursorY && targetX > sim.cursorX) sim.firstAlgorithm();
                if (targetY >= sim.cursorY && targetX < sim.cursorX) sim.moveItemBelowTarget(sim.cursorY - targetY - 1);
                sim.moveRow(sim.cursorY, targetX - sim.cursorX);
                sim.moveCol(sim.cursorX, sim.cursorY - targetY);
                sim.moveRow(targetY, -1);
            } else if (i < 19) { 
                if (sim.cursorY >= INSERT_POS[i][0]) {
                    sim.moveRow(sim.cursorY, targetX - sim.cursorX);
                    sim.moveCol(sim.cursorX, sim.cursorY - targetY + 1);
                } else {
                    sim.secondAlgorithm();
                    sim.moveRow(sim.cursorY, targetX - sim.cursorX);
                    sim.moveCol(sim.cursorX, sim.cursorY - targetY + 1);
                }
                if (i === 18) sim.moveCol(4, 1); 
            } else { 
                if (sim.cursorY === 3) {
                    sim.moveCol(sim.cursorX, -1);
                    sim.moveRow(sim.cursorY, -1);
                    sim.cursorX++; 
                    sim.moveCol(sim.cursorX, 1);
                } else {
                    sim.thirdAlgorithm();
                }
            }
        }
    }    
    let raw = sim.moves;
    let optimized = [];
    if(raw.length > 0) {
        let current = raw[0];
        let count = 1;
        for(let k=1; k<raw.length; k++) {
            let next = raw[k];
            if(next.type === current.type && next.index === current.index && next.dir === current.dir) {
                count++;
            } else {
                optimized.push({ ...current, count });
                current = next;
                count = 1;
            }
        }
        optimized.push({ ...current, count });
    }    
    state.solution = optimized;
    state.stepIndex = 0;
    state.subStepIndex = 0;
    
    moveCount.innerText = `${raw.length} Moves (${optimized.length} Steps)`;
    
    log.innerHTML = '';
    optimized.forEach((m, idx) => {
        const row = document.createElement('div');
        row.id = `log-step-${idx}`;
        row.className = 'log-line'; 
        let desc = m.type === 'row' ? 'Row' : 'Col';
        let arrow = '';
        if(m.type === 'row') arrow = m.dir === 1 ? '►' : '◄';
        else arrow = m.dir === 1 ? '▼' : '▲';
        row.innerHTML = `<span class="step-num">${idx+1}.</span> ${desc} <b>${m.index+1}</b> ${arrow} <small>x${m.count}</small>`;
        log.appendChild(row);
    });    
    startGuide();
}

function startGuide() {
    state.guideActive = true;
    document.getElementById('step-controls').style.display = 'flex';
    document.getElementById('guide-status').style.display = 'inline';
    updateGuideVisuals();
}

function stopGuide() {
    state.guideActive = false;
    document.getElementById('step-controls').style.display = 'none';
    document.getElementById('guide-status').style.display = 'none';
    document.querySelectorAll('.arrow-btn').forEach(b => b.classList.remove('suggested-move'));
    document.querySelectorAll('.log-line').forEach(b => b.style.background = 'transparent');
}

function updateGuideVisuals() {
    document.querySelectorAll('.arrow-btn').forEach(b => b.classList.remove('suggested-move'));
    const logParams = document.getElementById('solver-log').children;
    for(let el of logParams) el.style.background = 'transparent';    
    if(state.stepIndex >= state.solution.length) {
        document.getElementById('status-text').innerText = "SOLVED!";
        return;
    }    
    const move = state.solution[state.stepIndex];
    const remaining = move.count - state.subStepIndex;    
    let btnId = '';
    if(move.type === 'col') {
        btnId = `col-${move.index}-${move.dir === 1 ? 'down' : 'up'}`;
    } else {
        btnId = `row-${move.index}-${move.dir === 1 ? 'right' : 'left'}`;
    }
    const btn = document.getElementById(btnId);
    if(btn) btn.classList.add('suggested-move');    
    
    const logEl = document.getElementById(`log-step-${state.stepIndex}`);
    if(logEl) {
        logEl.style.background = '#222';
        logEl.scrollIntoView({behavior: "smooth", block: "center"});
    }    
    document.getElementById('step-counter').innerText = `${state.stepIndex + 1} / ${state.solution.length}`;
    document.getElementById('status-text').innerText = `Step ${state.stepIndex + 1}: Repeat ${remaining} times`;
}

function verifyGuideStep(type, index, dir) {
    if(state.stepIndex >= state.solution.length) return;    
    const target = state.solution[state.stepIndex];
    if(type === target.type && index === target.index && dir === target.dir) {
        state.subStepIndex++;
        if(state.subStepIndex >= target.count) {
            state.stepIndex++;
            state.subStepIndex = 0;
        }
        updateGuideVisuals();
    } else {
        const btnId = `${type}-${index}-${(type==='row' ? (dir===1?'right':'left') : (dir===1?'down':'up'))}`;
        const btn = document.getElementById(btnId);
        btn.classList.add('wrong-move');
        setTimeout(() => btn.classList.remove('wrong-move'), 400);
    }
}

function nextStep() {
    if(state.stepIndex >= state.solution.length) return;
    const move = state.solution[state.stepIndex];
    const reps = move.count - state.subStepIndex;
    for(let i=0; i<reps; i++) performMove(move.type, move.index, move.dir, false);
    state.stepIndex++;
    state.subStepIndex = 0;
    renderGrid();
    updateGuideVisuals();
}

function prevStep() {
    if(state.stepIndex === 0 && state.subStepIndex === 0) return;
    if(state.subStepIndex > 0) {
        const move = state.solution[state.stepIndex];
        for(let i=0; i<state.subStepIndex; i++) performMove(move.type, move.index, -move.dir, false); 
        state.subStepIndex = 0;
    } else {
        state.stepIndex--;
        const move = state.solution[state.stepIndex];
        for(let i=0; i<move.count; i++) performMove(move.type, move.index, -move.dir, false);
    }
    renderGrid();
    updateGuideVisuals();
}

const TARGET_PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

function solvePrimes() {
    const input = document.getElementById('prime-input').value;
    const num = parseInt(input);
    const resultText = document.getElementById('prime-result-text');
    
    
    TARGET_PRIMES.forEach(p => {
        const el = document.getElementById(`p-${p}`);
        el.querySelector('.p-val').innerText = '0';
        el.classList.remove('active');
    });
	if(isNaN(num) || num <= 1) {
        resultText.innerText = "Please enter a valid integer > 1.";
        return;
    }
	let temp = num;
    let factors = {};
    
    
    TARGET_PRIMES.forEach(p => factors[p] = 0);
    
    
    TARGET_PRIMES.forEach(p => {
        while(temp % p === 0) {
            factors[p]++;
            temp = temp / p;
        }
    });
	
    let foundAny = false;
    TARGET_PRIMES.forEach(p => {
        const count = factors[p];
        const el = document.getElementById(`p-${p}`);
        el.querySelector('.p-val').innerText = count;
        
        if(count > 0) {
            el.classList.add('active');
            foundAny = true;
        }
    });
	
    if(temp > 1) {
        resultText.innerText = `Analysis Incomplete. Residual factor: ${temp} (Not in target spectrum)`;
        resultText.style.color = "#ffaa00";
    } else if (foundAny) {
        resultText.innerText = `Harmonic Decomposition Complete for ${num}.`;
        resultText.style.color = "#00ffff";
    } else {
        resultText.innerText = `No target primes detected in ${num}.`;
        resultText.style.color = "#888";
    }
}

function solveBinary() {
    const vInput = document.getElementById('bin-v').value;
    const hInput = document.getElementById('bin-h').value;
    
    const gridEl = document.getElementById('binary-grid');
    const colLabelsEl = document.getElementById('bin-col-labels');
    const rowLabelsEl = document.getElementById('bin-row-labels');
    
    let vVal = parseInt(vInput) || 0;
    let hVal = parseInt(hInput) || 0;
    
    if(vVal < 0) vVal = 0; if(vVal > 127) vVal = 127;
    if(hVal < 0) hVal = 0; if(hVal > 127) hVal = 127;
    
    
    const vBin = vVal.toString(2).padStart(7, '0');
    const hBin = hVal.toString(2).padStart(7, '0');
    
    
    gridEl.innerHTML = '';
    colLabelsEl.innerHTML = '';
    rowLabelsEl.innerHTML = '';
    
    
    
    for(let c = 0; c < 7; c++) {
        const lbl = document.createElement('div');
        const val = hBin[6 - c]; 
        lbl.className = val === '1' ? 'bin-label on' : 'bin-label';
        lbl.innerText = val;
        colLabelsEl.appendChild(lbl);
    }
    
    
    
    for(let r = 0; r < 7; r++) {
        const lbl = document.createElement('div');
        const val = vBin[r];
        lbl.className = val === '1' ? 'bin-label on' : 'bin-label';
        lbl.innerText = val;
        rowLabelsEl.appendChild(lbl);
    }
    
    
    for(let r = 0; r < 7; r++) {
        for(let c = 0; c < 7; c++) {
            const cell = document.createElement('div');
            cell.className = 'bin-cell';
            
            const rowIsRed = vBin[r] === '1';
            
            const colIsRed = hBin[6 - c] === '1'; 
            
            if (rowIsRed || colIsRed) {
                cell.classList.add('active');
            }
            
            cell.title = `(${c},${r})`;
            gridEl.appendChild(cell);
        }
    }
}

const MORSE_MAP = {
    'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',
    'E': '.',     'F': '..-.',  'G': '--.',   'H': '....',
    'I': '..',    'J': '.---',  'K': '-.-',   'L': '.-..',
    'M': '--',    'N': '-.',    'O': '---',   'P': '.--.',
    'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',
    'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',
    'Y': '-.--',  'Z': '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
    '.': '.-.-.-',',': '--..--','?': '..--..',"'": '.----.', '!': '-.-.--',
    '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
    ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
    '"': '.-..-.', '$': '...-..-','@': '.--.-.', ' ': '/'
};


const REVERSE_MORSE = Object.entries(MORSE_MAP).reduce((acc, [key, val]) => {
    acc[val] = key;
    return acc;
}, {});

function updateMorse(source) {
    const textEl = document.getElementById('morse-text');
    const codeEl = document.getElementById('morse-code');

    if (source === 'text') {
        
        const input = textEl.value.toUpperCase();
        let output = "";
        
        for (let char of input) {
            if (MORSE_MAP[char]) {
                output += MORSE_MAP[char] + " ";
            } else if (char === '\n') {
                output += "\n";
            } else {
                output += "? "; 
            }
        }
        codeEl.value = output.trim();
    } else {
        
        const input = codeEl.value.trim();
        let output = "";
        const tokens = input.replace(/\n/g, ' \n ').split(/\s+/);
        
        for (let token of tokens) {
            if (token === '\n') {
                output += "\n";
            } else if (REVERSE_MORSE[token]) {
                output += REVERSE_MORSE[token];
            } else if (token === '/') {
                output += " ";
            } else if (token === '') {
                continue;
            } else {
                output += "#"; 
            }
        }
        textEl.value = output;
    }
}

function clearMorse() {
    document.getElementById('morse-text').value = '';
    document.getElementById('morse-code').value = '';
}

let audioCtx = null;

function playMorseAudio() {
    const code = document.getElementById('morse-code').value;
    if (!code) return;
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const UNIT = 60; 
    let time = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 600; 
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(time);
    gain.gain.setValueAtTime(0, time); 

    for (let char of code) {
        if (char === '.') {
            gain.gain.setValueAtTime(1, time);
            time += UNIT / 1000;
            gain.gain.setValueAtTime(0, time);
            time += UNIT / 1000; 
        } else if (char === '-') {
            gain.gain.setValueAtTime(1, time);
            time += (UNIT * 3) / 1000;
            gain.gain.setValueAtTime(0, time);
            time += UNIT / 1000; 
        } else if (char === ' ' || char === '/') {
            time += (UNIT * 3) / 1000; 
        }
    }
    osc.stop(time + 1);
}