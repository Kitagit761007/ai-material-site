// Configuration: Add your image filenames here
// Newest images should be at the TOP of each category.

const images = [
    // 12 Landscape Images (Desktop 16:9)
    // Please ensure files are named landscape_01.jpg to landscape_12.jpg in images/landscape/ folder.
    { src: 'images/landscape/landscape_01.jpg', category: 'desktop', title: 'Gaming Landscape 01', description: '広大なSF世界の風景。' },
    { src: 'images/landscape/landscape_02.jpg', category: 'desktop', title: 'Gaming Landscape 02', description: 'サイバーパンクシティの全景。' },
    { src: 'images/landscape/landscape_03.jpg', category: 'desktop', title: 'Gaming Landscape 03', description: '幻想的な古代遺跡。' },
    { src: 'images/landscape/landscape_04.jpg', category: 'desktop', title: 'Gaming Landscape 04', description: 'ネオン輝く夜のストリート。' },
    { src: 'images/landscape/landscape_05.jpg', category: 'desktop', title: 'Gaming Landscape 05', description: '近未来の宇宙ステーション。' },
    { src: 'images/landscape/landscape_06.jpg', category: 'desktop', title: 'Gaming Landscape 06', description: '神秘的な青い森。' },
    { src: 'images/landscape/landscape_07.jpg', category: 'desktop', title: 'Gaming Landscape 07', description: '夕暮れのバトルフィールド。' },
    { src: 'images/landscape/landscape_08.jpg', category: 'desktop', title: 'Gaming Landscape 08', description: '氷に覆われた惑星。' },
    { src: 'images/landscape/landscape_09.jpg', category: 'desktop', title: 'Gaming Landscape 09', description: '荒廃した都市の廃墟。' },
    { src: 'images/landscape/landscape_10.jpg', category: 'desktop', title: 'Gaming Landscape 10', description: 'ドラゴンの住む渓谷。' },
    { src: 'images/landscape/landscape_11.jpg', category: 'desktop', title: 'Gaming Landscape 11', description: '高層ビルの屋上からの眺め。' },
    { src: 'images/landscape/landscape_12.jpg', category: 'desktop', title: 'Gaming Landscape 12', description: 'デジタル空間の抽象背景。' },
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

            // Add Badge Container
            const badgeContainer = document.createElement('div');
            badgeContainer.className = 'card-badge-container';

            const badge1 = document.createElement('span');
            badge1.className = 'card-badge badge-royalty';
            badge1.textContent = 'ロイヤリティフリー';

            const badge2 = document.createElement('span');
            badge2.className = 'card-badge badge-commercial';
            badge2.textContent = '商用利用可';

            badgeContainer.appendChild(badge1);
            badgeContainer.appendChild(badge2);

            const overlay = document.createElement('div');
            overlay.className = 'card-overlay';

            const title = document.createElement('div');
            title.className = 'card-title';
            title.textContent = image.title;

            overlay.appendChild(title);
            card.appendChild(img);
            card.appendChild(badgeContainer); // Add badges to card
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
