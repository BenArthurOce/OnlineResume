"use strict";

class Section {
    #sectionNum;
    #element;
    #id;
    #parentEl;
    #name;

    constructor(sectionNum, id, parentEl, name) {
        this.#sectionNum = sectionNum;
        this.#id = id;
        this.#parentEl = parentEl;
        this.#name = name;
        this.#element = '';
        this.initSection();
    };
    get sectionNum() {
        return this.#sectionNum;
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
    get name() {
        return this.#name;
    };

    toggleActive() {
        this.element.classList.toggle('activated');
    };

    renderToPage() {
        this.parentEl.appendChild(this.element);
    };
};


class IntroductionSection extends Section {
    constructor(sectionNum, id, parentEl, name) {
        super(sectionNum, id, parentEl, name);
    };

    initSection() {
        this.element = this.createSection(this.id, 'Introduction', 'KeySkills');
        this.renderToPage(this.element);
    };

    createSection(id, heading1, heading2) {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <section id="${this.id}" class="section-display activated">
                <h1 class="pc-section-title">${this.name}:</h1>
                <div class="filter-container" id="${this.id}-filter-container"></div>
                <div class="article-container" id="${this.id}-article-container">
                    <article class="pc-article" id="pc-${heading1}">
                        <h2>${heading1}:</h2>
                        <p class="introduction"></p>
                    </article>
                    <article class="pc-article" id="pc-${heading2}">
                        <h2>${heading2}:</h2>
                    </article>

                    <article class="mobile-article" id="mobile-${heading1}">
                        <h2>${heading1}:</h2>
                        <p class="introduction"></p>
                    </article>
                    <article class="mobile-article" id="mobile-${heading2}">
                        <h2>${heading2}:</h2>
                    </article>
                </div>
            </section>
        `.trim();
        return tempEl.firstChild;
    };
};


class EducationSection extends Section {
    constructor(sectionNum, id, parentEl, name) {
        super(sectionNum, id, parentEl, name);
    };

    initSection() {
        this.element = this.createSection(this.id, 'IT', 'Accounting');
        this.renderToPage(this.element);
    };

    createSection(id, heading1, heading2) {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${this.id}" class="section-display">
            <h1 class="pc-section-title">${this.name}:</h1>
            <div class="filter-container" id="${this.id}-filter-container"></div>
            <div class="article-container" id="${this.id}-article-container">
                <article class="pc-article" id="pc-${heading1}">
                    <h2>${heading1}:</h2>
                </article>
                <article class="pc-article" id="pc-${heading2}">
                    <h2>${heading2}:</h2>
                </article>

                <article class="mobile-article" id="mobile-${heading1}">
                    <h2>${heading1}:</h2>
                </article>
                <article class="mobile-article" id="mobile-${heading2}">
                    <h2>${heading2}:</h2>
                </article>
            </div>
         
        </section>
        `.trim();
        return tempEl.firstChild;
    };
};


class SkillsSection extends Section {
    constructor(sectionNum, id, parentEl, name) {
        super(sectionNum, id, parentEl, name);
    };

    initSection() {
        this.element = this.createSection(this.id, 'Technical', 'Soft', 'Languages');
        this.renderToPage(this.element);
    };

    createSection(id, heading1, heading2, heading3) {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${this.id}" class="section-display">
            <h1 class="pc-section-title">${this.name}:</h1>
            <div class="filter-container" id="${this.id}-filter-container"></div>
            <div class="article-container" id="${this.id}-article-container">
                <article class="pc-article" id="pc-${heading1}">
                    <h2>${heading1}:</h2>
                </article>
                <article class="pc-article" id="pc-${heading2}">
                    <h2>${heading2}:</h2>
                </article>
                <article class="pc-article" id="pc-${heading3}">
                    <h2>${heading3}:</h2>
                </article>

                <article class="mobile-article" id="mobile-${heading1}">
                    <h2>${heading1}:</h2>
                </article>
                <article class="mobile-article" id="mobile-${heading2}">
                    <h2>${heading2}:</h2>
                </article>
                <article class="mobile-article" id="mobile-${heading3}">
                    <h2>${heading3}:</h2>
                </article>
            </div>
        </section>
        `.trim();
        return tempEl.firstChild;
    };
};


class ExperiencesSection extends Section {
    constructor(sectionNum, id, parentEl, name) {
        super(sectionNum, id, parentEl, name);
    };

    initSection() {
        this.element = this.createSection(this.id);
        this.renderToPage(this.element);
    };

    createSection() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${this.id}" class="section-display">
            <h1 class="pc-section-title">${this.name}:</h1>
            <div class="filter-container" id="${this.id}-filter-container"></div>
            <div class="tile-container" id="${this.id}-tile-container"></div>
        </section>
        `.trim();
        return tempEl.firstChild;
    };
};

class PortfolioSection extends Section {
    constructor(sectionNum, id, parentEl, name) {
        super(sectionNum, id, parentEl, name);
    };

    initSection() {
        this.element = this.createSection();
        this.renderToPage(this.element);
    };

    createSection() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${this.id}" class="section-display">
            <h1 class="pc-section-title">${this.name}:</h1>
            <div class="filter-container" id="${this.id}-filter-container"></div>
            <div class="tile-container" id="${this.id}-tile-container"></div>
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
