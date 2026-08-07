// Virtual Abacus - Soroban Style
// Upper bead (heaven) = 5, Lower beads (earth) = 1 each

let columns = 7;

// State: for each column, track upper bead (0 or 1) and lower beads (0-4)
let state = [];

function initState() {
    state = [];
    for (let i = 0; i < columns; i++) {
        state.push({
            upper: 0,  // 0 = not active, 1 = active (worth 5)
            lower: 0   // 0-4 beads active (each worth 1)
        });
    }
}

function buildAbacus() {
    const abacus = document.getElementById('abacus');
    abacus.innerHTML = '';

    // Create upper section container
    const upperContainer = document.createElement('div');
    upperContainer.className = 'upper-section-container';

    // Create divider bar with red markers on specific columns
    const dividerBar = document.createElement('div');
    dividerBar.className = 'divider-bar';

    // Add markers - dots only on specific columns (every 3rd from right for thousands)
    for (let col = 0; col < columns; col++) {
        const marker = document.createElement('div');
        marker.className = 'divider-marker';

        // Add dot on columns: position from right (0-indexed)
        // Dots at positions 3, 6, 9... (thousands, millions, billions markers)
        const posFromRight = columns - 1 - col;
        if (posFromRight === 3 || posFromRight === 6 || posFromRight === 9 || posFromRight === 12) {
            marker.classList.add('has-dot');
        }

        dividerBar.appendChild(marker);
    }

    // Create lower section container
    const lowerContainer = document.createElement('div');
    lowerContainer.className = 'lower-section-container';

    for (let col = 0; col < columns; col++) {
        // Upper column with rod and 1 bead
        const upperColumn = document.createElement('div');
        upperColumn.className = 'upper-column';
        upperColumn.dataset.col = col;

        const upperRod = document.createElement('div');
        upperRod.className = 'rod';
        upperColumn.appendChild(upperRod);

        const upperBead = document.createElement('div');
        upperBead.className = 'bead';
        upperBead.dataset.col = col;
        upperBead.dataset.type = 'upper';
        upperBead.addEventListener('click', handleBeadClick);
        upperColumn.appendChild(upperBead);

        upperContainer.appendChild(upperColumn);

        // Lower column with rod and 4 beads
        const lowerColumn = document.createElement('div');
        lowerColumn.className = 'lower-column';
        lowerColumn.dataset.col = col;

        const lowerRod = document.createElement('div');
        lowerRod.className = 'rod';
        lowerColumn.appendChild(lowerRod);

        for (let b = 0; b < 4; b++) {
            const bead = document.createElement('div');
            bead.className = 'bead';
            bead.dataset.col = col;
            bead.dataset.type = 'lower';
            bead.dataset.index = b;
            bead.addEventListener('click', handleBeadClick);
            lowerColumn.appendChild(bead);
        }

        lowerContainer.appendChild(lowerColumn);
    }

    abacus.appendChild(upperContainer);
    abacus.appendChild(dividerBar);
    abacus.appendChild(lowerContainer);

    updateBeadPositions();
    updateDisplay();
}

function handleBeadClick(e) {
    const col = parseInt(e.target.dataset.col);
    const type = e.target.dataset.type;

    if (type === 'upper') {
        // Toggle upper bead - moves down toward divider when active
        state[col].upper = state[col].upper === 0 ? 1 : 0;
    } else {
        // Lower bead clicked
        // Index 0 = top bead (closest to divider)
        // Index 3 = bottom bead (farthest from divider)
        const index = parseInt(e.target.dataset.index);

        // Check if clicked bead is active (pushed up toward divider)
        const isActive = index < state[col].lower;

        if (isActive) {
            // Click active bead - pull it and beads below back down
            state[col].lower = index;
        } else {
            // Click inactive bead - push it and beads above up toward divider
            state[col].lower = index + 1;
        }
    }

    updateBeadPositions();
    updateDisplay();
}

function updateBeadPositions() {
    // Update upper beads
    const upperColumns = document.querySelectorAll('.upper-column');
    upperColumns.forEach((colEl, colIndex) => {
        const upperBead = colEl.querySelector('.bead');
        if (state[colIndex].upper === 1) {
            upperBead.classList.add('active');
        } else {
            upperBead.classList.remove('active');
        }
    });

    // Update lower beads
    const lowerColumns = document.querySelectorAll('.lower-column');
    lowerColumns.forEach((colEl, colIndex) => {
        const lowerBeads = colEl.querySelectorAll('.bead');
        lowerBeads.forEach((bead, beadIndex) => {
            // Beads are activated from top (closest to divider)
            // index 0 is top bead, index 3 is bottom bead
            // If lower = 2, then beads at index 0 and 1 are active
            if (beadIndex < state[colIndex].lower) {
                bead.classList.add('active');
            } else {
                bead.classList.remove('active');
            }
        });
    });
}

function updateDisplay() {
    let total = 0;

    for (let i = 0; i < columns; i++) {
        const placeValue = Math.pow(10, columns - 1 - i);
        const columnValue = (state[i].upper * 5) + state[i].lower;
        total += columnValue * placeValue;
    }

    document.getElementById('value').textContent = total.toLocaleString();
}

function clearAbacus() {
    initState();
    updateBeadPositions();
    updateDisplay();
}

function handleRodCountChange() {
    const input = document.getElementById('rodCount');
    let newCount = parseInt(input.value);

    // Clamp value
    if (isNaN(newCount) || newCount < 1) newCount = 1;
    if (newCount > 15) newCount = 15;

    input.value = newCount;
    columns = newCount;
    initState();
    buildAbacus();
}

// Mobile sidebar functions
function openMobileSidebar() {
    document.getElementById('mobileSidebar').classList.add('active');
    document.getElementById('mobileOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileSidebar() {
    document.getElementById('mobileSidebar').classList.remove('active');
    document.getElementById('mobileOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initState();
    buildAbacus();

    document.getElementById('clearBtn').addEventListener('click', clearAbacus);
    document.getElementById('rodCount').addEventListener('change', handleRodCountChange);
    document.getElementById('mobileMenuBtn').addEventListener('click', openMobileSidebar);
    document.getElementById('closeMenuBtn').addEventListener('click', closeMobileSidebar);
    document.getElementById('mobileOverlay').addEventListener('click', closeMobileSidebar);
});
