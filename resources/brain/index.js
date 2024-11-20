// GLOBALS
let SELECTED_GRID_BOX = null;

// Events
function gridButtonClick(event){
    let clickedButton = event.target;
    if (clickedButton.classList.contains('clickable')){
        if (SELECTED_GRID_BOX){
            SELECTED_GRID_BOX.classList.remove('grid-box-selected');
        }
        clickedButton.classList.add('grid-box-selected');
        SELECTED_GRID_BOX = clickedButton;
    }
}

function setNumber(event){
    let num = event.target.innerHTML;
    SELECTED_GRID_BOX.innerHTML = num;
}

// Elements
const gridElement = document.querySelector('.grid');
const numsBarElement = document.querySelector('.nums-bar');

// Templates
// Grid Box
function getTemplate(ele, attr){
    let element = document.createElement(ele);
    for (let prop in attr)
        element.setAttribute(prop, attr[prop]);
    return element;
} 

// Sudoku puzzle
(async () => {
    const data = await fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}");
    const gridData = await data.json();
    const grid = await gridData.newboard.grids[0].value;
    let gridBoxColorClass = 'grid-box-color-1';
    for (let rowIndex in grid){
        let row = grid[rowIndex]
        for (let numIndex in row){
            let num = row[numIndex];
            const gridBox = getTemplate('div', {class: `grid-box ${gridBoxColorClass}`});
            gridBox.innerHTML = (num != 0) ? num : '';
            gridBox.classList.add((num == 0) ? 'clickable' : null);
            gridBox.classList
            gridElement.insertAdjacentElement('beforeend', gridBox);
            gridBox.addEventListener('click', gridButtonClick)

            if (numIndex == 2 || numIndex == 5){
                const sep = getTemplate('span', {class: 'sep-vertical'});
                gridElement.insertAdjacentElement('beforeend', sep);
                gridBoxColorClass = (gridBoxColorClass == 'grid-box-color-1') ? 'grid-box-color-2' : 'grid-box-color-1';
            }
        };
        if (rowIndex == 2 || rowIndex == 5){
            const sep = getTemplate('span', {class: 'sep-horizontal'});
            gridElement.insertAdjacentElement('beforeend', sep);
            gridBoxColorClass = (gridBoxColorClass == 'grid-box-color-1') ? 'grid-box-color-2' : 'grid-box-color-1';
        }
    };

    for (let i = 1; i <= 9; i++){
        const numBox = getTemplate('div', {class: 'num-box'});
        numBox.innerHTML = i;
        numBox.addEventListener('click', setNumber);
        numsBarElement.insertAdjacentElement('beforeend', numBox);
    }    
})();

