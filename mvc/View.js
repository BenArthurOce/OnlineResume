import NavBarView from '../views/NavbarView.js'
import NavLinkView from '../views/NavlinkView.js';
import {IntroductionSectionView, EducationSectionView, SkillSectionView, ExperienceSectionView, PortfolioSectionView} from '../views/SectionView.js'


import {IntroductionFilterBarView, EducationFilterBarView, SkillsFilterBarView, ExperienceFilterBarView, PortfolioFilterBarView} from '../views/FilterBarView.js'
import FilterButtonView from '../views/FilterButtonView.js';

import ArticleView from '../views/ArticleView.js';
import {ExperienceTileView, PortfolioTileView} from '../views/TileView.js';


class View {
    constructor() {
        this.searchTimeout = null;
        this.init()
    };


    async init() {
        console.log("VIEW: init" + "\n" + "----------")

        this.app = this.getElement('#wrapper');


        // Prepare Navigation Bar
        this.navBar = new NavBarView();
        this.navBar.appendLink(new NavLinkView(0, "Introduction"))
        this.navBar.appendLink(new NavLinkView(1, "Skills"))
        this.navBar.appendLink(new NavLinkView(2, "Education"))
        this.navBar.appendLink(new NavLinkView(3, "Experience"))
        this.navBar.appendLink(new NavLinkView(4, "Portfolio"))


        this.sections = [
              new IntroductionSectionView(0)
            , new SkillSectionView(1)
            , new EducationSectionView(2)
            , new ExperienceSectionView(3)
            , new PortfolioSectionView(4)
        ]



        this.filterBars = [
              new IntroductionFilterBarView(0)
            , new EducationFilterBarView(1)
            , new SkillsFilterBarView(2)
            , new ExperienceFilterBarView(3)
            , new PortfolioFilterBarView(4)
        ]


        this.filterBars[0].appendButton(new FilterButtonView(1, "test0"))
        this.filterBars[0].appendButton(new FilterButtonView(1, "test0"))
        this.filterBars[1].appendButton(new FilterButtonView(1, "test1"))
        this.filterBars[1].appendButton(new FilterButtonView(1, "test1"))
        this.filterBars[2].appendButton(new FilterButtonView(1, "test2"))
        this.filterBars[2].appendButton(new FilterButtonView(1, "test2"))
        this.filterBars[3].appendButton(new FilterButtonView(1, "test3"))
        this.filterBars[3].appendButton(new FilterButtonView(1, "test3"))
        this.filterBars[4].appendButton(new FilterButtonView(1, "test4"))
        this.filterBars[4].appendButton(new FilterButtonView(1, "test4"))

        this.sectionsEL = this.sections.map(section => section.element)
        this.filterBarsEl = this.filterBars.map(filterBar => filterBar.element)



        //29/03/2024
        // Need two seperate classes for FilterButtonView
        ////////-----------------------------------------------------------------------


        // ArticleView
        this.sections[0].appendSubObject(new ArticleView(0, "Intro-0articleText", "Intro-0articleHeading"))
        this.sections[0].appendSubObject(new ArticleView(1, "Intro-1articleText", "Intro-1articleHeading"))


        this.sections[1].appendSubObject(new ArticleView(0, "Skills-0articleText", "Skills-0articleHeading"))
        this.sections[1].appendSubObject(new ArticleView(1, "Skills-1articleText", "Skills-1articleHeading"))

        this.sections[2].appendSubObject(new ArticleView(0, "Education-0articleText", "Education-0articleHeading"))
        this.sections[2].appendSubObject(new ArticleView(1, "Education-1articleText", "Education-1articleHeading"))


        this.sections[3].appendSubObject(new ExperienceTileView(0, "Exp-0articleText", "Exp-0articleHeading"))
        this.sections[3].appendSubObject(new ExperienceTileView(1, "Exp-1articleText", "Exp-1articleHeading"))

        this.sections[4].appendSubObject(new PortfolioTileView(0, "Port-0articleText", "Port-0articleHeading"))
        this.sections[4].appendSubObject(new PortfolioTileView(1, "Port-1articleText", "Port-1articleHeading"))




        this.app.append(this.navBar.element, ...this.filterBarsEl, ...this.sectionsEL);

        // this.app.append(this.title, this.navBar.element, ...this.filterBarsEl, ...this.sectionsEL);
        this.updateColorScheme("forest");
        this._initLocalListeners();

    };

    commenceRender(data) {
        console.log("VIEW: commenceRender")
        console.log(data)
    }


    bindIndexChange(handler) {
        console.log("VIEW: bindAddCard")
        this.handleIndexChange = handler;
    }


    _initLocalListeners() {
        console.log("VIEW: _initLocalListeners")
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.handleIndexChange(-1)
            } else if (event.key === 'ArrowRight') {
                this.handleIndexChange(1)
            }
        });
    }


    getElement(selector) {
        return document.querySelector(selector);
    };


    updateColorScheme(newColour) {
        const root = document.documentElement;
        root.setAttribute('data-style', newColour);
    };


    render(nextIndex) {
        console.log("VIEW: render")
        // console.log(nextIndex)



        // turn it all off
        this.navBar.links.map(link => link.toggleOff())

        this.navBar.links.forEach((link, i) => {
            // console.log("------")
            // console.log(nextIndex)
            // console.log(link.index)
            if (link.index === nextIndex) {
                link.toggleOn()
            }
        });

        const testNav = this.navBar.links.map(link => link.isActive)
        // console.log(testNav)



        // turn it all off
        this.sections.map(section => section.toggleOff())

        this.sections.forEach((section, i) => {
            // console.log("------")
            // console.log(nextIndex)
            // console.log(section.index)
            if (section.index === nextIndex) {
                section.toggleOn()
            }
        });

        const testSections = this.sections.map(section => section.isActive)
        // console.log(testSections)


        // turn it all off
        this.filterBars.map(filterBar => filterBar.toggleOff())

        this.filterBars.forEach((filterBar, i) => {
            // console.log("------")
            // console.log(nextIndex)
            // console.log(filterBar.index)
            if (filterBar.index === nextIndex) {
                filterBar.toggleOn()
            }
            // console.log(`element: ${element}  index: ${ i}`);
        });

        // this.filterBars.map(filterBar => )
        // this.filterBars.forEach(filterBar => {
        //     filterBar.isActive = filterBar.index === nextIndex;
        // });

        const test = this.filterBars.map(filterBar => filterBar.isActive)
        // console.log(test)

        const test2 = this.filterBars.map(filterBar => filterBar.index)
        // console.log(test2)

        const test3 = this.filterBars.map(filterBar => filterBar.id)
        // console.log(test3)


    };

};

export default View;