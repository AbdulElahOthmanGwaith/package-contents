// Interactive functions and effects

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-decoration');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
        
        // Floating effect for hero image
        const heroImg = document.querySelector('.hero-img');
        if (heroImg) {
            const floatSpeed = Math.sin(scrolled * 0.005) * 10;
            heroImg.style.transform = `translateY(${floatSpeed}px) scale(1)`;
        }
    });

    // Image loading effects
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Set initial state
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    });

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
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text + '\n\n' + window.location.href).then(() => {
            showNotification('تم نسخ النص إلى الحافظة!');
        });
    } else {
        // Create temporary text area
        const textArea = document.createElement('textarea');
        textArea.value = text + '\n\n' + window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('تم نسخ النص إلى الحافظة!');
    }
}

// Show more content function
function showMore() {
    const moreContent = `
    <div class="additional-content" style="margin-top: 30px; padding: 30px; background: rgba(255,255,255,0.1); border-radius: 15px; text-align: right;">
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
    
    const reflectionCard = document.querySelector('.reflection-card');
    if (!reflectionCard.querySelector('.additional-content')) {
        reflectionCard.insertAdjacentHTML('beforeend', moreContent);
        
        // Animate the new content
        const newContent = reflectionCard.querySelector('.additional-content');
        newContent.style.opacity = '0';
        newContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            newContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            newContent.style.opacity = '1';
            newContent.style.transform = 'translateY(0)';
        }, 100);
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
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.insight-card, .diagram-card, .gallery-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Add glow effect
            this.style.boxShadow = '0 25px 60px rgba(102, 126, 234, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    
    
    // Gallery lightbox effect
    const galleryImages = document.querySelectorAll('.gallery-item:not(.quote-item) img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const modal = document.createElement('div');
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
                animation: fadeIn 0.3s ease;
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
            
            // Add image info
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
            
            // Add fade in animation CSS
            const fadeCSS = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            
            if (!document.querySelector('#fade-css')) {
                const fadeStyle = document.createElement('style');
                fadeStyle.id = 'fade-css';
                fadeStyle.textContent = fadeCSS;
                document.head.appendChild(fadeStyle);
            }
            
            modal.addEventListener('click', function() {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
            
            // Add fade out animation
            const fadeOutCSS = `
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            
            if (!document.querySelector('#fade-out-css')) {
                const fadeOutStyle = document.createElement('style');
                fadeOutStyle.id = 'fade-out-css';
                fadeOutStyle.textContent = fadeOutCSS;
                document.head.appendChild(fadeOutStyle);
            }
        });
    });
});

// Add typing effect to main title
document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.main-title');
    const text = title.textContent;
    title.textContent = '';
    title.style.borderRight = '3px solid #fff';
    title.style.animation = 'blink 1s infinite';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                title.style.borderRight = 'none';
                title.style.animation = 'none';
            }, 1000);
        }
    };
    
    setTimeout(typeWriter, 500);
    
    // Add blinking cursor CSS
    const cursorCSS = `
        @keyframes blink {
            0%, 50% {
                border-color: #fff;
            }
            51%, 100% {
                border-color: transparent;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = cursorCSS;
    document.head.appendChild(style);
});