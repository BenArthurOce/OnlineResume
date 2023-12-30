class HTMLportfolioOverlay {
    #parentElement;
    #templateOverlayElement;
    #currentImageIndex
    #projectName;
    #projectLangs;
    #projectSumSmall;
    #projectSumLarge;
    #projectUrl;
    #projectImages
    #iconContainer

    constructor(projectName, projectLangs, projectSumSmall, projectSumLarge, projectUrl, projectImages, iconContainer) {
        this.#parentElement = document.querySelector("#myPortfolio");
        this.#templateOverlayElement = `
        <dialog id="infoOverlay">
            <div id="infoWrapper">
                <div id="portfolioInfo">
                    <h2 id="projectTitleOlay"></h2>
                    <p id="projectLangsOlay"></p>
                    <p id="projectSummaryOlay"></p>
                </div>
                <div id="imageContainer">
                    <div id="slideshowContainer">
                        <a class="prev">❮</a>
                        <a class="next">❯</a>
                    </div>
                </div>
            <span id="closeBtn">Close</span>
            </div>
         </dialog>
        `;
        this.#currentImageIndex = 0
        this.#projectName = projectName;
        this.#projectLangs = projectLangs;
        this.#projectSumSmall = projectSumSmall;
        this.#projectSumLarge = projectSumLarge;
        this.#projectUrl = projectUrl;
        this.#projectImages = projectImages;
        this.#iconContainer = iconContainer;

        // Add CSS styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            #infoOverlay {
                display: none;   /* Default display is non visible. Display is modified when class becomes "active" */
                position: fixed;  /* Positions the overlay relative to the browser window and does not scroll with the page */
                top: 0;
                left: 0;
                margin-left: 20%;   /* navigation sidebar is currently at 20%. The overlay does not overlap the sidebar*/
                width: 80%;         /* navigation sidebar is currently at 20%. The overlay does not overlap the sidebar*/
                height: 95%;        /* Set at 100% to cover whole screen. Reduced by 5% to include the "Close" button at the bottom */
                background: rgba(0, 0, 0, 0.7);     /* Sets transparent background */
                color: #fff;
                justify-content: center;    /* Centers the child elements horizontally */
                align-items: center;        /* Centers the child elements vertically */
                
            }
            
            #infoOverlay.active {
                display: flex;      /* Overlay becomes visible when is active*/
            }
            
            #infoWrapper {
                font-family: 'Arial', sans-serif;
                padding: 2% 5%;     /* padding on the top/bottom and left/right of the wrapper.*/
            }
            
            #portfolioInfo,
            #imageContainer {
                padding: 20px;
                height: 100%;
            }
            
            #portfolioInfo {
                background-color: #2ecc71;
                flex-basis: 40%;
            }
            
            #imageContainer {
                background-color: rgba(0, 0, 0, 0.9);   /* Sets transparent background */
                flex-basis: 55%;
                display: flex;
                align-items: center;
                justify-content: center;    /* Allows images inside this to be centered.*/
                position: relative;
            }
            
            
            #slideshowContainer img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            
            .next, .prev {
                cursor: pointer;
                position: absolute;
                top: 50%;
                width: auto;
                padding: 16px;
                margin-top: -22px;
                color: black;
                font-weight: bold;
                font-size: 18px;
                transition: 0.6s ease;
                border-radius: 0 3px 3px 0;
                user-select: none;
            }
            
            .next {
                right: 0;
                border-radius: 3px 0 0 3px;
            }
            
            .prev:hover, .next:hover {
                background-color: rgba(0, 0, 0, 0.8);   /* shows background of slideshow arrow when mouse hovers.*/
            }
            
            #closeBtn {
                cursor: pointer;
                color: #e74c3c;
                position: absolute;
                top: 90%;
                left: 50%;
                transform: translateX(-50%);         /* Centers the button horizontally.*/
                font-weight: bold;
                font-size: 20px;
            }
        `;
        document.head.appendChild(style);
    };
    get parentElement() {
        return this.#parentElement;
    };
    get templateOverlayElement() {
        return this.#templateOverlayElement;
    };
    get currentImageIndex() {
        return this.#currentImageIndex;
    };
    set currentImageIndex(value) {
        this.#currentImageIndex = value
    };
    get projectName() {
        return this.#projectName;
    };
    get projectLangs() {
        return this.#projectLangs;
    };
    get projectSumSmall() {
        return this.#projectSumSmall;
    };
    get projectSumLarge() {
        return this.#projectSumLarge;
    };
    get projectUrl() {
        return this.#projectUrl;
    };
    get projectImages() {
        return this.#projectImages;
    };
    get iconContainer() {
        return this.#iconContainer;
    };


    createElement() {
        const overlayElement = document.createElement('div');
        overlayElement.innerHTML = this.templateOverlayElement;

        overlayElement.querySelector('#projectTitleOlay').textContent = this.projectName;
        overlayElement.querySelector('#projectSummaryOlay').textContent = this.projectSumLarge;

        this.projectLangs.forEach(lang => {
            const logoPath = `imgLogos/${lang}.svg`;

            // Create a new image element for each language
            const langLogo = document.createElement('img');
            langLogo.src = logoPath;
            langLogo.alt = lang; // You can set alt text as the language name
            langLogo.classList.add('lang-logo');

            overlayElement.querySelector('#projectLangsOlay').appendChild(langLogo);
        });

        // Prepare slideshow
        const imageContainer = overlayElement.querySelector('#slideshowContainer');

        const showImage = (index) => {
            const images = imageContainer.querySelectorAll('img');
            images.forEach((img, i) => {
                img.style.display = i === index ? 'block' : 'none';
            });
        };

        const nextImage = () => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.projectImages.length;
            showImage(this.currentImageIndex);
        };

        const prevImage = () => {
            this.currentImageIndex = (this.currentImageIndex - 1 + this.projectImages.length) % this.projectImages.length;
            showImage(this.currentImageIndex);
        };

        overlayElement.querySelector('.prev').addEventListener('click', prevImage);
        overlayElement.querySelector('.next').addEventListener('click', nextImage);

        this.projectImages.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image;
            img.style.display = index === 0 ? 'block' : 'none';
            imageContainer.appendChild(img);
        });

        overlayElement.querySelector('#closeBtn').onclick = () => {
            this.removeFromPage();
        };

        document.body.appendChild(overlayElement);
    };

    renderToPage() {
        document.body.querySelector('#infoOverlay').classList.add('active');
    };

    removeFromPage() {
        const overlayElement = document.body.querySelector('#infoOverlay');
        if (overlayElement) {
            const parentElement = overlayElement.parentNode;
            if (parentElement) {
                parentElement.parentNode.removeChild(parentElement);
            }
        }                                                                       
    }
}
  
  export default HTMLportfolioOverlay;
