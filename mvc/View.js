import NavBarView from '../views/NavbarView.js'
import NavLinkView from '../views/NavlinkView.js';
import {IntroductionSectionView, EducationSectionView, SkillSectionView, ExperienceSectionView, PortfolioSectionView} from '../views/SectionView.js'


import {IntroductionFilterBarView, EducationFilterBarView, SkillsFilterBarView, ExperienceFilterBarView, PortfolioFilterBarView} from '../views/FilterBarView.js'
import FilterButtonView from '../views/FilterButtonView.js';

import {IntroductionArticleView, SkillArticleView, EducationArticleView} from '../views/ArticleView.js';
import {ExperienceTileView, PortfolioTileView} from '../views/TileView.js';


class View {
    constructor() {
        this.searchTimeout = null;
        this.init()
    };


    async init() {
        console.log("VIEW: init" + "\n" + "----------")

        this.app = this.getElement('#wrapper');

        // this.main = {
        //      pallete: null
        //     ,navbar: [

        //     ]
        //     ,sections: [
        //           new IntroductionSectionView(0)
        //         , new SkillSectionView(1)
        //         , new EducationSectionView(2)
        //         , new ExperienceSectionView(3)
        //         , new PortfolioSectionView(4)                
        //     ]
        // }



        // // root
        // // pallette
        // // navbar
        // // sections


        // // Prepare Navigation Bar
        // this.navBar = new NavBarView();
        // this.navBar.appendLink(new NavLinkView(0, "Introduction"))
        // this.navBar.appendLink(new NavLinkView(1, "Skills"))
        // this.navBar.appendLink(new NavLinkView(2, "Education"))
        // this.navBar.appendLink(new NavLinkView(3, "Experience"))
        // this.navBar.appendLink(new NavLinkView(4, "Portfolio"))


        // this.sections = [
        //       new IntroductionSectionView(0)
        //     , new SkillSectionView(1)
        //     , new EducationSectionView(2)
        //     , new ExperienceSectionView(3)
        //     , new PortfolioSectionView(4)
        // ]



        // this.filterBars = [
        //       new IntroductionFilterBarView(0)
        //     , new EducationFilterBarView(1)
        //     , new SkillsFilterBarView(2)
        //     , new ExperienceFilterBarView(3)
        //     , new PortfolioFilterBarView(4)
        // ]


        // this.filterBars[0].appendButton(new FilterButtonView(1, "test0"))
        // this.filterBars[0].appendButton(new FilterButtonView(1, "test0"))
        // this.filterBars[1].appendButton(new FilterButtonView(1, "test1"))
        // this.filterBars[1].appendButton(new FilterButtonView(1, "test1"))
        // this.filterBars[2].appendButton(new FilterButtonView(1, "test2"))
        // this.filterBars[2].appendButton(new FilterButtonView(1, "test2"))
        // this.filterBars[3].appendButton(new FilterButtonView(1, "test3"))
        // this.filterBars[3].appendButton(new FilterButtonView(1, "test3"))
        // this.filterBars[4].appendButton(new FilterButtonView(1, "test4"))
        // this.filterBars[4].appendButton(new FilterButtonView(1, "test4"))

        // this.sectionsEL = this.sections.map(section => section.element)
        // this.filterBarsEl = this.filterBars.map(filterBar => filterBar.element)



        // //29/03/2024
        // // Need two seperate classes for FilterButtonView
        // ////////-----------------------------------------------------------------------


        // // ArticleView
        // this.sections[0].appendSubObject(new ArticleView(0, "Intro-0articleText", "Intro-0articleHeading"))
        // this.sections[0].appendSubObject(new ArticleView(1, "Intro-1articleText", "Intro-1articleHeading"))


        // this.sections[1].appendSubObject(new ArticleView(0, "Skills-0articleText", "Skills-0articleHeading"))
        // this.sections[1].appendSubObject(new ArticleView(1, "Skills-1articleText", "Skills-1articleHeading"))

        // this.sections[2].appendSubObject(new ArticleView(0, "Education-0articleText", "Education-0articleHeading"))
        // this.sections[2].appendSubObject(new ArticleView(1, "Education-1articleText", "Education-1articleHeading"))


        // this.sections[3].appendSubObject(new ExperienceTileView(0, "Exp-0articleText", "Exp-0articleHeading"))
        // this.sections[3].appendSubObject(new ExperienceTileView(1, "Exp-1articleText", "Exp-1articleHeading"))

        // this.sections[4].appendSubObject(new PortfolioTileView(0, "Port-0articleText", "Port-0articleHeading"))
        // this.sections[4].appendSubObject(new PortfolioTileView(1, "Port-1articleText", "Port-1articleHeading"))




        // this.app.append(this.navBar.element, ...this.filterBarsEl, ...this.sectionsEL);

        // this.app.append(this.title, this.navBar.element, ...this.filterBarsEl, ...this.sectionsEL);
        this.updateColorScheme("forest");
        this._initLocalListeners();

    };

    commenceRender(data) {
        console.log("VIEW: commenceRender")
        console.log(data)

        this.app.innerHTML = null

        // Palette
        const paletteElement = this.createPaletteElement()

        // Navigation Bar
        let NavigationBarElement = this.renderNavigationBar(data)






        const index = data[`index`];
        let element = null;

        // Retrieve the section data based on the index
        const section = data.sections[index];





        const sectionData = data.sections[index].data;
        console.log(sectionData)

        // Check the classType of the section data to determine which section to render
        switch (section.classType) {
            case "Introduction":
                element = this.renderIntroductionSection(sectionData);
                break;
            case "Skills":
                element = this.renderSkillsSection(sectionData);
                break;
            case "Education":
                element = this.renderEducationSection(sectionData);
                break;
            case "Experience":
                element = this.renderExperienceSection(sectionData);
                break;
            case "Portfolio":
                element = this.renderPortfolioSection(sectionData);
                break;
            default:
                // console.error("Unknown section type: " + sectionData.#classType);
        }

        // this.app.append(this.title, this.navBar.element, ...this.filterBarsEl, ...this.sectionsEL);
        console.log(element)
        // element.toggleOn();
        element.classList.add("activated")
        this.app.append(paletteElement, NavigationBarElement, element);

    };


    bindIndexChange(handler) {
        console.log("VIEW: bindAddCard")
        this.handleIndexChange = handler;
    };


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



    renderNavigationBar(data) {
        const index = data.index;
        const navbar = new NavBarView();

        navbar.appendLink(new NavLinkView(0, "Introduction"));
        navbar.appendLink(new NavLinkView(1, "Skills"));
        navbar.appendLink(new NavLinkView(2, "Education"));
        navbar.appendLink(new NavLinkView(3, "Experience"));
        navbar.appendLink(new NavLinkView(4, "Portfolio"));
        navbar.links[index].toggleOn()

        return navbar.element;
    };

    renderIntroductionSection(data) {
        const view = new IntroductionSectionView(data);
        view.appendSubObject(new IntroductionArticleView(0, "Introduction", data.introduction));
        view.appendSubObject(new IntroductionArticleView(1, "Key Skills", data.skillsKey));
        return view.element;
    };

    renderSkillsSection(data) {
        const view = new SkillSectionView(data);
        view.appendSubObject(new SkillArticleView(0, "Technical", data.skillsLangages));
        view.appendSubObject(new SkillArticleView(1, "Soft", data.skillsTechincal));
        view.appendSubObject(new SkillArticleView(2, "Languages", data.skillsSoft));
        return view.element;
    };

    renderEducationSection(data) {
        const view = new EducationSectionView(data);
        view.appendSubObject(new EducationArticleView(0, "IT", "Education-0articleHeading"))
        view.appendSubObject(new EducationArticleView(1, "Accounting", "Education-1articleHeading"))
        return view.element;
    };

    renderExperienceSection(data) {
        const view = new ExperienceSectionView(data);
        view.appendSubObject(new ExperienceTileView(0, "Exp-0articleText", "Exp-0articleHeading"))
        view.appendSubObject(new ExperienceTileView(1, "Exp-1articleText", "Exp-1articleHeading"))
        return view.element;
    };

    renderPortfolioSection(data) {
        const view = new PortfolioSectionView(data);
        view.appendSubObject(new PortfolioTileView(0, "Port-0articleText", "Port-0articleHeading"))
        view.appendSubObject(new PortfolioTileView(1, "Port-1articleText", "Port-1articleHeading"))
        return view.element;
    };

    createPaletteElement() {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = `
        <div>
            <label for="paletteSelector">Select Color Palette:</label>
            <select id="paletteSelector">
                    <option value="forest">Forest Style</option>

                    <option value="blue-refreshing">Blue Refreshing</option>
                    <option value="modernity-bloom">Modernity Bloom</option>
                    <option value="pink-pastels">Pink Pastels</option>
                    <option value="pink-unique">Pink Unique</option>
                    <option value="eclectic-peaceful">Eclectic Peaceful</option>


                    <option value="neutrals">Modern Neutrals</option>
                    <option value="light">Light Tones</option>
                    <option value="ocean">Ocean Blues</option>
                    <option value="pastel">Pastel Delight</option>
                    <option value="earthy-warm">Earthy Warmth</option>
                    <option value="neutral-gray">Neutral Grays</option>
                    <option value="cool-blue">Cool Blues</option>
                    <option value="sunset-glow">Sunset Glow</option>
                    <option value="royal-elegance">Royal Elegance</option>
                    <option value="vintage-charm">Vintage Charm</option>
                    <option value="deep-ocean">Deep Ocean</option>
                    <option value="romantic-reds">Romantic Reds</option>
                    <option value="mystic-mauves">Mystic Mauves</option>
                    <option value="coastal-breeze">Coastal Breeze</option>
                    <option value="elegant-plum">Elegant Plum</option>
                    <option value="citrus-splash">Citrus Splash</option>
                    <option value="dark-mystery">Dark Mystery</option>
                    <option value="striking-citrus">Striking Citrus</option>
            </select>
        </div>
        `.trim();
        return tempEl.firstChild;
    };
};

export default View;