let currentIndex = 0;
let images = [];

/* Show and Hide Gallery Section */
const showGallery = (id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
};

const closeGallery = (id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
};

/* Open Lightbox with Image Preview */
const openLightbox = (src) => {
    images = Array.from(document.querySelectorAll('.gallery .images img')).map(img => img.src);
    currentIndex = images.indexOf(src);

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
        setTimeout(() => lightbox.classList.add('visible'), 10); // Trigger fade-in
    }
};

/* Close Lightbox */
const closeLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('visible');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300); // Match with CSS fade-out duration
    }
};

/* Navigate Images in Lightbox */
const nextImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxImage();
};

const prevImage = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxImage();
};

const updateLightboxImage = () => {
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) {
        lightboxImg.classList.remove('fade');
        void lightboxImg.offsetWidth; // Trigger reflow
        lightboxImg.src = images[currentIndex];
        lightboxImg.classList.add('fade');
    }
};

/* Keyboard Navigation & ESC */
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.style.display === 'flex') {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
    }
});

/* Close Lightbox on Click Outside */
document.addEventListener('click', (e) => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox && lightbox.style.display === 'flex' && !lightboxImg.contains(e.target)) {
        closeLightbox();
    }
});
