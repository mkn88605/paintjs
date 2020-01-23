const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const INITIAL_COLOR = "##2c2c2c";
const CANVAS_SIZE = 350;
ctx.lineWidth = 2.5;
let painting = false;
let filling = false;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.fillStyle = INITIAL_COLOR;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseUp(event) {
    stopPainting();
}

function colorHandler(event) {
    const selectedColor = event.target.style.backgroundColor;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
}

function changeRange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleFill() {
    //filling 변수가 중요한 이유 : changeBtn과 연결
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function changeBtn() {
    if (filling === true) {
        filling = false;
        modeBtn.innerText = "FILL";
    } else {
        filling = true;
        modeBtn.innerText = "PAINT";
        
    }
}

function handleCm(event) {
    event.preventDefault();
}

function handleSave() {
    const image = canvas.toDataURL("image/png");
    //console.log(image);
    const link = document.createElement("a");
    //console.log(link);
    link.href = image;
    link.download = "painting board [export]";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleFill);
    canvas.addEventListener("contextmenu", handleCm);
    //    Array.from(colors).addEventListener("click", Array.from(colors).forEach(function (colors) {
}

Array.from(colors).forEach(function(color) {
    color.addEventListener("click", colorHandler);
});

if (range) {
    range.addEventListener("input", changeRange);
}
if (modeBtn) {
    modeBtn.addEventListener("click", changeBtn);
}
if (saveBtn) {
    saveBtn.addEventListener("click", handleSave);
}