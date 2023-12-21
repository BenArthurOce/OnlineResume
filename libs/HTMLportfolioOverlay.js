class HTMLPortfolioOverlay {
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
        overlayElement.innerHTML = this.#templateOverlayElement;

        overlayElement.querySelector('#projectTitleOlay').textContent = this.projectName;
        overlayElement.querySelector('#projectSummaryOlay').textContent = this.projectSumLarge;


        // Import the icons from the tile (doesnt work)
        overlayElement.querySelector('#projectLangsOlay').textContent = this.iconContainer.textContent

        // Prepare slideshow
        const imageContainer = overlayElement.querySelector('#slideshowContainer');

        //
        // Image slideshow, left and right arrows
        //
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

        // Attach event listeners to the arrows
        overlayElement.querySelector('.prev').addEventListener('click', prevImage);
        overlayElement.querySelector('.next').addEventListener('click', nextImage);

        // Add each image to the gallery element
        this.projectImages.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image;
            img.style.display = index === 0 ? 'block' : 'none';
            imageContainer.appendChild(img);
        });

        overlayElement.querySelector('#closeBtn').onclick = () => {
            document.body.removeChild(overlayElement);
        };

        document.body.appendChild(overlayElement);
        
    };


    // Change the display attribute to show the overlay over the screen
    renderToPage() {
        document.body.querySelector('#infoOverlay').classList.add('active');
    };
  
    // Remove the overlay from the screen
    removeFromPage() {
        document.body.querySelector('#infoOverlay').classList.remove('active');
    };

};
  
  export default HTMLPortfolioOverlay;
