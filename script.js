// Configuration: Add your image filenames here
// Newest images should be at the TOP of this list.
const images = [
    // Test Image
    {
        src: 'test_image_01.jpg',
        title: 'Autumn River (Test Image)',
        description: '美しい秋の川辺の風景。夕日が差し込む静かな情景をAIが生成しました。商用利用可能な高品質素材です。'
    },

    // Placeholders
    { src: 'https://via.placeholder.com/600x400/000000/d4af37?text=AI+Art+1', title: 'Future Concept 01', description: '近未来の都市構想を描いたコンセプトアート。' },
    { src: 'https://via.placeholder.com/600x400/1a1a1a/d4af37?text=AI+Art+2', title: 'Neon Portrait', description: 'ネオンライトに照らされたポートレート。' },
    { src: 'https://via.placeholder.com/600x400/050505/f1c40f?text=AI+Art+3', title: 'Abstract Gold', description: '金と黒の抽象的なパターンアート。' },
    { src: 'https://via.placeholder.com/600x400/000000/d4af37?text=AI+Art+4', title: 'Landscape', description: '幻想的な山岳風景のイラスト。' },
    { src: 'https://via.placeholder.com/600x400/1a1a1a/d4af37?text=AI+Art+5', title: 'Character Design', description: 'ゲームや小説に使えるキャラクターデザイン。' },
    { src: 'https://via.placeholder.com/600x400/050505/f1c40f?text=AI+Art+6', title: 'Cyber Animal', description: 'サイバネティックな装飾を施された動物のイラスト。' },
];

document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxDesc = document.getElementById('lightbox-desc'); // New description element
    const downloadBtn = document.getElementById('download-btn');
    const closeBtn = document.querySelector('.close-modal');

    // Create description element if it doesn't exist (for safety if HTML isn't updated simultaneously)
    if (!lightboxDesc && lightbox) {
        const descP = document.createElement('p');
        descP.id = 'lightbox-desc';
        descP.className = 'lightbox-description';
        // Insert after image, before controls
        const controls = lightbox.querySelector('.modal-controls');
        if (controls) {
            lightbox.insertBefore(descP, controls);
        }
    }

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
                openLightbox(image);
            });

            gallery.appendChild(card);
        });
    }

    // Modal Functions
    function openLightbox(imageObj) {
        if (!lightbox) return;

        lightbox.style.display = 'flex';
        // Smooth fade in
        requestAnimationFrame(() => {
            lightbox.classList.add('active');
        });

        if (lightboxImg) lightboxImg.src = imageObj.src;

        // Update Description
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
