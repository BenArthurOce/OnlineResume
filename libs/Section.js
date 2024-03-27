"use strict";

class Section {
    #className;             // The name of the class
    #classType;             // The name of the subclass
    // #parentObject;          // The Object that contains this object. In this case, its SectionHandler()
    #element;               // The DOM element of this class
    #data;                  // The part of the resume data from Dictionary() that populates the element of this class
    #subHeadings;           // Article names
    #isActive;              // Boolean value, if this objects element should be displayed to the user
    #subObjects;            // Articles, Tiles (currently only used for Tiles)
    constructor(data, subHeadings) {
        this.#className = "Section";
        this.#classType = null;
        // this.#parentObject = parentObject;
        this.#element = null;
        this.#data = data;
        this.#subHeadings = subHeadings;
        this.#isActive = null;
        this.#subObjects = [];
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
    // get parentObject() {
    //     return this.#parentObject;
    // };
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
    get subObjects() {
        return this.#subObjects;
    };
    set subObjects(value) {
        this.#subObjects = value;
    };

//****** Command to make this Objects element visible from the DOM
    toggleOn() {
        this.isActive = true;
        this.element.classList.add('activated');
    };

//****** Command to remove visibility from the DOM
    toggleOff() {
        this.isActive = false;
        this.element.classList.remove('activated');
    };


//****** Adds article or tile to the Section() object
    addSubObject(value) {
        this.#subObjects.push(value)
    };
};


class IntroductionSection extends Section {
    constructor(data, subHeadings) {
        super(data, subHeadings);
        this.classType = "Introduction";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.createElement();
        this.applyInfoToElement();
    };


    createElement() {
        console.log("createElement")
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <section id="${this.id}" class="section-display activated">
                <div id="${this.classType.toLowerCase()}-article-container" class="container for-article">
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
        const elementPC1 = this.element.querySelector(`#pc-${this.subHeadings[0].toLowerCase()}`)
        const elementPC2 = this.element.querySelector(`#pc-${this.subHeadings[1].toLowerCase()}`)
        const elementMob1 = this.element.querySelector(`#mobile-${this.subHeadings[0].toLowerCase()}`)
        const elementMob2 = this.element.querySelector(`#mobile-${this.subHeadings[1].toLowerCase()}`)

        elementPC1.querySelector(`p`).textContent = this.data.introduction
        elementMob1.querySelector(`p`).textContent = this.data.introduction

        // Loop through each keyskill from the JSON data source and create li elements
        this.data.skillsKey.forEach((skill) => {
            const li = document.createElement('li');
            li.textContent = skill;
            elementPC2.appendChild(li);
        });

        this.data.skillsKey.forEach((skill) => {
            const li = document.createElement('li');
            li.textContent = skill;
            elementMob2.appendChild(li);
        });
    };
};


class EducationSection extends Section {
    constructor(data, subHeadings) {
        super(data, subHeadings);
        this.classType = "Education";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.createElement();
        this.applyInfoToElement();
    };


    createElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `

        <section id="${this.id}" class="section-display">
            <div id="${this.classType.toLowerCase()}-article-container" class="container for-article">
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

    applyInfoToElement() {

        // Function to create a list item and append it to the specified parent element
        const createListItemAndAppend = (parentObjectement, textContent) => {
            const ul = document.createElement('ul');
            const li = document.createElement('li');
            li.textContent = textContent;
            ul.appendChild(li);
            parentObjectement.appendChild(ul);
        };


        const elementPC1 = this.element.querySelector(`#pc-${this.subHeadings[0].toLowerCase()}`);      // IT Article - PC
        const elementPC2 = this.element.querySelector(`#pc-${this.subHeadings[1].toLowerCase()}`);      // Accounting Article - PC
        const elementMob1 = this.element.querySelector(`#mobile-${this.subHeadings[0].toLowerCase()}`); // IT Article - Mob
        const elementMob2 = this.element.querySelector(`#mobile-${this.subHeadings[1].toLowerCase()}`); // Accounting Article - Mob


        this.data.forEach((education) => {

            const {degree, institution, tags} = education
            if (education.tags.includes("IT")) {
                createListItemAndAppend(elementPC1, `${degree} - ${institution}`);
                createListItemAndAppend(elementMob1, `${degree} - ${institution}`);
            };

            if (education.tags.includes("Finance")) {
                createListItemAndAppend(elementPC2, `${degree} - ${institution}`);
                createListItemAndAppend(elementMob2, `${degree} - ${institution}`);
            };
        });
    };
};


class SkillsSection extends Section {
    constructor(data, subHeadings) {
        super(data, subHeadings);
        this.classType = "Skills"
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.createElement();
        this.applyInfoToElement();
    };


    createElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${this.id}" class="section-display">
            <div id="${this.classType.toLowerCase()}-article-container" class="container for-article">
                <article class="article-with-list for-pc" id="pc-${this.subHeadings[0].toLowerCase()}">
                    <h2>${this.subHeadings[0]}:</h2>
                </article>
                <article class="article-with-list for-pc" id="pc-${this.subHeadings[1].toLowerCase()}">
                    <h2>${this.subHeadings[1]}:</h2>
                </article>
                <article class="article-with-list for-pc" id="pc-${this.subHeadings[2].toLowerCase()}">
                    <h2>${this.subHeadings[2]}:</h2>
                </article>

                <article class="article-with-list for-mobile" id="mobile-${this.subHeadings[0].toLowerCase()}">
                    <h2>${this.subHeadings[0]}:</h2>
                </article>
                <article class="article-with-list for-mobile" id="mobile-${this.subHeadings[1].toLowerCase()}">
                    <h2>${this.subHeadings[1]}:</h2>
                </article>
                <article class="article-with-list for-mobile" id="mobile-${this.subHeadings[2].toLowerCase()}">
                    <h2>${this.subHeadings[2]}:</h2>
                </article>

            </div>
        </section>
        `.trim();
        this.element = tempEl.firstChild;

    };

    applyInfoToElement(){
        const elementPC1 = this.element.querySelector(`#pc-${this.subHeadings[0].toLowerCase()}`)
        const elementPC2 = this.element.querySelector(`#pc-${this.subHeadings[1].toLowerCase()}`)
        const elementPC3 = this.element.querySelector(`#pc-${this.subHeadings[2].toLowerCase()}`)
        const elementMob1 = this.element.querySelector(`#mobile-${this.subHeadings[0].toLowerCase()}`)
        const elementMob2 = this.element.querySelector(`#mobile-${this.subHeadings[1].toLowerCase()}`)
        const elementMob3 = this.element.querySelector(`#mobile-${this.subHeadings[2].toLowerCase()}`)

        // elementPC1.querySelector(`p`).textContent = this.data.introduction
        // elementMob1.querySelector(`p`).textContent = this.data.introduction

        // console.log(this.data)

        const {skillsTechincal, skillsSoft, skillsLangages} = this.data

        skillsTechincal.forEach((lang) => {
            const li = document.createElement('li');
            li.textContent = lang;
            elementPC1.appendChild(li);
            // elementMob3.appendChild(li);
        });

        skillsSoft.forEach((lang) => {
            const li = document.createElement('li');
            li.textContent = lang;
            elementPC2.appendChild(li);
            // elementMob3.appendChild(li);
        });

        skillsLangages.forEach((lang) => {
            const li = document.createElement('li');
            li.textContent = lang;
            elementPC3.appendChild(li);
            // elementMob3.appendChild(li);
        });


        // Loop through each keyskill from the JSON data source and create li elements
        // skillsLangages.forEach((skill) => {
        //     const li = document.createElement('li');
        //     li.textContent = skill;
        //     elementPC2.appendChild(li);
        // });

        // skillsSoft.forEach((skill) => {
        //     const li = document.createElement('li');
        //     li.textContent = skill;
        //     elementMob2.appendChild(li);
        // });
    };
};


class ExperiencesSection extends Section {
    constructor(data, subHeadings) {
        super(data, subHeadings);
        this.classType = "Experience"
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.createElement();
        this.applyInfoToElement();
    };

 
    createElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <section id="${this.id}" class="section-display">
                <div id="${this.classType.toLowerCase()}-tile-container" class="container for-tile">
                </div>
            </section>
        `.trim();
        this.element = tempEl.firstChild;
    };

    applyInfoToElement(){};
};


class PortfolioSection extends Section {
    constructor(data, subHeadings) {
        super(data, subHeadings);
        this.classType = "Portfolio"
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.createElement();
        this.applyInfoToElement();
    };


    createElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <section id="${this.id}" class="section-display">
                <div id="${this.classType.toLowerCase()}-tile-container" class="container for-tile">
                </div>
            </section>
        `.trim();
        this.element = tempEl.firstChild;
    };
    applyInfoToElement(){};
};


export {
    IntroductionSection,
    EducationSection,
    SkillsSection,
    ExperiencesSection,
    PortfolioSection,
};
