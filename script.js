// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 20px rgba(255, 127, 80, 0.3)';
    } else {
        navbar.style.boxShadow = '0 2px 30px rgba(255, 127, 80, 0.5)';
    }

    lastScroll = currentScroll;
});

// 滚动显示动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为各个元素添加观察
document.querySelectorAll('.info-card, .music-card, .gallery-item, .about-text').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 音乐卡片点击效果
document.querySelectorAll('.music-card').forEach(card => {
    card.addEventListener('click', function() {
        // 添加点击动画
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);

        // 可以在这里添加播放音乐的功能
        const songTitle = this.querySelector('h3').textContent;
        console.log(`播放: ${songTitle}`);
    });
});

// 图片画廊点击放大效果
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const modal = createModal(img.src, img.alt);
        document.body.appendChild(modal);

        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    });
});

// 创建图片模态框
function createModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">✕</button>
            <img src="${src}" alt="${alt}">
        </div>
    `;

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .image-modal.active {
            opacity: 1;
        }

        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            cursor: pointer;
        }

        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            z-index: 1;
        }

        .modal-content img {
            max-width: 100%;
            max-height: 90vh;
            border-radius: 10px;
            box-shadow: 0 10px 50px rgba(255, 127, 80, 0.5);
        }

        .modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: var(--coral-orange);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .modal-close:hover {
            background: var(--coral-dark);
            transform: rotate(90deg);
        }
    `;

    if (!document.querySelector('style[data-modal]')) {
        style.setAttribute('data-modal', 'true');
        document.head.appendChild(style);
    }

    // 关闭模态框
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    };

    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    modal.querySelector('.modal-close').addEventListener('click', closeModal);

    // ESC键关闭
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);

    return modal;
}

// 添加菠萝跟随鼠标效果
let pineappleFollower = null;

document.addEventListener('mousemove', (e) => {
    if (!pineappleFollower) {
        pineappleFollower = document.createElement('div');
        pineappleFollower.textContent = '🍍';
        pineappleFollower.style.cssText = `
            position: fixed;
            pointer-events: none;
            font-size: 2rem;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(pineappleFollower);
    }

    pineappleFollower.style.left = e.clientX + 20 + 'px';
    pineappleFollower.style.top = e.clientY + 20 + 'px';
});

// 在音乐和图片区域显示菠萝跟随效果
document.querySelectorAll('.music-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (pineappleFollower) {
            pineappleFollower.style.opacity = '0.6';
        }
    });

    el.addEventListener('mouseleave', () => {
        if (pineappleFollower) {
            pineappleFollower.style.opacity = '0';
        }
    });
});

// 添加粒子效果到首页
function createParticle() {
    const particle = document.createElement('div');
    particle.textContent = '🍍';
    particle.style.cssText = `
        position: fixed;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 999;
        animation: particleFall 5s linear forwards;
    `;

    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-50px';

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// 添加粒子动画样式
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFall {
        to {
            transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// 在首页时偶尔创建粒子
let particleInterval;

window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    const heroRect = heroSection.getBoundingClientRect();

    if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
        if (!particleInterval) {
            particleInterval = setInterval(() => {
                if (Math.random() > 0.7) {
                    createParticle();
                }
            }, 1000);
        }
    } else {
        if (particleInterval) {
            clearInterval(particleInterval);
            particleInterval = null;
        }
    }
});

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 添加当前导航高亮
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.fontWeight = '500';
        if (link.getAttribute('href') === '#' + current) {
            link.style.fontWeight = '700';
        }
    });
});

console.log('🍍 黄誉博个人网站已加载完成！');
console.log('就做一阵风吧 🌊');
