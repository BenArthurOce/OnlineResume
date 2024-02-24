import {HTMLExperienceOverlay, HTMLPortfolioOverlay} from './HTMLoverlay.js';

// Base class
class HTMLTile {
    #element;
    #data;
    #parentEl;

    constructor(data, parentEl) {
        this.#element = '';
        this.#data = data;
        this.#parentEl = parentEl
        this.initTile();
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

    toggleActive() {
        this.element.classList.toggle('activated');
    };

    renderToPage() {
        this.parentEl.appendChild(this.element);
    };

    addLocalEventListeners(){
        // Tile lights up when hovered over
        this.element.addEventListener('mouseover', () => {
            this.element.classList.add('hover');
        });

        // Tile returns to normal when mouse unhovers
        this.element.addEventListener('mouseout', () => {
            this.element.classList.remove('hover');
        });

        // When tile is clicked, an Overlay() will appear
        if (this.parentEl.id == `myExperience-tile-container`){
            this.element.addEventListener('click', () => {
                const overlayClass = new HTMLExperienceOverlay(this.data, document.querySelector(`#wrapper`));
            });
        };

        if (this.parentEl.id == `myPortfolio-tile-container`){
            this.element.addEventListener('click', () => {
                const overlayClass = new HTMLPortfolioOverlay(this.data, document.querySelector(`#wrapper`));
            });
        };
    };
};


class HTMLExperienceTile extends HTMLTile {
    constructor(data, parentEl) {
        super(data, parentEl);
    };

    initTile() {
        this.createTileElement();
        this.applyInfoToElement();
        this.renderToPage();
        this.addLocalEventListeners();
    };

    createTileElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <div class="tile activated">
            <div class="icon-container">
		        <i class="icon"></i>
		    </div>
            <p class="position"></p>
            <p class="company"></p>
        </div>
        `.trim();
        this.element = tempEl.firstChild;
    };

    applyInfoToElement() {
        // Add tags for job types
        this.data.tags.forEach((tag, i) => {
            this.element.classList.add(tag);
        });

        this.element.querySelector('.company').textContent = this.data.company;
        this.element.querySelector('.position').textContent = this.data.position;

        // Add small icon in top left
        const iconClass = this.getIconClassBasedOnTag(this.data.tags[0]);
        this.element.querySelector('i').className = `sidebar-icon fa ${iconClass}`;
        this.element.querySelector('i').classList.add('icon');
    };

    // Helper method to get icon class based on the tag
    getIconClassBasedOnTag(tag) {
        switch (tag) {
            case "Programming":
                return 'fa-desktop';
            case "Accounting":
                return 'fa-dollar';
            case "CustomerService":
                return 'fa-bell';
            default:
                return '';
        }
    };

};

// Subclass 2
class HTMLPortfolioTile extends HTMLTile {
    constructor(data, parentEl) {
        super(data, parentEl);
    };

    initTile() {
        this.createTileElement();
        this.applyInfoToElement();
        this.renderToPage();
        this.addLocalEventListeners();
    };

    createTileElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <div class="tile activated">
                <div class="container for-icons"></div>
                <p class="projectName"></p>
                <p class="projectSumSmall"></p>
            </div>
        `.trim();
        this.element = tempEl.firstChild;
    };

    applyInfoToElement() {
        // Add tags for each portfolio
        this.data.projectTags.forEach(tag => this.element.classList.add(tag));

        this.element.querySelector('.projectName').textContent = this.data.projectName;
        this.element.querySelector('.projectSumSmall').textContent = this.data.summarySmall;

        // Add programming icons
        const iconContainer = this.element.querySelector('.container.for-icons');
        this.data.projectLangs.forEach(lang => {

            // Get SVG of programming logo
            const logoPath = `imgLogos/${lang}.svg`;

            // Create a new image element for each language
            const langLogo = document.createElement('img');
            langLogo.src = logoPath;
            langLogo.alt = lang;
            langLogo.classList.add('program-icon');

            iconContainer.appendChild(langLogo);
        });
    };
}

export { HTMLExperienceTile, HTMLPortfolioTile };
