//

class IconLinkView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #key;                           //  Display name of the filter button, or reference key if its for tiles
    #title;                         // String that displays when user hovers over
    #link;                          // External link that the user is taken to if they cdivck
    #element;                       //  HTML Element
    constructor(key, title, link) {
        this.#className = "IconLink";
        this.#classType = "Icon";
        this.#mvcComponent = "View";
        this.#id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
        this.#key = key;
        this.#title = title;
        this.#link = link;
        this.#element = this.generateElement();
        
        if (key === undefined|| title === undefined || link === undefined) {
            this.printToTerminal()
            throw new Error("IconLinkView: parameter declared is null/undefined")
        };

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
    get key() {
        return this.#key;
    };
    get title() {
        return this.#title;
    };
    get link() {
        return this.#link;
    };
    get element() {
        return this.#element;
    };
    set element(value) {
        this.#element = value;
    };

//****** Print information about the class ******
    printToTerminal() {
        console.log(`
        ====Error Found:====
        className   = ${this.className}
        classType   = ${this.classType}
        mvcType     = ${this.mvcComponent}
        id          = ${this.id}
        key         = ${this.key}
        title       = ${this.title}
        link        = ${this.link}`);
    };

//****** Prepares the HTML element ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            ${this.selectIconGraphic(this.key)}
        `.trim();
        return newElement.firstElementChild
    };

//****** takes the "this.key" attribute to create an icon HTML object ******
    selectIconGraphic(key) {
        const iconOptions = {
            "Email":       `<a href="${this.link}" target="_blank" class="icon-link " title="${this.title}"><i class="sidebar-icon fa fa-envelope icon"></i></a>`,
            "LinkedIn":    `<a href="${this.link}" target="_blank" class="icon-link " title="${this.title}"><i class="sidebar-icon fa fa-linkedin icon"></i></a>`,
            "Github":      `<a href="${this.link}" target="_blank" class="icon-link " title="${this.title}"><i class="sidebar-icon fa fa-github icon"></i></a>`
        };
        
        if (key in iconOptions) {
            return iconOptions[key];
        } else {
            throw new Error(`Title '${key}' not found in filterOptions`);
        }
    };
};

export default IconLinkView