"use strict";

class Section {
    #sectionNum;
    #section;
    #id;
    #parentEl;

    constructor(sectionNum, id, parentEl) {
        this.#sectionNum = sectionNum;
        this.#id = id;
        this.#parentEl = parentEl;
        this.#section = '';
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
    get section() {
        return this.#section;
    };
    set section(value) {
        this.#section = value;
    };

    toggleActive() {
        this.section.classList.toggle('activated');
    };

    renderToPage() {
        this.parentEl.appendChild(this.section);
    };
};


class IntroductionSection extends Section {
    constructor(sectionNum, id, parentEl) {
        super(sectionNum, id, parentEl);
    };

    initSection() {
        this.section = this.createSection(this.id, 'Introduction', 'KeySkills');
        this.renderToPage(this.section);
    };

    createSection(id, heading1, heading2) {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
            <section id="${this.id}" class="activated">
                <h2>AboutMe:</h2>
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
    constructor(sectionNum, id, parentEl) {
        super(sectionNum, id, parentEl);
    };

    initSection() {
        this.section = this.createSection(this.id, 'education1', 'education2');
        this.renderToPage(this.section);
    };

    createSection(id, heading1, heading2) {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${id}" class="">
            <h2>Education:</h2>
            <div class="filter-container" id="${this.id}-filter-container"></div>
            <div class="article-container" id="${this.id}-article-container">
                <article class="full-column" id="${this.id}1">
                    <h2></h2>
                </article>
                <article class="full-column" id="${this.id}2">
                    <h2></h2>
                </article>
            </div>
         
        </section>
        `.trim();
        return tempEl.firstChild;
    };
};


class SkillsSection extends Section {
    constructor(sectionNum, id, parentEl) {
        super(sectionNum, id, parentEl);
    };

    initSection() {
        this.section = this.createSection(this.id, 'Languages', 'Technical', 'Soft');
        this.renderToPage(this.section);
    };

    createSection(id, heading1, heading2, heading3) {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${this.id}" class="">
            <h2>Skills:</h2>

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
    constructor(sectionNum, id, parentEl) {
        super(sectionNum, id, parentEl);
    };

    initSection() {
        this.section = this.createSection(this.id);
        this.renderToPage(this.section);
    };

    createSection() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${this.id}" class="">
            <h2>Experience:</h2>
            <div class="filter-container" id="${this.id}-filter-container"></div>
            <div class="tile-container" id="${this.id}-tile-container"></div>
        </section>
        `.trim();
        return tempEl.firstChild;
    };
};

class PortfolioSection extends Section {
    constructor(sectionNum, id, parentEl) {
        super(sectionNum, id, parentEl);
    };

    initSection() {
        this.section = this.createSection();
        this.renderToPage(this.section);
    };

    createSection() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <section id="${this.id}" class="">
            <h2>Portfolio:</h2>
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
