document.addEventListener("DOMContentLoaded", main);

window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function main() {
    const isMobile = mobilecheck();
    const canvas = document.createElement("canvas");
    const counter = document.createElement("div");
    counter.innerText = 0;
    counter.style = "position:absolute; top: 20px; left: 30px; color: white; user-select: none; font-size: 3em;";
    const body = document.querySelector("body");
    body.style.margin = 0;
    
    codearea = document.createElement("textarea");
    codearea.rows = 40;
    codearea.cols = 100;
    const submitCodeButton = document.createElement("button");
    submitCodeButton.innerText = "Submit code";

    canvas.height = isMobile ? screen.availHeight : 512;
    canvas.width = isMobile ? screen.availWidth : 512;

    body.appendChild(canvas);
    body.appendChild(counter);
    if(!isMobile) {
        body.appendChild(codearea);
        body.appendChild(submitCodeButton);
    }

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
    });

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


    function handleClick(x, y) {
        click.x = x;
        click.y = y;

        ctx.save();

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(click.x, click.y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        click.active = true;
    }
    
    canvas.addEventListener("touchstart", e=>{
        const rect = e.target.getBoundingClientRect();
        const x = e.targetTouches[0].pageX - rect.left;
        const y = e.targetTouches[0].pageY - rect.top;
        handleClick(x, y);
    });
    
    canvas.addEventListener("mousedown", evt=>{
        handleClick(evt.offsetX, evt.offsetY);
    });

    gameLoop("");
}
