// In each section, there are sub items that contain resume information, either ArticleObject() or TileObject()

class ArticleObject {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Index order of Article
    #title;                         //  Heading
    #data;                          //  String displayed on screen
    #isActive;                      //  DOM element displays a different attribute if active
    constructor(index, title, data, isActive) {
        this.#className = "Article";
        this.#classType = null
        this.#mvcComponent = "Model";
        this.#id = null;
        this.#index = index;
        this.#title = title;
        this.#data = data;
        this.#isActive = isActive;

        if (index === undefined|| title === undefined || data === undefined || isActive === undefined) {
            this.printToTerminal()
            throw new Error("ArticleObject: parameter declared is null/undefined")
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

//****** Print information about the class ******
    printToTerminal() {
        console.log(`
        ====Error Found:====
        className   = ${this.className}
        classType   = ${this.classType}
        mvcType     = ${this.mvcComponent}
        isActive    = ${this.isActive}
        index       = ${this.index}
        title       = ${this.title}
        data        = ${this.data}`);
        console.log(this.data)
    };

//****** Command to make this Object "visible" 
    toggleOn() {
        this.isActive = true;
    };

//****** Command to make this Object "invisible" 
    toggleOff() {
        this.isActive = false;
    };
};


class IntroductionArticleObject extends ArticleObject {
    constructor(index, title, data, isActive) {
        super(index, title, data, isActive);
        this.classType = "Introduction";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}-${this.title.toLowerCase()}`;
    };
};


class SkillArticleObject extends ArticleObject {
    constructor(index, title, data, isActive) {
        super(index, title, data, isActive);
        this.classType = "Skill";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}-${this.title.toLowerCase()}`;
    };
};


class EducationArticleObject extends ArticleObject {
    constructor(index, title, data, isActive) {
        super(index, title, data, isActive);
        this.classType = "Education";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}-${this.title.toLowerCase()}`;
    };
};


export {IntroductionArticleObject, SkillArticleObject, EducationArticleObject}