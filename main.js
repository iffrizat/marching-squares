const canvas = document.getElementById("CANVAS");
const ctx = canvas.getContext("2d");
const THRESHOLD = 5;
const points = [];
const rr = 50*50;
const clientRect = canvas.getBoundingClientRect();

ctx.strokeStyle = "red";

const grid = new Grid(700, 700, 50, THRESHOLD);

function drawPoints() {
    ctx.fillStyle = "green";
    for (const point of points) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function drawPivots() {
    for (let col = 0; col < grid.cols; col++) {
        for (let row = 0; row < grid.rows; row++) {
            const infl = grid.values[grid.getIndex(col, row)];
            ctx.fillStyle = (infl >= THRESHOLD) ? "red" : "white";
            ctx.beginPath();
            ctx.arc(col*grid.cellSize, row*grid.cellSize, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}

function draw() {
    for (let col = 0; col < grid.cols-1; col++) {
        for (let row = 0; row < grid.rows-1; row++) {
            const x = col*grid.cellSize;
            const y = row*grid.cellSize;
    
            const points = [
                grid.values[grid.getIndex(col, row+1)],
                grid.values[grid.getIndex(col+1, row+1)],
                grid.values[grid.getIndex(col+1, row)],
                grid.values[grid.getIndex(col, row)]
            ];
    
            const answers = grid.solve(points);
    
            for (const answer of answers) {
                console.log(answer)
                ctx.beginPath();
                ctx.moveTo(x+answer[0].xoff, y+answer[0].yoff);
                ctx.lineTo(x+answer[1].xoff, y+answer[1].yoff);
                ctx.stroke();
            }
        }
    }
}

function addPoint(e) {
    x = e.clientX - clientRect.x;
    y = e.clientY - clientRect.y;

    points.push({x, y});
}

function compute() {
    for (let col = 0; col < grid.cols; col++) {
        for (let row = 0; row < grid.rows; row++) {
            for (const point of points) {
                const dx = Math.abs(point.x - col*grid.cellSize);
                const dy = Math.abs(point.y - row*grid.cellSize);
                const dd = dx*dx + dy*dy;
                const infl = (rr >= dd) ? (rr - dd) / rr : 0

                grid.applyInfluence(col, row, infl);
            }
        }
    }
    console.log(grid);
}

canvas.addEventListener("pointerdown", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    addPoint(e);
    compute();
    drawPoints();
    drawPivots();
    draw();
});

drawPivots();
draw();


