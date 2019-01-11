document.addEventListener("DOMContentLoaded", main);

function main() {
    const canvas = document.createElement("canvas");
    const counter = document.createElement("div");
    counter.innerText = 0;
    counter.style = "position:absolute; top: 20px; left: 30px; color: white; user-select: none; font-size: 3em;";
    const body = document.querySelector("body");
    codearea = document.createElement("textarea");
    codearea.rows = 40;
    codearea.cols = 100;
    const submitCodeButton = document.createElement("button");
    submitCodeButton.innerText = "Submit code";

    canvas.height = 512;
    canvas.width = 512;

    body.appendChild(canvas);
    body.appendChild(counter);
    body.appendChild(codearea);
    body.appendChild(submitCodeButton);

    const ctx = canvas.getContext("2d");

    function drawBall(ctx, ball) {

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

    }

    let ball = {
        x: canvas.width / 2,
        y: canvas.height - 50,
        vx: 0,
        vy: -750,
        ax: 0,
        ay: 1500,
        radius: 50,
        update: dt=>{
            // collide with wall
            if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
                ball.vx *= -1;
            }

            // handle click
            if (click.active && clickInsideBall()) {
                console.log("hit");
                const dx = click.x - ball.x;
                const a = dx / ball.radius;
                ball.vx += -a * 300;
                ball.vy = -750 - Math.random() * 200;

                counter.innerText = ++count;
            } else if (click.active) {
                console.log("miss");
            }

            // update physics
            ball.vx += ball.ax * dt;
            ball.vy += ball.ay * dt;

            ball.x += ball.vx * dt;
            ball.y += ball.vy * dt;
        },
    };

    codearea.value = 
`ball = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    vx: 0,
    vy: -750,
    ax: 0,
    ay: 1500,
    radius: 50,
    update: dt=>{
        // collide with wall
        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
            ball.vx *= -1;
        }

        // handle click
        if (click.active && clickInsideBall()) {
            console.log("hit");
            const dx = click.x - ball.x;
            const a = dx / ball.radius;
            ball.vx += -a * 300;
            ball.vy = -750 - Math.random() * 200;

            counter.innerText = ++count;
        } else if (click.active) {
            console.log("miss");
        }

        // update physics
        ball.vx += ball.ax * dt;
        ball.vy += ball.ay * dt;

        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;
    },
};`;

    submitCodeButton.addEventListener("click", e=>{
        eval(codearea.value);
    }
    )

    function clickInsideBall() {
        const dx = ball.x - click.x;
        const dy = ball.y - click.y;
        const r = ball.radius;
        if (dx * dx + dy * dy < r * r) {
            return true;
        }
    }

    function update(dt) {
        ball.update(dt);
    }

    function render(ctx) {
        drawBall(ctx, ball);
    }

    let oldTime = 0;
    let count = 0;
    let click = {
        active: false,
        x: 0,
        y: 0,
    }
    function gameLoop(timestamp) {
        const du = Math.min(timestamp - oldTime, 30);
        const dt = du / 1000;

        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        update(dt);

        click.active = false;

        render(ctx);

        oldTime = timestamp;
        window.requestAnimationFrame(gameLoop);
    }

    canvas.addEventListener("click", evt=>{

        click.x = evt.offsetX;
        click.y = evt.offsetY;

        ctx.save();

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(click.x, click.y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        click.active = true;
    }
    )
    gameLoop("");
}
