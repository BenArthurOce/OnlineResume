class FilterButton {
    #className;
    #classType;
 //    #parentObject;
    #element;
    #buttonName;
    constructor(parentObject, buttonName) {
         this.#className = "FilterButton";
         this.#classType = null;
         // this.#parentObject = parentObject;
         this.#element = null;
         this.#buttonName = buttonName;
    };
    get className() {
         return this.#className;
    };
    set className(value) {
        this.#className = value;
    };
    get classType() {
        return this.#classType;
    };
    set classType(value) {
        this.#classType = value;
    };
 //    get parentObject() {
 //        return this.#parentObject;
 //    };
 //    set parentObject(value) {
 //        this.#parentObject = value;
 //    };
    get element() {
        return this.#element;
    };
    set element(value) {
        this.#element = value;
    };
    get buttonName() {
        return this.#buttonName;
    };
    set buttonName(value) {
        this.#buttonName = value;
    };
 
 //****** Inits the Objects element to the DOM
     // appendToParent() {
     //     this.parentObject.element.appendChild(this.element);
     // };
 };
 
 
 class FilterButtonArticle extends FilterButton {
     constructor(parentObject, buttonName) {
         super(parentObject, buttonName); 
         this.classType = "FilterButtonArticle";
         this.createElement();
         this.addLocalEventListeners();
     };
 
     createElement() {
         const newElement = document.createElement('div');
         newElement.innerHTML = `
             <li role="button" dataFilter="${this.buttonName.toLowerCase()}" class="filter-button for-article for-mobile">${this.buttonName.toLowerCase()}</li>
         `.trim();
         this.element = newElement.firstChild; 
     };
 
     addLocalEventListeners() {
 
     };
 };
 
 
 
 class FilterButtonTile extends FilterButton {
     constructor(parentObject, buttonName) {
         super(parentObject, buttonName); 
         this.classType = "FilterButtonTile";
         this.createElement();
         this.addLocalEventListeners();
     };
 
     createElement() {
         const newElement = document.createElement('div');
         newElement.innerHTML = `
             <li role="button" dataFilter="${this.buttonName.toLowerCase()}" class="filter-button for-tile for-pc for-mobile">${this.buttonName.toLowerCase()}</li>
         `.trim();
         this.element = newElement.firstChild; 
     };
 
     addLocalEventListeners() {
 
     };
 };
 
 
 class FilterBar {
     #className;             // The name of the class
     #classType;             // The name of the subclass
     // #parentObject;          // The Object that contains this object. In this case, its SectionHandler()
     #element;               // The DOM element of this class
     #data;                  // The part of the resume data from Dictionary() that populates the element of this class
     #subHeadings;           // Article, Filter names
     #activeIndex;           // Current Filter that is active
     #filterButtons;         // The FilterButton() objects inside this class
     constructor(data, subHeadings) {
         this.#className = "Filter";
         this.#classType = null;
         // this.#parentObject = parentObject;
         this.#element = null;
         this.#data = data;
         this.#subHeadings = subHeadings;
         this.#activeIndex = 0
         this.#filterButtons = []
 
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
     get activeIndex() {
         return this.#activeIndex;
     };
     set activeIndex(value) {
         this.#activeIndex = value;
     };
     get filterButtons() {
         return this.#filterButtons;
     };
     set filterButtons(value) {
         this.#filterButtons = value;
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
 
 //****** Inits the Objects element to the DOM
     // appendToParent() {
     //     this.parentObject.element.appendChild(this.element);
     // };
 
 
     // addLocalEventListeners() {
     //     // Update the colour style of a filter button when clicked (Don't actually filter)
     //     this.allFilterEl.forEach((buttonEl, i) => {
     //         buttonEl.addEventListener('click', () => {
     //             const dataIndex = parseInt(buttonEl.getAttribute('dataIndex'), 10);
     //             this.updateActiveFilter(dataIndex)
     //         })
     //     });
     // }
 
     // updateActiveFilter(dataIndex) {
     //     // Reset all
     //     this.allFilterEl.forEach((button, i) => {button.classList.remove('activated')});
 
     //     // Activate the current filter
     //     this.allFilterEl[dataIndex].classList.add('activated')
     // };
 };
 
 
 class IntroductionFilter extends FilterBar {
     constructor(data, subHeadings) {
         super(data, subHeadings);
         this.classType = "Introduction";
         this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
 
         console.log(this.subHeadings)
         this.createElement();
     };
 
 
 
 
//  //****** Creates a HTML element
//      createElement() {
//          const newElement = document.createElement('div');
//          newElement.innerHTML = `
//                  <menu id="${this.id}" class="menu-filter for-article for-mobile">
//                      <ul class="filter-list for-article for-mobile">
//                          <li role="button" dataParent="${this.id}" dataIndex="0" dataFilter="${this.subHeadings[0].toLowerCase()}" class="filter-button for-article for-mobile">${this.subHeadings[0].toLowerCase()}</li>
//                          <li role="button" dataParent="${this.id}" dataIndex="1" dataFilter="${this.subHeadings[1].toLowerCase()}" class="filter-button for-article for-mobile">${this.subHeadings[1].toLowerCase()}</li>
//                      </ul>
//                  </menu>
//          `.trim();
//          this.element = newElement.firstChild;
//      };
 
 //****** Adds a button to the Filter Object
     addButton() {
 
     };
 };
 
 
 class SkillsFilter extends FilterBar {
     constructor(data, subHeadings) {
         super(data, subHeadings);
         this.classType = "Skills";
         this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
         this.createElement();
     };
 
 //****** Creates a HTML element
     createElement() {
         const newElement = document.createElement('div');
         newElement.innerHTML = `
                 <menu id="${this.id}" class="menu-filter for-article for-mobile">
                     <ul class="filter-list for-article for-mobile">
                         <li role="button" dataParent="${this.id}" dataIndex="0" dataFilter="${this.subHeadings[0].toLowerCase()}" class="filter-button for-article for-mobile">${this.subHeadings[0].toLowerCase()}</li>
                         <li role="button" dataParent="${this.id}" dataIndex="1" dataFilter="${this.subHeadings[1].toLowerCase()}" class="filter-button for-article for-mobile">${this.subHeadings[1].toLowerCase()}</li>
                         <li role="button" dataParent="${this.id}" dataIndex="2" dataFilter="${this.subHeadings[2].toLowerCase()}" class="filter-button for-article for-mobile">${this.subHeadings[2].toLowerCase()}</li>
                     </ul>
                 </menu>
         `.trim();
         this.element = newElement.firstChild
     };
 
 //****** Adds a button to the Filter Object
     addButton() {
 
     };    
 };
 
 
 class EducationFilter extends FilterBar {
     constructor(data, subHeadings) {
         super(data, subHeadings);
         this.classType = "Education";
         this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
         this.createElement();
         this.addButton()
     };
 
 //****** Creates a HTML element
     createElement() {
         const newElement = document.createElement('div');
         newElement.innerHTML = `
             <menu id="${this.id}" class="menu-filter for-tile for-pc for-mobile for-tile">
                 <ul class="filter-list for-tile for-pc for-mobile">
                 </ul>
             </menu>
         `.trim();
         this.element = newElement.firstChild;
     };
 
 //****** Adds a button to the Filter Object
     addButton() {
 
 
     };
 };
 
 
 class ExperienceFilter extends FilterBar {
     constructor(data, subHeadings) {
         super(data, subHeadings);
         this.classType = "Experience";
         this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
         this.createElement();
     };
 
 //****** Creates a HTML element
     createElement() {
         const newElement = document.createElement('div');
         newElement.innerHTML = `
             <menu id="${this.id}" class="menu-filter for-tile for-pc for-mobile for-tile">
                 <ul class="filter-list for-tile for-pc for-mobile">
                 </ul>
             </menu>
         `.trim();
         this.element = newElement.firstChild;
     };
     
 //****** Adds a button to the Filter Object
     addButton() {
         // parentObjectement, buttonName
 
         this.filterButtons.push(new FilterButtonTile(this, "All"))
         this.filterButtons.push(new FilterButtonTile(this, "IT"))
         this.filterButtons.push(new FilterButtonTile(this, "Accounting"))
         this.filterButtons.push(new FilterButtonTile(this, "Customer Service"))
 
         console.log(this.filterButtons)
     };
 };
 
 
 class PortfolioFilter extends FilterBar {
     constructor(data, subHeadings) {
         super(data, subHeadings);
         this.classType = "Portfolio";
         this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
         this.createElement();
     };
 
 
             // <menu id="${this.id}-filter" class="menu-filter for-article for-mobile"> NEW
             // <menu class="menu-filter for-tile for-pc for-mobile" id="${this.id}-filter"> OLD
 
 //****** Creates a HTML element
     createElement() {
         const newElement = document.createElement('div');
         newElement.innerHTML = `
                 <menu id="${this.id}" class="menu-filter for-tile for-pc for-mobile for-tile">
                     <ul class="filter-list for-tile for-pc for-mobile">
                         ${this.generateFilterOptions()}
                     </ul>
                 </menu>
         `.trim();
         this.element = newElement.firstChild;
     };
 
     
     generateFilterOptions() {
         const filterOptions = [
              { dataIndex: 1, dataFilter: 'UserInterface', title: 'User Interfaces', icon: 'desktop' }
             ,{ dataIndex: 2, dataFilter: 'Web', title: 'Web', icon: 'globe' }
             ,{ dataIndex: 3, dataFilter: 'Database', title: 'Databases', icon: 'database' }
             ,{ dataIndex: 4, dataFilter: 'Logic', title: 'Logic', icon: 'puzzle-piece' }
             ,{ dataIndex: 5, dataFilter: 'Games', title: 'Games', icon: 'gamepad' }
             ,{ dataIndex: 6, dataFilter: 'Efficiency', title: 'Efficiency', icon: 'car' }
             ,{ dataIndex: 7, dataFilter: 'DataSets', title: 'DataSets', icon: 'table' }
             ,{ dataIndex: 8, dataFilter: 'Finance', title: 'Finance', icon: 'dollar' }
         ];
     
         return filterOptions.map(option => `
             <li role="button" dataParent="${this.id}" dataIndex="${option.dataIndex}" dataFilter="${option.dataFilter}" class="filter-button for-tile for-pc for-mobile" title="${option.title}">
                 <i class="sidebar-icon fa fa-${option.icon} icon"></i>
             </li>
         `).join('');
     };
     
 
     // createUniqueTags() {
     //     const projectTagsArray = this.data.map(({ projectTags }) => projectTags);
     //     const uniqueValues = new Set(projectTagsArray.flat());
     //     return Array.from(uniqueValues);
     // };
     
 //****** Adds a button to the Filter Object
     addButton() {
 
     };
 
 
 };
 
 export {IntroductionFilter, EducationFilter, SkillsFilter, ExperienceFilter, PortfolioFilter};