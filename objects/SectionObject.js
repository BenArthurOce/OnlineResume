import {IntroductionArticleObject, SkillArticleObject, EducationArticleObject} from "./ArticleObject.js"
import {ExperienceTileObject, PortfolioTileObject} from "./TileObject.js"


// 

class SectionObject {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #data;                          //  The part of the resume data from Dictionary()
    #subObjects;                    //  Article() or Tile() objects contained in this section
    constructor(data) {
        this.#className = "Section";
        this.#classType = null;
        this.#mvcComponent = "Object";
        this.#data = data;
        this.#subObjects = [];
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
    get subObjects() {
        return this.#subObjects;
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


class IntroductionSectionObject extends SectionObject {
    constructor(data, subHeadings) {
        super(data, subHeadings);
        this.classType = "Introduction";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.addArticles()  
    };

    addArticles() {
        // Add Introduction section
        this.subObjects.push(new IntroductionArticleObject(this.data['introduction'], "placeholderHeading"));

        // Key Skills need to be added from elsewhere
    };
};


class SkillSectionObject extends SectionObject {
    constructor(data, subHeadings) {
        super(data, subHeadings);
        this.classType = "Skills";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.addArticles();
    };

    addArticles() {
        this.subObjects.push(new SkillArticleObject(this.data['skillsLangages'], "placeholderHeading"));
        this.subObjects.push(new SkillArticleObject(this.data['skillsTechincal'], "placeholderHeading"));
        this.subObjects.push(new SkillArticleObject(this.data['skillsSoft'], "placeholderHeading"));
    };
};


class EducationSectionObject extends SectionObject {
    constructor(data, subHeadings) {
        super(data, subHeadings);
        this.classType = "Education";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.addArticles();
    };

    addArticles() {
        // this.subObjects.push(new SkillArticleObject(this.data['skillsLangages'], "placeholderHeading"));
        // this.subObjects.push(new SkillArticleObject(this.data['skillsTechincal'], "placeholderHeading"));
        // this.subObjects.push(new SkillArticleObject(this.data['skillsSoft'], "placeholderHeading"));
    };
};



class ExperienceSectionObject extends SectionObject {
    constructor(data, subHeadings) {
        super(data, subHeadings);
        this.classType = "Experience";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.addTiles();
    };

    addTiles() {
        this.data.forEach((job, i) => {
            const newTile = new ExperienceTileObject(job, null)
            this.subObjects.push(newTile)
        });
    };
};


class PortfolioSectionObject extends SectionObject {
    constructor(data, subHeadings) {
        super(data, subHeadings);
        this.classType = "Portfolio";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.addTiles();
    };

    addTiles() {
        this.data.forEach((portfolio, i) => {
            const newTile = new PortfolioTileObject(portfolio, null)
            this.subObjects.push(newTile)
        });
    };
};

export {IntroductionSectionObject, EducationSectionObject, SkillSectionObject, ExperienceSectionObject, PortfolioSectionObject}


        // this.data[``]
        // this.data[``]
        // this.data[``]
        // this.data[``]
        // this.data[``]
        // this.data[``]
        // this.data[``]
        // this.data[``]
        // this.data[``]
        // this.data[``]