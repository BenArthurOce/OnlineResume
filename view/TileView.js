import {ExperienceOverlay, PortfolioOverlay} from './Overlay.js';

// Base class
class Tile {
    #className;
    #classType;
    #parentObj;
    #element;
    #data;
    constructor(data, parentObj) {
        this.#className = "Tile";
        this.#classType = null
        this.#parentObj = parentObj
        this.#element = null;
        this.#data = data;
        this.createTileElement();       // Different functions between classes. Each creates a tile element
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
    get parentObj() {
        return this.#parentObj;
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

    //****** Command to make this Objects element visible from the DOM
    toggleOn() {
        this.isActive = true;
        this.element.classList.add('activated');
    };

    //****** Command to remove visibility from the DOM
    toggleOff() {
        this.isActive = false;
        this.element.classList.remove('activated');
    };

    renderToPage() {
        // this.parentEl.appendChild(this.element);
    };

    getParentObject(element) {

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
        this.element.addEventListener('click', () => {
            let overlayClass
            if (this.element.classList.contains(`for-experience`)) {
                overlayClass = new ExperienceOverlay(this.data, document.querySelector(`#wrapper`));
            }
            if (this.element.classList.contains(`for-portfolio`)) {
                overlayClass = new PortfolioOverlay(this.data, document.querySelector(`#wrapper`))
            }
        });
    };
};


class ExperienceTile extends Tile {
    constructor(data, parentObj) {
        super(data, parentObj); 
    };

    createTileElement() {
        this.classType = "Experience" 
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <div class="tile activated for-experience">
            <div class="icon-container">
		        <i class="icon"></i>
		    </div>
            <p class="position">${this.data.position}</p>
            <p class="company">${this.data.company}</p>
        </div>
        `.trim();
        this.element = tempEl.firstChild
    };

    applyInfoToElement() {
        // Add tags for job types
        // console.log(this.data)
        this.data.tags.forEach(tag => this.element.classList.add(tag));

        // Add small icon in top left
        const iconClass = this.getIconClassBasedOnTag(this.data.tags[0]);
        this.element.querySelector('i').className = `sidebar-icon fa ${iconClass}`;
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


class PortfolioTile extends Tile {
    constructor(data, parentObj) {
        super(data, parentObj);
        this.classType = "Portfolio"
    };

    createTileElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <div class="tile activated for-portfolio">
                <div class="container for-icons"></div>
                <p class="projectName">${this.data.projectName}</p>
                <p class="projectSumSmall">${this.data.summarySmall}</p>
            </div>
        `.trim();
        this.element = tempEl.firstChild;
    };

    applyInfoToElement() {
        // Add tags for each portfolio
        this.data.projectTags.forEach(tag => this.element.classList.add(tag));

        // Add programming icons
        const iconContainer = this.element.querySelector('.container.for-icons');
        this.data.projectLangs.forEach(lang => {
            const logoPath = `imgLogos/${lang}.svg`;                        // Get SVG of programming logo
            const langLogo = document.createElement('img');                 // Create a new image element for each language
            
            langLogo.src = logoPath;
            langLogo.alt = lang;
            langLogo.classList.add('program-icon');
    
            iconContainer.appendChild(langLogo);
        });
    };
}

export { ExperienceTile, PortfolioTile};
