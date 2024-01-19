"use strict";

class Section {
    #wrapperElement;
    #sectionContainer;
    #sectionNumber;
    #section;
    #id;
    #title;

    constructor(sectionNumber) {
        this.#wrapperElement = document.querySelector("#wrapper");
        this.#sectionContainer = document.body.querySelector('#section-container');
        this.#sectionNumber = sectionNumber;
        this.#section = ''
        this.id = ''
        this.title = ''

        this.initSection();
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
    get id() {
        return this.#id;
    };
    set id(value) {
        this.#id = value;
    };
    get title() {
        return this.#title;
    };
    set title(value) {
        this.#title = value;
    };



    setActiveSection() {
        this.section.classList.add('active');
        this.section.classList.remove('inactive');
    };

    setInactiveSection() {
        this.section.classList.remove('active');
        this.section.classList.add('inactive');
    };

    renderToPage(sectionToRender) {
        this.sectionContainer.appendChild(sectionToRender);
    };

    addFilterEvents(filterButtons, callbackFunction) {
        this.section.addEventListener('click', (event) => {
            const filterButton = event.target.closest('.filterItem');
            if (filterButton) {
                const filterValue = filterButton.dataset.filter;
                callbackFunction(filterValue);
            }
        });
    };

    showArticle(filter) {
        // Hide all articles
        const articles = this.section.querySelectorAll('.mobile-article');
        articles.forEach(article => article.classList.remove('active'));
        articles.forEach(article => article.classList.add('inactive'));

        // Show the selected article based on the clicked filter
        const selectedArticle = this.section.querySelector(`#mobile-${filter}`);
        if (selectedArticle) {
            selectedArticle.classList.remove('inactive');
            selectedArticle.classList.add('active');
        }
    };


    filterTilesNew(filter) {
        const tiles = this.section.querySelectorAll(`#${this.id} .tile`);
        tiles.forEach(tile => tile.classList.remove('active'));
    
        tiles.forEach(tile => {
            const tags = Array.from(tile.classList);
            const shouldShow = tags.includes(filter);
            tile.classList.toggle('active', shouldShow);
        });
    };
};


class IntroductionSection extends Section {
    constructor() {
        super();
    };

    initSection() {
        this.id = 'myIntroduction'
        this.title = 'About Me'
        this.section = '';
        this.section = this.createSection(this.id, 'Introduction', 'KeySkills');
        this.renderToPage(this.section);
        this.addFilterEvents(this.section.querySelectorAll(`#${this.id} li`), this.showArticle.bind(this));
    };

    createSection(id, heading1, heading2) {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <section id="${id}" class="active">
                <h2>${this.title}:</h2>
                <menu class="mobile-filter" id="${id.toLowerCase()}-filter">
                    <ul class="filter-options">
                        <li role="button" data-filter="${heading1.toLowerCase()}" class="filterItem">${heading1}</li>
                        <li role="button" data-filter="${heading2.toLowerCase()}" class="filterItem">${heading2}</li>
                    </ul>
                </menu>

                <div class="article-container">

                    <article class="pc-article" id="pc-${heading1.toLowerCase()}">
                        <h2>${heading1}:</h2>
                        <p class="introduction"></p>
                    </article>
                    <article class="pc-article" id="pc-${heading2.toLowerCase()}">
                        <h2>${heading2}:</h2>
                    </article>

                    <article class="mobile-article inactive" id="mobile-${heading1.toLowerCase()}">
                        <h2>${heading1}:</h2>
                    </article>
                    <article class="mobile-article inactive" id="mobile-${heading2.toLowerCase()}">
                        <h2>${heading2}:</h2>
                    </article>

                </div>

            </section>
        `.trim();
        return tempEl.firstChild;
    };
};


class EducationSection extends Section {
    constructor() {
        super();
    };

    initSection() {
        this.section = '';
        this.id = 'myEducations'
        this.title = 'Education'
        this.section = this.createSection(this.id, 'education1', 'education2');
        this.renderToPage(this.section);
    };

    createSection(id, heading1, heading2) {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${id}" class="inactive">
            <h2>${this.title}:</h2>
            <div class="article-container">
                <article class="full-column" id="${id.toLowerCase()}1">
                    <h2></h2>
                </article>
                <article class="full-column" id="${id.toLowerCase()}2">
                    <h2></h2>
                </article>
            </div>
        </section>
        `.trim();
        return tempEl.firstChild;
    };
};


class SkillsSection extends Section {
    constructor() {
        super();
    };

    initSection() {
        this.id = 'mySkills'
        this.title = 'Skills'
        this.section = this.createSection(this.id, 'Languages', 'Technical', 'Soft');
        this.renderToPage(this.section);
        this.addFilterEvents(this.section.querySelectorAll(`#${this.id} li`), this.showArticle.bind(this));
    };

    createSection(id, heading1, heading2, heading3) {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${id}" class="inactive">
            <h2>${this.title}:</h2>
            <menu class="mobile-filter" id="${id.toLowerCase()}-filter">
                <ul class="filter-options">
                    <li role="button" data-filter="${heading1.toLowerCase()}" class="filterItem">${heading1}</li>
                    <li role="button" data-filter="${heading2.toLowerCase()}" class="filterItem">${heading2}</li>
                    <li role="button" data-filter="${heading3.toLowerCase()}" class="filterItem">${heading3}</li>
                </ul>
            </menu>

            <div class="article-container">
                <article class="pc-article" id="pc-${heading1.toLowerCase()}">
                    <h2>${heading1}:</h2>
                </article>
                <article class="pc-article" id="pc-${heading2.toLowerCase()}">
                    <h2>${heading2}:</h2>
                </article>
                <article class="pc-article" id="pc-${heading3.toLowerCase()}">
                    <h2>${heading3}:</h2>
                </article>

                <article class="mobile-article inactive" id="mobile-${heading1.toLowerCase()}">
                    <h2>${heading1}:</h2>
                </article>
                <article class="mobile-article inactive" id="mobile-${heading2.toLowerCase()}">
                    <h2>${heading2}:</h2>
                </article>
                <article class="mobile-article inactive" id="mobile-${heading3.toLowerCase()}">
                    <h2>${heading3}:</h2>
                </article>
            </div>

        </section>
        `.trim();
        return tempEl.firstChild;
    };
};


class ExperiencesSection extends Section {
    constructor() {
        super();
    };

    initSection() {
        this.section = '';
        this.id = 'myExperiences'
        this.title = 'Experience'
        this.section = this.createSection(this.id);
        this.renderToPage(this.section);
        this.addFilterEvents(this.section.querySelectorAll(`#${this.id} li`), filterValue => this.filterTilesNew(filterValue));
    };

    createSection() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${this.id}" class="inactive">
            <h2>${this.title}:</h2>
            <menu class="filter" id="${this.id.toLowerCase()}-filter">
                <ul class="filter-options">
                    <li role="button" data-filter="tile" class="filterItem" title="All">All</li>
                    <li role="button" data-filter="Programming" class="filterItem" title="Information Technology"><i class="sidebar-icon fa fa-desktop icon"></i></li>
                    <li role="button" data-filter="Accounting" class="filterItem" title="Accounting"><i class="sidebar-icon fa fa-dollar icon"></i></li>
                    <li role="button" data-filter="CustomerService" class="filterItem" title="Customer Services"><i class="sidebar-icon fa fa-bell icon"></i></li>
                </ul>
            </menu>
            <div class="tile-container" id="${this.id.toLowerCase()}-tile-container"></div>
        </section>
        `.trim();
        return tempEl.firstChild;
    };
};

class PortfolioSection extends Section {
    constructor() {
        super();
    };

    initSection() {
        this.id = 'myPortfolio'
        this.title = 'Portfolio'
        this.section = this.createSection();
        this.renderToPage(this.section);
        this.addFilterEvents(this.section.querySelectorAll(`#${this.id} li`), filterValue => this.filterTilesNew(filterValue));
    };

    createSection() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${this.id}" class="inactive">
            <h2>${this.title}:</h2>
            <menu class="filter" id="${this.id.toLowerCase()}-filter">
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
            <div class="tile-container" id="${this.id.toLowerCase()}-tile-container"></div>
        </section>
        `.trim();
        return tempEl.firstChild;
    };
};


export {
    IntroductionSection,
    EducationSection,
    SkillsSection,
    ExperiencesSection,
    PortfolioSection,
};
