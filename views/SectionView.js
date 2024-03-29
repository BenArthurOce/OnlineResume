"use strict";


// 

class SectionView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #element;                       //  The part of the resume data from Dictionary()
    #subObjects;                    //  Article() or Tile() objects contained in this section
    #isActive;
    constructor() {
        this.#className = "Section";
        this.#classType = null;
        this.#mvcComponent = "View";
        this.#element = null;
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
    get mvcComponent() {
        return this.#mvcComponent;
    };
    get element() {
        return this.#element;
    };
    set element(value) {
        this.#element = value;
    };
    get subObjects() {
        return this.#subObjects;
    };
    get isActive() {
        return this.#isActive;
    };
    set isActive(value) {
        this.#isActive = value;
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


class IntroductionSectionView extends SectionView {
    constructor() {
        super();
        this.classType = "Introduction";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;

        this.subHeadings = ["aaa", "bbb", "ccc"]
        this.element = this.generateElement();
    };

    generateElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <section id="${this.id}" class="section-display activated">
                <div id="${this.classType.toLowerCase()}-article-container" class="container for-article">
                    <article class="article-with-text for-pc" id="pc-${this.subHeadings[0].toLowerCase()}">
                        <h2>${this.subHeadings[0]}:</h2>
                        <p class="introduction">  PLACEHOLDER </p>
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
        return tempEl.firstChild;
    };

};


class SkillSectionView extends SectionView {
    constructor() {
        super();
        this.classType = "Skills";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;

        this.subHeadings = ["ddd", "eee", "fff"]
        this.element = this.generateElement();
    };

    generateElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <section id="${this.id}" class="section-display">
                <div id="${this.classType.toLowerCase()}-article-container" class="container for-article">
                    <article class="article-with-text for-pc" id="pc-${this.subHeadings[0].toLowerCase()}">
                        <h2>${this.subHeadings[0]}:</h2>
                        <p class="introduction">  PLACEHOLDER </p>
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
        return tempEl.firstChild;
    };

};


class EducationSectionView extends SectionView {
    constructor() {
        super();
        this.classType = "Education";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;

        this.subHeadings = ["ggg", "hhh", "iii"]
        this.element = this.generateElement();
    };

    generateElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <section id="${this.id}" class="section-display">
                <div id="${this.classType.toLowerCase()}-article-container" class="container for-article">
                    <article class="article-with-text for-pc" id="pc-${this.subHeadings[0].toLowerCase()}">
                        <h2>${this.subHeadings[0]}:</h2>
                        <p class="introduction">  PLACEHOLDER </p>
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
        return tempEl.firstChild;
    };

};



class ExperienceSectionView extends SectionView {
    constructor() {
        super();
        this.classType = "Experience";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;

        this.subHeadings = ["jjj", "kkk", "lll"]
        this.element = this.generateElement();
    };

    generateElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <section id="${this.id}" class="section-display">
                <div id="${this.classType.toLowerCase()}-article-container" class="container for-article">
                    <article class="article-with-text for-pc" id="pc-${this.subHeadings[0].toLowerCase()}">
                        <h2>${this.subHeadings[0]}:</h2>
                        <p class="introduction">  PLACEHOLDER </p>
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
        return tempEl.firstChild;
    };

};


class PortfolioSectionView extends SectionView {
    constructor() {
        super();
        this.classType = "Portfolio";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;

        this.subHeadings = ["mmm", "nnn", "ooo"]
        this.element = this.generateElement();
    };

    generateElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <section id="${this.id}" class="section-display">
                <div id="${this.classType.toLowerCase()}-article-container" class="container for-article">
                    <article class="article-with-text for-pc" id="pc-${this.subHeadings[0].toLowerCase()}">
                        <h2>${this.subHeadings[0]}:</h2>
                        <p class="introduction">  PLACEHOLDER </p>
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
        return tempEl.firstChild;
    };

};

export {IntroductionSectionView, EducationSectionView, SkillSectionView, ExperienceSectionView, PortfolioSectionView}









// class IntroductionSection extends Section {
//     constructor() {
//         super();
//         this.classType = "Introduction";
//         this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
//         this.createElement();
//         this.applyInfoToElement();
//     };


//     createElement() {
//         console.log("createElement")
//         const tempEl = document.createElement('div');
//         tempEl.innerHTML = `
//             <section id="${this.id}" class="section-display activated">
//                 <div id="${this.classType.toLowerCase()}-article-container" class="container for-article">
//                     <article class="article-with-text for-pc" id="pc-${this.subHeadings[0].toLowerCase()}">
//                         <h2>${this.subHeadings[0]}:</h2>
//                         <p class="introduction"></p>
//                     </article>
//                     <article class="article-with-list for-pc" id="pc-${this.subHeadings[1].toLowerCase()}">
//                         <h2>${this.subHeadings[1]}:</h2>
//                     </article>

//                     <article class="article-with-text for-mobile" id="mobile-${this.subHeadings[0].toLowerCase()}">
//                         <h2>${this.subHeadings[0]}:</h2>
//                         <p class="introduction"></p>
//                     </article>
//                     <article class="article-with-list for-mobile" id="mobile-${this.subHeadings[1].toLowerCase()}">
//                         <h2>${this.subHeadings[1]}:</h2>
//                     </article>
//                 </div>
//             </section>
//         `.trim();
//         this.element = tempEl.firstChild;
//     };

//     applyInfoToElement() {
//         const elementPC1 = this.element.querySelector(`#pc-${this.subHeadings[0].toLowerCase()}`)
//         const elementPC2 = this.element.querySelector(`#pc-${this.subHeadings[1].toLowerCase()}`)
//         const elementMob1 = this.element.querySelector(`#mobile-${this.subHeadings[0].toLowerCase()}`)
//         const elementMob2 = this.element.querySelector(`#mobile-${this.subHeadings[1].toLowerCase()}`)

//         elementPC1.querySelector(`p`).textContent = this.data.introduction
//         elementMob1.querySelector(`p`).textContent = this.data.introduction

//         // Loop through each keyskill from the JSON data source and create li elements
//         this.data.skillsKey.forEach((skill) => {
//             const li = document.createElement('li');
//             li.textContent = skill;
//             elementPC2.appendChild(li);
//         });

//         this.data.skillsKey.forEach((skill) => {
//             const li = document.createElement('li');
//             li.textContent = skill;
//             elementMob2.appendChild(li);
//         });
//     };
// };


// class EducationSection extends Section {
//     constructor() {
//         super();
//         this.classType = "Education";
//         this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
//         this.createElement();
//         this.applyInfoToElement();
//     };


//     createElement() {
//         const tempEl = document.createElement('div');
//         tempEl.innerHTML = `

//         <section id="${this.id}" class="section-display">
//             <div id="${this.classType.toLowerCase()}-article-container" class="container for-article">
//                 <article class="article-with-list for-pc" id="pc-${this.subHeadings[0].toLowerCase()}">
//                     <h2>${this.subHeadings[0]}:</h2>
//                 </article>

//                 <article class="article-with-list for-pc" id="pc-${this.subHeadings[1].toLowerCase()}">
//                     <h2>${this.subHeadings[1]}:</h2>
//                 </article>


//                 <article class="article-with-text for-mobile" id="mobile-${this.subHeadings[0].toLowerCase()}">
//                     <h2>${this.subHeadings[0]}:</h2>
//                 </article>

//                 <article class="article-with-text for-mobile" id="mobile-${this.subHeadings[1].toLowerCase()}">
//                     <h2>${this.subHeadings[1]}:</h2>
//                 </article>

//             </div>
//         </section>
//         `.trim();
//         this.element = tempEl.firstChild;
//     };

//     applyInfoToElement() {

//         // Function to create a list item and append it to the specified parent element
//         const createListItemAndAppend = (parentObjectement, textContent) => {
//             const ul = document.createElement('ul');
//             const li = document.createElement('li');
//             li.textContent = textContent;
//             ul.appendChild(li);
//             parentObjectement.appendChild(ul);
//         };


//         const elementPC1 = this.element.querySelector(`#pc-${this.subHeadings[0].toLowerCase()}`);      // IT Article - PC
//         const elementPC2 = this.element.querySelector(`#pc-${this.subHeadings[1].toLowerCase()}`);      // Accounting Article - PC
//         const elementMob1 = this.element.querySelector(`#mobile-${this.subHeadings[0].toLowerCase()}`); // IT Article - Mob
//         const elementMob2 = this.element.querySelector(`#mobile-${this.subHeadings[1].toLowerCase()}`); // Accounting Article - Mob


//         this.data.forEach((education) => {

//             const {degree, institution, tags} = education
//             if (education.tags.includes("IT")) {
//                 createListItemAndAppend(elementPC1, `${degree} - ${institution}`);
//                 createListItemAndAppend(elementMob1, `${degree} - ${institution}`);
//             };

//             if (education.tags.includes("Finance")) {
//                 createListItemAndAppend(elementPC2, `${degree} - ${institution}`);
//                 createListItemAndAppend(elementMob2, `${degree} - ${institution}`);
//             };
//         });
//     };
// };


// class SkillsSection extends Section {
//     constructor() {
//         super();
//         this.classType = "Skills"
//         this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
//         this.createElement();
//         this.applyInfoToElement();
//     };


//     createElement() {
//         const tempEl = document.createElement('div');
//         tempEl.innerHTML = `
//         <section id="${this.id}" class="section-display">
//             <div id="${this.classType.toLowerCase()}-article-container" class="container for-article">
//                 <article class="article-with-list for-pc" id="pc-${this.subHeadings[0].toLowerCase()}">
//                     <h2>${this.subHeadings[0]}:</h2>
//                 </article>
//                 <article class="article-with-list for-pc" id="pc-${this.subHeadings[1].toLowerCase()}">
//                     <h2>${this.subHeadings[1]}:</h2>
//                 </article>
//                 <article class="article-with-list for-pc" id="pc-${this.subHeadings[2].toLowerCase()}">
//                     <h2>${this.subHeadings[2]}:</h2>
//                 </article>

//                 <article class="article-with-list for-mobile" id="mobile-${this.subHeadings[0].toLowerCase()}">
//                     <h2>${this.subHeadings[0]}:</h2>
//                 </article>
//                 <article class="article-with-list for-mobile" id="mobile-${this.subHeadings[1].toLowerCase()}">
//                     <h2>${this.subHeadings[1]}:</h2>
//                 </article>
//                 <article class="article-with-list for-mobile" id="mobile-${this.subHeadings[2].toLowerCase()}">
//                     <h2>${this.subHeadings[2]}:</h2>
//                 </article>

//             </div>
//         </section>
//         `.trim();
//         this.element = tempEl.firstChild;

//     };

//     applyInfoToElement(){
//         const elementPC1 = this.element.querySelector(`#pc-${this.subHeadings[0].toLowerCase()}`)
//         const elementPC2 = this.element.querySelector(`#pc-${this.subHeadings[1].toLowerCase()}`)
//         const elementPC3 = this.element.querySelector(`#pc-${this.subHeadings[2].toLowerCase()}`)
//         const elementMob1 = this.element.querySelector(`#mobile-${this.subHeadings[0].toLowerCase()}`)
//         const elementMob2 = this.element.querySelector(`#mobile-${this.subHeadings[1].toLowerCase()}`)
//         const elementMob3 = this.element.querySelector(`#mobile-${this.subHeadings[2].toLowerCase()}`)

//         // elementPC1.querySelector(`p`).textContent = this.data.introduction
//         // elementMob1.querySelector(`p`).textContent = this.data.introduction

//         // console.log(this.data)

//         const {skillsTechincal, skillsSoft, skillsLangages} = this.data

//         skillsTechincal.forEach((lang) => {
//             const li = document.createElement('li');
//             li.textContent = lang;
//             elementPC1.appendChild(li);
//             // elementMob3.appendChild(li);
//         });

//         skillsSoft.forEach((lang) => {
//             const li = document.createElement('li');
//             li.textContent = lang;
//             elementPC2.appendChild(li);
//             // elementMob3.appendChild(li);
//         });

//         skillsLangages.forEach((lang) => {
//             const li = document.createElement('li');
//             li.textContent = lang;
//             elementPC3.appendChild(li);
//             // elementMob3.appendChild(li);
//         });


//         // Loop through each keyskill from the JSON data source and create li elements
//         // skillsLangages.forEach((skill) => {
//         //     const li = document.createElement('li');
//         //     li.textContent = skill;
//         //     elementPC2.appendChild(li);
//         // });

//         // skillsSoft.forEach((skill) => {
//         //     const li = document.createElement('li');
//         //     li.textContent = skill;
//         //     elementMob2.appendChild(li);
//         // });
//     };
// };


// class ExperiencesSection extends Section {
//     constructor() {
//         super();
//         this.classType = "Experience"
//         this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
//         this.createElement();
//         this.applyInfoToElement();
//     };

 
//     createElement() {
//         const tempEl = document.createElement('div');
//         tempEl.innerHTML = `
//             <section id="${this.id}" class="section-display">
//                 <div id="${this.classType.toLowerCase()}-tile-container" class="container for-tile">
//                 </div>
//             </section>
//         `.trim();
//         this.element = tempEl.firstChild;
//     };

//     applyInfoToElement(){};
// };


// class PortfolioSection extends Section {
//     constructor() {
//         super();
//         this.classType = "Portfolio"
//         this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
//         this.createElement();
//         this.applyInfoToElement();
//     };


//     createElement() {
//         const tempEl = document.createElement('div');
//         tempEl.innerHTML = `
//             <section id="${this.id}" class="section-display">
//                 <div id="${this.classType.toLowerCase()}-tile-container" class="container for-tile">
//                 </div>
//             </section>
//         `.trim();
//         this.element = tempEl.firstChild;
//     };
//     applyInfoToElement(){};
// };


// export {
//     IntroductionSection,
//     EducationSection,
//     SkillsSection,
//     ExperiencesSection,
//     PortfolioSection,
// };
