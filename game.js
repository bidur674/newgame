const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

// Car settings
const car = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 80,
    speed: 5
};

// Obstacles
const obstacles = [];
const obstacleSpeed = 3;
const obstacleWidth = 50;
const obstacleHeight = 80;

let gameOver = false;

// Controls
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && car.x > 0) {
        car.x -= car.speed;
    } else if (event.key === "ArrowRight" && car.x < canvas.width - car.width) {
        car.x += car.speed;
    }
});

// Update game state
function update() {
    if (Math.random() < 0.02) { // Randomly generate obstacles
        let randomX = Math.random() * (canvas.width - obstacleWidth);
        obstacles.push({ x: randomX, y: 0, width: obstacleWidth, height: obstacleHeight });
    }

    obstacles.forEach((obs, index) => {
        obs.y += obstacleSpeed;
        if (obs.y > canvas.height) {
            obstacles.splice(index, 1);
        }

        // Collision detection
        if (
            car.x < obs.x + obs.width &&
            car.x + car.width > obs.x &&
            car.y < obs.y + obs.height &&
            car.y + car.height > obs.y
        ) {
            gameOver = true;
        }
    });

    if (!gameOver) {
        requestAnimationFrame(draw);
    } else {
        alert("Game Over! Refresh to play again.");
    }
}

// Draw game objects
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw car
    ctx.fillStyle = "blue";
    ctx.fillRect(car.x, car.y, car.width, car.height);

    // Draw obstacles
    ctx.fillStyle = "red";
    obstacles.forEach((obs) => ctx.fillRect(obs.x, obs.y, obs.width, obs.height));

    update();
}

// Start the game
draw();
