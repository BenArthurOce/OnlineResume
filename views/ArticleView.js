

//

class ArticleView {
    #className;                     //  The name of the class
    #classType;                     //  The name of the subclass
    #mvcComponent;                  //  What part of the MVC is this class
    #id;                            //  Combination of class names to create an element id string
    #index;                         //  Index order of Article
    #text;                          //  String displayed on screen
    #heading;                       //  Heading
    #isActive;                      //  DOM element displays a different attribute if active
    #element;                       //  HTML Element
    constructor(index, text, heading) {
        this.#className = "ArticleView";
        this.#classType = "ArticleView";
        this.#mvcComponent = "View";
        this.#id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
        this.#index = index;
        this.#text = text;
        this.#heading = heading;
        this.#isActive = false;
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
    get index() {
        return this.#index;
    };
    get text() {
        return this.#text;
    };
    get heading() {
        return this.#heading;
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

//****** Prepares the HTML element ******
    generateElement() {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <article id="${this.id}" class="article-with-text for-pc">
                <h2>${this.heading}:</h2>
                <p>${this.text}</p>
            </article>
         `;
        return newElement.firstElementChild
    };

//****** Command to make this Object "visible" ******
    toggleOn() {
        this.isActive = true;
        this.element.classList.add("activated")
    };

//****** Command to make this Object "invisible" ******
    toggleOff() {
        this.isActive = false;
        this.element.classList.remove("activated")
    };

};


export default ArticleView;














// class ExperienceArticle extends ArticleObject {
//     constructor(data, parentObj) {
//         super(data, parentObj); 
//         this.classType = "Experience"
//         this.testInit();
//     };

//     testInit() {
//         console.log(this)
//     }

//     createArticleElement() {
         
//         const tempEl = document.createElement('div');
//         tempEl.innerHTML = `
//         <div class="article activated for-experience">
//             <div class="icon-container">
// 		        <i class="icon"></i>
// 		    </div>
//             <p class="position">${this.data.position}</p>
//             <p class="company">${this.data.company}</p>
//         </div>
//         `.trim();
//         this.element = tempEl.firstChild
//     };

//     applyInfoToElement() {
//         // Add tags for job types
//         // console.log(this.data)
//         this.data.tags.forEach(tag => this.element.classList.add(tag));

//         // Add small icon in top left
//         const iconClass = this.getIconClassBasedOnTag(this.data.tags[0]);
//         this.element.querySelector('i').className = `sidebar-icon fa ${iconClass}`;
//     };

//     // Helper method to get icon class based on the tag
//     getIconClassBasedOnTag(tag) {
//         switch (tag) {
//             case "Programming":
//                 return 'fa-desktop';
//             case "Accounting":
//                 return 'fa-dollar';
//             case "CustomerService":
//                 return 'fa-bell';
//             default:
//                 return '';
//         }
//     };

// };


// class PortfolioArticle extends ArticleObject {
//     constructor(data, parentObj) {
//         super(data, parentObj);
//         this.classType = "Portfolio"
//     };

//     createArticleElement() {
//         const tempEl = document.createElement('div');
//         tempEl.innerHTML = `
//             <div class="article activated for-portfolio">
//                 <div class="container for-icons"></div>
//                 <p class="projectName">${this.data.projectName}</p>
//                 <p class="projectSumSmall">${this.data.summarySmall}</p>
//             </div>
//         `.trim();
//         this.element = tempEl.firstChild;
//     };

//     applyInfoToElement() {
//         // Add tags for each portfolio
//         this.data.projectTags.forEach(tag => this.element.classList.add(tag));

//         // Add programming icons
//         const iconContainer = this.element.querySelector('.container.for-icons');
//         this.data.projectLangs.forEach(lang => {
//             const logoPath = `imgLogos/${lang}.svg`;                        // Get SVG of programming logo
//             const langLogo = document.createElement('img');                 // Create a new image element for each language
            
//             langLogo.src = logoPath;
//             langLogo.alt = lang;
//             langLogo.classList.add('program-icon');
    
//             iconContainer.appendChild(langLogo);
//         });
//     };
// }

// export { ExperienceArticle, PortfolioArticle};