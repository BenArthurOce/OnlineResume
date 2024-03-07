// Base class
class Overlay {
    #className;
    #classType;
    #parentEl;
    #element;
    #data;

    constructor(data, parentEl) {
        this.#className = "Overlay";
        this.#classType = null
        this.#parentEl = parentEl;
        this.#element = null;
        this.#data = data;
        this.createElement();       // Different functions between classes. Each creates a tile element
        this.applyInfoToElement();      // Different functions between classes. Add icons, tags to the tile element
        this.renderToPage();            // Shared function. Adds Tile() to the DOM
        this.addLocalEventListeners();  // Shared function. Style change when hovered. Overlay() presented when clicked

    };
    get className() {
        return this.#className;
    };
    get classType() {
        return this.#classType;
    };
    set classType(value) {
        this.#classType = value;
    };
    get parentEl() {
        return this.#parentEl;
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

    renderToPage() {
        // Render to webpage (needs adjustment to include parentEl from FrontPage)
        this.parentEl.appendChild(this.element);

        // Change the display attribute to show the overlay over the screen
        document.body.querySelector('.arrow.prev.for-section').classList.add('disabled');
        document.body.querySelector('.arrow.next.for-section').classList.add('disabled');
        document.body.querySelector('dialog').classList.add('active');
    };


    addLocalEventListeners() {
        // On pressing the close button, deletes the overlay
        this.element.querySelector('.closeBtn').onclick = () => {
            document.body.querySelector('.arrow.prev.for-section').classList.remove('disabled');
            document.body.querySelector('.arrow.next.for-section').classList.remove('disabled');
            this.element.remove();
        };
    };
};


class ExperienceOverlay extends Overlay {
    constructor(data, parentEl) {
        super(data, parentEl);    
    };

    createElement() {
        // Set up class naming conventions for the DOM
        this.classType = "Experience"
        const domForName = `for-${this.className.toLowerCase()}`    // Cleaner way of typing "for-overlay"
        const domForType = `for-${this.classType.toLowerCase()}`    // Cleaner way of typing "for-experience"


        // Create the Element
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <dialog id="${this.classType}-${this.className}" class="${this.className.toLowerCase()} ${domForType}">
            <div class="container ${domForName} ${domForType}" id="${this.classType.toLowerCase()}-wrapper">
                <article class="article-with-text for-pc for-mobile ${domForName} ${domForType}" id="experience-information">
                    <h3 class="position">${this.data.position}</h3>
                    <p class="period">${this.data.period}</p>
                    <p class="company">${this.data.company}</p>
                    <p class="address">${this.data.address}</p>
                    <p class="extraInfo">${this.data.extraInfo}</p>
                </article>

                <article class="article-with-list for-pc for-mobile ${domForName} ${domForType}" id="experience-duties">
                    <h3>Duties</h3>
                    <ul class="duties"></ul> 
                </article>

                <article class="article-with-list for-pc for-mobile ${domForName} ${domForType}" id="experience-softwares">
                    <h3>Softwares</h3>
                    <ul class="softwares"></ul> 
                </article>
                <span class="closeBtn ${domForName} ${domForType}" id="experience-close-btn">x</span>
            </div>
        </dialog>
        `.trim();
        this.element = tempEl.firstChild;
    };

    applyInfoToElement() {
        // Select the ul elements
        const softwaresUl = this.element.querySelector('.softwares');
        const dutiesUl = this.element.querySelector('.duties');

        // Loop through each software from the JSON data source and create li elements
        this.data.softwares.forEach((software) => {
            const li = document.createElement('li');
            li.textContent = software;
            softwaresUl.appendChild(li);
        });

        // Loop through each duty from the JSON data source and create li elements
        this.data.duties.forEach((duty) => {
            const li = document.createElement('li');
            li.textContent = duty;
            dutiesUl.appendChild(li);
        });
    };
};


class PortfolioOverlay extends Overlay {
    #currentImageIndex
    constructor(data, parentEl) {
        super(data, parentEl);
        this.#currentImageIndex = 0
    };
    get currentImageIndex() {
        return this.#currentImageIndex;
    };
    set currentImageIndex(value) {
        this.#currentImageIndex = value
    };

    
    createElement() {
        // Set up class naming conventions for the DOM
        this.classType = "Portfolio"
        const domForName = `for-${this.className.toLowerCase()}`    // Cleaner way of typing "for-overlay"
        const domForType = `for-${this.classType.toLowerCase()}`    // Cleaner way of typing "for-portfolio"

        // Create the element
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <dialog id="${this.classType}-${this.className}" class="${this.className.toLowerCase()} ${domForType}">
        <div class="container ${domForName} ${domForType}" id="${this.classType.toLowerCase()}-wrapper">
        
                <article class="article-with-text for-pc for-mobile ${domForName} ${domForType}" id="project-information">
                    <h3 class="portfolio-project-title ${domForName} ${domForType}">${this.data.projectName}</h3>
                    <div class="container for-icons ${domForName} ${domForType}"></div>
                    <p class="portfolio-project-summary ${domForName} ${domForType}">${this.data.summaryLarge}</p>
                </article>
        
                <article class="article-with-text for-pc for-mobile ${domForName} ${domForType}" id="project-slideshow">
                    <div class="image-container ${domForName} ${domForType}">
                        <button class="arrow prev ${domForName} ${domForType}">❮</button>
                        <button class="arrow next ${domForName} ${domForType}">❯</button>
                    </div>
                </article>
        
                <span class="closeBtn ${domForName} ${domForType}" id="portfolio-close-btn">x</span>
            </div>
        </dialog>
        `.trim();
        
        this.element = tempEl.firstChild;
    };

    applyInfoToElement() {
         // Prepare programming language logos
        const iconContainer = this.element.querySelector('.container.for-icons');
        this.data.projectLangs.forEach(lang => {

            const logoPath = `imgLogos/${lang}.svg`;                        // Get SVG of programming logo
            const langLogo = document.createElement('img');                 // Create a new image element for each language

            langLogo.src = logoPath;
            langLogo.alt = lang; // You can set alt text as the language name
            langLogo.classList.add('lang-logo');

            iconContainer.appendChild(langLogo);
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

        this.element.querySelector('.arrow.prev.for-overlay').addEventListener('click', prevImage);     // Back arrow in portfolio overlay
        this.element.querySelector('.arrow.next.for-overlay').addEventListener('click', nextImage);     // Forward arrow in portfolio overlay

        this.data.projectImages.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image;
            img.style.display = index === 0 ? 'block' : 'none';
            imageContainer.appendChild(img);
        });
    };
};

export {ExperienceOverlay, PortfolioOverlay};
