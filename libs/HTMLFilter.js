class Filter {
    #refNum;
    #element;
    #id;
    #parentEl;
    #activeIndex
    constructor(refNum, id, parentEl) {
        this.#refNum = refNum;
        this.#element = '';
        this.#id = id;
        this.#parentEl = parentEl;
        this.#activeIndex = 0
        this.initFilter();
    };
    get refNum() {
        return this.#refNum;
    };
    get element() {
        return this.#element;
    };
    set element(value) {
        this.#element = value;
    };
    get id() {
        return this.#id;
    };
    get parentEl() {
        return this.#parentEl;
    };
    get activeIndex() {
        return this.#activeIndex;
    };
    set activeIndex(value) {
        this.#activeIndex = value;
    };
    get allFilterEl() {
        return this.element.querySelectorAll('li');
    };

    renderToPage() {
        this.parentEl.appendChild(this.element);
    };

    addLocalEventListeners() {
        // Update the colour style of a filter button when clicked (Don't actually filter)
        this.allFilterEl.forEach((buttonEl, i) => {
            buttonEl.addEventListener('click', () => {
                const dataIndex = parseInt(buttonEl.getAttribute('dataIndex'), 10);
                this.updateActiveFilter(dataIndex)
            })
        });
    }

    updateActiveFilter(dataIndex) {
        // Reset all
        this.allFilterEl.forEach((button, i) => {button.classList.remove('activated')});

        // Activate the current filter
        this.allFilterEl[dataIndex].classList.add('activated')
    };
};


class IntroductionFilter extends Filter {
    constructor(refNum, id, parentEl) {
        super(refNum, id, parentEl);
    };

    initFilter() {
        this.element = this.createFilterElement(this.id, 'Introduction', 'KeySkills');
        this.renderToPage();
        this.addLocalEventListeners();
    };

    createFilterElement(id, heading1, heading2)  {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <menu class="menu-filter for-article for-mobile" id="${this.id}-filter">
                <ul class="filter-list for-article for-mobile">
                    <li role="button" dataParent="${this.id}" dataIndex="0" dataFilter="${heading1}" class="filter-button for-article for-mobile">${heading1}</li>
                    <li role="button" dataParent="${this.id}" dataIndex="1" dataFilter="${heading2}" class="filter-button for-article for-mobile">${heading2}</li>
                </ul>
            </menu>
        `.trim();
        return tempEl.firstChild;
    };
};


class SkillsFilter extends Filter {
    constructor(refNum, id, parentEl) {
        super(refNum, id, parentEl);
    };

    initFilter() {
        this.element = this.createFilterElement(this.id, 'Languages', 'Technical', 'Soft');
        this.renderToPage();
        this.addLocalEventListeners();
    };

    createFilterElement(id, heading1, heading2, heading3) {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <menu class="menu-filter for-article for-mobile" id="${this.id}-filter">
                <ul class="filter-list for-article for-mobile">
                    <li role="button" dataParent="${this.id}" dataIndex="0" dataFilter="${heading1}" class="filter-button for-article for-mobile">${heading1}</li>
                    <li role="button" dataParent="${this.id}" dataIndex="1" dataFilter="${heading2}" class="filter-button for-article for-mobile">${heading2}</li>
                    <li role="button" dataParent="${this.id}" dataIndex="2" dataFilter="${heading3}" class="filter-button for-article for-mobile">${heading3}</li>
                </ul>
            </menu>
        `.trim();
        return tempEl.firstChild;
    };
};


class EducationFilter extends Filter {
    constructor(refNum, id, parentEl) {
        super(refNum, id, parentEl);
    };

    initFilter() {
        this.element = this.createFilterElement(this.id, 'IT', 'Accounting');
        this.renderToPage();
        this.addLocalEventListeners();
    };

    createFilterElement(id, heading1, heading2) {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <menu class="menu-filter for-article for-mobile" id="${this.id}-filter">
                <ul class="filter-list for-article for-mobile">
                    <li role="button" dataParent="${this.id}" dataIndex="0" dataFilter="${heading1}" class="filter-button for-article for-mobile">${heading1}</li>
                    <li role="button" dataParent="${this.id}" dataIndex="1" dataFilter="${heading2}" class="filter-button for-article for-mobile">${heading2}</li>
                </ul>
            </menu>
        `.trim();
        return tempEl.firstChild;
    };
};


class ExperienceFilter extends Filter {
    constructor(refNum, id, parentEl) {
        super(refNum, id, parentEl);
    };

    initFilter() {
        this.element = this.createFilterElement();
        this.renderToPage();
        this.addLocalEventListeners();
    };

    createFilterElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <menu class="menu-filter for-tile for-pc for-mobile" id="${this.id}-filter">
                <ul class="filter-list for-tile for-pc for-mobile">
                    <li role="button" dataParent="${this.id}" dataIndex="0" dataFilter="tile" class="filter-button for-tile for-pc for-mobile" title="All">All</li>
                    <li role="button" dataParent="${this.id}" dataIndex="1" dataFilter="Programming" class="filter-button for-tile for-pc for-mobile" title="Information Technology"><i class="sidebar-icon fa fa-desktop icon"></i></li>
                    <li role="button" dataParent="${this.id}" dataIndex="2" dataFilter="Accounting" class="filter-button for-tile for-pc for-mobile" title="Accounting"><i class="sidebar-icon fa fa-dollar icon"></i></li>
                    <li role="button" dataParent="${this.id}" dataIndex="3" dataFilter="CustomerService" class="filter-button for-tile for-pc for-mobile" title="Customer Services"><i class="sidebar-icon fa fa-bell icon"></i></li>
                </ul>
            </menu>
        `.trim();
        return tempEl.firstChild;
    };
};


class PortfolioFilter extends Filter {
    constructor(refNum, id, parentEl) {
        super(refNum, id, parentEl);
    };

    initFilter() {
        this.element = this.createFilterElement();
        this.renderToPage();
        this.addLocalEventListeners();
    };

    createFilterElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <menu class="menu-filter for-tile for-pc for-mobile" id="${this.id}-filter">
                <ul class="filter-list for-tile for-pc for-mobile">
                    <li role="button" dataParent="${this.id}" dataIndex="0" dataFilter="tile" class="filter-button for-tile for-pc for-mobile" title="All">All</li>
                    <li role="button" dataParent="${this.id}" dataIndex="1" dataFilter="UserInterface" class="filter-button for-tile for-pc for-mobile" title="User Interfaces"><i class="sidebar-icon fa fa-desktop icon"></i></li>
                    <li role="button" dataParent="${this.id}" dataIndex="2" dataFilter="Web" class="filter-button for-tile for-pc for-mobile" title="Web"><i class="sidebar-icon fa fa-globe icon"></i></li>
                    <li role="button" dataParent="${this.id}" dataIndex="3" dataFilter="Database" class="filter-button for-tile for-pc for-mobile" title="Databases"><i class="sidebar-icon fa fa-database icon"></i></li>
                    <li role="button" dataParent="${this.id}" dataIndex="4" dataFilter="Logic" class="filter-button for-tile for-pc for-mobile" title="Logic"><i class="sidebar-icon fa fa-puzzle-piece icon"></i></li>
                    <li role="button" dataParent="${this.id}" dataIndex="5" dataFilter="Games" class="filter-button for-tile for-pc for-mobile" title="Games"><i class="sidebar-icon fa fa-gamepad icon"></i></li>
                    <li role="button" dataParent="${this.id}" dataIndex="6" dataFilter="Efficiency" class="filter-button for-tile for-pc for-mobile" title="Efficiency"><i class="sidebar-icon fa fa-car icon"></i></li>
                    <li role="button" dataParent="${this.id}" dataIndex="7" dataFilter="DataSets" class="filter-button for-tile for-pc for-mobile" title="DataSets"><i class="sidebar-icon fa fa-table icon"></i></li>
                    <li role="button" dataParent="${this.id}" dataIndex="8" dataFilter="Finance" class="filter-button for-tile for-pc for-mobile" title="Finance"><i class="sidebar-icon fa fa-dollar icon"></i></li>
                </ul>
            </menu>
        `.trim();
        return tempEl.firstChild;
    };
    
};

export {IntroductionFilter, EducationFilter, SkillsFilter, ExperienceFilter, PortfolioFilter};


// for-pc for-mobile