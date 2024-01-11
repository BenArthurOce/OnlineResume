"use strict"



class HTMLsectionSlideshow {
    #elementWrapper;
    #elementMainDiv
    #currentSectionIndex;
    #slideshowElements;
    #elementSlideshow;

    constructor() {
        this.#elementWrapper = document.querySelector("#wrapper");
        this.#elementSlideshow = ''
        this.#elementMainDiv = ''
        this.#currentSectionIndex = 0;
        this.#slideshowElements = {}

        // Call the method to construct the main body content
        this.constructMainDivElement();

        // Initialize slideshow elements after constructing the elements
        // this.initSlideshowElements();

        // Add event listeners and render to the page
        // this.addEventListeners();
        this.renderToPage();
    };
    // elementSlideshow
    get elementSlideshow() {
        return this.#elementSlideshow;
    };
    set elementSlideshow(value) {
        this.#elementSlideshow = value;
    };

    get allSections() {
        return this.elementSlideshow.querySelectorAll(`section`)
    }
    get prevArrow() {
        return this.elementSlideshow.querySelector(`#section-prev`)
    }
    get nextArrow() {
        return this.elementSlideshow.querySelector(`#section-next`)
    }
    get allFilters() {
        return this.elementSlideshow.querySelectorAll('menu')
    }
    get experienceTiles() {
        return this.elementSlideshow.querySelectorAll('#myExperiences .tile')
    }
    get portfolioTiles() {
        return this.elementSlideshow.querySelectorAll('#myPortfolio .tile')
    }
    get experienceFilter() {
        return this.elementSlideshow.querySelector(`#myExperiences menu`)
    }
    get portfolioFilter() {
        return this.elementSlideshow.querySelector(`#myPortfolio menu`)
    }
    get allButtons() {
        return this.elementSlideshow.querySelectorAll('button')
    }


    constructMainDivElement() {
        const newElement = document.createElement('main');
        newElement.innerHTML = `
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
                <menu class="filter" id="educationSkills-filter">
                    <ul class="filter-options">
                        <li role="button" data-filter="Education" class="filterItem">Education</li>
                        <li role="button" data-filter="Hard Skills" class="filterItem">HardSkills</li>
                        <li role="button" data-filter="Soft Skills" class="filterItem">SoftSkills</li>
                    </ul>
                </menu>

                <div id="section-wrapper">
                </div>

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
         this.elementSlideshow = newElement.cloneNode(true);
    };

    renderToPage() {
        // Append the created elements to the wrapper
        this.#elementWrapper.appendChild(this.elementSlideshow);
    };
};



export default HTMLsectionSlideshow;