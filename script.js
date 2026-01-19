// Interactive functions and effects

document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Hero Section Effects ---
    const heroDecoration = document.querySelector('.hero-decoration');
    const heroImg = document.querySelector('.hero-img');
    const mainTitle = document.querySelector('.main-title');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Parallax effect for hero decoration
        if (heroDecoration) {
            const speed = scrolled * 0.5;
            heroDecoration.style.transform = `translateY(${speed}px)`;
        }
        
        // Floating effect for hero image
        if (heroImg) {
            const floatSpeed = Math.sin(scrolled * 0.005) * 10;
            heroImg.style.transform = `translateY(${floatSpeed}px) scale(1)`;
        }
    });

    // --- 2. Image Loading Effects ---
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        } else {
            img.style.opacity = '0';
            img.style.transform = 'scale(0.9)';
            img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            });
        }
    });

    // --- 3. Card Hover Effects ---
    const cards = document.querySelectorAll('.insight-card, .diagram-card, .gallery-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 60px rgba(102, 126, 234, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // --- 4. Gallery Lightbox Effect ---
    const galleryImages = document.querySelectorAll('.gallery-item:not(.quote-item) img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const modal = document.createElement('div');
            modal.className = 'lightbox-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.95);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const imgContainer = document.createElement('div');
            imgContainer.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                position: relative;
            `;
            
            const zoomedImg = document.createElement('img');
            zoomedImg.src = this.src;
            zoomedImg.style.cssText = `
                width: 100%;
                height: auto;
                border-radius: 15px;
                box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            `;
            
            const imageInfo = document.createElement('div');
            const altText = this.alt || 'صورة من المعرض';
            imageInfo.innerHTML = `
                <h3 style="color: white; text-align: center; margin-top: 20px; font-family: 'Amiri', serif;">${altText}</h3>
                <p style="color: #ccc; text-align: center; margin-top: 10px;">انقر في أي مكان للإغلاق</p>
            `;
            
            imgContainer.appendChild(zoomedImg);
            imgContainer.appendChild(imageInfo);
            modal.appendChild(imgContainer);
            document.body.appendChild(modal);
            
            // Trigger fade in
            setTimeout(() => modal.style.opacity = '1', 10);
            
            modal.addEventListener('click', function() {
                modal.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(modal)) {
                        document.body.removeChild(modal);
                    }
                }, 300);
            });
        });
    });

    // --- 5. Typing Effect for Main Title ---
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        mainTitle.style.borderRight = '3px solid #fff';
        mainTitle.style.display = 'inline-block';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    mainTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
});

// --- Global Functions ---

// Share wisdom function
function shareWisdom() {
    const text = `الذكاء الاصطناعي قد يتعلم من الإنسان... لكنه لا يملك روحاً ولا وعياً.\n\nفكر... لا تخف من الذكاء الاصطناعي، اجعله يخدمك ولا تدعه يحكمك.`;
    
    if (navigator.share) {
        navigator.share({
            title: 'حكمة عن الذكاء الاصطناعي والعقل البشري',
            text: text,
            url: window.location.href
        }).then(() => {
            console.log('تم المشاركة بنجاح');
        }).catch((error) => {
            console.log('خطأ في المشاركة:', error);
            fallbackShare(text);
        });
    } else {
        fallbackShare(text);
    }
}

// Fallback share function
function fallbackShare(text) {
    const shareText = text + '\n\n' + window.location.href;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('تم نسخ النص إلى الحافظة!');
        });
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('تم نسخ النص إلى الحافظة!');
        } catch (err) {
            console.error('فشل النسخ:', err);
        }
        document.body.removeChild(textArea);
    }
}

// Show more content function
function showMore() {
    const reflectionCard = document.querySelector('.reflection-card');
    if (!reflectionCard) return;

    if (!reflectionCard.querySelector('.additional-content')) {
        const moreContent = `
        <div class="additional-content" style="margin-top: 30px; padding: 30px; background: rgba(255,255,255,0.1); border-radius: 15px; text-align: right; opacity: 0; transform: translateY(20px); transition: all 0.5s ease;">
            <h3 style="font-family: 'Amiri', serif; font-size: 1.8rem; margin-bottom: 20px;">تأملات إضافية</h3>
            <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 15px;">
                في كل عصر من عصور التاريخ، واجه الإنسان تحديات تقنية جديدة. والحكمة تكمن في التكيف مع هذه التقنيات دون فقدان جوهر الإنسانية.
            </p>
            <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 15px;">
                الذكاء الاصطناعي أداة قوية، لكن القرار النهائي والحكمة والإبداع تبقى من اختصاص العقل البشري.
            </p>
            <p style="font-size: 1.1rem; line-height: 1.8;">
                المستقبل لمن يجمع بين قوة التكنولوجيا وحكمة الإنسان.
            </p>
        </div>
        `;
        
        reflectionCard.insertAdjacentHTML('beforeend', moreContent);
        
        const newContent = reflectionCard.querySelector('.additional-content');
        setTimeout(() => {
            newContent.style.opacity = '1';
            newContent.style.transform = 'translateY(0)';
        }, 100);
        
        // Change button text
        const btn = document.querySelector('.btn-secondary');
        if (btn) btn.textContent = 'تم عرض المزيد';
    }
}

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 1000;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(120%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Trigger slide in
    setTimeout(() => notification.style.transform = 'translateX(0)', 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// --- 6. Dark Mode Logic ---
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

if (toggleSwitch) {
    toggleSwitch.addEventListener('change', switchTheme, false);
}

// --- 7. Scroll Progress Bar ---
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: var(--accent-color);
    z-index: 10002;
    width: 0%;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + "%";
});
