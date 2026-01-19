// Blog Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            blogCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    const categories = card.getAttribute('data-category');
                    if (categories.includes(filter)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate subscription
                showNotification('تم الاشتراك بنجاح! شكراً لانضمامك إلينا.', 'success');
                this.reset();
                
                // Store in localStorage
                const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
                subscribers.push({
                    email: email,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('subscribers', JSON.stringify(subscribers));
            }
        });
    }
    
    // Read more links
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('هذه المقالة قيد التطوير. ستكون متاحة قريباً!', 'info');
        });
    });
    
    // Pagination
    const pageNums = document.querySelectorAll('.page-num');
    const pageBtns = document.querySelectorAll('.page-btn');
    
    pageNums.forEach(num => {
        num.addEventListener('click', function() {
            pageNums.forEach(n => n.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to top of blog section
            document.querySelector('.blog-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            showNotification('جاري تحميل الصفحة ' + this.textContent + '...', 'info');
        });
    });
    
    // Card hover effects
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
