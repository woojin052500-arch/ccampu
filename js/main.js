// ===== 깜푸디자인 홈페이지 JavaScript =====

// DOM이 로드되면 실행
document.addEventListener('DOMContentLoaded', function() {
    // ===== 모바일 메뉴 토글 =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // 아이콘 변경
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // 메뉴 항목 클릭 시 모바일 메뉴 닫기
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // ===== 스무스 스크롤 =====
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== 네비게이션 스크롤 효과 =====
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ===== Scroll to Top 버튼 =====
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== FAQ 아코디언 =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // 현재 클릭된 항목이 이미 열려있는지 확인
            const isActive = item.classList.contains('active');
            
            // 모든 FAQ 항목 닫기
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // 클릭된 항목이 닫혀있었다면 열기
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // ===== 포트폴리오 이미지 클릭 시 확대 (라이트박스 효과) =====
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // 기본 클릭 애니메이션 효과만 적용
            // 실제 이미지가 추가되면 라이트박스 기능을 구현할 수 있습니다
            console.log('포트폴리오 항목 클릭됨');
        });
    });
    
    // ===== 스크롤 애니메이션 (Intersection Observer) =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 애니메이션을 적용할 요소들
    const animatedElements = document.querySelectorAll(
        '.service-card, .pricing-card, .process-step, .portfolio-item, .contact-card, .faq-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ===== 네비게이션 활성화 표시 =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function updateActiveNav() {
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
    
    // ===== 카운터 애니메이션 (숫자가 올라가는 효과) =====
    function animateCounter(element, start, end, duration) {
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString('ko-KR');
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    // ===== 로딩 애니메이션 =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // ===== 외부 링크 처리 =====
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 외부 링크 클릭 시 추가 처리가 필요하면 여기에 작성
            console.log('외부 링크 열림:', this.href);
        });
    });
    
    // ===== 폼 유효성 검사 (필요시 사용) =====
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 유효성 검사 로직
            const formData = new FormData(form);
            
            // 여기에 폼 제출 처리 로직 추가
            console.log('폼 제출됨');
        });
    });
    
    // ===== 이미지 레이지 로딩 =====
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // IntersectionObserver를 사용한 폴백
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ===== 페이지 성능 최적화 =====
    // 스크롤 이벤트 쓰로틀링
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ===== 콘솔 환영 메시지 =====
    console.log('%c깜푸디자인 홈페이지', 'font-size: 20px; font-weight: bold; color: #3498db;');
    console.log('%c브랜드의 가치를 디자인합니다', 'font-size: 14px; color: #7f8c8d;');
    console.log('%c상담 문의: https://open.kakao.com/o/s081H9Th', 'font-size: 12px; color: #2c3e50;');
    
});

// ===== 유틸리티 함수 =====

// 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 요소가 뷰포트에 있는지 확인
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 스무스 스크롤 (IE 호환)
function smoothScrollTo(targetPosition, duration = 1000) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // easeInOutQuad 이징 함수
        const ease = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// 브라우저 정보 감지
const browserInfo = {
    isIE: /MSIE|Trident/.test(navigator.userAgent),
    isEdge: /Edge/.test(navigator.userAgent),
    isChrome: /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent),
    isFirefox: /Firefox/.test(navigator.userAgent),
    isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
};

// 디바이스 정보를 body에 클래스로 추가
if (browserInfo.isMobile) {
    document.body.classList.add('mobile');
} else {
    document.body.classList.add('desktop');
}

// ===== 에러 처리 =====
window.addEventListener('error', function(e) {
    console.error('JavaScript 오류:', e.error);
});

// ===== 페이지 이탈 방지 (필요시 활성화) =====
// window.addEventListener('beforeunload', function(e) {
//     e.preventDefault();
//     e.returnValue = '';
//     return '';
// });
