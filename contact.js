// Contact Form Handler

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showNotification('الرجاء ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification('الرجاء إدخال بريد إلكتروني صحيح', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('جاري إرسال الرسالة...', 'info');
            
            setTimeout(() => {
                // In a real application, you would send this data to a server
                console.log('Form Data:', formData);
                
                // Show success message
                showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Store in localStorage for demonstration
                const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                messages.push({
                    ...formData,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('contactMessages', JSON.stringify(messages));
            }, 1500);
        });
    }
});

// Enhanced notification function with types
function showNotification(message, type = 'success') {
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3',
        warning: '#ff9800'
    };
    
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.success};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(120%);
        transition: all 0.3s ease;
        max-width: 300px;
        font-family: 'Cairo', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Trigger slide in
    setTimeout(() => notification.style.transform = 'translateX(0)', 10);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Form field animations
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});
