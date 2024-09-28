const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to fill the entire screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Drawing state and settings
let drawing = false;
let brushColor = '#000000';  // Set a default brush color
let lineWidth = 5;           // Set a default brush size

// Start drawing when the mouse or touch is pressed
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('touchstart', (e) => {
    drawing = true;
    draw(e.touches[0]);  // Start drawing immediately for touch devices
});

// Stop drawing when the mouse or touch is released
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();  // Reset the path for a new stroke
});
canvas.addEventListener('touchend', () => {
    drawing = false;
    ctx.beginPath();  // Reset the path for a new stroke
});

// Draw with mouse
canvas.addEventListener('mousemove', draw);

// Draw with touch
canvas.addEventListener('touchmove', (e) => {
    if (drawing) {
        e.preventDefault();  // Prevent scrolling
        draw(e.touches[0]);  // Pass touch point to draw function
    }
});

function draw(e) {
    if (!drawing) return;

    // Set brush settings
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    // Draw to the current mouse or touch position
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}

// Resize canvas when window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.beginPath();  // Reset the path
});
