// In each section, there are sub items that contain resume information, either ArticleObject() or TileObject()

class TileObject {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #data;                          //  The part of the resume data from Dictionary()
    constructor(data) {
        this.#className = "Tile";
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


class ExperienceTileObject extends TileObject {
    constructor(data, subHeadings) {
        super(data, subHeadings);
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
    };
};


class PortfolioTileObject extends TileObject {
    constructor(data, subHeadings) {
        super(data, subHeadings);
        this.classType = "Portfolio";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;

    };
};

export {ExperienceTileObject, PortfolioTileObject};

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