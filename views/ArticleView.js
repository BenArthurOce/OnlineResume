// Sections are the main content displayers of this app/website. Inside each section, are either Articles or Tiles depending on what section it is
// These "SubObjects" are created in the View() class, and are appended in the SectionView() class
// In the View() and FilterButtonView() classes, logic is determined if this class should be visible or not. This is done using the "ToggleOn" and "ToggleOff"

class ArticleView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Index order of Article
    #data;                          //  String displayed on screen
    #title;                         //  Heading
    #isActive;                      //  DOM element displays a different attribute if active
    #element;                       //  HTML Element
    constructor(index, title, data) {
        this.#className = "Article";
        this.#classType = null
        this.#mvcComponent = "View";
        this.#id = null;
        this.#index = index;
        this.#data = data;
        this.#title = title;
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
    get title() {
        return this.#title;
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
//  Introduction
//
class IntroductionArticleView extends ArticleView {
    constructor(index, title, data) {
        super(index, title, data);
        this.classType = "Introduction";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}-${this.title.toLowerCase()}`;
        this.element = this.generateElement();
    };

//****** Creates the element for the "IntroductionArticleView" ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <article id="${this.id}" class="article-with-text for-pc for-mobile" dataFilter="${this.title}">
                <h2>${this.title}:</h2>
                <p>${this.data}</p>
            </article>
        `.trim();
        return newElement.firstElementChild
    };

    applyInfoToElement() {
    };
};

//
//  Skills
//
class SkillsArticleView extends ArticleView {
    constructor(index, title, data) {
        super(index, title, data);
        //console.log(index);
        //console.log(heading);
        console.log(data);
        this.classType = "Skills";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();
    };

//****** Creates the element for the "SkillsArticleView" ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <article id="${this.id}" class="article-with-text for-pc for-mobile" dataFilter="${this.title}">
                <h2>${this.title}:</h2>
                <p>${this.data}</p>
            </article>
        `.trim();
        return newElement.firstElementChild
    };

    applyInfoToElement() {
    };
};

//
//  Education
//
class EducationArticleView extends ArticleView {
    constructor(index, title, data) {
        super(index, title, data);
        //console.log(index);
        //console.log(heading);
        //console.log(data);
        this.classType = "Education";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.element = this.generateElement();
    };

//****** Creates the element for the "EducationArticleView" ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <article id="${this.id}" class="article-with-text for-pc for-mobile" dataFilter="${this.title}">
                <h2>${this.title}:</h2>
                <p>${this.classType}</p>
            </article>
        `.trim();
        return newElement.firstElementChild
    };

    applyInfoToElement() {
    };
};


export {IntroductionArticleView, SkillsArticleView as SkillArticleView, EducationArticleView};