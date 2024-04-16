import IconLinkView from "./IconLinkView.js";
import StaticGetIcon from "./StaticGetIcon.js";
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
    constructor(index, data, isActive) {
        this.#className = "Overlay";
        this.#classType = null
        this.#mvcComponent = "View";
        this.#id = null;
        this.#index = index;
        this.#data = data;
        this.#isActive = isActive;
        this.#element = null;
    
        if (index === undefined || data === undefined || isActive === undefined) {
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

//****** Remove / Destroy Overlay when the "x" is clicked ****** 
    closeOverlay() {
        this.element.remove();
    };
};


class ExperienceOverlayView extends OverlayView {
    constructor(index, data, isActive) {
        super(index, data, isActive);
        this.classType = "Experience";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;

        this.company    = this.data[`company`];
        this.address    = this.data[`address`];
        this.position   = this.data[`position`];
        this.period     = this.data[`period`];
        this.extraInfo  = this.data[`extraInfo`]
        this.tags       = this.data[`tags`]
        this.softwares  = this.data[`softwares`]
        this.duties     = this.data[`duties`]

        this.element = this.generateElement();
        this.addLocalEventListeners()
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
                            ${StaticGetIcon.generateDisplayIconElement("Calendar", "medium").outerHTML}
                            <strong><p>${this.data.period}</p></strong>
                        </div>

                        <div class="pair-container">
                            ${StaticGetIcon.generateDisplayIconElement("Building", "medium").outerHTML}
                            <strong><p>${this.data.company}</p></strong>
                        </div>

                        <div class="pair-container">
                            ${StaticGetIcon.generateDisplayIconElement("Location", "medium").outerHTML}
                            <strong><p>${this.data.address}</p></strong>
                        </div>

                        <div class="pair-container">
                            ${StaticGetIcon.generateDisplayIconElement("Exclamation", "medium").outerHTML}
                            <strong><p>${this.data.extraInfo}</p></strong>
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


//****** Prepares each job.duty item as a list element ****** 
    addDuties() {
        return this.duties.map(duty => `<li>${duty}</li>`).join('');
    };

//****** Prepares each job.software item as a list element ****** 
    addSoftwares() {
        return this.softwares.map(software => `<li>${software}</li>`).join('');
    };

//****** Local event listener(s) that are contained only within the OverlayView() class ****** 
    addLocalEventListeners() {
        // On pressing the close button, deletes the overlay
        this.element.querySelector('.closeBtn').onclick = () => {
            this.closeOverlay()
        };
    };
};

class PortfolioOverlayView extends OverlayView {
    constructor(index, data, isActive) {
        super(index, data, isActive);
        this.classType = "Portfolio";
        this.id = `${this.className.toLowerCase()}-${this.classType.toLowerCase()}-${this.mvcComponent.toLowerCase()}`;

        this.name               = this.data[`projectName`];
        this.languages          = this.data[`projectLangs`];
        this.tags               = this.data[`projectTags`];
        this.summarySmall       = this.data[`summarySmall`];
        this.summaryLarge       = this.data[`summaryLarge`]
        this.url                = this.data[`projectUrl`]
        this.images             = this.data[`projectImages`]

        this.githubIcon         = new IconLinkView("Github", this.name, this.url)
        console.log( this.githubIcon)

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
                        <h3>${this.name}</h3>

                        <div class="pair-container">
                            <strong><p>${"Github Repository:"}</p></strong>
                            ${ StaticGetIcon.generateLinkIconElement("Github", this.url, "large").outerHTML}
                        </div>

                        <div class="pair-container">
                            <strong><p>${"Languages:"}</p></strong>
                            ${this.addProgrammingLogos().map(icon => icon.outerHTML).join('')}
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

//****** Generates a slideshow element that will be added to the Portfolio Overlay class ****** 
    // generateElement() {
    //     // Create the element
    //     const newElement = document.createElement('div');
    //     newElement.innerHTML = `
    //         <article id="project-slideshow" class="for-overlay for-portfolio">
    //             <button class="arrow prev for-overlay for-portfolio">❮</button>
    //             ${this.addImages()}
    //             <button class="arrow next for-overlay for-portfolio">❯</button>
    //         </article>
    //     `.trim();
    //     return newElement.firstElementChild
    // };

    generateElement() {
        // Create the element
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <article id="project-slideshow" class="for-overlay for-portfolio">
                <button class="arrow prev for-overlay for-portfolio">❮</button>
                ${this.addImages()}
                <button class="arrow next for-overlay for-portfolio">❯</button>
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
        const prevButton = this.element.querySelector(".arrow.prev");
        const nextButton = this.element.querySelector(".arrow.next");

        prevButton.addEventListener("click", ()  => {
            this.prevImage()
        })

        nextButton.addEventListener("click", ()  => {
            this.nextImage()
        })
    };

//****** Decreases slideshow index by 1 and calls the adjustment of the current slideshow image ****** 
    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(this.currentIndex);
    };

//****** Increases slideshow index by 1 and calls the adjustment of the current slideshow image ****** 
    nextImage() {
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