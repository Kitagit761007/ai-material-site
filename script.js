// Configuration: Add your image filenames here
// Newest images should be at the TOP of each category.

const images = [
    // 【ここに画像を追加してください】
    // 'category' は 'desktop' (16:9) または 'mobile' (9:16) を指定してください。
    // 例:
    // {
    //     src: 'uploads/desktop_cyberpunk.jpg',
    //     category: 'desktop',
    //     title: 'Neon City',
    //     description: 'サイバーパンクな都市の夜景。'
    // },

    // 現在は画像がありません。画像をアップロードしてここに追加してください。
];

document.addEventListener('DOMContentLoaded', () => {
    const galleryDesktop = document.getElementById('gallery-desktop');
    const galleryMobile = document.getElementById('gallery-mobile');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const downloadBtn = document.getElementById('download-btn');
    const closeBtn = document.querySelector('.close-modal');

    // Ensure Description Element Exists
    if (!lightboxDesc && lightbox) {
        const descP = document.createElement('p');
        descP.id = 'lightbox-desc';
        descP.className = 'lightbox-description';
        const controls = lightbox.querySelector('.modal-controls');
        if (controls) {
            lightbox.insertBefore(descP, controls);
        } else {
            lightbox.appendChild(descP);
        }
    }

    // Render Gallery Function
    function renderGallery() {
        // Clear existing content safely
        if (galleryDesktop) galleryDesktop.innerHTML = '';
        if (galleryMobile) galleryMobile.innerHTML = '';

        if (images.length === 0) {
            // Optional: Show "Coming Soon" message if empty (handled via CSS/HTML usually, but safe to leave empty)
            return;
        }

        images.forEach(image => {
            const card = document.createElement('div');
            card.className = 'card';

            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.title;
            img.className = 'card-image';
            img.loading = 'lazy';

            const overlay = document.createElement('div');
            overlay.className = 'card-overlay';

            const title = document.createElement('div');
            title.className = 'card-title';
            title.textContent = image.title;

            overlay.appendChild(title);
            card.appendChild(img);
            card.appendChild(overlay);

            card.addEventListener('click', () => {
                openLightbox(image);
            });

            // Append to correct section
            if (image.category === 'desktop' && galleryDesktop) {
                galleryDesktop.appendChild(card);
            } else if (image.category === 'mobile' && galleryMobile) {
                galleryMobile.appendChild(card);
            }
        });
    }

    // Execute Render
    renderGallery();

    // Lightbox Logic
    function openLightbox(imageObj) {
        if (!lightbox) return;

        lightbox.style.display = 'flex';
        requestAnimationFrame(() => {
            lightbox.classList.add('active');
        });

        if (lightboxImg) lightboxImg.src = imageObj.src;

        const descEl = document.getElementById('lightbox-desc');
        if (descEl) {
            descEl.textContent = imageObj.description || imageObj.title;
        }

        if (downloadBtn) {
            downloadBtn.href = imageObj.src;
            const filename = imageObj.src.substring(imageObj.src.lastIndexOf('/') + 1);
            downloadBtn.setAttribute('download', filename);
        }
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
            if (lightboxImg) lightboxImg.src = '';
        }, 300);
    }

    // Event Listeners
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
