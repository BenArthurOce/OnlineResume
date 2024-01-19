import {HTMLExperienceOverlay, HTMLPortfolioOverlay} from './HTMLoverlay.js';

// Base class
class HTMLTile {
    #tile;
    #data;
    #parentElement;

    constructor(parentElementId) {
        this.#tile = '';
        this.#data = {};
        this.#parentElement = document.querySelector(parentElementId);
    };

    get data() {
        return this.#data;
    };

    get tile() {
        return this.#tile;
    };

    set tile(value) {
        this.#tile = value;
    };

    get parentElement() {
        return this.#parentElement;
    };

    set parentElement(value) {
        this.#parentElement = value;
    };

    renderToPage(tileToRender, parentElement) {
        this.parentElement.appendChild(tileToRender);
    };

    addEventListeners(){
        // Tile lights up when hovered over
        this.tile.addEventListener('mouseover', () => {
            this.tile.classList.add('hover');
        });

        // Tile returns to normal when mouse unhovers
        this.tile.addEventListener('mouseout', () => {
            this.tile.classList.remove('hover');
        });

        // When tile is clicked, an Overlay() will appear
        if (this.parentElement.id == `myexperiences-tile-container`){
            this.tile.addEventListener('click', () => {
                const overlayClass = new HTMLExperienceOverlay(this.data);
                overlayClass.initOverlay()
            });
        };

        if (this.parentElement.id == `myportfolio-tile-container`){
            this.tile.addEventListener('click', () => {
                const overlayClass = new HTMLPortfolioOverlay(this.data);
                overlayClass.initOverlay()
            });
        };
    };
};


class HTMLExperienceTile extends HTMLTile {
    #data;
    constructor(company, address, position, period, tags, softwares, duties) {
        super("#myExperiences");
        this.#data = {
            company,
            address,
            position,
            period,
            tags,
            softwares,
            duties
        };
    };
    get data() {
        return this.#data;
    };

    initTile() {
        this.tile = '';
        this.parentElement = document.body.querySelector(`#myexperiences-tile-container`) 
        this.createElement();
        this.applyInfoToElement();
        this.renderToPage(this.tile, this.parentElement);
        this.addEventListeners()
    }

    createElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <div class="active">
            <div class="icon-container">
                <i class="icon"></i>
                <p class="position"></p>
            </div>
            <p class="company"></p>
        </div>
        `.trim();
        this.tile = tempEl.firstChild;
    };

    applyInfoToElement() {
        // Add Tags for active classes
        this.tile.classList.add('tile', 'active');

        // Add tags for job types
        this.#data.tags.forEach((tag, i) => {
            this.tile.classList.add(tag);
        });

        this.tile.querySelector('.company').textContent = this.data.company;
        this.tile.querySelector('.position').textContent = this.data.position;

        // Add small icon in top left
        const iconClass = this.getIconClassBasedOnTag(this.data.tags[0]);
        this.tile.querySelector('i').className = `sidebar-icon fa ${iconClass}`;
        this.tile.querySelector('i').classList.add('icon');
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
    #data;
    constructor(projectName, projectLangs, projectTags, projectSumSmall, projectSumLarge, projectUrl, projectImages, iconContainer) {
        super("#myPortfolio");
        this.#data = {
            projectName,
            projectLangs,
            projectTags,
            projectSumSmall,
            projectSumLarge,
            projectUrl,
            projectImages,
            iconContainer
        };
    };
    get data() {
        return this.#data;
    };

    initTile() {
        this.tile = '';
        this.parentElement = document.body.querySelector(`#myportfolio-tile-container`)
        this.createElement();
        this.applyInfoToElement();
        this.renderToPage(this.tile, this.parentElement);
        this.addEventListeners()
    }

    createElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <div class="active">
                <div class="icon-container"></div>
                <p class="projectName"></p>
                <p class="projectSumSmall"></p>
            </div>
        `.trim();
        this.tile = tempEl.firstChild;
    };

    applyInfoToElement() {
        this.tile.classList.add('tile', 'active');

        this.data.projectTags.forEach(tag => this.tile.classList.add(tag));

        this.tile.querySelector('.projectName').textContent = this.data.projectName;
        this.tile.querySelector('.projectSumSmall').textContent = this.data.projectSumSmall;

        // Add programming icons
        const iconContainer = this.tile.querySelector('.icon-container');
        this.data.projectLangs.forEach(lang => {

            // Get SVG of programming logo
            const logoPath = `imgLogos/${lang}.svg`;

            // Create a new image element for each language
            const langLogo = document.createElement('img');
            langLogo.src = logoPath;
            langLogo.alt = lang; // You can set alt text as the language name
            // langLogo.classList.add('lang-logo');
            langLogo.classList.add('program-icon');

            iconContainer.appendChild(langLogo);
        });
    };
}

export { HTMLExperienceTile, HTMLPortfolioTile };
