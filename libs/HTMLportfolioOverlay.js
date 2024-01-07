class HTMLportfolioOverlay {
    #portTile;
    #portData;
    #parentElement;
    #currentImageIndex
    #iconContainer

    constructor(portTile, portData) {
        this.overlay = ''
        this.#parentElement = document.querySelector("#myPortfolio");
        this.#portTile = portTile;
        this.#portData = portData;
        this.#currentImageIndex = 0
        // this.#iconContainer = iconContainer;

    };
    get parentElement() {
        return this.#parentElement;
    };
    get portTile() {
        return this.#portTile;
    };
    get portData() {
        return this.#portData;
    };
    get currentImageIndex() {
        return this.#currentImageIndex;
    };
    set currentImageIndex(value) {
        this.#currentImageIndex = value
    };
    get iconContainer() {
        return this.#iconContainer;
    };

    createElement() {
        const newElement = document.createElement('dialog');
        newElement.innerHTML = `
            <div class="infoWrapper">
                <article>
                    <h2 class="projectTitleOlay"></h2>
                    <p class="projectLangsOlay"></p>
                    <p class="projectSummaryOlay"></p>
                </article>

                <article>
                    <div class="slideshowContainer">
                        <a id="port-prev">❮</a>
                        <a id="port-next">❯</a>
                    </div>
                </article>
                <span class="closeBtn">Close</span>
            </div>
        `;
        this.overlay = newElement.cloneNode(true);
    };

    applyInfoToElement() {
        this.overlay.querySelector('.projectTitleOlay').textContent = this.portData.projectName;
        this.overlay.querySelector('.projectSummaryOlay').textContent = this.portData.projectSumLarge;


        // Prepare programming language logos
        this.portData.projectLangs.forEach(lang => {
            const logoPath = `imgLogos/${lang}.svg`;

            // Create a new image element for each language
            const langLogo = document.createElement('img');
            langLogo.src = logoPath;
            langLogo.alt = lang; // You can set alt text as the language name
            langLogo.classList.add('lang-logo');

            this.overlay.querySelector('.projectLangsOlay').appendChild(langLogo);
        });


        // Prepare slideshow images
        const imageContainer = this.overlay.querySelector('.slideshowContainer');

        const showImage = (index) => {
            const images = imageContainer.querySelectorAll('img');
            images.forEach((img, i) => {
                img.style.display = i === index ? 'block' : 'none';
            });
        };

        const nextImage = () => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.portData.projectImages.length;
            showImage(this.currentImageIndex);
        };

        const prevImage = () => {
            this.currentImageIndex = (this.currentImageIndex - 1 + this.portData.projectImages.length) % this.portData.projectImages.length;
            showImage(this.currentImageIndex);
        };

        this.overlay.querySelector('#port-prev').addEventListener('click', prevImage);
        this.overlay.querySelector('#port-next').addEventListener('click', nextImage);

        this.portData.projectImages.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image;
            img.style.display = index === 0 ? 'block' : 'none';
            imageContainer.appendChild(img);
        });
    };

    addEventListeners() {
        // On pressing the close button, deletes the overlay
        this.overlay.querySelector('.closeBtn').onclick = () => {
            document.body.querySelector('#prev').classList.remove('disabled');
            document.body.querySelector('#next').classList.remove('disabled');
            this.overlay.remove();
        };
    };

    renderToPage() {
        this.createElement();
        this.applyInfoToElement();
        this.addEventListeners();
        document.body.appendChild(this.overlay);

        // Change the display attribute to show the overlay over the screen
        document.body.querySelector('#prev').classList.add('disabled');
        document.body.querySelector('#next').classList.add('disabled');
        document.body.querySelector('dialog').classList.add('active');
    };
};
  
export default HTMLportfolioOverlay;
