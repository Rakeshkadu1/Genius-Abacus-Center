// Virtual Abacus - Soroban Style
// Upper bead = 5
// Lower beads = 1 each

let columns = 17;
let state = [];

// Color sequence
const beadColors = [
    '#F080B8', // 1  Pink
    '#18B866', // 2  Green
    '#FFFFFF', // 3  White
    '#1976D2', // 4  Blue
    '#F5D000', // 5  Yellow
    '#D92B20', // 6  Red
    '#1976D2', // 7  Blue
    '#D92B20', // 8  Red
    '#F5D000', // 9  Yellow
    '#F080B8', // 10 Pink
    '#FFFFFF', // 11 White
    '#18B866', // 12 Green
    '#F080B8', // 13 Pink
    '#18B866', // 14 Green
    '#FFFFFF', // 15 White
    '#F5D000', // 16 Yellow
    '#D92B20'  // 17 Red
];

// ========================================
// INITIAL STATE
// ========================================

function initState() {

    state = [];

    for (let i = 0; i < columns; i++) {

        state.push({
            upper: 0,
            lower: 0
        });

    }
}


// ========================================
// BUILD ABACUS
// ========================================

function buildAbacus() {

    const abacus =
        document.getElementById('abacus');

    if (!abacus) {
        console.error('Abacus element not found');
        return;
    }

    abacus.innerHTML = '';


    // Upper section
    const upperContainer =
        document.createElement('div');

    upperContainer.className =
        'upper-section-container';


    // Divider
    const dividerBar =
        document.createElement('div');

    dividerBar.className =
        'divider-bar';


    // Divider markers
    for (let col = 0; col < columns; col++) {

        const marker =
            document.createElement('div');

        marker.className =
            'divider-marker';

        const posFromRight =
            columns - 1 - col;

        if (
            posFromRight === 3 ||
            posFromRight === 6 ||
            posFromRight === 9 ||
            posFromRight === 12
        ) {
            marker.classList.add('has-dot');
        }

        dividerBar.appendChild(marker);
    }


    // Lower section
    const lowerContainer =
        document.createElement('div');

    lowerContainer.className =
        'lower-section-container';


    // ========================================
    // CREATE RODS
    // ========================================

    for (let col = 0; col < columns; col++) {

        // Get color
        const color =
            beadColors[col % beadColors.length];


        // ====================================
        // UPPER COLUMN
        // ====================================

        const upperColumn =
            document.createElement('div');

        upperColumn.className =
            'upper-column';

        upperColumn.dataset.col = col;


        // Upper rod
        const upperRod =
            document.createElement('div');

        upperRod.className = 'rod';

        upperColumn.appendChild(upperRod);


        // Upper bead
        const upperBead =
            document.createElement('div');

        upperBead.className = 'bead';

        upperBead.style.background =
            color;

        upperBead.dataset.col = col;

        upperBead.dataset.type =
            'upper';

        upperBead.addEventListener(
            'click',
            handleBeadClick
        );

        upperColumn.appendChild(
            upperBead
        );

        upperContainer.appendChild(
            upperColumn
        );


        // ====================================
        // LOWER COLUMN
        // ====================================

        const lowerColumn =
            document.createElement('div');

        lowerColumn.className =
            'lower-column';

        lowerColumn.dataset.col = col;


        // Lower rod
        const lowerRod =
            document.createElement('div');

        lowerRod.className = 'rod';

        lowerColumn.appendChild(
            lowerRod
        );


        // Four lower beads
        for (let b = 0; b < 4; b++) {

            const bead =
                document.createElement('div');

            bead.className = 'bead';

            bead.style.background =
                color;

            bead.dataset.col = col;

            bead.dataset.type =
                'lower';

            bead.dataset.index = b;

            bead.addEventListener(
                'click',
                handleBeadClick
            );

            lowerColumn.appendChild(
                bead
            );
        }

        lowerContainer.appendChild(
            lowerColumn
        );
    }


    // Add to abacus
    abacus.appendChild(
        upperContainer
    );

    abacus.appendChild(
        dividerBar
    );

    abacus.appendChild(
        lowerContainer
    );


    updateBeadPositions();
    updateDisplay();
}


// ========================================
// BEAD CLICK
// ========================================

function handleBeadClick(e) {

    const col =
        parseInt(e.target.dataset.col);

    const type =
        e.target.dataset.type;


    if (type === 'upper') {

        state[col].upper =
            state[col].upper === 0 ? 1 : 0;

    } else {

        const index =
            parseInt(e.target.dataset.index);

        const isActive =
            index < state[col].lower;

        if (isActive) {

            state[col].lower = index;

        } else {

            state[col].lower =
                index + 1;
        }
    }


    updateBeadPositions();
    updateDisplay();
}


// ========================================
// UPDATE BEAD POSITIONS
// ========================================

function updateBeadPositions() {

    const upperColumns =
        document.querySelectorAll(
            '.upper-column'
        );

    upperColumns.forEach(
        (colEl, colIndex) => {

            const upperBead =
                colEl.querySelector('.bead');

            if (
                state[colIndex].upper === 1
            ) {

                upperBead.classList.add(
                    'active'
                );

            } else {

                upperBead.classList.remove(
                    'active'
                );
            }
        }
    );


    const lowerColumns =
        document.querySelectorAll(
            '.lower-column'
        );

    lowerColumns.forEach(
        (colEl, colIndex) => {

            const lowerBeads =
                colEl.querySelectorAll('.bead');

            lowerBeads.forEach(
                (bead, beadIndex) => {

                    if (
                        beadIndex <
                        state[colIndex].lower
                    ) {

                        bead.classList.add(
                            'active'
                        );

                    } else {

                        bead.classList.remove(
                            'active'
                        );
                    }
                }
            );
        }
    );
}


// ========================================
// UPDATE VALUE
// ========================================

function updateDisplay() {

    let total = 0;

    for (let i = 0; i < columns; i++) {

        const placeValue =
            Math.pow(
                10,
                columns - 1 - i
            );

        const columnValue =
            (state[i].upper * 5) +
            state[i].lower;

        total +=
            columnValue * placeValue;
    }


    const valueElement =
        document.getElementById('value');

    if (valueElement) {

        valueElement.textContent =
            total.toLocaleString();
    }
}


// ========================================
// RESET
// ========================================

function clearAbacus() {

    columns = 7;
    document.getElementById('rodCount').value = 7;
    initState();
    buildAbacus();
}


// ========================================
// ROD COUNT CHANGE
// ========================================

function handleRodCountChange() {

    const input =
        document.getElementById('rodCount');

    let newCount =
        parseInt(input.value);


    if (
        isNaN(newCount) ||
        newCount < 1
    ) {
        newCount = 1;
    }


    if (newCount > 15) {
        newCount = 15;
    }


    input.value = newCount;

    columns = newCount;

    initState();

    buildAbacus();
}


// ========================================
// MOBILE
// ========================================

function openMobileSidebar() {

    const sidebar =
        document.getElementById('mobileSidebar');

    const overlay =
        document.getElementById('mobileOverlay');

    if (sidebar) {
        sidebar.classList.add('active');
    }

    if (overlay) {
        overlay.classList.add('active');
    }

    document.body.style.overflow =
        'hidden';
}


function closeMobileSidebar() {

    const sidebar =
        document.getElementById('mobileSidebar');

    const overlay =
        document.getElementById('mobileOverlay');

    if (sidebar) {
        sidebar.classList.remove('active');
    }

    if (overlay) {
        overlay.classList.remove('active');
    }

    document.body.style.overflow = '';
}


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener(
    'DOMContentLoaded',
    function () {

        initState();

        buildAbacus();


        const clearBtn =
            document.getElementById('clearBtn');

        if (clearBtn) {

            clearBtn.addEventListener(
                'click',
                clearAbacus
            );
        }


        const rodCount =
            document.getElementById('rodCount');

        if (rodCount) {

            rodCount.addEventListener(
                'change',
                handleRodCountChange
            );
        }


        const mobileMenuBtn =
            document.getElementById(
                'mobileMenuBtn'
            );

        if (mobileMenuBtn) {

            mobileMenuBtn.addEventListener(
                'click',
                openMobileSidebar
            );
        }


        const closeMenuBtn =
            document.getElementById(
                'closeMenuBtn'
            );

        if (closeMenuBtn) {

            closeMenuBtn.addEventListener(
                'click',
                closeMobileSidebar
            );
        }


        const mobileOverlay =
            document.getElementById(
                'mobileOverlay'
            );

        if (mobileOverlay) {

            mobileOverlay.addEventListener(
                'click',
                closeMobileSidebar
            );
        }

    }
);
