import { ExperienceArticleView, PortfolioArticleView } from "../views/ArticleView.js";
import StaticGetIcon from "../views/StaticGetIcon.js";
import { OverlayFilterBarView } from "../views/FilterBarView.js";
import { ArticleFilterButtonView } from "../views/FilterButtonView.js";

// Whenever a Tile() is clicked, an Overlay() will appear to give more detailed information about the job/project

class OverlayView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Index number of overlay. Will match with the Tile()
    #data;                          //  String displayed on screen
    #isActive;                      //  DOM element displays a different attribute if active
    #element;                       //  HTML Element
    #closeCallback;                 //  Callback function for the close button
    constructor(index, data, isActive, closeCallback) {
        this.#className = "Overlay";
        this.#classType = null
        this.#mvcComponent = "View";
        this.#id = null;
        this.#index = index;
        this.#data = data;
        this.#isActive = isActive;
        this.#element = null;
        this.#closeCallback = closeCallback;
    
        if (index === undefined || data === undefined || isActive === undefined || closeCallback === undefined) {
            this.printToTerminal()
            throw new Error("OverlayView: parameter declared is null/undefined")
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
    get closeCallback() {
        return this.#closeCallback;
    };
    set closeCallback(value) {
        this.#closeCallback = value;
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
        data        = (See Below)
        isActive    = ${this.isActive}
        element    = ${this.element}
        `);
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


class ExperienceOverlayView extends OverlayView {
    constructor(index, data, isActive, closeCallback) {
        super(index, data, isActive, closeCallback);
        this.classType = "Experience";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
        this.activeIndex = 0

        this.company = this.data[`company`];
        this.address = this.data[`address`];
        this.position = this.data[`position`];
        this.period = this.data[`period`];
        this.extraInfo = this.data[`extraInfo`]
        this.tags = this.data[`tags`]
        this.softwares = this.data[`softwares`]
        this.duties = this.data[`duties`]

        this.article1 = new ExperienceArticleView(0, "Duties", this.duties, true);
        this.article2 = new ExperienceArticleView(1, "Softwares", this.softwares, false);
        this.button1 = new ArticleFilterButtonView(0, "Duties", false, this.toggleArticle.bind(this));
        this.button2 = new ArticleFilterButtonView(1, "Softwares", false, this.toggleArticle.bind(this));


        this.element = this.generateElement();

        // ALRIGHT I GIVE UP. THE EVENT LISTENERS WILL NOT WORK. IM JUST GOING TO MAKE HORRIBLE GROSS CODE TO MAKE IT WORK

    //     const articles = this.element.querySelector(".overlay-content")
    //     const article1 = articles.children[0]
    //     const article2 = articles.children[1]

    //     const buttons = this.element.querySelector(".overlay-filter")
    //     const button1 = buttons.children[0]
    //     const button2 = buttons.children[1]


    //     button1.addEventListener("click", () => {

    //         button1.classList.add("activated")
    //         button2.classList.remove("activated")

    //         article1.classList.add("activated")
    //         article2.classList.remove("activated")
    //         // this.button1.callback()
    //     });

    //     button2.addEventListener("click", () => {

    //         button1.classList.remove("activated")
    //         button2.classList.add("activated")

    //         article1.classList.remove("activated")
    //         article2.classList.add("activated")
    //     });

    };


    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <dialog id="top-overlay-view" class="for-experience">
                <section id="${this.id}" class="container for-overlay for-experience" >

                    <article class="overlay-info for-overlay for-experience">
                        <h2>${this.data.position}</h2>

                        <div class="pair-container">
                            <span class="pair-container">
                                ${StaticGetIcon.generateDisplayIconElement("Building", "medium").outerHTML}
                                <strong><p>${this.data.company}</p></strong>
                            </span>

                            <span class="pair-container">
                                ${StaticGetIcon.generateDisplayIconElement("Location", "medium").outerHTML}
                                <strong><p>${this.data.address}</p></strong>
                            </span>
                        </div>

                        <div class="pair-container">
                            <span class="pair-container">
                                ${StaticGetIcon.generateDisplayIconElement("Calendar", "medium").outerHTML}
                                <strong><p>${this.data.period}</p></strong>
                            </span>

                            <span class="pair-container">
                                ${StaticGetIcon.generateDisplayIconElement("Exclamation", "medium").outerHTML}
                                <strong><p>${this.data.extraInfo}</p></strong>
                            </span>
                        </div>
                    </article>

                    <menu class="overlay-filter for-overlay for-experience for-mobile">
                        ${this.button1.element.outerHTML}
                        ${this.button2.element.outerHTML}
                    </menu>

                    <div class="overlay-content for-overlay for-experience">
                        ${this.article1.element.outerHTML.outerHTML}
                        ${this.article2.element.outerHTML.outerHTML}
                    </div>

                    <span id="experience-close-btn" class="closeBtn for-overlay"> x</span>
                </section>
            </dialog>
        `.trim();

        return newElement.firstElementChild;
    };

    toggleArticle(article) {
        // code does nothing. Required for a callback bind. Just ignore it.
        console.log("toggleArticle")
    };

};

class PortfolioOverlayView extends OverlayView {
    constructor(index, data, isActive, closeCallback) {
        super(index, data, isActive, closeCallback);
        this.classType = "Portfolio";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;
        this.activeIndex = 0

        this.name               = this.data[`projectName`];
        this.languages          = this.data[`projectLangs`];
        this.tags               = this.data[`projectTags`];
        this.summarySmall       = this.data[`summarySmall`];
        this.summaryLarge       = this.data[`summaryLarge`]
        this.url                = this.data[`projectUrl`]
        this.images             = this.data[`projectImages`]

        this.element = this.generateElement();
        this.addLocalEventListeners()
    };



//****** Creates the Overlay element for Portfolio ****** 
    generateElement() {
        // Create image slideshow
        const slideshow = new Slideshow(this.images);

        // Create the element
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <dialog id="top-overlay-view" class="for-portfolio">
                <div id="${this.id}" class="container for-overlay for-portfolio" >

                    <article>
                        <h2>${this.name}</h2>

                        <div class="pair-container">
                            <div class="pair-container">
                                <strong><p>${"Languages:"}</p></strong>
                                ${this.addProgrammingLogos().map(icon => icon.outerHTML).join('')}
                            </div>

                            <div class="pair-container">
                                <strong><p>${"Github Repository:"}</p></strong>
                                ${ StaticGetIcon.generateLinkIconElement("Github", this.url, "large").outerHTML}
                            </div>
                        </div>

                        <p class="for-overlay">${this.summaryLarge}</p>     
                    </article>
                    
                        ${slideshow.element.outerHTML}

                    <span id="portfolio-close-btn" class="closeBtn for-overlay">x</span>
                </div>
            </dialog>
        `.trim();
        return newElement.firstElementChild
    };


//****** Adds programming logos to the portfolio Overlay ******
    addProgrammingLogos() {
        return this.languages.map(language => StaticGetIcon.generateDisplayIconElement(language, "large"));
    };


//****** Local event listener(s) that are contained only within the OverlayView() class ****** 
    addLocalEventListeners() {
        // On pressing the close button, deletes the overlay
        this.element.querySelector('.closeBtn').onclick = () => {
            this.closeOverlay()
        };
    };
};


class Slideshow {
    constructor(images) {
        this.className  = "Slideshow"
        this.classType  = "Portfolio"
        this.images = images;
        this.currentIndex = 0;
        this.imageElements = null;
        this.element = this.generateElement();
        this.addLocalEventListeners();
        this.showImage(this.currentIndex)
    };


    generateElement() {
        // Create the element
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <article id="project-slideshow" class="for-overlay for-portfolio">
                <button id="portfolio-prev-arrow" class="arrow prev for-overlay for-portfolio">❮</button>
                ${this.addImages()}
                <button id="portfolio-next-arrow" class="arrow next for-overlay for-portfolio">❯</button>
            </article>
        `.trim();
        return newElement.firstElementChild
    };


//****** Prepares each portfolio.image item as an image element and adds to the Overlay ****** 
    addImages() {
        return this.images.map(image => `<img src="${image}" alt="${image}" class="portfolio-image">`).join('');
    };

//****** Event listeners to handle the left and right arrow clicks of the slideshow ****** 
    addLocalEventListeners() {
        console.log("addLocalEventListeners")
        const prevButton = this.element.querySelector("#portfolio-prev-arrow");
        const nextButton = this.element.querySelector("#portfolio-next-arrow");
        console.log(prevButton)

        prevButton.addEventListener("onClick", ()  => {
            this.prevImage()
        })

        nextButton.addEventListener("click", ()  => {
            this.nextImage()
        })

        prevButton.addEventListener('click', () => { // add a click event listener
            console.log('Button clicked!'); // do something when the button is clicked
          });
    };

//****** Decreases slideshow index by 1 and calls the adjustment of the current slideshow image ****** 
    prevImage() {
        console.log("prevImage")
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(this.currentIndex);
    };

//****** Increases slideshow index by 1 and calls the adjustment of the current slideshow image ****** 
    nextImage() {
        console.log("nextImage")
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(this.currentIndex);
    };

//****** Hides all images, and then only displays the image with the matching index number of this class ****** 
    showImage(index) {
        const images = this.element.querySelectorAll(".portfolio-image")
        images.forEach((image, i) => {
            if (i === index) {
                image.classList.add("activated");
            } else {
                image.classList.remove("activated");
            }
        });
    };
};


export {ExperienceOverlayView, PortfolioOverlayView}