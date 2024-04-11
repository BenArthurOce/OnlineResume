// 

class PaletteObject {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Id of the current colour style being used
    #styles;                        //  An array of objects. Each object containing an Id number and a style name (refer to colours.css)
    #timeout;
    constructor() {
        this.#className = "Palette";
        this.#classType = "";
        this.#mvcComponent = "Model";
        this.#id = null;
        this.#index = 0;
        this.#styles = null;
        this.#timeout = null
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
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
    set index(value) {
        this.#index = value;
    };
    get styles() {
        return this.#styles;
    };
    set styles(value) {
        this.#styles = value;
    };
    get currentDisplayName() {
        return this.#styles[this.#index]['displayName']
    };
    get currentCSSName() {
        return this.#styles[this.#index]['cssName']
    };

//****** Update the index number based on the Id from this.styles. Accepts a colour style value as its input ******
    updateIndex(colour) {
        this.index = this.findStyleID(colour)
    };

//****** Returns the related Id number of the displayName string or the cssName string ******
    findStyleID(string) {
        const getIdByDisplayNameOrCssName = (array, name) => array.findIndex(obj => obj.displayName === name || obj.cssName === name);
        return getIdByDisplayNameOrCssName(this.styles, string);
    };


//****** Part 0 of 3: Starts the class. Refer to the below three functions for each step ******
    async init() {
        console.log("PALETTEOBJECT: init")
        const array = await this.generateStyleNames();
        this.styles = await this.indexAndStoreStyleNames(array);
    };


//****** Part 1 of 3: fetches all the text from "colours.css" ******
    async getCssText() {
        console.log("PALETTEOBJECT: getCssText")
        const response = await fetch('colours.css');
        const result = await response.text();
        return result;
    };


//****** Part 2 of 3: Using a regx pattern, extracts all the style names ******
    async generateStyleNames() {
        console.log("PALETTEOBJECT: generateStyleNames")
        const cssText = await this.getCssText();

        const rootRegex = /data-style="([^"]+)"/g;
        const splitText = cssText.split(rootRegex).filter(a => a !== '');
        const everySecondElement = splitText.filter((element, index) => index % 2 !== 0);
        return everySecondElement
    };


//****** Part 3 of 3: Creates a display name for the dropdown box, give the display name and css name an index number and stores it in the class ******
    async indexAndStoreStyleNames(arr) {
        console.log("PALETTEOBJECT: indexAndStoreStyleNames")
        const displayString = s => s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const lowerString = s => s.toLowerCase().split(' ').map((word, index) => index > 0 ? '-' + word : word).join('');

        const containingArray = []

        arr.forEach((element, index) => {
            containingArray.push({"id": index, "displayName": displayString(element), "cssName": lowerString(element)})
        });  

        return containingArray;
    };
};

export default PaletteObject;