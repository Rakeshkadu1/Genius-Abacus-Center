// ======================================================
// VIRTUAL ABACUS - SOROBAN STYLE
// ======================================================
// Upper bead = 5
// Lower beads = 1 each
// Maximum rods = 17
// ======================================================

let columns = 17;

// State is stored by ACTUAL ROD NUMBER
let state = {};


// ======================================================
// COLOR SEQUENCE
// ======================================================

const beadColors = {
    1: '#F080B8',  // Pink
    2: '#18B866',  // Green
    3: '#FFFFFF',  // White
    4: '#1976D2',  // Blue
    5: '#F5D000',  // Yellow
    6: '#D92B20',  // Red
    7: '#1976D2',  // Blue
    8: '#D92B20',  // Red
    9: '#F5D000',  // Yellow
    10: '#F080B8', // Pink
    11: '#FFFFFF', // White
    12: '#18B866', // Green
    13: '#F080B8', // Pink
    14: '#18B866', // Green
    15: '#FFFFFF', // White
    16: '#F5D000', // Yellow
    17: '#D92B20'  // Red
};


// ======================================================
// RESET / DEFAULT 17 ROD ORDER
// ======================================================
//
// 15 14 10 9 8 4 3 2 1 5 6 7 11 12 13 16 17
//
// ======================================================

const resetRodOrder = [
    15,
    14,
    10,
    9,
    8,
    4,
    3,
    2,
    1,
    5,
    6,
    7,
    11,
    12,
    13,
    16,
    17
];


// ======================================================
// GET ROD ORDER
// ======================================================

function getRodOrder() {

    // 17 rods
    if (columns === 17) {
        return [...resetRodOrder];
    }


    // 1 rod
    if (columns === 1) {
        return [1];
    }


    // 2 rods
    if (columns === 2) {
        return [2, 1];
    }


    // 3 rods
    if (columns === 3) {
        return [3, 2, 1];
    }


    // 4 rods
    if (columns === 4) {
        return [4, 3, 2, 1];
    }


    // 5 onwards
    // 4 3 2 1 5 6 7 8...
    const order = [
        4,
        3,
        2,
        1
    ];


    for (let i = 5; i <= columns; i++) {
        order.push(i);
    }


    return order;
}


// ======================================================
// INITIALIZE STATE
// ======================================================

function initState() {

    state = {};


    for (let rod = 1; rod <= 17; rod++) {

        state[rod] = {
            upper: 0,
            lower: 0
        };

    }
}


// ======================================================
// BUILD ABACUS
// ======================================================

function buildAbacus() {

    const abacus =
        document.getElementById('abacus');


    if (!abacus) {

        console.error(
            'Abacus element not found'
        );

        return;
    }


    // Clear previous abacus
    abacus.innerHTML = '';


    // Get display order
    const rodOrder =
        getRodOrder();


    // ==================================================
    // UPPER SECTION
    // ==================================================

    const upperContainer =
        document.createElement('div');

    upperContainer.className =
        'upper-section-container';


    // ==================================================
    // DIVIDER BAR
    // ==================================================

    const dividerBar =
        document.createElement('div');

    dividerBar.className =
        'divider-bar';


    // ==================================================
    // LOWER SECTION
    // ==================================================

    const lowerContainer =
        document.createElement('div');

    lowerContainer.className =
        'lower-section-container';


    // ==================================================
    // CREATE RODS
    // ==================================================

    rodOrder.forEach(
        function (rodNumber, displayIndex) {

            // ==========================================
            // IMPORTANT
            //
            // COLOR ALWAYS COMES FROM ROD NUMBER
            //
            // Rod 1 = Pink
            // Rod 2 = Green
            // Rod 3 = White
            // Rod 4 = Blue
            //
            // NOT displayIndex
            // ==========================================

            const color =
                beadColors[rodNumber];


            // ==========================================
            // UPPER COLUMN
            // ==========================================

            const upperColumn =
                document.createElement('div');

            upperColumn.className =
                'upper-column';

            upperColumn.dataset.col =
                displayIndex;

            upperColumn.dataset.rod =
                rodNumber;


            // ==========================================
            // UPPER ROD
            // ==========================================

            const upperRod =
                document.createElement('div');

            upperRod.className =
                'rod';

            upperColumn.appendChild(
                upperRod
            );


            // ==========================================
            // UPPER BEAD
            // ==========================================

            const upperBead =
                document.createElement('div');

            upperBead.className =
                'bead';


            // COLOR FROM ACTUAL ROD NUMBER
            upperBead.style.background =
                color;


            upperBead.dataset.col =
                displayIndex;

            upperBead.dataset.rod =
                rodNumber;

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


            // ==========================================
            // LOWER COLUMN
            // ==========================================

            const lowerColumn =
                document.createElement('div');

            lowerColumn.className =
                'lower-column';

            lowerColumn.dataset.col =
                displayIndex;

            lowerColumn.dataset.rod =
                rodNumber;


            // ==========================================
            // LOWER ROD
            // ==========================================

            const lowerRod =
                document.createElement('div');

            lowerRod.className =
                'rod';

            lowerColumn.appendChild(
                lowerRod
            );


            // ==========================================
            // FOUR LOWER BEADS
            // ==========================================

            for (
                let b = 0;
                b < 4;
                b++
            ) {

                const bead =
                    document.createElement('div');

                bead.className =
                    'bead';


                // COLOR FROM ACTUAL ROD NUMBER
                bead.style.background =
                    color;


                bead.dataset.col =
                    displayIndex;

                bead.dataset.rod =
                    rodNumber;

                bead.dataset.type =
                    'lower';

                bead.dataset.index =
                    b;


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


            // ==========================================
            // DIVIDER MARKER / DOT
            // ==========================================
            //
            // DOT IS BASED ONLY ON SCREEN POSITION.
            //
            // It does NOT consider:
            // - rod number
            // - color
            // - reverse order
            //
            // Dot after every 3 displayed rods.
            //
            // ==========================================

            const marker =
                document.createElement('div');

            marker.className =
                'divider-marker';


            const positionFromLeft =
                displayIndex + 1;


            if (
                positionFromLeft % 3 === 0 &&
                positionFromLeft < rodOrder.length
            ) {

                marker.classList.add(
                    'has-dot'
                );

            }


            dividerBar.appendChild(
                marker
            );

        }
    );


    // ==================================================
    // ADD TO ABACUS
    // ==================================================

    abacus.appendChild(
        upperContainer
    );

    abacus.appendChild(
        dividerBar
    );

    abacus.appendChild(
        lowerContainer
    );


    // Update
    updateBeadPositions();

    updateDisplay();
}


// ======================================================
// BEAD CLICK
// ======================================================

function handleBeadClick(e) {

    // Get actual rod number
    const rodNumber =
        parseInt(
            e.target.dataset.rod
        );


    const type =
        e.target.dataset.type;


    // ==================================================
    // UPPER BEAD
    // ==================================================

    if (type === 'upper') {

        state[rodNumber].upper =
            state[rodNumber].upper === 0
                ? 1
                : 0;

    }


    // ==================================================
    // LOWER BEAD
    // ==================================================

    else {

        const index =
            parseInt(
                e.target.dataset.index
            );


        const isActive =
            index <
            state[rodNumber].lower;


        if (isActive) {

            state[rodNumber].lower =
                index;

        }

        else {

            state[rodNumber].lower =
                index + 1;

        }

    }


    updateBeadPositions();

    updateDisplay();
}


// ======================================================
// UPDATE BEAD POSITIONS
// ======================================================

function updateBeadPositions() {

    // ==================================================
    // UPPER BEADS
    // ==================================================

    const upperColumns =
        document.querySelectorAll(
            '.upper-column'
        );


    upperColumns.forEach(
        function (colEl) {

            const rodNumber =
                parseInt(
                    colEl.dataset.rod
                );


            const upperBead =
                colEl.querySelector(
                    '.bead'
                );


            if (
                state[rodNumber].upper === 1
            ) {

                upperBead.classList.add(
                    'active'
                );

            }

            else {

                upperBead.classList.remove(
                    'active'
                );

            }

        }
    );


    // ==================================================
    // LOWER BEADS
    // ==================================================

    const lowerColumns =
        document.querySelectorAll(
            '.lower-column'
        );


    lowerColumns.forEach(
        function (colEl) {

            const rodNumber =
                parseInt(
                    colEl.dataset.rod
                );


            const lowerBeads =
                colEl.querySelectorAll(
                    '.bead'
                );


            lowerBeads.forEach(
                function (
                    bead,
                    beadIndex
                ) {

                    if (
                        beadIndex <
                        state[rodNumber].lower
                    ) {

                        bead.classList.add(
                            'active'
                        );

                    }

                    else {

                        bead.classList.remove(
                            'active'
                        );

                    }

                }
            );

        }
    );
}


// ======================================================
// UPDATE VALUE
// ======================================================

function updateDisplay() {

    let total = 0;


    const rodOrder =
        getRodOrder();


    rodOrder.forEach(
        function (
            rodNumber,
            index
        ) {

            const placeValue =
                Math.pow(
                    10,
                    rodOrder.length - 1 - index
                );


            const columnValue =
                (
                    state[rodNumber].upper * 5
                )
                +
                state[rodNumber].lower;


            total +=
                columnValue *
                placeValue;

        }
    );


    const valueElement =
        document.getElementById('value');


    if (valueElement) {

        valueElement.textContent =
            total.toLocaleString();

    }
}


// ======================================================
// RESET
// ======================================================
//
// Reset = 17 rods
//
// 15 14 10 9 8 4 3 2 1 5 6 7 11 12 13 16 17
//
// ======================================================

function clearAbacus() {

    columns = 17;


    const rodCount =
        document.getElementById(
            'rodCount'
        );


    if (rodCount) {

        rodCount.value = 17;

    }


    initState();

    buildAbacus();
}


// ======================================================
// ROD COUNT CHANGE
// ======================================================

function handleRodCountChange() {

    const input =
        document.getElementById(
            'rodCount'
        );


    if (!input) {

        return;
    }


    let newCount =
        parseInt(
            input.value
        );


    // Minimum = 1
    if (
        isNaN(newCount) ||
        newCount < 1
    ) {

        newCount = 1;

    }


    // Maximum = 17
    if (
        newCount > 17
    ) {

        newCount = 17;

    }


    input.value =
        newCount;


    columns =
        newCount;


    initState();

    buildAbacus();
}


// ======================================================
// MOBILE SIDEBAR - OPEN
// ======================================================

function openMobileSidebar() {

    const sidebar =
        document.getElementById(
            'mobileSidebar'
        );


    const overlay =
        document.getElementById(
            'mobileOverlay'
        );


    if (sidebar) {

        sidebar.classList.add(
            'active'
        );

    }


    if (overlay) {

        overlay.classList.add(
            'active'
        );

    }


    document.body.style.overflow =
        'hidden';
}


// ======================================================
// MOBILE SIDEBAR - CLOSE
// ======================================================

function closeMobileSidebar() {

    const sidebar =
        document.getElementById(
            'mobileSidebar'
        );


    const overlay =
        document.getElementById(
            'mobileOverlay'
        );


    if (sidebar) {

        sidebar.classList.remove(
            'active'
        );

    }


    if (overlay) {

        overlay.classList.remove(
            'active'
        );

    }


    document.body.style.overflow =
        '';
}


// ======================================================
// PAGE LOAD
// ======================================================

document.addEventListener(
    'DOMContentLoaded',
    function () {

        // Default = 17 rods

        columns = 17;


        // Initialize

        initState();


        // Build

        buildAbacus();


        // ==================================================
        // RESET BUTTON
        // ==================================================

        const clearBtn =
            document.getElementById(
                'clearBtn'
            );


        if (clearBtn) {

            clearBtn.addEventListener(
                'click',
                clearAbacus
            );

        }


        // ==================================================
        // ROD COUNT
        // ==================================================

        const rodCount =
            document.getElementById(
                'rodCount'
            );


        if (rodCount) {

            rodCount.addEventListener(
                'change',
                handleRodCountChange
            );

        }


        // ==================================================
        // MOBILE MENU
        // ==================================================

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


        // ==================================================
        // CLOSE MOBILE MENU
        // ==================================================

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


        // ==================================================
        // MOBILE OVERLAY
        // ==================================================

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