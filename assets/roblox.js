let currentDiffIndex = -1;
let diffElements = [];

function toggleRobloxOptions() {
    const isRoblox = document.getElementById('chk-roblox').checked;
    const optionsDiv = document.getElementById('roblox-options');
    
    if (isRoblox) {
        optionsDiv.classList.remove('hidden');
    } else {
        optionsDiv.classList.add('hidden');
    }
}

function computeDiff() {
    const rawLeft = document.getElementById('text-left').value;
    const rawRight = document.getElementById('text-right').value;
    const outputDiv = document.getElementById('diff-output');
    const statusSpan = document.getElementById('diff-status');
    
    
    currentDiffIndex = -1;
    diffElements = [];
    outputDiv.innerHTML = '<div class="diff-line header">Processing...</div>';
    statusSpan.innerText = "Processing...";

    
    let left = rawLeft;
    let right = rawRight;

    if (document.getElementById('chk-roblox').checked) {
        
        
        if (document.getElementById('chk-ref').checked) {
            left = left.replace(/referent="[^"]*"/g, 'referent="[IGNORED]"');
            right = right.replace(/referent="[^"]*"/g, 'referent="[IGNORED]"');
            left = left.replace(/(<Ref.*?>).*?(<\/Ref>)/gs, '$1[IGNORED]$2');
            right = right.replace(/(<Ref.*?>).*?(<\/Ref>)/gs, '$1[IGNORED]$2');
        }
        
        
        if (document.getElementById('chk-cframe').checked) {
            left = left.replace(/(<CoordinateFrame.*?>).*?(<\/CoordinateFrame>)/gs, '$1[IGNORED]$2');
            right = right.replace(/(<CoordinateFrame.*?>).*?(<\/CoordinateFrame>)/gs, '$1[IGNORED]$2');
        }

        
        if (document.getElementById('chk-guid').checked) {
            
            
            const guidRegex = /(<string name="ScriptGuid">).*?(<\/string>)/g;
            left = left.replace(guidRegex, '$1[IGNORED]$2');
            right = right.replace(guidRegex, '$1[IGNORED]$2');
        }
    }

    if (left === right) {
        outputDiv.innerHTML = '<div class="diff-line header">✅ Files are IDENTICAL.</div>';
        statusSpan.innerText = "Identical files";
        return;
    }

    
    const leftLines = left.split(/\r?\n/);
    const rightLines = right.split(/\r?\n/);
    
    const diff = getDiff(leftLines, rightLines);

    
    let html = "";
    let changeCount = 0;

    diff.forEach(part => {
        const type = part.added ? 'add' : part.removed ? 'rem' : 'same';
        const prefix = part.added ? '+ ' : part.removed ? '- ' : '  ';
        const content = escapeHtml(part.value);
        
        const lines = content.split('\n');
        
        lines.forEach(line => {
            if (lines.length > 1 && line === "") return;
            
            
            const isDiff = (type === 'add' || type === 'rem');
            const navClass = isDiff ? 'diff-marker' : '';
            if(isDiff) changeCount++;
            
            html += `<div class="diff-line ${type} ${navClass}">${prefix}${line}</div>`;
        });
    });

    outputDiv.innerHTML = html;
    
    
    diffElements = outputDiv.querySelectorAll('.diff-marker');
    statusSpan.innerText = `${changeCount} differences found`;
}

function jumpNextDiff() {
    if (diffElements.length === 0) return;
    
    
    if(currentDiffIndex >= 0 && currentDiffIndex < diffElements.length) {
        diffElements[currentDiffIndex].classList.remove('highlight');
    }

    currentDiffIndex++;
    
    
    if (currentDiffIndex >= diffElements.length) {
        if(confirm("End of document reached. Wrap to top?")) {
            currentDiffIndex = 0;
        } else {
            currentDiffIndex = diffElements.length - 1; 
            return;
        }
    }

    highlightAndScroll(currentDiffIndex);
}

function jumpPrevDiff() {
    if (diffElements.length === 0) return;

    
    if(currentDiffIndex >= 0 && currentDiffIndex < diffElements.length) {
        diffElements[currentDiffIndex].classList.remove('highlight');
    }

    currentDiffIndex--;
    
    
    if (currentDiffIndex < 0) {
        if(confirm("Start of document reached. Wrap to bottom?")) {
            currentDiffIndex = diffElements.length - 1;
        } else {
            currentDiffIndex = 0; 
            return;
        }
    }

    highlightAndScroll(currentDiffIndex);
}

function highlightAndScroll(index) {
    const el = diffElements[index];
    el.classList.add('highlight');
    
    
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function escapeHtml(text) {
    if (!text) return text;
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    e.target.classList.add('drag-active');
}
document.addEventListener('dragleave', (e) => {
    if(e.target.classList && e.target.classList.contains('code-textarea')) {
        e.target.classList.remove('drag-active');
    }
});
function handleDrop(e, targetId) {
    e.preventDefault();
    e.stopPropagation();
    const targetEl = document.getElementById(targetId);
    targetEl.classList.remove('drag-active');
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = function(e) { targetEl.value = e.target.result; };
        reader.readAsText(file);
    }
}


function getDiff(oldLines, newLines) {
    const N = oldLines.length;
    const M = newLines.length;
    let dp = Array(N + 1).fill(0).map(() => Array(M + 1).fill(0));
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= M; j++) {
            if (oldLines[i - 1] === newLines[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    let i = N, j = M;
    let result = [];
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
            result.push({ value: oldLines[i - 1], added: false, removed: false });
            i--; j--;
        } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            result.push({ value: newLines[j - 1], added: true, removed: false });
            j--;
        } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
            result.push({ value: oldLines[i - 1], added: false, removed: true });
            i--;
        }
    }
    return result.reverse();
}