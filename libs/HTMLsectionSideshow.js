"use strict"

class HTMLsectionSlideshow {
    #elementWrapper;
    #elementNavbar
    #elementMainDiv
    #currentSectionIndex;
    #slideshowElements;

    constructor(wrapperElement) {
        this.#elementWrapper = wrapperElement;
        this.#elementNavbar = ''
        this.#elementMainDiv = ''
        this.#currentSectionIndex = 0;
        this.#slideshowElements = {}

        // Call the method to construct the navigation bar and the main body content
        this.constructNavBarElement();
        this.constructMainDivElement();

        // Initialize slideshow elements after constructing the elements
        this.initSlideshowElements();

        // Add event listeners and render to the page
        this.addEventListeners();
        this.renderToPage();
    };



    get elementWrapper() {
        return this.#elementWrapper;
    };
    get elementNavbar() {
        return this.#elementNavbar;
    };
    set elementNavbar(value) {
        this.#elementNavbar = value;
    };
    get elementMainDiv() {
        return this.#elementMainDiv;
    };
    set elementMainDiv(value) {
        this.#elementMainDiv = value;
    };
    get currentSectionIndex() {
        return this.#currentSectionIndex;
    };
    set currentSectionIndex(value) {
        this.#currentSectionIndex = value;
    };
    get slideshowElements() {
        return this.#slideshowElements;
    };
    get allNavs() {
        return this.slideshowElements.all.navs
    };
    get allSections() {
        return this.slideshowElements.all.sections
    };
    get leftArrow() {
        return this.slideshowElements.single.arrow.prev
    };
    get rightArrow() {
        return this.slideshowElements.single.arrow.next
    };
    get experienceTiles() {
        return this.slideshowElements.all.tiles.experience
    };
    get portfolioTiles() {
        return this.slideshowElements.all.tiles.portfolio
    };
    get experienceFilter() {
        return this.slideshowElements.single.filter.experience
    };
    get portfolioFilter() {
        return this.slideshowElements.single.filter.portfolio
    }

    initSlideshowElements() {
        this.#slideshowElements = {
            "all": {
                 "navs": this.elementNavbar.querySelectorAll('nav a')
                ,"sections": this.elementMainDiv.querySelectorAll('section')
                ,"arrows": this.elementMainDiv.querySelectorAll('button')
                ,"tiles": {
                     "experience": this.elementMainDiv.querySelector('#myExperiences .tile')
                    ,"portfolio": this.elementMainDiv.querySelector('#myPortfolio .tile')
                }
                ,"filters": this.elementMainDiv.querySelectorAll('menu')
            }
            ,"single": {
                 "navbar": this.elementNavbar.querySelector('nav')
                ,"nav": {
                    "introduction": this.elementNavbar.querySelectorAll('nav a')[0]
                    ,"educationSkills": this.elementNavbar.querySelectorAll('nav a')[1]
                    ,"experience": this.elementNavbar.querySelectorAll('nav a')[2]
                    ,"portfolio": this.elementNavbar.querySelectorAll('nav a')[3]
                }
                ,"section": {
                     "introduction": this.elementMainDiv.querySelector('#myIntroduction')
                    ,"educationSkills": this.elementMainDiv.querySelector('#myEducationsSkills')
                    ,"experience": this.elementMainDiv.querySelector('#myExperiences')
                    ,"portfolio": this.elementMainDiv.querySelector('#myPortfolio')
                }
                ,"arrow": {
                     "prev": this.elementMainDiv.querySelector('#section-prev')
                    ,"next": this.elementMainDiv.querySelector('#section-next')
                }
                ,"filter": {
                     "experience": this.elementMainDiv.querySelector('#myExperiences menu')
                    ,"portfolio": this.elementMainDiv.querySelector('#myPortfolio menu')
                }
            }
        }
    };

    constructNavBarElement() {
        this.elementNavbar = document.createElement('nav');
        this.elementNavbar.innerHTML = `
             <a href="#" data-index="0" class="active">Introduction</a>
             <a href="#" data-index="1" class="">Education and Skills</a>
             <a href="#" data-index="2" class="">Experience</a>
             <a href="#" data-index="3" class="">Portfolio</a>
         `;
    };

    constructMainDivElement() {
        this.elementMainDiv = document.createElement('main');
        this.elementMainDiv.innerHTML = `
            <section id="myIntroduction" class="active">
                <h2>myIntroduction:</h2>

                <!-- Left side article-->
                <article class="full-column" id="introduction">
                    <h2>Introduction</h2>
                    <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>
                </article>

                <!-- Right side article-->
                <article class="full-column" id="introduction2">
                    <h2>Introduction2</h2>
                    <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>
                </article>
            </section>
 

            <section id="myEducationsSkills" class="">
                <h2>myEducationsSkills:</h2>

                <!-- Left side article-->
                <article class="full-column" id="education">
                <h2>Education</h2>
                    <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>
                </article>

                <!-- Middle article-->
                <article class="full-column" id="hard-skills">
                    <h2>Hard Skills</h2>
                    <ul>
                        <li>Key Skills:
                            <ul>
                                <li>Database design and management</li>
                                <li>Transact-SQL Queries</li>
                                <li>Extremely high knowledge of Microsoft Excel</li>
                                <li>Process automation</li>
                                <li>Technical documentation and maintaining</li>
                                <li>User Interface design</li> 
                            </ul>
                        </li>
                        <br>
                        <li>Programming Languages:
                            <ul>
                                <li>React</li>
                                <li>Python</li>
                                <li>SQL</li>
                                <li>C#</li>
                                <li>Javascript</li>
                                <li>VBA</li>
                            </ul>
                        </li>
                        <br>
                        <li>Software and Tools:
                            <ul>
                                <li>Microsoft SQL Server Manager Studio 2019</li>
                                <li>Microsoft Excel</li>
                                <li>Microsoft Visual Studio 2019</li>
                                <li>Visual Studio Code</li>
                                <li>Atlassian JIRA</li>
                                <li>Atlassian Confluence</li>
                                <li>Citrix Desktops</li>
                                <li>Office365, Sharepoint, Teams</li>
                                <li>Github</li>
                                <li>Slack</li>
                                <li>React, NodeJs, HTML, CSS (Web Development)</li>
                                <li>Various cloud accounting softwares</li>
                            </ul>
                        </li>
                    </ul>
                </article>

                <!-- Right side article-->
                <article class="full-column" id="soft-skills">
                    <h2>Soft Skills</h2>
                    <ul>
                        <li>Software Support</li>
                        <li>Database Management</li>
                        <li>Collaboration and Teamwork</li>
                        <li>Documentation and Communication</li>
                        <li>Client Services</li>
                        <li>Focused Attention to Detail</li>
                        <li>Critical and Creative Thinking</li>
                        <li>Task and Deadline Management</li>
                        <li>Technical Tools</li>
                        <li>Workplace Adaptability</li>
                        <li>Continuous Learning and Growth</li>
                        <li>Task and Deadline Management</li>
                    </ul>
                </article>
            </section>
 
         <section id="myExperiences" class="">
             <h2>myExperiences:</h2>
             <menu class="filter" id="experience-filter">
                 <ul class="filter-options">
                     <li role="button" data-filter="tile" class="filterItem">All</li>
                     <li role="button" data-filter="Programming" class="filterItem">Programming</li>
                     <li role="button" data-filter="Accounting" class="filterItem">Accounting</li>
                     <li role="button" data-filter="CustomerService" class="filterItem">Customer Service</li>
                 </ul>
             </menu>
         </section>
 
        <section id="myPortfolio" class="">

            <h2>myPortfolio</h2>
            <menu class="filter" id="portfolio-filter">
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
         <button class="arrow" id="section-prev">❮</button>
         <button class="arrow" id="section-next">❯</button>
         `;
    };


    addEventListeners() {
        // Add event listeners for navigation links
        this.allNavs.forEach((nav, index) => {
            nav.addEventListener('click', () => {
                this.adjustDisplayedSection(index);
            });
        });

        // Add event listeners for arrow buttons
        this.leftArrow.addEventListener('click', () => {
            this.adjustDisplayedSection("-1");
        });

        this.rightArrow.addEventListener('click', () => {
            this.adjustDisplayedSection("+1");
        });

        // Add event listeners for experience tile filters
        this.experienceFilter.querySelectorAll('li').forEach((filter, index) => {
            filter.addEventListener('click', () => {
                this.filterTiles('myExperiences', filter.dataset.filter);
            });
        });

        // Add event listeners for portfolio tile filters
        this.portfolioFilter.querySelectorAll('li').forEach((filter, index) => {
            filter.addEventListener('click', () => {
                this.filterTiles('myPortfolio', filter.dataset.filter);
            });
        });
    };

    renderToPage() {
        // Append the created elements to the wrapper
        this.elementWrapper.appendChild(this.elementNavbar);
        this.elementWrapper.appendChild(this.elementMainDiv);
    };

    filterTiles(sectionId, filter) {
        // TODO: use the this.experienceTiles to make a filter
        const tiles = this.elementMainDiv.querySelectorAll(`#${sectionId} .tile`);
        tiles.forEach(tile => {
            let tags = Array.from(tile.classList)
            if (tags.includes(filter)) {
                tile.classList.add('active');
            } else {
                tile.classList.remove('active');
            }
        })
    };

    showSlide() {
        // Remove the active state of each resume section
        this.allSections.forEach(section => {
            section.classList.remove('active');
        });

        // Remove the active state of each navigation link
        this.allNavs.forEach(link => {
            link.classList.remove('active');
        });

        // Set the active class
        this.allSections[this.currentSectionIndex].classList.add('active');
        this.allNavs[this.currentSectionIndex].classList.add('active');
    };

    adjustDisplayedSection(action) {
        switch (action) {
            case '+1':
                // Loops back to index 0 if the forward arrow goes too far
                if (++this.currentSectionIndex > this.allSections.length - 1) {
                    this.currentSectionIndex = 0
                }
                this.showSlide();
                break;
            case '-1':
                // Loops back to the last index is the prev button goes too far
                if (--this.currentSectionIndex < 0) {
                    this.currentSectionIndex = this.allSections.length - 1
                }
                this.showSlide();
                break;
            default:
                // If this function by a navlink clicking and deciding the slide number
                this.currentSectionIndex = action
                this.showSlide();
                break;
        };
    };
};



export default HTMLsectionSlideshow;