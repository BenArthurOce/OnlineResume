import HTMLportfolioOverlay from './HTMLportfolioOverlay.js'

class HTMLportfolioTile {
    #tile;
    #data;
    #parentElement;
    #logoPath = "imgLogos/";


    constructor(projectName, projectLangs, projectTags, projectSumSmall, projectSumLarge, projectUrl, projectImages, iconContainer) {
        this.#tile = '';
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
        this.#parentElement = document.querySelector("#myPortfolio");
    
    };
    get tile() {
        return this.#tile;
    };
    set tile(value) {
        this.#tile = value;
    };
    get data() {
        return this.#data;
    };
    get parentElement() {
        return this.#parentElement;
    };
    get logoPath() {
        return this.#logoPath;
    };

    // Maybe add an active/inactive toggle?

    createElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <div class="icon-container"></div>
            <h4 class="projectName"></h4>
            <p class="projectSumSmall"></p>

        `;
        this.tile = newElement.cloneNode(true);
    };

    applyInfoToElement() {
        this.tile.classList.add('tile', 'active');

        this.data.projectTags.forEach((tag, i) => {
            this.tile.classList.add(tag);
        });

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
            langLogo.classList.add('icon');

            iconContainer.appendChild(langLogo);
        });
    };
    
    addEventListeners() {
        // More details of the project are displayed when tile is clicked
        this.tile.addEventListener('click', () => {
            const overlayClass = new HTMLportfolioOverlay(this.tile, this.data);
            overlayClass.createElement();
            overlayClass.renderToPage();
        });
    };

    renderToPage() {
        this.createElement();
        this.applyInfoToElement();
        this.addEventListeners();
        this.parentElement.appendChild(this.tile);
    };
};

export default HTMLportfolioTile;
