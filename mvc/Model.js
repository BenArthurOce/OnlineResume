import FrontPageObject from "../objects/FrontPageObject.js";



class Model {
    constructor() {
        this.frontpage = null
        this.searchTimeout = null;
        this.data = {}
    };

    async init() {
        console.log("MODEL: init" + "\n" + "----------")
        this.frontpage = new FrontPageObject()

        await this.frontpage.init();
        clearTimeout(this.searchTimeout);


        this.data = {
              "count" :             5
            , "headings" :          ["Introduction", "Skills", "Education" , "Experience", "Portfolio"]
            , "palette"  :          await this.frontpage.getPalette()
            , "navigationBar" :     await this.frontpage.getNavigation()

            , "filterBars" :        {
                                        "introduction" :    this.frontpage.returnSingleFilterBar(0)
                                        ,"skills" :         this.frontpage.returnSingleFilterBar(1)
                                        ,"education" :      this.frontpage.returnSingleFilterBar(2)
                                        ,"experience" :     this.frontpage.returnSingleFilterBar(3)
                                        ,"portfolio" :      this.frontpage.returnSingleFilterBar(4)
                                    }

            , "sections" :          {
                                        "introduction" :    this.frontpage.returnSingleSection(0)
                                        ,"skills" :         this.frontpage.returnSingleSection(1)
                                        ,"education" :      this.frontpage.returnSingleSection(2)
                                        ,"experience" :     this.frontpage.returnSingleSection(3)
                                        ,"portfolio" :      this.frontpage.returnSingleSection(4)
                                    }

            , "sectionSubObjs" :    {
                                        "introduction" :    this.frontpage.returnSingleSection(0).subObjects
                                        ,"skills" :         this.frontpage.returnSingleSection(1).subObjects
                                        ,"education" :      this.frontpage.returnSingleSection(2).subObjects
                                        ,"experience" :     this.frontpage.returnSingleSection(3).subObjects
                                        ,"portfolio" :      this.frontpage.returnSingleSection(4).subObjects
                                    }   

            , "filterTags" :        {
                                         "introduction" :   this.frontpage.returnIntroductionTypes()
                                        ,"skills" :         this.frontpage.returnSkillsTypes()
                                        ,"education" :      this.frontpage.returnEducationTypes()
                                        ,"experience" :     this.frontpage.returnExperienceTypes()
                                        ,"portfolio" :      this.frontpage.returnPortfolioTypes()
                                    }

            , "overlays" :        {
                                         "introduction" :   null
                                        ,"skills" :         null
                                        ,"education" :      null
                                        ,"experience" :     this.frontpage.returnExperienceOverlays()
                                        ,"portfolio" :      this.frontpage.returnPortfolioOverlays()
                                    }
        };

        this.state = {
                 "index" :              0
                ,"palette" :            this.frontpage.getPalette()
                ,"colourStyle" :        null
                ,"navigationBar" :      this.frontpage.getNavigation()
                ,"heading" :            null
                ,"filterBar" :          null
                ,"filterButtons" :      null
                ,"section" :            null
                ,"subObjects" :         null
                ,"overlays" :           null
                ,"activeOverlay" :      null
                ,"filterTags" :         null

        };
    };

//****** Ensures the Active Overlay is Empty ******
    commandClearActiveOverlay() {
        this.state["activeOverlay"] = null
    }



    returnSingleNavLink(index) {
        return this.data["state"]["navigationBar"][index]
    };


//****** Testing Function - Force something to happen when loaded ******
    testFunction() {
        console.log("MODEL: testFunction")
        
        // const expSection = this.data["sections"]["experience"]
        // const testOverlay = this.data["overlays"]["experience"][0]
        // console.log(testOverlay)

        // testOverlay.isActive = true
        // this.state["activeOverlay"] = testOverlay

        // const index = 3
        this.changeIndex(3)


        // const tile = this.state["subObjects"][0]
        // console.log(tile)

        // console.log(this.state["overlays"])

        // this.state["activeOverlay"] = this.state["overlays"][0]

        // this.state["section"]           = this.data["sections"][key];
        // this.state["subObjects"]        = this.data["sectionSubObjs"][key];

        // this._commitIndex(this.state);
    }

    overlayStart(index) {
        console.log("MODEL: overlayStart")
        this.commandClearActiveOverlay()
        this.state["activeOverlay"] = this.state["overlays"][index]
        this._commitIndex(this.state);
    }


//****** Model Adjustments ******
    changeColour(colour) {
        console.log("MODEL: changeColour")
        this.commandClearActiveOverlay()

        this.state['palette'].updateIndex(colour)
        this._commitPaletteChange(this.state)
    };


    filterStateArticles(filterButton) {
        console.log("MODEL: filterStateArticles")
        this.commandClearActiveOverlay()

        // Remove the "activated" class from all the FilterButtons and Tile Objects
        this.state['filterBar'].buttons.map(button => button.toggleOff())
        this.state['subObjects'].map(button => button.toggleOff())

        // Obtain the index order of the FilterButton
        const index = filterButton.index

        // Using that Index number, toggle the matching FilterButton and Article object to be on
        this.state['filterBar'].buttons[index].isActive = true
        this.state['subObjects'][index].isActive = true

        this._commitSubObjectActive(this.state);
    };
    

    filterStateTiles(filterButton) {
        console.log("MODEL: filterStateTiles")
        this.commandClearActiveOverlay()

        // Remove the "activated" class from all the FilterButtons and Tile Objects
        this.state['filterBar'].buttons.map(button => button.toggleOff())
        this.state['subObjects'].map(button => button.toggleOff())

        // If FilterButton: "All" is picked, then reveal all tiles
        if (filterButton.title === "All") {
            this.state['subObjects'].map(button => button.toggleOn())

            this.state['filterBar'].buttons[0].toggleOn()
        }
        else {
            // If a Tile object has a tag that matches the "title" of the FilterButton, toggle that Tile on
            this.state['subObjects'].map(tile => tile.tags.includes(filterButton.title) ? tile.toggleOn() : tile.toggleOff())

            this.state['filterBar'].buttons.map(button => button.index === filterButton.index ? button.toggleOn() : button.toggleOff())
        }
        this._commitSubObjectActive(this.state);
    };


    // This function is called by the Controller() handler: handleChangeIndex
    // Controller: handleChangeIndex is called by the View: bindChangeIndex
    changeIndex(index) {
        console.log("MODEL: changeIndex")

        this.commandClearActiveOverlay()

        const key = this.data["headings"][index].toLowerCase();

        this.state["index"]             = index;
        this.state["palette"]           = this.data["palette"];
        this.state["colourStyle"]       = null;
        this.state["navigationBar"]     = this.data["navigationBar"];
        this.state["heading"]           = this.data["headings"][index];
        this.state["filterBar"]         = this.data["filterBars"][key];
        this.state["filterButtons"]     = this.data["filterTags"][key];

        this.state["filterTags"]        = this.data["filterTags"][key];

        // Specific to Navigation Bar
        this.state["navigationBar"].displayHeading = this.state["heading"] 
        this.state['navigationBar'].links.map(link => link.toggleOff())
        this.state['navigationBar'].links[index].toggleOn()

        // Specific to Subobjects and Overlays (if Applicable)
        this.state["section"]           = this.data["sections"][key];
        this.state["subObjects"]        = this.data["sectionSubObjs"][key];
        this.state["overlays"]          = this.data["overlays"][key];

        console.log(this.state["overlays"])

        // On an index change, the active overlay must be blank
        // this.state["activeOverlay"] = null

        this._commitIndex(this.state);
    };

//****** Model Binding ******
    bindOnLoaded(callback) {
        console.log("MODEL: bindOnLoaded")
        this.onLoaded = callback
    };

    bindPaletteChanged(callback) {
        console.log("MODEL: bindPaletteChanged")
        this.onPaletteChanged = callback
    };

    bindIndexChanged(callback) {
        console.log("MODEL: bindIndexChanged")
        this.onIndexChanged = callback;
    };

    bindArticleFiltered(callback) {
        console.log("MODEL: bindArticleFiltered")
        this.onActiveSubObjectChanged = callback
    };

    bindTileFiltered(callback) {
        console.log("MODEL: bindTileFiltered")
        this.onActiveSubObjectChanged = callback
    };

    bindOverlayStarted(callback) {
        console.log("MODEL: bindOverlayStarted")
        this.onOverlayStarted = callback
    };


//****** Model Commits ******
    _commitPaletteChange(data) {
        console.log("MODEL: _commitPaletteChange")
        this.onPaletteChanged(data);        
    };

    _commitSubObjectActive(data) {
        console.log("MODEL: _commitSubObjectActive")
        this.onActiveSubObjectChanged(data);        
    };

    _commitIndex(data) {
        console.log("MODEL: _commitIndex")
        this.onIndexChanged(data);
    };
};

export default Model;