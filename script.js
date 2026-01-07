// Configuration: Add your image filenames here
// Newest images should be at the TOP of this list.
const images = [
    // Test Image
    { src: 'test_image_01.jpg', title: 'Autumn River (Test Image)' },

    // Placeholders
    { src: 'https://via.placeholder.com/600x400/000000/d4af37?text=AI+Art+1', title: 'Future Concept 01' },
    { src: 'https://via.placeholder.com/600x400/1a1a1a/d4af37?text=AI+Art+2', title: 'Neon Portrait' },
    { src: 'https://via.placeholder.com/600x400/050505/f1c40f?text=AI+Art+3', title: 'Abstract Gold' },
    { src: 'https://via.placeholder.com/600x400/000000/d4af37?text=AI+Art+4', title: 'Landscape' },
    { src: 'https://via.placeholder.com/600x400/1a1a1a/d4af37?text=AI+Art+5', title: 'Character Design' },
    { src: 'https://via.placeholder.com/600x400/050505/f1c40f?text=AI+Art+6', title: 'Cyber Animal' },
];

document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const downloadBtn = document.getElementById('download-btn');
    const closeBtn = document.querySelector('.close-modal');

    // Render Gallery
    if (gallery) {
        images.forEach(image => {
            const card = document.createElement('div');
            card.className = 'card';
            // Use innerHTML to create structure. Ensure image.src and image.title are safe strings.
            card.innerHTML = `
                <img src="${image.src}" alt="${image.title}" class="card-image" loading="lazy">
                <div class="card-overlay">
                    <div class="card-title">${image.title}</div>
                </div>
            `;

            // Click event for lightbox
            card.addEventListener('click', () => {
                openLightbox(image.src);
            });

            gallery.appendChild(card);
        });
    }

    // Modal Functions
    function openLightbox(src) {
        if (!lightbox) return;
        lightbox.style.display = 'flex';
        // Use timeout to allow display:flex to apply before adding active class for fade
        setTimeout(() => lightbox.classList.add('active'), 10);

        if (lightboxImg) lightboxImg.src = src;

        if (downloadBtn) {
            downloadBtn.href = src; // Set download link path
            // Extract filename for the download attribute
            const filename = src.substring(src.lastIndexOf('/') + 1);
            downloadBtn.setAttribute('download', filename);
        }
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
            if (lightboxImg) lightboxImg.src = '';
        }, 300); // Wait for transition
    }

    // Event Listeners for Modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
