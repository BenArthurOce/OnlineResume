class Filter {
    #refNum;
    #element;
    #id;
    #parentEl;
    constructor(refNum, id, parentEl) {
        this.#refNum = refNum;
        this.#id = id;
        this.#parentEl = parentEl;
        this.#element = '';
        this.initFilter();
    };
    get refNum() {
        return this.#refNum;
    };
    get id() {
        return this.#id;
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

    renderToPage() {
        this.parentEl.appendChild(this.element);
    };
};


class IntroductionFilter extends Filter {
    constructor(refNum, id, parentEl) {
        super(refNum, id, parentEl);
    };

    initFilter() {
        this.element = this.createFilterElement(this.id, 'Introduction', 'KeySkills');
        this.renderToPage();
    };

    createFilterElement(id, heading1, heading2)  {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <menu class="mobile-filter activated" id="${this.id}-filter">
                <ul class="filter-options">
                    <li role="button" data-filter="${heading1}" class="mobile-article-filter">${heading1}</li>
                    <li role="button" data-filter="${heading2}" class="mobile-article-filter">${heading2}</li>
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
        this.element = this.createFilterElement();
        this.renderToPage();
    };

    createFilterElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <menu class="mobile-filter activated" id="${this.id}-filter">
                <ul class="filter-options">
                    <li role="button" data-filter="${heading1}" class="mobile-article-filter">${heading1}</li>
                    <li role="button" data-filter="${heading2}" class="mobile-article-filter">${heading2}</li>
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
        this.element = this.createFilterElement(this.id, 'Languages', 'Technical', 'Soft');;
        this.renderToPage();
    };

    createFilterElement(id, heading1, heading2, heading3) {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <menu class="mobile-filter activated" id="${this.id}-filter">
                <ul class="filter-options">
                    <li role="button" data-filter="${heading1}" class="mobile-article-filter">${heading1}</li>
                    <li role="button" data-filter="${heading2}" class="mobile-article-filter">${heading2}</li>
                    <li role="button" data-filter="${heading3}" class="mobile-article-filter">${heading3}</li>
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
    };

    createFilterElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <menu class="filter activated" id="${this.id}-filter">
                <ul class="filter-options">
                    <li role="button" data-filter="tile" class="tile-filter-button" title="All">All</li>
                    <li role="button" data-filter="Programming" class="tile-filter-button" title="Information Technology"><i class="sidebar-icon fa fa-desktop icon"></i></li>
                    <li role="button" data-filter="Accounting" class="tile-filter-button" title="Accounting"><i class="sidebar-icon fa fa-dollar icon"></i></li>
                    <li role="button" data-filter="CustomerService" class="tile-filter-button" title="Customer Services"><i class="sidebar-icon fa fa-bell icon"></i></li>
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
    };

    createFilterElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <menu class="filter activated" id="${this.id}-filter">
                <ul class="filter-options">
                    <li role="button" data-index="0" data-filter="tile" class="tile-filter-button" title="All">All</li>
                    <li role="button" data-index="1" data-filter="UserInterface" class="tile-filter-button" title="User Interfaces"><i class="sidebar-icon fa fa-desktop icon"></i></li>
                    <li role="button" data-index="2" data-filter="Web" class="tile-filter-button" title="Web"><i class="sidebar-icon fa fa-globe icon"></i></li>
                    <li role="button" data-index="3" data-filter="Database" class="tile-filter-button" title="Databases"><i class="sidebar-icon fa fa-database icon"></i></li>
                    <li role="button" data-index="4" data-filter="Logic" class="tile-filter-button" title="Logic"><i class="sidebar-icon fa fa-puzzle-piece icon"></i></li>
                    <li role="button" data-index="5" data-filter="Games" class="tile-filter-button" title="Games"><i class="sidebar-icon fa fa-gamepad icon"></i></li>
                    <li role="button" data-index="6" data-filter="Efficiency" class="tile-filter-button" title="Efficiency"><i class="sidebar-icon fa fa-car icon"></i></li>
                    <li role="button" data-index="7" data-filter="DataSets" class="tile-filter-button" title="DataSets"><i class="sidebar-icon fa fa-table icon"></i></li>
                    <li role="button" data-index="8" data-filter="Finance" class="tile-filter-button" title="Finance"><i class="sidebar-icon fa fa-dollar icon"></i></li>
                </ul>
            </menu>
        `.trim();
        return tempEl.firstChild;
    };
};

export {IntroductionFilter, EducationFilter, SkillsFilter, ExperienceFilter, PortfolioFilter};