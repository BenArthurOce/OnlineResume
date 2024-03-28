// In each section, there are sub items that contain resume information, either ArticleObject() or TileObject()

class ArticleObject {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #data;                          //  The part of the resume data from Dictionary()
    constructor(data) {
        this.#className = "Article";
        this.#classType = null;
        this.#mvcComponent = "Object";
        this.#data = data;
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
    get data() {
        return this.#data;
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
    constructor(data, heading) {
        super(data);
        this.classType = "Introduction";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;

        this.title = heading
        this.info = data
    };
};


class SkillArticleObject extends ArticleObject {
    constructor(data, heading) {
        super(data);
        this.classType = "Skill";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;

        this.title = heading
        this.info = data
    };
};


class EducationArticleObject extends ArticleObject {
    constructor(data, heading) {
        super(data);
        this.classType = "Education";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;

        this.title = heading
        this.info = data
    };
};

export {IntroductionArticleObject, SkillArticleObject, EducationArticleObject}