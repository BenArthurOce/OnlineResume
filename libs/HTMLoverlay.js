// Base class
class HTMLOverlay {
    #element;
    #data;
    #parentEl;
    #name;
    constructor(data, parentEl) {
        this.element = '';
        this.#data = data;
        this.#parentEl = parentEl;
        this.#name = ''
        this.initOverlay();
    };
    get element() {
        return this.#element;
    };
    set element(value) {
        this.#element = value;
    };
    get data() {
        return this.#data;
    };
    get parentEl() {
        return this.#parentEl;
    };
    get name() {
        return this.#name;
    };
    set name(value) {
        this.#name = value;
    };

    renderToPage() {
        // Render to webpage (needs adjustment to include parentEl from FrontPage)
        this.parentEl.appendChild(this.element);

        // Change the display attribute to show the overlay over the screen
        document.body.querySelector('#section-prev').classList.add('disabled');
        document.body.querySelector('#section-next').classList.add('disabled');
        document.body.querySelector('dialog').classList.add('active');
    };


    addEventListeners() {
        // On pressing the close button, deletes the overlay
        this.element.querySelector('.closeBtn').onclick = () => {
            document.body.querySelector('#section-prev').classList.remove('disabled');
            document.body.querySelector('#section-next').classList.remove('disabled');
            this.element.remove();
        };
    };
};


class HTMLExperienceOverlay extends HTMLOverlay {
    constructor(data, parentEl) {
        super(data, parentEl);
        this.name = "HTMLExperienceOverlay"
    };

    initOverlay() {
        this.createOverlayElement();
        this.applyInfoToElement();
        this.renderToPage();
        this.addEventListeners();
    };

    createOverlayElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <dialog id="HTMLExperienceOverlay" class="">
            <div class="HTMLExperienceOverlay-overlay-wrapper" id="${this.name.toLowerCase()}-wrapper">
                <article class="overlay-article" id="experience-information">
                    <h3 class="position"></h3>
                    <p class="JobTitle"></p>
                    <p class="period"></p>
                    <p class="company"></p>
                    <p class="address"></p>
                    <p class="extraInfo"></p>

                </article>
                <article class="overlay-article" id="experience-duties">
                    <h3>Duties</h3>
                    <ul class="duties"></ul> 
                </article>
                <article class="overlay-article" id="experience-softwares">
                    <h3>Softwares</h3>
                    <ul class="softwares"></ul> 
                </article>
                <span class="closeBtn" id="experience-close-btn">x</span>
            </div>
        </dialog>
        `.trim();
        this.element = tempEl.firstChild;
    };

    applyInfoToElement() {
        this.element.querySelector('.company').textContent = this.data.company;
        this.element.querySelector('.address').textContent = this.data.address;
        this.element.querySelector('.position').textContent = this.data.position;
        this.element.querySelector('.period').textContent = this.data.period;
        this.element.querySelector('.extraInfo').textContent = this.data.extraInfo;  
        
        // Select the ul elements
        const softwaresUl = this.element.querySelector('.softwares');
        const dutiesUl = this.element.querySelector('.duties');

        // Loop through each software and duty and create li elements
        this.data.softwares.forEach((software) => {
            const li = document.createElement('li');
            li.textContent = software;
            softwaresUl.appendChild(li);
        });

        this.data.duties.forEach((duty) => {
            const li = document.createElement('li');
            li.textContent = duty;
            dutiesUl.appendChild(li);
        });
    };
};


class HTMLPortfolioOverlay extends HTMLOverlay {
    #currentImageIndex
    constructor(data, parentEl) {
        super(data, parentEl);
        this.name = "HTMLPortfolioOverlay"
        this.#currentImageIndex = 0
    };
    get currentImageIndex() {
        return this.#currentImageIndex;
    };
    set currentImageIndex(value) {
        this.#currentImageIndex = value
    };

    initOverlay() {
        this.createOverlayElement();
        this.applyInfoToElement();
        this.renderToPage();
        this.addEventListeners();
    };

    createOverlayElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <dialog id="HTMLPortfolioOverlay" class="">
            <div class="HTMLPortfolioOverlay-overlay-wrapper" id="${this.name.toLowerCase()}-wrapper">
                <article class="overlay-article" id="project-information">
                    <h3 class="portfolio-project-title"></h3>
                    <div class="portfolio-icon-container"></div>
                    <p class="portfolio-project-summary"></p>
                </article>

                <article class="overlay-article" id="project-slideshow">
                    <div class="image-container">
                        <button class="arrow" id="overlay-prev">❮</button>
                        <button class="arrow" id="overlay-next">❯</button>
                    </div>
                </article>
                <span class="closeBtn" id="portfolio-close-btn">x</span>
            </div>
        </dialog>
        `.trim();
        this.element = tempEl.firstChild;
    };

    applyInfoToElement() {
        this.element.querySelector('.portfolio-project-title').textContent = this.data.projectName;
        this.element.querySelector('.portfolio-project-summary').textContent = this.data.summaryLarge;


        // Prepare programming language logos
        this.data.projectLangs.forEach(lang => {
            const logoPath = `imgLogos/${lang}.svg`;

            // Create a new image element for each language
            const langLogo = document.createElement('img');
            langLogo.src = logoPath;
            langLogo.alt = lang; // You can set alt text as the language name
            langLogo.classList.add('lang-logo');

            this.element.querySelector('.portfolio-icon-container').appendChild(langLogo);
        });


        // Prepare slideshow images
        const imageContainer = this.element.querySelector('.image-container');

        const showImage = (index) => {
            const images = imageContainer.querySelectorAll('img');
            images.forEach((img, i) => {
                img.style.display = i === index ? 'block' : 'none';
            });
        };

        const nextImage = () => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.data.projectImages.length;
            showImage(this.currentImageIndex);
        };

        const prevImage = () => {
            this.currentImageIndex = (this.currentImageIndex - 1 + this.data.projectImages.length) % this.data.projectImages.length;
            showImage(this.currentImageIndex);
        };

        this.element.querySelector('#overlay-prev').addEventListener('click', prevImage);
        this.element.querySelector('#overlay-next').addEventListener('click', nextImage);

        this.data.projectImages.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image;
            img.style.display = index === 0 ? 'block' : 'none';
            imageContainer.appendChild(img);
        });
    };
};

export { HTMLExperienceOverlay, HTMLPortfolioOverlay };
