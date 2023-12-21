class HTMLPortfolioOverlay {
    #parentElement;
    #templateOverlayElement;
    #currentImageIndex
    #projectname;
    #projectdesc;
    #projectlangs;
    #projecturl;
    #projectimages
    
    constructor(projectname, projectdesc, projectlangs, projecturl, projectimages) {
        this.#parentElement = document.querySelector("#myPortfolio");
        this.#templateOverlayElement = `
        <dialog id="infoOverlay">
            <div id="infoWrapper">
                <div id="portfolioInfo">
                    <h2 id="projectTitleOlay"></h2>
                    <p id="projectlangsOlay">Project Langs go here</p>
                    <p id="projectdescOlay"></p>
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
        // <span id="closeBtn">Close</span>
        this.#currentImageIndex = 0
        this.#projectname = projectname;
        this.#projectdesc = projectdesc;
        this.#projectlangs = projectlangs;
        this.#projecturl = projecturl;
        this.#projectimages = projectimages;
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
    get projectname() {
        return this.#projectname;
    };
    get projectdesc() {
        return this.#projectdesc;
    };
    get projectlangs() {
        return this.#projectlangs;
    };
    get projecturl() {
        return this.#projecturl;
    };
    get projectimages() {
        return this.#projectimages;
    };


    createElement() {
        const overlayElement = document.createElement('div');
        overlayElement.innerHTML = this.#templateOverlayElement;

        overlayElement.querySelector('#projectTitleOlay').textContent = this.projectname;
        overlayElement.querySelector('#projectdescOlay').textContent = this.projectdesc;


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
            this.currentImageIndex = (this.currentImageIndex + 1) % this.projectimages.length;
            showImage(this.currentImageIndex);
        };

        const prevImage = () => {
            this.currentImageIndex = (this.currentImageIndex - 1 + this.projectimages.length) % this.projectimages.length;
            showImage(this.currentImageIndex);
        };

        // Attach event listeners to the arrows
        // Attach event listeners to the arrows
        overlayElement.querySelector('.prev').addEventListener('click', prevImage);
        overlayElement.querySelector('.next').addEventListener('click', nextImage);

        // Add each image to the gallery element
        this.projectimages.forEach((image, index) => {
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
