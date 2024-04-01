

//

class TileView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Index order of Article
    #data;                          //  
    // #heading;                       //  Heading
    #isActive;                      //  DOM element displays a different attribute if active
    #element;                       //  HTML Element
    constructor(index, data) {
        this.#className = "TileView";
        this.#classType = null
        this.#mvcComponent = "View";
        this.#id = null;
        this.#index = index;
        this.#data = data;
        // this.#heading = heading;
        this.#isActive = false;
        this.#element = null;  
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
    get mvcComponent() {
        return this.#mvcComponent;
    };
    get id() {
        return this.#id;
    };
    set id(value) {
        this.#id = value;
    };
    get index() {
        return this.#index;
    };
    get data() {
        return this.#data;
    };
    // get heading() {
    //     return this.#heading;
    // };
    get isActive() {
        return this.#isActive;
    };
    set isActive(value) {
        this.#isActive = value;
    };
    get element() {
        return this.#element;
    };
    set element(value) {
        this.#element = value;
    };


//****** Command to make this Object "visible" ******
    toggleOn() {
        this.isActive = true;
        this.element.classList.add("activated")
    };

//****** Command to make this Object "invisible" ******
    toggleOff() {
        this.isActive = false;
        this.element.classList.remove("activated")
    };
};


//
//  Experience
//
class ExperienceTileView extends TileView {
    constructor(index, data) {
        super(index, data);
        this.classType = "Experience";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;

        this.company    = this.data[`company`];
        this.address    = this.data[`address`];
        this.position   = this.data[`position`];
        this.period     = this.data[`period`];
        this.extraInfo  = this.data[`extraInfo`]
        this.tags       = this.data[`tags`]
        this.softwares  = this.data[`softwares`]
        this.duties     = this.data[`duties`]

        this.element = this.generateElement();
        this.applyInfoToElement()
    };

    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <div class="tile activated for-experience">
                <div class="icon-container">
                    <i class="icon"></i>
                </div>
                <p class="position">${this.position}</p>
                <p class="company">${this.company}</p>
            </div>
        `.trim();
        return newElement.firstElementChild
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


//
//  Portfolio
//
class PortfolioTileView extends TileView {
    constructor(index, data) {
        super(index, data);
        this.classType = "Portfolio";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;

        this.projectName        = this.data[`projectName`];
        this.projectLangs       = this.data[`projectLangs`];
        this.projectTags        = this.data[`projectTags`];
        this.summarySmall       = this.data[`summarySmall`];
        this.summaryLarge       = this.data[`summaryLarge`]
        this.projectUrl         = this.data[`projectUrl`]
        this.projectImages      = this.data[`projectImages`]

        this.element = this.generateElement();
        this.applyInfoToElement()
    };

    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <div class="tile activated for-portfolio">
                <div class="container for-icons"></div>
                <p class="projectName">${this.projectName}</p>
                <p class="projectSumSmall">${this.summarySmall}</p>
            </div>
        `.trim();
        return newElement.firstElementChild
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
};





export {ExperienceTileView, PortfolioTileView};
