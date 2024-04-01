//

class HeadingView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #heading;                       //  Text that populates the heading
    #element;                       //  HTML Element
    constructor(heading) {
        this.#className = "Heading";
        this.#classType = null;
        this.#mvcComponent = "View";
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
    get heading() {
        return this.#heading;
    };
    get element() {
        return this.#element;
    };

    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <div class="container for-heading">
                <h1>${this.heading}</h1>
            </div>
        `.trim();
        return newElement.firstElementChild
    };
};
export default HeadingView;

