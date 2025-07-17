// Gallery functionality for Li Shy Website

document.addEventListener('DOMContentLoaded', function () {
    initializeGallery();
});

let currentFilter = 'all';
let galleryItems = [];

function initializeGallery() {
    // Get gallery elements
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryGrid = document.getElementById('galleryGrid');

    if (!galleryGrid) return;

    // Initialize gallery items
    galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

    // Add click listeners to tabs
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const category = this.dataset.category;
            filterGallery(category);
            setActiveTab(this);
        });
    });

    // Add click listeners to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            openLightbox(index);
        });

        // Add hover effect
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Create lightbox
    createLightbox();

    // Add sample photos (you can replace these with real photos)
    addSamplePhotos();
}

function filterGallery(category) {
    currentFilter = category;

    galleryItems.forEach(item => {
        const itemCategory = item.dataset.category;

        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';

            // Animate in
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 100);
        } else {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';

            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });

    // Update grid layout
    setTimeout(() => {
        updateGridLayout();
    }, 400);
}

function setActiveTab(activeTab) {
    const galleryTabs = document.querySelectorAll('.gallery-tab');

    galleryTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    activeTab.classList.add('active');

    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

    const rect = activeTab.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';

    activeTab.style.position = 'relative';
    activeTab.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function updateGridLayout() {
    const galleryGrid = document.getElementById('galleryGrid');
    const visibleItems = galleryItems.filter(item =>
        item.style.display !== 'none' && item.style.opacity !== '0'
    );

    // Add stagger animation to visible items
    visibleItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateY(0) scale(1)';
            item.classList.add('gallery-item-animated');
        }, index * 50);
    });
}

function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;

    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    lightboxContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

    const lightboxImage = document.createElement('div');
    lightboxImage.className = 'lightbox-image';
    lightboxImage.style.cssText = `
        width: 100%;
        height: 400px;
        background: linear-gradient(135deg, #ffc0cb, #e8d4f0);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4rem;
        color: #9b59b6;
    `;

    const lightboxInfo = document.createElement('div');
    lightboxInfo.className = 'lightbox-info';
    lightboxInfo.style.cssText = `
        padding: 20px;
        text-align: center;
    `;

    const lightboxTitle = document.createElement('h3');
    lightboxTitle.className = 'lightbox-title';
    lightboxTitle.style.cssText = `
        color: #ff6b9d;
        margin-bottom: 10px;
        font-family: 'Dancing Script', cursive;
        font-size: 2rem;
    `;

    const lightboxDescription = document.createElement('p');
    lightboxDescription.className = 'lightbox-description';
    lightboxDescription.style.cssText = `
        color: #6c7293;
        line-height: 1.6;
        font-size: 1.1rem;
    `;

    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 2rem;
        color: #ff6b9d;
        cursor: pointer;
        z-index: 10001;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;

    closeButton.addEventListener('mouseenter', function () {
        this.style.background = 'rgba(255, 107, 157, 0.1)';
        this.style.transform = 'scale(1.1)';
    });

    closeButton.addEventListener('mouseleave', function () {
        this.style.background = 'none';
        this.style.transform = 'scale(1)';
    });

    const navButtons = document.createElement('div');
    navButtons.className = 'lightbox-nav';
    navButtons.style.cssText = `
        position: absolute;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        z-index: 10002;
    `;

    const prevButton = document.createElement('button');
    prevButton.textContent = '← Previous';
    prevButton.className = 'lightbox-nav-btn';
    prevButton.style.cssText = `
        background: linear-gradient(135deg, #ff6b9d, #9b59b6);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
    `;

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next →';
    nextButton.className = 'lightbox-nav-btn';
    nextButton.style.cssText = prevButton.style.cssText;

    // Add hover effects to nav buttons
    [prevButton, nextButton].forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(255, 107, 157, 0.3)';
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Assemble lightbox
    lightboxInfo.appendChild(lightboxTitle);
    lightboxInfo.appendChild(lightboxDescription);
    lightboxContent.appendChild(lightboxImage);
    lightboxContent.appendChild(lightboxInfo);
    lightboxContent.appendChild(closeButton);
    navButtons.appendChild(prevButton);
    navButtons.appendChild(nextButton);
    lightboxContent.appendChild(navButtons);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);

    // Add event listeners
    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    prevButton.addEventListener('click', function () {
        navigateLightbox(-1);
    });

    nextButton.addEventListener('click', function () {
        navigateLightbox(1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (lightbox.style.visibility === 'visible') {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    navigateLightbox(-1);
                    break;
                case 'ArrowRight':
                    navigateLightbox(1);
                    break;
            }
        }
    });
}

let currentLightboxIndex = 0;

function openLightbox(index) {
    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = lightbox.querySelector('.lightbox-content');

    updateLightboxContent();

    lightbox.style.visibility = 'visible';
    lightbox.style.opacity = '1';
    lightboxContent.style.transform = 'scale(1)';

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = lightbox.querySelector('.lightbox-content');

    lightbox.style.opacity = '0';
    lightboxContent.style.transform = 'scale(0.8)';

    setTimeout(() => {
        lightbox.style.visibility = 'hidden';
    }, 300);

    // Restore body scroll
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    const visibleItems = galleryItems.filter(item =>
        item.style.display !== 'none' && item.style.opacity !== '0'
    );

    currentLightboxIndex += direction;

    if (currentLightboxIndex < 0) {
        currentLightboxIndex = visibleItems.length - 1;
    } else if (currentLightboxIndex >= visibleItems.length) {
        currentLightboxIndex = 0;
    }

    updateLightboxContent();
}

function updateLightboxContent() {
    const visibleItems = galleryItems.filter(item =>
        item.style.display !== 'none' && item.style.opacity !== '0'
    );

    const currentItem = visibleItems[currentLightboxIndex];
    if (!currentItem) return;

    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');

    // Get placeholder content
    const placeholderContent = currentItem.querySelector('.placeholder-content');
    const icon = placeholderContent.querySelector('.placeholder-icon').textContent;
    const text = placeholderContent.querySelector('.placeholder-text').textContent;

    // Update lightbox content
    lightboxImage.textContent = icon;
    lightboxTitle.textContent = text;
    lightboxDescription.textContent = getPhotoDescription(text);

    // Add entrance animation
    lightboxImage.style.transform = 'scale(0.8)';
    lightboxImage.style.opacity = '0';

    setTimeout(() => {
        lightboxImage.style.transition = 'all 0.3s ease';
        lightboxImage.style.transform = 'scale(1)';
        lightboxImage.style.opacity = '1';
    }, 100);
}

function getPhotoDescription(photoType) {
    const descriptions = {
        'Our first date photo': 'I remember this day like it was yesterday. You looked so beautiful, and I was so nervous but excited. This was the beginning of our beautiful journey together.',
        'Your beautiful smile': 'This is my favorite photo of you. Your smile lights up the entire room and makes my heart skip a beat every time I see it.',
        'Our favorite spot': 'This place holds so many memories for us. Every time we go here, I fall in love with you all over again.',
        'Celebration moment': 'What a wonderful day this was! We were so happy, and I love seeing the joy in your eyes. These are the moments I treasure forever.',
        'Together forever': 'This photo captures everything I love about us. The way you look at me, the way we fit together perfectly - it\'s pure magic.',
        'Adventure time': 'Our adventures together are my favorite memories. Exploring new places with you makes everything more exciting and meaningful.',
        'Cozy moments': 'These quiet, intimate moments are what I miss most when we\'re apart. Just being close to you is my happy place.',
        'Special occasion': 'This was such a special day for us. I love how we celebrate life\'s moments together and create beautiful memories.'
    };

    return descriptions[photoType] || 'Another beautiful memory we\'ve created together. Every moment with you is special and worth treasuring forever. 💕';
}

function addSamplePhotos() {
    const galleryGrid = document.getElementById('galleryGrid');

    // Additional sample photos
    const samplePhotos = [
        { category: 'us', icon: '🥰', text: 'Together forever' },
        { category: 'you', icon: '😍', text: 'Your beautiful eyes' },
        { category: 'places', icon: '🌅', text: 'Sunrise together' },
        { category: 'us', icon: '💑', text: 'Cozy moments' },
        { category: 'you', icon: '👸', text: 'My princess' },
        { category: 'places', icon: '🏖️', text: 'Beach memories' },
        { category: 'us', icon: '🎂', text: 'Birthday celebration' },
        { category: 'you', icon: '🌺', text: 'Flower in your hair' }
    ];

    samplePhotos.forEach(photo => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.category = photo.category;

        const photoPlaceholder = document.createElement('div');
        photoPlaceholder.className = 'photo-placeholder';

        const placeholderContent = document.createElement('div');
        placeholderContent.className = 'placeholder-content';

        const placeholderIcon = document.createElement('span');
        placeholderIcon.className = 'placeholder-icon';
        placeholderIcon.textContent = photo.icon;

        const placeholderText = document.createElement('span');
        placeholderText.className = 'placeholder-text';
        placeholderText.textContent = photo.text;

        placeholderContent.appendChild(placeholderIcon);
        placeholderContent.appendChild(placeholderText);
        photoPlaceholder.appendChild(placeholderContent);
        galleryItem.appendChild(photoPlaceholder);

        galleryGrid.appendChild(galleryItem);

        // Add to gallery items array
        galleryItems.push(galleryItem);

        // Add click listener
        galleryItem.addEventListener('click', function () {
            const index = galleryItems.indexOf(this);
            openLightbox(index);
        });

        // Add hover effect
        galleryItem.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        galleryItem.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add CSS for lightbox animations
if (!document.querySelector('#lightbox-styles')) {
    const style = document.createElement('style');
    style.id = 'lightbox-styles';
    style.textContent = `
        @keyframes ripple {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
        
        .gallery-item-animated {
            animation: galleryItemAppear 0.5s ease-out;
        }
        
        @keyframes galleryItemAppear {
            0% { opacity: 0; transform: translateY(20px) scale(0.9); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .lightbox-nav-btn:active {
            transform: translateY(0) scale(0.95);
        }
    `;
    document.head.appendChild(style);
} 