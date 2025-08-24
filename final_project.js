// Birthday Website Enhanced JavaScript
// Adding particle effects, confetti, and interactive animations

// Particle system for birthday celebration
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1000';
        document.body.appendChild(this.canvas);
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticle(x, y) {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#ff8e53', '#a8e6cf'];
        const particle = {
            x: x || Math.random() * this.canvas.width,
            y: y || Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 1,
            decay: Math.random() * 0.02 + 0.01
        };
        this.particles.push(particle);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }
        
        requestAnimationFrame(() => this.animate());
    }

    burst(x, y, count = 20) {
        for (let i = 0; i < count; i++) {
            this.createParticle(x, y);
        }
    }
}

// Confetti system
class ConfettiSystem {
    constructor() {
        this.confetti = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '999';
        document.body.appendChild(this.canvas);
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#ff8e53', '#a8e6cf'];
        const confetti = {
            x: Math.random() * this.canvas.width,
            y: -10,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 2 + 1,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            width: Math.random() * 10 + 5,
            height: Math.random() * 5 + 2,
            color: colors[Math.floor(Math.random() * colors.length)]
        };
        this.confetti.push(confetti);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.confetti.length - 1; i >= 0; i--) {
            const confetti = this.confetti[i];
            
            confetti.x += confetti.vx;
            confetti.y += confetti.vy;
            confetti.rotation += confetti.rotationSpeed;
            
            if (confetti.y > this.canvas.height) {
                this.confetti.splice(i, 1);
                continue;
            }
            
            this.ctx.save();
            this.ctx.translate(confetti.x, confetti.y);
            this.ctx.rotate(confetti.rotation * Math.PI / 180);
            this.ctx.fillStyle = confetti.color;
            this.ctx.fillRect(-confetti.width/2, -confetti.height/2, confetti.width, confetti.height);
            this.ctx.restore();
        }
        
        requestAnimationFrame(() => this.animate());
    }

    startConfetti() {
        const interval = setInterval(() => {
            this.createConfetti();
        }, 100);
        
        setTimeout(() => {
            clearInterval(interval);
        }, 5000);
    }
}

// Initialize particle and confetti systems
const particleSystem = new ParticleSystem();
const confettiSystem = new ConfettiSystem();

// Enhanced locomotive scroll with birthday effects
function locomotive() {
    gsap.registerPlugin(ScrollTrigger);
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        smartphone: { smooth: true },
        getDirection: true
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    locoScroll.on("scroll", function(dets){
        if(dets.direction === "up"){
            document.querySelector("#nav").style.top = "0%";
        }
        else if(dets.direction === "down"){
            document.querySelector("#nav").style.top = "-100%";
        }
    });

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

// Enhanced slides handling with birthday effects
function slidesHandle() {
    let allSlides = document.querySelectorAll(".sld");
    allSlides = [...allSlides];

    var isPlaying = null;
    allSlides.forEach(function (elm) {
        elm.addEventListener("mouseover", function (dets) {
            isPlaying = "#curtain" + dets.target.dataset.index;
            document.querySelector(isPlaying).style.width = "100%";
            document.querySelector("#curcularImg").style.display = "none";
            
            // Add particle burst on hover
            const rect = elm.getBoundingClientRect();
            particleSystem.burst(rect.left + rect.width/2, rect.top + rect.height/2, 10);
        });
        
        elm.addEventListener("mouseleave", function (dets) {
            document.querySelector(isPlaying).style.width = "0%";
            document.querySelector("#curcularImg").style.display = "initial";
        });
    });

    const circle = document.querySelector("#circularImg");
    if (circle) {
        circle.addEventListener("mousemove", function (dets) {
            const bndVal = document.querySelector("#circularImg").getBoundingClientRect();
            const Xval = dets.clientX - bndVal.x;
            const Yval = dets.clientY - bndVal.y;
            document.querySelector("#dot").style.top = Yval + "px";
            document.querySelector("#dot").style.left = Xval + "px";
            document.querySelector("#dot").style.backgroundColor = "rgb(219, 255, 0)";
            document.querySelector("#dot").style.transform = "scale(1.3)";
            document.querySelector("#dot").style.boxShadow = "0 0 12px 1px rgb(219, 255, 0)";
        });

        circle.addEventListener("mouseleave", function (details) {
            document.querySelector("#dot").style.top = "50%";
            document.querySelector("#dot").style.left = "50%";
            document.querySelector("#dot").style.backgroundColor = "white";
            document.querySelector("#dot").style.transform = "scale(1)";
            document.querySelector("#dot").style.boxShadow = "none";
        });
    }
}

// Enhanced animation code with birthday effects
function animationCode() {
    const tl = gsap.timeline();
    
    // Add confetti when animations start
    tl.call(() => {
        confettiSystem.startConfetti();
    }, [], "+=1");
    
    tl.to("#twoSlides .workSlide", {
        scrollTrigger: {
            trigger: "#twoSlides #workText",
            scroller: "#main",
            scrub: 1,
            pin: true
        },
        duration: 10000,
        top: "10%",
        stagger: 1000000,
    })
    .to(".allCircle", {
        scrollTrigger: {
            trigger: ".allTxt",
            scroller: "#main",
            pin: true,
            scrub: 1
        },
        top: "75%",
        backgroundColor: "rgb(219, 255, 0)",
        color: "black"
    })
    .to(".allTxt", {
        scrollTrigger: {
            trigger: ".allCircle",
            scroller: "#main",
            start: "top 100%",
            end: "top 0%",
            scrub: 0,
        },
        duration: 0.01,
        color: "white",
        backgroundColor: "black"
    }, "-=10s")
    .to("#allWork", {
        scrollTrigger: {
            trigger: ".allCircle",
            scroller: "#main",
            start: "top 100%",
            end: "top 0%",
            scrub: 0,
        },
        duration: 0.01,
        color: "white",
        backgroundColor: "black"
    }, "-=10s")
    .to(".allTxt h1", {
        scrollTrigger: {
            trigger: ".allCircle",
            scroller: "#main",
            start: "top 100%",
            end: "top 0%",
            scrub: 0,
        },
        duration: 0.01,
        color: "white",
    }, "-=10s");
}

// Birthday celebration effects
function birthdayEffects() {
    // Add floating balloons effect
    const balloons = document.createElement('div');
    balloons.className = 'floating-balloons';
    balloons.innerHTML = `
        <div class="balloon balloon-1">🎈</div>
        <div class="balloon balloon-2">🎉</div>
        <div class="balloon balloon-3">🎊</div>
        <div class="balloon balloon-4">🎁</div>
        <div class="balloon balloon-5">🎂</div>
    `;
    document.body.appendChild(balloons);
    
    // Add CSS for floating balloons
    const style = document.createElement('style');
    style.textContent = `
        .floating-balloons {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1001;
        }
        
        .balloon {
            position: absolute;
            font-size: 2rem;
            animation: floatBalloon 6s ease-in-out infinite;
        }
        
        .balloon-1 { left: 10%; animation-delay: 0s; }
        .balloon-2 { left: 25%; animation-delay: 1s; }
        .balloon-3 { left: 50%; animation-delay: 2s; }
        .balloon-4 { left: 75%; animation-delay: 3s; }
        .balloon-5 { left: 90%; animation-delay: 4s; }
        
        @keyframes floatBalloon {
            0%, 100% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Add click effects to main elements
    document.addEventListener('click', (e) => {
        particleSystem.burst(e.clientX, e.clientY, 5);
    });
    
    // Add hover effects to headings
    const headings = document.querySelectorAll('h1, h2, h3, h4');
    headings.forEach(heading => {
        heading.addEventListener('mouseenter', () => {
            heading.style.transform = 'scale(1.05)';
            heading.style.transition = 'transform 0.3s ease';
        });
        
        heading.addEventListener('mouseleave', () => {
            heading.style.transform = 'scale(1)';
        });
    });
    
    // Add birthday message popup
    setTimeout(() => {
        showBirthdayMessage();
    }, 3000);
}

// Show birthday message popup
function showBirthdayMessage() {
    const popup = document.createElement('div');
    popup.className = 'birthday-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>🎉 Happy Birthday Nuru! 🎉</h2>
            <p>Wishing you a day filled with joy, laughter, and wonderful surprises!</p>
            <button onclick="this.parentElement.parentElement.remove()">Thank You! 💖</button>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .birthday-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.5s ease;
        }
        
        .popup-content {
            background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
            padding: 2rem;
            border-radius: 20px;
            text-align: center;
            color: white;
            max-width: 400px;
            animation: scaleIn 0.5s ease;
        }
        
        .popup-content h2 {
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        
        .popup-content button {
            background: white;
            color: #ff6b6b;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 1rem;
            transition: transform 0.3s ease;
        }
        
        .popup-content button:hover {
            transform: scale(1.1);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes scaleIn {
            from { transform: scale(0.5); }
            to { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(popup);
    
    // Add confetti when popup appears
    confettiSystem.startConfetti();
}

// Enhanced text animation
function enhancedTextAnimation() {
    // Animate text on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 1s ease-out forwards';
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }, observerOptions);
    
    // Observe all text elements
    document.querySelectorAll('h1, h2, h3, p, .desc').forEach(el => {
        observer.observe(el);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    locomotive();
    slidesHandle();
    animationCode();
    birthdayEffects();
    enhancedTextAnimation();
    
    // Add periodic confetti bursts
    setInterval(() => {
        if (Math.random() > 0.7) {
            confettiSystem.startConfetti();
        }
    }, 10000);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'c' || e.key === 'C') {
            confettiSystem.startConfetti();
        }
        if (e.key === 'p' || e.key === 'P') {
            particleSystem.burst(window.innerWidth/2, window.innerHeight/2, 50);
        }
    });
});

// Export for global access
window.birthdayEffects = birthdayEffects;
window.particleSystem = particleSystem;
window.confettiSystem = confettiSystem;