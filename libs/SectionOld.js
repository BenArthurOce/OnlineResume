"use strict";

class Section {
    #className;             // The name of the class
    #classType;             // The name of the subclass
    #parentEl;              // The Object that contains this object. In this case, its SectionHandler()
    #element;               // The DOM element of this class
    #data;                  // The part of the resume data from Dictionary() that populates the element of this class
    #subHeadings;           // Article names
    #isActive;              // Boolean value, if this objects element should be displayed to the user
    constructor(data, parentEl, subHeadings) {
        this.#className = "Section";
        this.#classType;
        this.#parentEl = parentEl;
        this.#element = null;
        this.#data = data;
        this.#subHeadings = subHeadings;
        this.#isActive = null;



        // this.addLocalEventListeners();  // Shared function. Style change when hovered. Overlay() presented when clicked
        // this.initSection();

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
    get parentEl() {
        return this.#parentEl;
    };
    get element() {
        return this.#element;
    };
    set element(value) {
        this.#element = value;
    };
    get data() {
        return this.#data;
    };
    get subHeadings() {
        return this.#subHeadings;
    };
    get isActive() {
        return this.#isActive;
    };
    set isActive(value) {
        this.#isActive = value;
    };



    toggleOn() {
        this.isActive = true;
        this.element.classList.add('activated');
    };

    toggleOff() {
        this.isActive = false;
        this.element.classList.remove('activated');
    };


};



// class BoardDisplay extends Board {
//     constructor(idNumber, parentElement) {
//         super(idNumber, parentElement);
//         this.initSquares()              // Automatically creates the 64 Square() Objects into a 2d array
//         this.initPieces()               // Automatically creates the 24 Piece() Objects and appends them to a Square()
//         this.createElement()            // Automatically creates the element
//     }

class IntroductionSection extends Section {
    constructor(data, parentEl, subHeadings) {
        super(data, parentEl, subHeadings);
    };

    createElement() {
        // console.log(this.subHeadings)
        // Set up class naming conventions for the DOM
        this.classType = "Introduction"
        // const domForName = `for-${this.className.toLowerCase()}`    // Cleaner way of typing "for-overlay"
        // const domForType = `for-${this.classType.toLowerCase()}`    // Cleaner way of typing "for-introduction"

        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <section id="${this.classType.toLowerCase()}-${this.className.toLowerCase()}" class="section-display activated">
                <h1 class="section-title for-pc">${this.classType}:</h1>
                <div class="container for-filter" id="${this.className.toLowerCase()}-filter-container"></div>
                <div class="container for-article" id="${this.className.toLowerCase()}-article-container">

                    <article class="article-with-text for-pc" id="pc-${this.subHeadings[0].toLowerCase()}">
                        <h2>${this.subHeadings[0]}:</h2>
                        <p class="introduction"></p>
                    </article>
                    <article class="article-with-list for-pc" id="pc-${this.subHeadings[1].toLowerCase()}">
                        <h2>${this.subHeadings[1]}:</h2>
                    </article>

                    <article class="article-with-text for-mobile" id="mobile-${this.subHeadings[0].toLowerCase()}">
                        <h2>${this.subHeadings[0]}:</h2>
                        <p class="introduction"></p>
                    </article>
                    <article class="article-with-list for-mobile" id="mobile-${this.subHeadings[1].toLowerCase()}">
                        <h2>${this.subHeadings[1]}:</h2>
                    </article>
                </div>
            </section>
        `.trim();
        this.element = tempEl.firstChild;
    };

    applyInfoToElement() {
        // const elementPC1 = this.element.querySelector(`#pc-${this.subHeadings[0].toLowerCase()}`)
        // const elementPC2 = this.element.querySelector(`#pc-${this.subHeadings[1].toLowerCase()}`)
        // const elementMob1 = this.element.querySelector(`#mobile-${this.subHeadings[0].toLowerCase()}`)
        // const elementMob2 = this.element.querySelector(`#mobile-${this.subHeadings[1].toLowerCase()}`)

        // elementPC1.querySelector(`p`).textContent = this.data.introduction
        // elementMob1.querySelector(`p`).textContent = this.data.introduction

        // // Loop through each keyskill from the JSON data source and create li elements
        // this.data.skillsKey.forEach((skill) => {
        //     const li = document.createElement('li');
        //     li.textContent = skill;
        //     elementPC2.appendChild(li);
        // });

        // this.data.skillsKey.forEach((skill) => {
        //     const li = document.createElement('li');
        //     li.textContent = skill;
        //     elementMob2.appendChild(li);
        // });
    };
};


class EducationSection extends Section {
    constructor(data, parentEl, subHeadings) {
        super(data, parentEl, subHeadings);
        
    };



    createElement() {
        this.classType = "Education"
        // Set up class naming conventions for the DOM

        // const domForName = `for-${this.className.toLowerCase()}`    // Cleaner way of typing "for-overlay"
        // const domForType = `for-${this.classType.toLowerCase()}`    // Cleaner way of typing "for-education"

        const tempEl = document.createElement('div');
        tempEl.innerHTML = `


        <section id="${this.classType.toLowerCase()}-${this.className.toLowerCase()}" class="section-display">
            <h1 class="section-title for-pc">${this.classType}:</h1>
            <div class="container for-filter" id="${this.className.toLowerCase()}-filter-container"></div>
            <div class="container for-article" id="${this.className.toLowerCase()}-article-container">

                <article class="article-with-list for-pc" id="pc-${this.subHeadings[0].toLowerCase()}">
                    <h2>${this.subHeadings[0]}:</h2>
                </article>

                <article class="article-with-list for-pc" id="pc-${this.subHeadings[1].toLowerCase()}">
                    <h2>${this.subHeadings[1]}:</h2>
                </article>


                <article class="article-with-text for-mobile" id="mobile-${this.subHeadings[0].toLowerCase()}">
                    <h2>${this.subHeadings[0]}:</h2>
                </article>

                <article class="article-with-text for-mobile" id="mobile-${this.subHeadings[1].toLowerCase()}">
                    <h2>${this.subHeadings[1]}:</h2>
                </article>

            </div>
        </section>
        `.trim();
        this.element = tempEl.firstChild;
    };

    applyInfoToElement(){
    };
};


class SkillsSection extends Section {
    constructor(data, parentEl, subHeadings) {
        super(data, parentEl, subHeadings);
    };



    createElement() {
        // Set up class naming conventions for the DOM
        this.classType = "Skills"
        const domForName = `for-${this.className.toLowerCase()}`    // Cleaner way of typing "for-overlay"
        const domForType = `for-${this.classType.toLowerCase()}`    // Cleaner way of typing "for-skills"

        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${this.classType.toLowerCase()}-${this.className.toLowerCase()}" class="section-display">
            <h1 class="section-title for-pc">${this.classType}:</h1>
            <div class="container for-filter" id="${this.className.toLowerCase()}-filter-container"></div>
            <div class="container for-article" id="${this.className.toLowerCase()}-article-container">
                <article class="article-with-list for-pc" id="pc-${this.subHeadings[0].toLowerCase()}">
                    <h2>${this.subHeadings[0].toLowerCase()}:</h2>
                </article>
                <article class="article-with-list for-pc" id="pc-${this.subHeadings[1].toLowerCase()}">
                    <h2>${this.subHeadings[1].toLowerCase()}:</h2>
                </article>
                <article class="article-with-list for-pc" id="pc-${this.subHeadings[2].toLowerCase()}">
                    <h2>${this.subHeadings[2].toLowerCase()}:</h2>
                </article>

                <article class="article-with-list for-mobile" id="mobile-${this.subHeadings[0].toLowerCase()}">
                    <h2>${this.subHeadings[0].toLowerCase()}:</h2>
                </article>
                <article class="article-with-list for-mobile" id="mobile-${this.subHeadings[1].toLowerCase()}">
                    <h2>${this.subHeadings[1].toLowerCase()}:</h2>
                </article>
                <article class="article-with-list for-mobile" id="mobile-${this.subHeadings[2].toLowerCase()}">
                    <h2>${this.subHeadings[2].toLowerCase()}:</h2>
                </article>

            </div>
        </section>
        `.trim();
        this.element = tempEl.firstChild;

    };

    applyInfoToElement(){
        // const elementPC1 = this.element.querySelector(`#pc-${this.subHeadings[0].toLowerCase()}`)
        // const elementPC2 = this.element.querySelector(`#pc-${this.subHeadings[1].toLowerCase()}`)
        // const elementPC3 = this.element.querySelector(`#pc-${this.subHeadings[2].toLowerCase()}`)
        // const elementMob1 = this.element.querySelector(`#mobile-${this.subHeadings[0].toLowerCase()}`)
        // const elementMob2 = this.element.querySelector(`#mobile-${this.subHeadings[1].toLowerCase()}`)
        // const elementMob3 = this.element.querySelector(`#mobile-${this.subHeadings[2].toLowerCase()}`)

        // elementPC1.querySelector(`p`).textContent = this.data.introduction
        // elementMob1.querySelector(`p`).textContent = this.data.introduction

        // // Loop through each keyskill from the JSON data source and create li elements
        // this.data.skillsKey.forEach((skill) => {
        //     const li = document.createElement('li');
        //     li.textContent = skill;
        //     elementPC2.appendChild(li);
        // });

        // this.data.skillsKey.forEach((skill) => {
        //     const li = document.createElement('li');
        //     li.textContent = skill;
        //     elementMob2.appendChild(li);
        // });
    }
};


class ExperiencesSection extends Section {
    constructor(data, parentEl, subHeadings) {
        super(data, parentEl, subHeadings);
        
    };

 

    createElement() {
        // Set up class naming conventions for the DOM
        this.classType = "Experience"
        const domForName = `for-${this.className.toLowerCase()}`    // Cleaner way of typing "for-overlay"
        const domForType = `for-${this.classType.toLowerCase()}`    // Cleaner way of typing "for-Experience"

        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${this.classType.toLowerCase()}-${this.className.toLowerCase()}" class="section-display">
            <h1 class="section-title for-pc">${this.classType}:</h1>
            <div class="container for-filter" id="${this.className.toLowerCase()}-filter-container"></div>
            <div class="container for-tile" id="${this.className.toLowerCase()}-tile-container">
        </section>
        `.trim();
        this.element = tempEl.firstChild;
    };

    applyInfoToElement(){}
};

class PortfolioSection extends Section {
    constructor(data, parentEl, subHeadings) {
        super(data, parentEl, subHeadings);
    }



    createElement() {
        // Set up class naming conventions for the DOM
        this.classType = "Portfolio"
        const domForName = `for-${this.className.toLowerCase()}`    // Cleaner way of typing "for-overlay"
        const domForType = `for-${this.classType.toLowerCase()}`    // Cleaner way of typing "for-Portfolio"

        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${this.classType.toLowerCase()}-${this.className.toLowerCase()}" class="section-display">
            <h1 class="section-title for-pc">${this.classType}:</h1>
            <div class="container for-filter" id="${this.className.toLowerCase()}-filter-container"></div>
            <div class="container for-tile" id="${this.className.toLowerCase()}-tile-container">
        </section>
        `.trim();
        this.element = tempEl.firstChild;
    };
    applyInfoToElement(){}
};


export {
    IntroductionSection,
    EducationSection,
    SkillsSection,
    ExperiencesSection,
    PortfolioSection,
};
