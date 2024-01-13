"use strict";

class Section {
    #wrapperElement;
    #sectionContainer;
    #sectionNumber
    #section

    constructor(sectionNumber) {
        this.#wrapperElement = document.querySelector("#wrapper");
        this.#sectionContainer = document.body.querySelector('#slideshowContainer');
        this.#sectionNumber = sectionNumber;
        this.#section = ''
    };
    get sectionContainer() {
        return this.#sectionContainer;
    };
    get wrapperElement() {
        return this.#wrapperElement;
    };
    get sectionNumber() {
        return this.#sectionNumber;
    };
    get section() {
        return this.#section;
    };
    set section(value) {
        this.#section = value;
    };
    // get tiles() {
    //     this.#section.querySelectorAll(`.tile`)
    //     // return this
    // };
    // get filters() {
    //     this.#section.querySelectorAll(`.menu a`)
    // };

    constructSectionContainer() {
        const newElement = document.createElement("div");
        newElement.id = "slideshowContainer"
        document.querySelector("#wrapper").appendChild(newElement)
        this.#sectionContainer = document.querySelector("#slideshowContainer")
    };

    setActiveSection() {
        this.section.classList.add('active');
        this.section.classList.remove('inactive');
    };

    setInactiveSection() {
        this.section.classList.remove('active');
        this.section.classList.add('inactive');
    };

    renderSectionNew(sectionToRender) {
        this.sectionContainer.appendChild(sectionToRender);
    };
};


class IntroductionSection extends Section {
    constructor() {
        super();
        this.section = '';
        this.name = 'myIntroduction'
    };

    initSection() {
        this.section = this.createSection(this.name, 'Introduction', 'Introduction2');
        this.renderSectionNew(this.section);
    };

    createSection(id, heading1, heading2) {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <section id="${id}" class="active">
                <h2>${id}:</h2>
                <article class="full-column" id="${id.toLowerCase()}1">
                    <h2>${heading1}</h2>
                    <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>
                </article>
                <article class="full-column" id="${id.toLowerCase()}2">
                    <h2>${heading2}</h2>
                    <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>
                </article>
            </section>
        `.trim();
        return tempEl.firstChild;
    };
};


class EducationSection extends Section {
    constructor() {
        super();
        this.section = '';
        this.name = 'myEducations'
    };

    initSection() {
        this.section = this.createSection(this.name, 'education1', 'education2');
        this.renderSectionNew(this.section);
    };

    createSection(id, heading1, heading2) {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${id}" class="inactive">
            <h2>${id}:</h2>
            <article class="full-column" id="${id.toLowerCase()}1">
                <h2>${heading1}</h2>
                <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>
            </article>
            <article class="full-column" id="${id.toLowerCase()}2">
                <h2>${heading2}</h2>
                <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>
            </article>
        </section>
        `.trim();
        return tempEl.firstChild;
    };
};


class SkillsSection extends Section {
    constructor() {
        super();
        this.section = '';
        this.name = 'mySkills'
    };

    initSection() {
        this.section = this.createSection(this.name, 'keySkills', 'technicalSkills', 'softSkills');
        this.renderSectionNew(this.section);
    };

    createSection(id, heading1, heading2) {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${id}" class="inactive">
            <h2>${id}:</h2>
            <article class="full-column" id="${id.toLowerCase()}1">
                <h2>${heading1}</h2>
                <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>
            </article>
            <article class="full-column" id="${id.toLowerCase()}2">
                <h2>${heading2}</h2>
                <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>
            </article>
        </section>
        `.trim();
        return tempEl.firstChild;
    };
};


class ExperiencesSection extends Section {
    constructor() {
        super();
        this.section = '';
        this.name = 'myExperiences'
    };

    get filter() {
        return this.section.querySelector(`menu`)
    };

    initSection() {
        this.section = this.createSection(this.name);
        this.addEventListeners()
        this.renderSectionNew(this.section);
    };

    createSection(id) {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${id}" class="inactive">
            <h2>${id}:</h2>
            <menu class="filter" id="${id.toLowerCase()}-filter">
                <ul class="filter-options">
                    <li role="button" data-filter="tile" class="filterItem">All</li>
                    <li role="button" data-filter="Programming" class="filterItem">Programming</li>
                    <li role="button" data-filter="Accounting" class="filterItem">Accounting</li>
                    <li role="button" data-filter="CustomerService" class="filterItem">Customer Service</li>
                </ul>
            </menu>
        </section>
        `.trim();
        return tempEl.firstChild;
    };

    addEventListeners() {
        this.addFilterEventListeners();    
    };

    addFilterEventListeners() {
        this.section.querySelectorAll('li').forEach((filter, index) => {
            filter.addEventListener('click', () => {
                this.filterTiles(filter.dataset.filter);
            });
        });
    };

    filterTiles(filter) {
        const tiles = document.body.querySelectorAll(`#${this.name} .tile`)
        tiles.forEach(tile => {
            const tags = Array.from(tile.classList);
            if (tags.includes(filter)) {
                tile.classList.add('active');
            } else {
                tile.classList.remove('active');
            }
        });
    };
};

class PortfolioSection extends Section {
    constructor() {
        super();
        this.section = ''
        this.name = 'myPortfolio'
    };

    get filter() {
        return this.section.querySelector(`menu`)
    };

    initSection() {
        this.section = this.createSection(this.name);
        this.addEventListeners()
        this.renderSectionNew(this.section);
    };

    createSection(id) {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${id}" class="inactive">
            <h2>${id}</h2>
            <menu class="filter" id="${id.toLowerCase()}-filter">
                <ul class="filter-options">
                    <li role="button" data-filter="tile" class="filterItem" title="All">All</li>
                    <li role="button" data-filter="UserInterface" class="filterItem" title="User Interfaces"><i class="sidebar-icon fa fa-desktop icon"></i></li>
                    <li role="button" data-filter="Web" class="filterItem" title="Web"><i class="sidebar-icon fa fa-globe icon"></i></li>
                    <li role="button" data-filter="Database" class="filterItem" title="Databases"><i class="sidebar-icon fa fa-database icon"></i></li>
                    <li role="button" data-filter="Logic" class="filterItem" title="Logic"><i class="sidebar-icon fa fa-puzzle-piece icon"></i></li>
                    <li role="button" data-filter="Games" class="filterItem" title="Games"><i class="sidebar-icon fa fa-gamepad icon"></i></li>
                    <li role="button" data-filter="Efficiency" class="filterItem" title="Efficiency"><i class="sidebar-icon fa fa-car icon"></i></li>
                    <li role="button" data-filter="DataSets" class="filterItem" title="DataSets"><i class="sidebar-icon fa fa-table icon"></i></li>
                    <li role="button" data-filter="Finance" class="filterItem" title="Finance"><i class="sidebar-icon fa fa-dollar icon"></i></li>
                </ul>
            </menu>
        </section>
        `.trim();
        return tempEl.firstChild;
    };

    addEventListeners() {
        this.addFilterEventListeners();    
    };

    addFilterEventListeners() {
        this.section.querySelectorAll('li').forEach((filter, index) => {
            filter.addEventListener('click', () => {
                this.filterTiles(filter.dataset.filter);
            });
        });
    };

    filterTiles(filter) {
        const tiles = document.body.querySelectorAll(`#${this.name} .tile`)
        tiles.forEach(tile => {
            const tags = Array.from(tile.classList);
            if (tags.includes(filter)) {
                tile.classList.add('active');
            } else {
                tile.classList.remove('active');
            }
        });
    };
};


export {
    IntroductionSection,
    EducationSection,
    SkillsSection,
    ExperiencesSection,
    PortfolioSection,
};
