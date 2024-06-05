import { ExperienceArticleView, PortfolioArticleView } from "./ArticleView.js";
import StaticGetIcon from "./StaticGetIcon.js";
import { OverlayFilterBarView } from "./FilterBarView.js";
import { ArticleFilterButtonView } from "./FilterButtonView.js";

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


//****** Creates the Overlay element for Experience ****** 
generateElement() {
    const newElement = document.createElement('div');
    newElement.innerHTML = `
        <dialog id="top-overlay-view" class="for-experience">
            <div id="${this.id}" class="container for-overlay for-experience" >

                <article>
                    <h3>${this.data.position}</h3>


                    
                    <div class="pair-container">
                        <div class="pair-container">
                            ${StaticGetIcon.generateDisplayIconElement("Building", "medium").outerHTML}
                            <strong><p>${this.data.company}</p></strong>
                        </div>

                        <div class="pair-container">
                            ${StaticGetIcon.generateDisplayIconElement("Location", "medium").outerHTML}
                            <strong><p>${this.data.address}</p></strong>
                        </div>
                    </div>

                    
                    <div class="pair-container">
                        <div class="pair-container">
                            ${StaticGetIcon.generateDisplayIconElement("Calendar", "medium").outerHTML}
                            <strong><p>${this.data.period}</p></strong>
                        </div>

                        <div class="pair-container">
                            ${StaticGetIcon.generateDisplayIconElement("Exclamation", "medium").outerHTML}
                            <strong><p>${this.data.extraInfo}</p></strong>
                        </div>
                    </div>



                </article>

                <article>
                    <h3>Duties:</h3>
                    <ul>${this.addDuties()} </ul>
                </article>

                <article>
                    <h3>Softwares:</h3>
                    <ul>${this.addSoftwares()} </ul> 
                </article>

                <span id="experience-close-btn" class="closeBtn for-overlay"> x</span>
            </div>
        </dialog>
    `.trim();
    return newElement.firstElementChild
};


    toggleArticle(article) {
        // code does nothing. Required for a callback bind. Just ignore it.
        console.log("toggleArticle")
    };

//****** Prepares each job.duty item as a list element ****** 
    addDuties() {
        return this.duties.map(duty => `<li>${duty}</li>`).join('');
    };

//****** Prepares each job.software item as a list element ****** 
    addSoftwares() {
        return this.softwares.map(software => `<li>${software}</li>`).join('');
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
        this.pages              = this.data[`projectPagesURL`]
        this.images             = this.data[`projectImages`]

        this.element = this.generateElement();
        this.addLocalEventListeners()
    };



//****** Creates the Overlay element for Portfolio ****** 
    generateElement() {
        // Create image slideshow
        this.slideshow = new Slideshow(this.images);

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

                        
                        <div class="pair-container" id="live-page-section">
                            <strong><p>${"Live Page:"}</p></strong>
                            ${StaticGetIcon.generateLinkIconElement("Web", this.pages, "large").outerHTML}
                        </div>

                        <p class="for-overlay">${this.summaryLarge}</p>     
                    </article>
                    
                        ${this.slideshow.element.outerHTML}

                    <span id="portfolio-close-btn" class="closeBtn for-overlay">x</span>
                </div>
            </dialog>
        `.trim();

        // Remove the Live Page section if this.pages is an empty string
        if (!this.pages) {
            const livePageSection = newElement.querySelector('#live-page-section');
            if (livePageSection) {
                livePageSection.remove();
            }
        }

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

        prevButton.addEventListener("click", ()  => {
            this.prevImage()
            console.log("prevImage")
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            this.showImage(this.currentIndex);
        })

        nextButton.addEventListener("click", ()  => {
            console.log("nextImage")
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            this.showImage(this.currentIndex);
        })
    };


//****** Hides all images, and then only displays the image with the matching index number of this class ****** 
    showImage(index) {
        console.log("showImage")
        console.log(`function = ${"showImage"} ||  index = ${index}`);
        const images = this.element.querySelectorAll(".portfolio-image")

        // hide all
        images.forEach((image, i) => {
            console.log(image)
            image.classList.remove("activated");
        });



        // WHY DOESNT THIS WORK. THIS IS SO STUPID

        console.log(index)
        images[index].classList.add("activated");
    };
};


export {ExperienceOverlayView, PortfolioOverlayView}