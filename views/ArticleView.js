import IconLinkView from "./IconLinkView.js";

// Sections are the main content displayers of this app/website. Inside each section, are either Articles or Tiles depending on what section it is
// These "SubObjects" are created in the View() class, and are appended in the SectionView() class
// In the View() and FilterButtonView() classes, logic is determined if this class should be visible or not. This is done using the "ToggleOn" and "ToggleOff"

class ArticleView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Index order of Article
    #title;                         //  Heading
    #data;                          //  String displayed on screen
    #isActive;                      //  DOM element displays a different attribute if active
    #element;                       //  HTML Element
    constructor(index, title, data, isActive) {
        this.#className = "Article";
        this.#classType = null
        this.#mvcComponent = "View";
        this.#id = null;
        this.#index = index;
        this.#title = title;
        this.#data = data;
        this.#isActive = isActive;
        this.#element = null;  

        if (index === undefined|| title === undefined || data === undefined || isActive === undefined) {
            this.printToTerminal()
            throw new Error("ArticleView: parameter declared is null/undefined")
        }
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
    get title() {
        return this.#title;
    };
    get data() {
        return this.#data;
    };
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

//****** Print information about the class ******
    printToTerminal() {
        console.log(`
        ====Error Found:====
        className   = ${this.className}
        classType   = ${this.classType}
        mvcType     = ${this.mvcComponent}
        id          = ${this.id}
        index       = ${this.index}
        title       = ${this.title}
        data        = (See Below)
        isActive    = ${this.isActive}
        element     = ${this.element}
        `);
        console.log(this.data)
    };

//****** Command to make this Object "visible" ******
    toggleOn() {
        console.log("toggleOn")
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
//  Introduction
//
class IntroductionArticleView extends ArticleView {
    constructor(index, title, data, isActive) {
        super(index, title, data, isActive);
        this.classType = "Introduction";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}-${this.title.toLowerCase()}`;
        this.element = this.generateElement();

        if (isActive) {this.toggleOn()} else {this.toggleOff()};
    };

//****** Creates the element for the "IntroductionArticleView" ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <article id="${this.id}" dataFilter="${this.title}"> 
                <h2 class="for-pc">${this.title}:</h2>
                ${this.title === "About Me" ? `<div> ${this.addIcons()} </div>` : ''}
                ${this.title === "About Me" ? `<p> ${this.data.introduction} </p>` : ''}
                ${this.title === "Key Skills" ? `<ul> ${this.addInfoList()} </ul>` : ''}
            </article>
        `.trim();
        return newElement.firstElementChild
    };

//****** Adds Email, Linkedin, and Github icons to the "About Me" section ******
    addIcons() {
        // console.log(this.data)
            const tempEl = document.createElement('div');
            const icon1 = new IconLinkView("Email" , "Email Me", this.data.email);
            const icon2 = new IconLinkView("LinkedIn" , "Linkedin", this.data.linkedin);
            const icon3 = new IconLinkView("Github" , "Github", this.data.github);
            const linebreak = ''
            tempEl.append(icon1.element, icon2.element, icon3.element)
            return tempEl.innerHTML;
    };

    addInfoList() {
        return this.data.map(item => `<li>${item}</li>`).join('');
    }
};

//
//  Skills
//
class SkillsArticleView extends ArticleView {
    constructor(index, title, data, isActive) {
        super(index, title, data, isActive);
        this.classType = "Skills";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}-${this.title.toLowerCase()}`;
        this.element = this.generateElement();

        if (isActive) {this.toggleOn()} else {this.toggleOff()};

    };

//****** Creates the element for the "SkillsArticleView" ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <article id="${this.id}" dataFilter="${this.title}">
                <h2 class="for-pc">${this.title}:</h2>
                <ul>${this.addInfo()}</ul>
            </article>
        `.trim();
        return newElement.firstElementChild
    };

    addInfo() {
        return this.data.map(item => `<li>${item}</li>`).join('');
    };
};

//
//  Education
//
class EducationArticleView extends ArticleView {
    constructor(index, title, data, isActive) {
        super(index, title, data, isActive);
        this.classType = "Education";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}-${this.title.toLowerCase()}`;
        this.element = this.generateElement();

        if (isActive) {this.toggleOn()} else {this.toggleOff()};
    };

//****** Creates the element for the "EducationArticleView" ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <article id="${this.id}" dataFilter="${this.title}">
                <h2 class="for-pc">${this.title}:</h2>
                <ul>${this.addInfo()}</ul>
            </article>
        `.trim();
        return newElement.firstElementChild
    };

    addInfo() {
        return this.data.map(item => `<li>${item}</li>`).join('');
    };
};


export {IntroductionArticleView, SkillsArticleView as SkillArticleView, EducationArticleView};