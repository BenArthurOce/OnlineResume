

//

class OverlayView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Index order of Article
    #data;                          //  
    // #heading;                       //  Heading
    #isActive;                      //  DOM element displays a different attribute if active
    #element;                       //  HTML Element
    constructor(index, data) {
        this.#className = "Overlay";
        this.#classType = null
        this.#mvcComponent = "View";
        this.#id = null;
        this.#index = index;
        this.#data = data;
        // this.#heading = heading;
        this.#isActive = false;
        this.#element = null;  

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
    // get heading() {
    //     return this.#heading;
    // };
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


//****** Remove / Destroy Overlay when the "x" is clicked ****** 
    closeOverlay() {
        this.element.remove();
    };
};


//
//  Experience
//
class ExperienceOverlayView extends OverlayView {
    constructor(index, data) {
        super(index, data);
        this.classType = "Experience";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;

        console.log(data)

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
        const domForName = `for-${this.className.toLowerCase()}`    // Cleaner way of typing "for-overlay"
        const domForType = `for-${this.classType.toLowerCase()}`    // Cleaner way of typing "for-experience"

        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <dialog id="${this.classType}-${this.className}" class="${this.className.toLowerCase()} ${domForType}">
                <div class="container ${domForName} ${domForType}" id="${this.classType.toLowerCase()}-wrapper">
                    <article class="article-with-text for-pc for-mobile ${domForName} ${domForType}" id="experience-information">
                        <h3 class="position">${this.data.position}</h3>
                        <p class="period">${this.data.period}</p>
                        <p class="company">${this.data.company}</p>
                        <p class="address">${this.data.address}</p>
                        <p class="extraInfo">${this.data.extraInfo}</p>
                    </article>

                    <article class="article-with-list for-pc for-mobile ${domForName} ${domForType}" id="experience-duties">
                        <h3>Duties</h3>
                        <ul class="duties"> ${this.addDuties()} </ul> 
                    </article>

                    <article class="article-with-list for-pc for-mobile ${domForName} ${domForType}" id="experience-softwares">
                        <h3>Softwares</h3>
                        <ul class="softwares"> ${this.addSoftwares()} </ul> 
                    </article>
                    <span class="closeBtn ${domForName} ${domForType}" id="experience-close-btn">x</span>
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


//
//  Portfolio
//
class PortfolioOverlayView extends OverlayView {
    constructor(index, data) {
        super(index, data);
        this.classType = "Portfolio";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;

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
        // Set up class naming conventions for the DOM
        const domForName = `for-${this.className.toLowerCase()}`    // Cleaner way of typing "for-overlay"
        const domForType = `for-${this.classType.toLowerCase()}`    // Cleaner way of typing "for-portfolio"

        // Create the element
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <dialog id="${this.classType}-${this.className}" class="${this.className.toLowerCase()} ${domForType}">
                <div class="container ${domForName} ${domForType}" id="${this.classType.toLowerCase()}-wrapper">

                    <article class="article-with-text for-pc for-mobile ${domForName} ${domForType}" id="project-information">
                        <h3 class="portfolio-project-title ${domForName} ${domForType}">${this.name}</h3>
                        <div class="container for-icons ${domForName} ${domForType}">
                            ${this.addProgrammingLogos()}
                        </div>
                        <p class="portfolio-project-summary ${domForName} ${domForType}">${this.summaryLarge}</p>
                    </article>

                    <span class="closeBtn ${domForName} ${domForType}" id="portfolio-close-btn">x</span>
                </div>
            </dialog>
        `.trim();
        return newElement.firstElementChild
    };

//****** Adds programming logos to the portfolio Overlay ******
    addProgrammingLogos() {
        return this.languages.map(language => `<img src="${`imgLogos/${language}.svg`}" alt="${language}" class="lang-logo">`).join('');
    };

//****** Prepares each portfolio.image item as an image element and adds to the Overlay ****** 
    addImages() {
        return this.images.map(image => `<img src="${image}" alt="${image}" class="portfolio-image">`).join('');
    };

//****** Local event listener(s) that are contained only within the OverlayView() class ****** 
    addLocalEventListeners() {
        // On pressing the close button, deletes the overlay
        this.element.querySelector('.closeBtn').onclick = () => {
            this.closeOverlay()
        };

        // Create image slideshow
        const slideshow = new Slideshow(this.images);
        this.element.querySelector("#portfolio-wrapper").append(slideshow.element)
    };
};


class Slideshow {
    constructor(images) {
        this.className  = "Overlay"
        this.classType  = "Portfolio"
        this.images = images;
        this.currentIndex = 0;
        this.imageElements = null;
        this.element = this.generateElement();
        this.addLocalEventListeners();
        this.showImage(this.currentIndex)
    };

//****** Generates a slideshow element that will be added to the Portfolio Overlay class ****** 
    generateElement() {
        const domForName = `for-${this.className.toLowerCase()}`    // Cleaner way of typing "for-overlay"
        const domForType = `for-${this.classType.toLowerCase()}`    // Cleaner way of typing "for-portfolio"

        // Create the element
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <article class="article-with-text for-pc for-mobile ${domForName} ${domForType}" id="project-slideshow">
                <div class="image-container ${domForName} ${domForType}">
                    <button class="arrow prev ${domForName} ${domForType}">❮</button>
                    ${this.addImages()}
                    <button class="arrow next ${domForName} ${domForType}">❯</button>
                </div>
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
        console.log(images)
        images.forEach((image, i) => {
            if (i === index) {
                image.classList.add("activated");
            } else {
                image.classList.remove("activated");
            }
        });
    };
};


export {ExperienceOverlayView, PortfolioOverlayView};
