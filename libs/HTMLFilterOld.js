class Filter {
    #className;             // The name of the class
    #classType;             // The name of the subclass
    #parentEl;              // The Object that contains this object. In this case, its SectionHandler()
    #element;               // The DOM element of this class
    #data;                  // The part of the resume data from Dictionary() that populates the element of this class
    #subHeadings;           // Article, Filter names
    #activeIndex;           // Current Filter that is active
    constructor(data, parentEl, subHeadings) {
        this.#className = "Filter";
        this.#classType = null;
        this.#parentEl = parentEl;
        this.#element = null;
        this.#data = data;
        this.#subHeadings = subHeadings;
        this.#activeIndex = 0

        // this.initFilter();

        // this.init()

        // this.createSectionElement();
        // this.applyInfoToElement();      // Different functions between classes. Add icons, tags to the tile element
        // this.renderToPage();            // Shared function. Adds Tile() to the DOM

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
    get activeIndex() {
        return this.#activeIndex;
    };
    set activeIndex(value) {
        this.#activeIndex = value;
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
    appendToParent() {
        this.parentEl.appendChild(this.element);
    };


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


class IntroductionFilter extends Filter {
    constructor(data, parentEl, subHeadings) {
        super(data, parentEl, subHeadings);
        this.classType = "Introduction";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
    };


    createElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
                <menu id="${this.id}" class="menu-filter for-article for-mobile">
                    <ul class="filter-list for-article for-mobile">
                        <li role="button" dataParent="${this.id}" dataIndex="0" dataFilter="${this.subHeadings[0].toLowerCase()}" class="filter-button for-article for-mobile">${this.subHeadings[0].toLowerCase()}</li>
                        <li role="button" dataParent="${this.id}" dataIndex="1" dataFilter="${this.subHeadings[1].toLowerCase()}" class="filter-button for-article for-mobile">${this.subHeadings[1].toLowerCase()}</li>
                    </ul>
                </menu>
        `.trim();
        this.element = tempEl.firstChild;
    };
};


class SkillsFilter extends Filter {
    constructor(data, parentEl, subHeadings) {
        super(data, parentEl, subHeadings);
        this.classType = "Skills";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
    };


    createElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
                <menu id="${this.id}" class="menu-filter for-article for-mobile">
                    <ul class="filter-list for-article for-mobile">
                        <li role="button" dataParent="${this.id}" dataIndex="0" dataFilter="${this.subHeadings[0].toLowerCase()}" class="filter-button for-article for-mobile">${this.subHeadings[0].toLowerCase()}</li>
                        <li role="button" dataParent="${this.id}" dataIndex="1" dataFilter="${this.subHeadings[1].toLowerCase()}" class="filter-button for-article for-mobile">${this.subHeadings[1].toLowerCase()}</li>
                        <li role="button" dataParent="${this.id}" dataIndex="2" dataFilter="${this.subHeadings[2].toLowerCase()}" class="filter-button for-article for-mobile">${this.subHeadings[2].toLowerCase()}</li>
                    </ul>
                </menu>
        `.trim();
        this.element = tempEl.firstChild
    };
};


class EducationFilter extends Filter {
    constructor(data, parentEl, subHeadings) {
        super(data, parentEl, subHeadings);
        this.classType = "Education";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
    };

    createElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
                <menu id="${this.id}" class="menu-filter for-article for-mobile">
                    <ul class="filter-list for-article for-mobile">
                        <li role="button" dataParent="${this.id}" dataIndex="0" dataFilter="${this.subHeadings[0].toLowerCase()}" class="filter-button for-article for-mobile">${this.subHeadings[0].toLowerCase()}</li>
                        <li role="button" dataParent="${this.id}" dataIndex="1" dataFilter="${this.subHeadings[1].toLowerCase()}" class="filter-button for-article for-mobile">${this.subHeadings[1].toLowerCase()}</li>
                    </ul>
                </menu>
        `.trim();
        this.element = tempEl.firstChild;
    };
};


class ExperienceFilter extends Filter {
    constructor(data, parentEl, subHeadings) {
        super(data, parentEl, subHeadings);
        this.classType = "Experience";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
    };

    createElement() {
        
        // <menu id="${this.id}-filter" class="menu-filter for-article for-mobile">     NEW
        //<menu class="menu-filter for-tile for-pc for-mobile" id="${this.id}-filter">  OLD

        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
                <menu id="${this.id}" class="menu-filter for-tile for-pc for-mobile for-tile">
                    <ul class="filter-list for-tile for-pc for-mobile">
                        ${this.generateFilterOptions()}
                    </ul>
                </menu>
        `.trim();
        this.element = tempEl.firstChild;
    };


    // const tempEl = document.createElement('div');
    // tempEl.innerHTML = `
    //     <div id="${this.id}-filter-container" class="container for-filter for-tile">
    //         <menu id="${this.id}" class="menu-filter for-tile for-pc for-mobile for-tile">
    //             <ul class="filter-list for-tile for-pc for-mobile">
    //                 ${this.generateFilterOptions()}
    //             </ul>
    //         </menu>
    //     </div>
    // `.trim();
    // this.element = tempEl.firstChild;
    
    generateFilterOptions() {
        const filterOptions = [
             { dataIndex: 0, dataFilter: "All", title: "All" }
            ,{ dataIndex: 1, dataFilter: "Programming", title: "Information Technology", icon: "desktop" }
            ,{ dataIndex: 2, dataFilter: "Accounting", title: "Accounting", icon: "dollar" }
            ,{ dataIndex: 3, dataFilter: "CustomerService", title: "Customer Services", icon: "bell" }
        ];
    
        return filterOptions.map(option => `
            <li role="button" dataParent="${this.id}" dataIndex="${option.dataIndex}" dataFilter="${option.dataFilter}" class="filter-button for-tile for-pc for-mobile" title="${option.title}">
                ${option.icon ? `<i class="sidebar-icon fa fa-${option.icon} icon"></i>` : ""}
            </li>
        `).join('');
    };    
};


class PortfolioFilter extends Filter {
    constructor(data, parentEl, subHeadings) {
        super(data, parentEl, subHeadings);
        this.classType = "Portfolio";
        this.id = `${this.classType.toLowerCase()}-${this.className.toLowerCase()}`;
    };


            // <menu id="${this.id}-filter" class="menu-filter for-article for-mobile"> NEW
            // <menu class="menu-filter for-tile for-pc for-mobile" id="${this.id}-filter"> OLD

    createElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
                <menu id="${this.id}" class="menu-filter for-tile for-pc for-mobile for-tile">
                    <ul class="filter-list for-tile for-pc for-mobile">
                        ${this.generateFilterOptions()}
                    </ul>
                </menu>
        `.trim();
        this.element = tempEl.firstChild;
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
    
};

export {IntroductionFilter, EducationFilter, SkillsFilter, ExperienceFilter, PortfolioFilter};