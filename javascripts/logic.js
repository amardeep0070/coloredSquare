//global vars
totalColors = 0;
initialNumberOfColors = 8;
gridSize = 3;
selectedColor = undefined;
canvas = [];
window.onload = function() {
    init();
    document.getElementById('myModal').style.display = "block";
};
window.onclick = function(event) {
    let modal = document.getElementById('myModal');
    if (event.target == modal) {
       modal.style.display = "none";
    }
}
function init() {
    createColors(initialNumberOfColors);
    createCanvas();
    displayCanvasSize();
}
function createCanvas() {
    adjustCanvas(gridSize);
}
function adjustCanvas(size) {
    let columnsStyling = "";
    document.getElementById("canvas").innerText = "";
    for (let i = 0; i < size; i++) {
        columnsStyling += 'auto ';
        for (let j = 0; j < size; j++) {
                document.getElementById("canvas").innerHTML += `<div  onclick="colorCanvas('${i},${j}')" id = "${i},${j}" class="grid-item">${i},${j}</div>`;
                document.getElementById(`${i},${j}`).style.order = `${i}${j}`;
        }
        document.getElementById("canvas").style.gridTemplateColumns = columnsStyling;
    }
}
function addEraser() {
    document.getElementById("box").innerHTML += `<div onclick="changeColor('eraser')" id = "eraser" class="grid-item colorHeight">Eraser</div>`;
    document.getElementById('eraser').style.backgroundColor = 'White';
}
function createColors(numberOfColors) {
    addEraser();
    for(let i = 0 ; i < numberOfColors ; i++){
        addColor();
    }
}
function addColor() {
    document.getElementById("box").innerHTML += `<div onclick="changeColor('Color${totalColors}')" id = "Color${totalColors}" class="grid-item colorHeight">${totalColors}</div>`;
    styleWithRandomColor("Color"+totalColors);
    totalColors++;
}
function styleWithRandomColor(id) {
    document.getElementById(id).style.backgroundColor =  'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
}
function changeColor(id) {
    selectedColor = document.getElementById(id).style.backgroundColor;
    displaySelectedColor(id);
}
function displaySelectedColor(id) {
    document.getElementById('colorSelected').innerHTML = `<p>Color Selected = ${id} (${selectedColor})</p>`
}
function colorCanvas(id) {
    if(selectedColor) {
        canvas[id] = selectedColor;
        document.getElementById(id).style.backgroundColor = selectedColor;
    }
}
function addCanvas() {
    gridSize++;
    //createCanvas();
    displayCanvasSize();
    let columnsStyling = "";
    for(let i = 0; i < gridSize; i++){
        columnsStyling += 'auto ';
        document.getElementById("canvas").innerHTML += `<div  onclick="colorCanvas('${i},${gridSize - 1}')" id = "${i},${gridSize - 1}" class="grid-item">${i},${gridSize - 1}</div>`;
        document.getElementById(`${i},${gridSize - 1}`).style.order = `${i}${gridSize - 1}`;
        if(i < gridSize - 1){
            document.getElementById("canvas").innerHTML += `<div  onclick="colorCanvas('${gridSize - 1},${i}')" id = "${gridSize - 1},${i}" class="grid-item">${gridSize - 1},${i}</div>`;
            document.getElementById(`${gridSize - 1},${i}`).style.order = `${gridSize - 1}${i}`;
            document.getElementById(`${gridSize - 1},${i}`).style.backgroundColor = canvas[`${gridSize - 1},${i}`];
            document.getElementById(`${gridSize - 1},${i}`).style.order = `${gridSize - 1}${i}`;
        }
        document.getElementById(`${i},${gridSize - 1}`).style.backgroundColor = canvas[`${i},${gridSize - 1}`];
        document.getElementById(`${i},${gridSize - 1}`).style.order = `${i}${gridSize - 1}`;

    }
    document.getElementById("canvas").style.gridTemplateColumns = columnsStyling;
}
function displayCanvasSize() {
    document.getElementById('canvasSize').innerHTML = `<h3>Canvas Size = ${gridSize} X ${gridSize} </h3>`
}
function decCanvasSize() {
    if(gridSize <= 0 ) return;
    gridSize--;
    clearCanvasState();
    //createCanvas();
    displayCanvasSize();
}
function clearCanvasState() {
    let columnsStyling = "";
    for(let i = 0; i < gridSize; i++){
        columnsStyling += 'auto ';
        document.getElementById(`${i},${gridSize}`).remove();
        document.getElementById(`${gridSize },${i}`).remove();
        canvas[`${i},${gridSize}`] = undefined;
        canvas[`${gridSize},${i}`] = undefined;
    }
    document.getElementById(`${gridSize},${gridSize}`).remove();
    canvas[`${gridSize},${gridSize}`] = undefined;
    document.getElementById("canvas").style.gridTemplateColumns = columnsStyling;
}
function refreshColors() {
    for(let i = 0 ; i < totalColors; i++){
        styleWithRandomColor(`Color${i}`);
    }
}
