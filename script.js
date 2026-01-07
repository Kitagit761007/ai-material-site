// Configuration: Add your image filenames here
// Newest images should be at the TOP of this list.
const images = [
    // 【ここに画像を追加してください】
    // 例:
    // {
    //     src: 'uploads/my_image.jpg',
    //     title: 'Image Title',
    //     description: 'Image Description'
    // },

    // 現在は画像がありません。画像をアップロードしてここに追加してください。
];

document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
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

    // Render Gallery using DOM API (Prevents HTML-as-text bug)
    if (gallery) {
        gallery.innerHTML = ''; // Clear any existing content
        images.forEach(image => {
            const card = document.createElement('div');
            card.className = 'card';

            // Image
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.title;
            img.className = 'card-image';
            img.loading = 'lazy';

            // Overlay
            const overlay = document.createElement('div');
            overlay.className = 'card-overlay';

            const title = document.createElement('div');
            title.className = 'card-title';
            title.textContent = image.title;

            overlay.appendChild(title);
            card.appendChild(img);
            card.appendChild(overlay);

            // Lightbox Event
            card.addEventListener('click', () => {
                openLightbox(image);
            });

            gallery.appendChild(card);
        });
    }

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
