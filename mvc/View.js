import NavBarView from '../views/NavbarView.js'
import NavLinkView from '../views/NavlinkView.js';
import {IntroductionSectionView, EducationSectionView, SkillSectionView, ExperienceSectionView, PortfolioSectionView} from '../views/SectionView.js'


import {IntroductionFilterBarView, EducationFilterBarView, SkillsFilterBarView, ExperienceFilterBarView, PortfolioFilterBarView} from '../views/FilterBarView.js'
import {ArticleFilterButtonView, TileFilterButtonView} from '../views/FilterButtonView.js';

import {IntroductionArticleView, SkillArticleView, EducationArticleView} from '../views/ArticleView.js';
import {ExperienceTileView, PortfolioTileView} from '../views/TileView.js';

import PaletteView from '../views/PaletteView.js';
import HeadingView from '../views/HeadingView.js';


class View {
    constructor() {
        this.searchTimeout = null;
        this.init()
    };


    async init() {
        //console.log("VIEW: init" + "\n" + "----------")
        this.app = document.querySelector('#wrapper');
        this.updateColorScheme("forest");
        this._initLocalListeners();
    };


    //******
    //****** Function that is called to start Rendering the View ******
    //******
    commenceRender(data) {
        //console.log("VIEW: commenceRender")
        //console.log("---------\n------------")


        //
        //  Function to set string to Proper Case
        //
        function toProperCase(str) {
            return str.toLowerCase().replace(/\b\w/g, function(char) {
                return char.toUpperCase();
            });
        };

        this.app.innerHTML = null;
        const index = data[`index`];
        const keys = Object.keys(data.filterBars);
        const keysUp = keys.map(key => toProperCase(key))
        const key = keys[data.index]


        //  (1 of 5)
        //  Palette
        //
        const palette = this.createPalette();
        this.attachPaletteChangeEvent()

        //  (2 of 5)
        //  Navigation
        //
        const navigationBar = this.createNavigation(keysUp)
        navigationBar.links[index].toggleOn()

        //  (3 of 5)
        //  Title
        //
        const heading = this.createHeading(toProperCase(key));

        //  (4 of 5)
        //  Filter
        //
        this.filter = this.createFilter(toProperCase(key), data);

        //  (5 of 5)
        //  Sections
        //
        this.section = this.createSection(toProperCase(key), data);

        //
        //  Render
        //
        this.app.append(palette.element, navigationBar.element, heading.element, this.filter.element, this.section.element);

    };


    createHeading(heading) {
        return new HeadingView(heading)
    };


    createPalette() {
        return new PaletteView()
    };


    attachPaletteChangeEvent() {
    };


    createNavigation(keys) {
        const navbar = new NavBarView();
        keys.forEach((key, i) => {
            navbar.appendLink(new NavLinkView(i, key));
        });
        return navbar;
    };


    createFilter(key, data) {
        let filter = null; // Set the element to null for the switch function

        switch (key) {
            case "Introduction":
                filter = new IntroductionFilterBarView(data.filterTags['introduction']);
                Array.from(data.filterTags['introduction']).forEach((element, i) => {
                    filter.appendSubObject(new ArticleFilterButtonView(i, element))
                });
                break;
            case "Skills":
                filter = new SkillsFilterBarView(data.filterTags['skills']);
                Array.from(data.filterTags['skills']).forEach((element, i) => {
                    filter.appendSubObject(new ArticleFilterButtonView(i, element))
                });
                break;
            case "Education":
                filter = new EducationFilterBarView(data.filterTags['education']);
                Array.from(data.filterTags['education']).forEach((element, i) => {
                    filter.appendSubObject(new ArticleFilterButtonView(i, element))
                });
                break;
            case "Experience":
                filter = new ExperienceFilterBarView(data.filterTags['experience']);
                Array.from(data.filterTags['experience']).forEach((element, i) => {
                    filter.appendSubObject(new TileFilterButtonView(i, element))
                });
                break;
            case "Portfolio":
                filter = new PortfolioFilterBarView(data.filterTags['portfolio']);
                Array.from(data.filterTags['portfolio']).forEach((element, i) => {
                    filter.appendSubObject(new TileFilterButtonView(i, element))
                });
                break;
            default:
                console.error("Unknown filter key: " + key);
        };

        filter.toggleOn()
        return filter
    };


    createSection(key, data) {
        const keyyy = key.toLowerCase()
        let section = null; // Set the element to null for the switch function


        let headings = data.filterBars[keyyy].headings
        let info = data.sections[keyyy]

        switch (key) {
            case "Introduction":
                section = new IntroductionSectionView(data);
                Array.from(headings).forEach((heading, i) => {
                    section.appendSubObject(new IntroductionArticleView(i, heading, data))
                });
                break;
            case "Skills":
                section = new SkillSectionView(data);
                Array.from(headings).forEach((heading, i) => {
                    section.appendSubObject(new SkillArticleView(i, heading, data))
                });
                break;
            case "Education":
                section = new EducationSectionView(data);
                Array.from(headings).forEach((heading, i) => {
                    section.appendSubObject(new EducationArticleView(i, heading, data))
                });
                break;
            case "Experience":
                section = new ExperienceSectionView(data);
                info.forEach((experience, i) => {
                    section.appendSubObject(new ExperienceTileView(i, experience))
                });
                break;
            case "Portfolio":
                section = new PortfolioSectionView(data);
                info.forEach((portfolio, i) => {
                    section.appendSubObject(new PortfolioTileView(i, portfolio))
                });
                break;
            default:
                console.error("Unknown section key: " + key);
        };
        section.toggleOn()
        return section
    };


    bindIndexChange(handler) {
        //console.log("VIEW: bindIndexChange")
        this.handleIndexChange = handler;
    };


    _initLocalListeners() {
        //console.log("VIEW: _initLocalListeners")
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.handleIndexChange(-1)
            } else if (event.key === 'ArrowRight') {
                this.handleIndexChange(1)
            }
        });

        // const navigationBar = this.TESTgetNavigationBar(keysUpper)
        // navigationBar.links.forEach((link, i) => {
        //     //console.log(link)
        //     // console.log(i)
        //     // //console.log(`element: ${element}  index: ${ i}`);

        //     const element = link.element
        //     console.log(element)

        //     // addEventListener("click", (event) => {
        //     //     // this.handleIndexChange(1)
        //     //     console.log(event.target)
        //     // });

        //     // //console.log(link.element)
        // });

    };


    updateColorScheme(newColour) {
        const root = document.documentElement;
        root.setAttribute('data-style', newColour);
    };

};

export default View;