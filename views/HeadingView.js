//

class HeadingView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #heading;                       //  Text that populates the heading
    #element;                       //  HTML Element
    constructor(heading) {
        this.#className = "Heading";
        this.#classType = "";
        this.#mvcComponent = "View";
        this.#id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
        this.#heading = heading
        this.#element = this.generateElement();
    };
    get className() {
        return this.#className;
    };
    get classType() {
        return this.#classType;
    };
    get mvcComponent() {
        return this.#mvcComponent;
    };
    get id() {
        return this.#id;
    };
    get heading() {
        return this.#heading;
    };
    get element() {
        return this.#element;
    };

    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <div id="top-heading-view" class="container for-heading">
                <h1>${this.heading}</h1>
            </div>
        `.trim();
        return newElement.firstElementChild
    };
};
export default HeadingView;

