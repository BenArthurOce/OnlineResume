//

class PaletteView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Id of the current colour style being used
    #styles;                        //  An array of objects. Each object containing an Id number and a style name (refer to colours.css)
    #element;                       //  HTML Element
    #callback;                      //  Function in the View() class that is ran when the element of this class is clicked

    constructor(index, styles, callback) {
        this.#className = "Palette";
        this.#classType = "";
        this.#mvcComponent = "View";
        this.#id = null;
        this.#index = index;
        this.#styles = styles;
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
        this.#element = this.generateElement();
        this.#callback = callback;
        
        if (index === undefined|| styles === undefined || callback === undefined) {
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
    get styles() {
        return this.#styles;
    };
    get element() {
        return this.#element;
    };
    get callback() {
        return this.#callback;
    };
    get currentDisplayName() {
        return this.#styles[this.#index]['displayName']
    };
    get currentCSSName() {
        return this.#styles[this.#index]['cssName']
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
        styles      = ${this.styles}
        callback    = ${this.callback}`);
    };


//****** Creates dropdown box for the different colour styles ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <div>
                <label for="paletteSelector">Select Color Palette:</label>
                <select id="paletteSelector">
                    ${this.addInfo()}
                </select>
            </div>
        `.trim();

        // Change the displayed dropdown box style, based on the index
        const selectElement = newElement.querySelector('#paletteSelector');
        selectElement.selectedIndex = this.#index;

        return newElement.firstElementChild
    };
    
//****** Creates each of the selection elements based from "this.styles" - which contains a properCase and a lowerCase naming string which is used here ******
    addInfo() {
        return this.styles.map(object => `<option value="${object['cssName']}">${object['displayName']}</option>`).join('');
    };

};
export default PaletteView;

