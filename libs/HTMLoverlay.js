// Base class
class HTMLOverlay {
    #overlay;
    #data;
    #parentElement;

    constructor(data, parentElementId) {
        this.overlay = '';
        this.#data = data;
        this.#parentElement = document.querySelector(parentElementId);
    };

    get data() {
        return this.#data;
    };

    get overlay() {
        return this.#overlay;
    };

    set overlay(value) {
        this.#overlay = value;
    };

    get parentElement() {
        return this.#parentElement;
    };

    set parentElement(value) {
        value = this.#parentElement;
    };

    renderToPage(overlayToRender, parentElement) {
        // Render to webpage (needs adjustment to include parentElement from FrontPage)
        document.body.appendChild(overlayToRender);

        // Change the display attribute to show the overlay over the screen
        document.body.querySelector('#section-prev').classList.add('disabled');
        document.body.querySelector('#section-next').classList.add('disabled');
        document.body.querySelector('dialog').classList.add('active');
    };


    addEventListeners() {
        console.log("addEventListeners")
        // On pressing the close button, deletes the overlay
        this.overlay.querySelector('.closeBtn').onclick = () => {
            document.body.querySelector('#section-prev').classList.remove('disabled');
            document.body.querySelector('#section-next').classList.remove('disabled');
            this.overlay.remove();
        };
    };
};


class HTMLExperienceOverlay extends HTMLOverlay {
    constructor(experienceData) {
        super(experienceData, "#myExperiences");
        this.overlay = ''
        this.experienceData = experienceData
        this.name = 'ExperienceOverlay'
    };

    initOverlay() {
        this.overlay = '';
        this.createElement();
        this.applyInfoToElement();
        this.renderToPage(this.overlay, this.parentElement);
        this.addEventListeners()
    };

    createElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <dialog id="${this.name}" class="">
            <div class="overlay-wrapper" id="${this.name.toLowerCase()}-wrapper">
                <article class="overlay-article" id="experience-information">
                    <h3">JobTitle</h3>
                    <span class="period"></span>
                    <h3 class="company"></h3>
                    <h4 class="address"></h4>
                    <h5 class="position"></h5>
                </article>
                <article class="overlay-article" id="experience-duties">
                    <h3">Duties</h3>
                    <ul class="duties"></ul> 
                </article>
                <article class="overlay-article" id="experience-softwares">
                    <h3">Softwares</h3>
                    <ul class="softwares"></ul> 
                </article>
                <span class="closeBtn" id="experience-close-btn">Close</span>
            </div>
        </dialog>
        `.trim();
        this.overlay = tempEl.firstChild;
    };

    applyInfoToElement() {
        this.overlay.querySelector('.company').textContent = this.experienceData.company;
        this.overlay.querySelector('.address').textContent = this.experienceData.address;
        this.overlay.querySelector('.position').textContent = this.experienceData.position;
        this.overlay.querySelector('.period').textContent = this.experienceData.period;   
        
        // Select the ul elements
        const softwaresUl = this.overlay.querySelector('.softwares');
        const dutiesUl = this.overlay.querySelector('.duties');

        // Loop through each software and duty and create li elements
        this.experienceData.softwares.forEach((software) => {
            const li = document.createElement('li');
            li.textContent = software;
            softwaresUl.appendChild(li);
        });

        this.experienceData.duties.forEach((duty) => {
            const li = document.createElement('li');
            li.textContent = duty;
            dutiesUl.appendChild(li);
        });
    };
};


class HTMLPortfolioOverlay extends HTMLOverlay {
    #currentImageIndex
    constructor(portfolioData) {
        super(portfolioData, "#myPortfolio");
        this.overlay = ''
        this.portfolioData = portfolioData
        this.name = 'PortfolioOverlay'
        this.#currentImageIndex = 0
    };
    get currentImageIndex() {
        return this.#currentImageIndex;
    };
    set currentImageIndex(value) {
        this.#currentImageIndex = value
    };

    initOverlay() {
        this.overlay = '';
        this.createElement();
        this.applyInfoToElement();
        this.renderToPage(this.overlay, this.parentElement);
        this.addEventListeners()
    };

    createElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <dialog id="${this.name}" class="">
            <div class="overlay-wrapper" id="${this.name.toLowerCase()}-wrapper">
                <article class="overlay-article" id="project-information">
                    <h2 class="portfolio-project-title"></h2>
                    <div class="portfolio-icon-container"></div>
                    <p class="portfolio-project-summary"></p>
                </article>

                <article class="overlay-article" id="project-slideshow">
                    <div class="image-container">
                        <button class="arrow" id="overlay-prev">❮</button>
                        <button class="arrow" id="overlay-next">❯</button>
                    </div>
                </article>
                <span class="closeBtn" id="portfolio-close-btn">Close</span>
            </div>
        </dialog>
        `.trim();
        this.overlay = tempEl.firstChild;
    };

    applyInfoToElement() {
        this.overlay.querySelector('.portfolio-project-title').textContent = this.portfolioData.projectName;
        this.overlay.querySelector('.portfolio-project-summary').textContent = this.portfolioData.projectSumLarge;


        // Prepare programming language logos
        this.portfolioData.projectLangs.forEach(lang => {
            const logoPath = `imgLogos/${lang}.svg`;

            // Create a new image element for each language
            const langLogo = document.createElement('img');
            langLogo.src = logoPath;
            langLogo.alt = lang; // You can set alt text as the language name
            langLogo.classList.add('lang-logo');

            this.overlay.querySelector('.portfolio-icon-container').appendChild(langLogo);
        });


        // Prepare slideshow images
        const imageContainer = this.overlay.querySelector('.image-container');

        const showImage = (index) => {
            const images = imageContainer.querySelectorAll('img');
            images.forEach((img, i) => {
                img.style.display = i === index ? 'block' : 'none';
            });
        };

        const nextImage = () => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.portfolioData.projectImages.length;
            showImage(this.currentImageIndex);
        };

        const prevImage = () => {
            this.currentImageIndex = (this.currentImageIndex - 1 + this.portfolioData.projectImages.length) % this.portfolioData.projectImages.length;
            showImage(this.currentImageIndex);
        };

        this.overlay.querySelector('#overlay-prev').addEventListener('click', prevImage);
        this.overlay.querySelector('#overlay-next').addEventListener('click', nextImage);

        this.portfolioData.projectImages.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image;
            img.style.display = index === 0 ? 'block' : 'none';
            imageContainer.appendChild(img);
        });
    };
};

export { HTMLExperienceOverlay, HTMLPortfolioOverlay };
