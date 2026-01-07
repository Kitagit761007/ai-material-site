// Configuration: Add your image filenames here
const images = [
    // Example format: { src: 'images/sample1.jpg', title: 'Cyberpunk City' }
    // Since we don't have images yet, I'll add some placeholder data.
    // User should replace these with actual paths relative to this folder.
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
        lightbox.style.display = 'flex';
        // Use timeout to allow display:flex to apply before adding active class for fade
        setTimeout(() => lightbox.classList.add('active'), 10);

        lightboxImg.src = src;
        downloadBtn.href = src; // Set download link
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
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
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
