(function() {
    let canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width = innerWidth,
        height = canvas.height = innerHeight,
        particles = [],
        properties = {
            bgColor: 'rgba(21, 23, 29, 1)',
            particleColor: 'rgba(254, 187, 121, 1)',
            particleRadius: 3,
            particleCount: 100,
            particleMaxVelocity: 0.5,
            lineLenth: 150,
            particleLife: 6
        };
    document.querySelector('body').appendChild(canvas);

    window.onresize = function() {
        width = canvas.width = innerWidth,
        height = canvas.height = innerHeight;
    }

    class Particle{
        constructor() {
            this.x = Math.random()* width;
            this.y = Math.random()*height;
            this.velocityX = Math.random()*(properties.particleMaxVelocity*2)- properties.particleMaxVelocity;
            this.velocityY = Math.random()*(properties.particleMaxVelocity*2)- properties.particleMaxVelocity;
            this.life = Math.random()*properties.particleLife*60;
        }

        position() {
            this.x + this.velocityX > width && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
            this.y + this.velocityY > height && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
            this.x += this.velocityX;
            this.y += this.velocityY;
        }

        reDraw() {
            context.beginPath();
            context.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
            context.closePath();
            context.fillStyle = properties.particleColor;
            context.fill();
        }

        reCalculateLife() {
            if (this.life < 1) {
                this.x = Math.random()* width;
                this.y = Math.random()*height;
                this.velocityX = Math.random()*(properties.particleMaxVelocity*2)- properties.particleMaxVelocity;
                this.velocityY = Math.random()*(properties.particleMaxVelocity*2)- properties.particleMaxVelocity;
                this.life = Math.random()*properties.particleLife*60;
            }
            this.life--;
        }
    }

    function reDrawBackground() {
        context.fillStyle = properties.bgColor;
        context.fillRect(0, 0, width, height)
    }

    function drawLines() {
        let x1, y1, x2, y2, lenth, opacity;
        for(let i in particles) {
            for(let j in particles){
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                lenth = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                if (lenth < properties.lineLenth) {
                    opacity = 1 - lenth/properties.lineLenth;
                    context.lineWidth = '0.5';
                    context.strokeStyle = `rgba(254, 187, 121, ${opacity})`;
                    context.beginPath();
                    context.moveTo(x1, y1);
                    context.lineTo(x2, y2);
                    context.closePath();
                    context.stroke();
                }
            }
        }
    }

    function reDrawParticles() {
        for(let i in particles) {
            particles[i].reCalculateLife();
            particles[i].position()
            particles[i].reDraw();
        }
    }

    function loop() {
        reDrawBackground();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop);
    }

    function init() {
        for(let i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle)
        }
        loop()
    }

    init();

}())