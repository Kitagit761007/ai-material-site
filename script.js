// Configuration: Add your image filenames here
// Newest images should be at the TOP of this list.
const images = [
    // Cyberpunk City Collection (Coming Soon)
    {
        src: 'https://via.placeholder.com/800x450/000022/00ffff?text=Cyberpunk+City+1',
        title: 'Neon Skyscraper Night',
        description: 'ネオンサインが輝く雨夜のサイバーパンク都市。摩天楼と空飛ぶ車が織りなす近未来の情景。青とピンクの照明がサイバーな雰囲気を演出する高品質背景素材。'
    },
    {
        src: 'https://via.placeholder.com/800x450/050011/ff00ff?text=Cyberpunk+City+2',
        title: 'Futuristic Street Level',
        description: 'テクノロジーと雑多な屋台が融合した未来のストリート。濡れた路面に反射する光と、行き交う人々の活気が感じられるシネマティックなコンセプトアート。'
    },
    {
        src: 'https://via.placeholder.com/800x450/001100/00ff00?text=Cyberpunk+City+3',
        title: 'Cyber Alleyway',
        description: '高層ビルの谷間に広がるサイバーパンクな裏路地。配管やケーブル、ホログラム広告が詳細に描かれた、没入感のあるダークでクールな背景イラスト。'
    },

    // Fantasy Forest Collection (Batch 2 - Remaining)
    {
        src: 'https://via.placeholder.com/800x450/002200/00ff00?text=Forest+Ruins',
        title: 'Mossy Ancient Ruins',
        description: '苔むした石造りの遺跡とファンタジーの森が融合した風景。木漏れ日が差し込む静寂な空間は、冒険の始まりや古代の謎を感じさせる素材です。'
    },
    {
        src: 'https://via.placeholder.com/800x450/110022/ff00ff?text=Mushroom+Grove',
        title: 'Glowing Mushroom Grove',
        description: '巨大な発光キノコが群生する神秘的な森の奥地。シアンとマゼンタの胞子が舞う幻想的な世界観は、魔法使いの住処や異世界の表現に最適です。'
    },
    {
        src: 'https://via.placeholder.com/800x450/001122/00ffff?text=Crystal+Cave',
        title: 'Hidden Crystal Cave',
        description: '森の奥深くに隠されたクリスタル洞窟の入り口。輝く鉱石と植物が共生する美しい光景。RPGや探索ゲームのワンシーンのような高品質イラスト。'
    },

    // Fantasy Forest Collection (Batch 2)
    {
        src: 'uploads/forest_02_giant_tree.png',
        title: 'Ancient Giant Tree',
        description: '森の中心に佇む巨大な古木。樹皮に浮かぶ発光するルーン文字と、周囲を舞う精霊たちが神秘的な雰囲気を醸し出す、ファンタジーの王道的な風景。'
    },
    {
        src: 'uploads/forest_03_river_twilight.png',
        title: 'Twilight Forest Stream',
        description: '黄昏時の森を流れる静かな小川。水面が微かに発光し、蛍が舞う幻想的な空間。紫と青のグラデーションが美しい、落ち着いた雰囲気の背景素材。'
    },

    // Japanese Texture Collection
    {
        src: 'uploads/japanese_texture_gold_black.png',
        title: 'Luxurious Gold Leaf Washi',
        description: '黒と金箔のコントラストが美しい、高級感あふれる和紙テクスチャ。伝統的な京友禅のような趣があり、年賀状や和風デザインの背景に最適です。'
    },
    {
        src: 'uploads/japanese_texture_sakura_pink.png',
        title: 'Sakura Washi Texture',
        description: '淡いピンク色の和紙に、繊細な桜の花びらが舞う上品なデザイン。春の訪れを感じさせる、優しく華やかな背景素材です。'
    },
    {
        src: 'uploads/japanese_texture_indigo_pattern.png',
        title: 'Indigo Seigaiha Pattern',
        description: '伝統的な青海波（せいがいは）文様をモダンにアレンジした、藍染め風のテクスチャ。落ち着いた色合いで、ビジネスや和モダンなデザインに使いやすい一枚です。'
    },

    // Fantasy Forest (Generated)
    {
        src: 'uploads/forest_01.png',
        title: 'Fantasy Forest Background',
        description: '幻想的な森の背景。発光する植物と古代の樹木が織りなす神秘的な風景。ファンタジー作品やゲーム背景に最適な高品質AIイラスト素材。'
    },

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
            // Image Element
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.title;
            img.className = 'card-image';
            img.loading = 'lazy';

            // Overlay Element
            const overlay = document.createElement('div');
            overlay.className = 'card-overlay';

            const title = document.createElement('div');
            title.className = 'card-title';
            title.textContent = image.title;

            overlay.appendChild(title);

            // Assemble Card
            card.appendChild(img);
            card.appendChild(overlay);

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
