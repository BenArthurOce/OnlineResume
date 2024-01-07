
class HTMLsectionSlideshow {
    #elementWrapper;
    #elementNavbar
    #elementMainDiv
    #currentSectionIndex;

    constructor(wrapperElement) {
         this.#elementWrapper = wrapperElement;
         this.#elementNavbar = ''
         this.#elementMainDiv = ''
         this.#currentSectionIndex = 0;
 
         // Call the method to construct the navigation bar and the main body content
         this.constructNavBarElement();
         this.constructMainDivElement();
 
         // Append the created elements to the wrapper
         this.elementWrapper.appendChild(this.elementNavbar); 
         this.elementWrapper.appendChild(this.elementMainDiv); 
 
         this.addEventListeners()
     };
 
     get elementWrapper() {
         return this.#elementWrapper;
     };
     set elementWrapper(value) {
         this.#elementWrapper = value;
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
     get listofNavs() {
         return this.elementNavbar.querySelectorAll('nav a');
     };
     get listofSections() {
         return this.elementMainDiv.querySelectorAll('section');
     };
     get leftArrow() {
         return this.elementMainDiv.querySelector('#prev');
     };
     get rightArrow() {
         return this.elementMainDiv.querySelector('#next');
     };
 
     constructNavBarElement() {
         this.elementNavbar = document.createElement('nav');
         this.elementNavbar.innerHTML = `
             <a href="#" data-index="0">Introduction</a>
             <a href="#" data-index="1">Education and Skills</a>
             <a href="#" data-index="2">Experience</a>
             <a href="#" data-index="3">Portfolio</a>
         `;
     };
 
     constructMainDivElement() {
         this.elementMainDiv = document.createElement('main');
         this.elementMainDiv.innerHTML = `
            <section id="myIntroduction" class="active">
                <h2>myIntroduction:</h2>

                <!-- Left side article-->
                <article>
                    <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>
                </article>

                <!-- Right side article-->
                <article>
                    <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>
                </article>
            </section>
 

            <section id="myEducationsSkills" class="">
                <h2>myEducationsSkills:</h2>

                <!-- Left side article-->
                <article>
                <h3>Education</h3>
                    <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>
                </article>

                <!-- Middle article-->
                <article>
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
                <article>
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
             <menu class="filter">
                 <ul class="filter-options">
                     <li data-filter="tile" class="filterItem">All</li>
                     <li data-filter="Programming" class="filterItem">Programming</li>
                     <li data-filter="Accounting" class="filterItem">Accounting</li>
                     <li data-filter="CustomerService" class="filterItem">Customer Service</li>
                 </ul>
             </menu>
         </section>
 
         <section id="myPortfolio" class="">

        <h2>myPortfolio</h2>
             <menu class="filter">
                 <ul class="filter-options">
                     <li data-filter="tile" class="filterItem">All</li>
                     <li data-filter="UserInterface" class="filterItem">User Interfaces</li>
                     <li data-filter="Web" class="filterItem">Web</li>
                     <li data-filter="Database" class="filterItem">Databases</li>
                     <li data-filter="Logic" class="filterItem">Logic</li>
                     <li data-filter="Games" class="filterItem">Games</li>
                     <li data-filter="Efficiency" class="filterItem">Efficiency</li>
                     <li data-filter="DataSets" class="filterItem">DataSets</li>
                     <li data-filter="Finance" class="filterItem">Finance</li>
                 </ul>
             </menu>
         </section>
         <button id="prev" class="arrow">❮</button>
         <button id="next" class="arrow">❯</button>
         `;
     };
 

     applyInfoToElement() {}


     addEventListeners() {
        // Add event listeners for navigation links
        this.listofNavs.forEach((nav, index) => {
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
        document.body.querySelectorAll('#myExperiences .filter li').forEach((filter, index) => {
            filter.addEventListener('click', () => {
                this.filterTiles('myExperiences', filter.dataset.filter);
            });
        });

        // Add event listeners for portfolio tile filters
        document.body.querySelectorAll('#myPortfolio .filter li').forEach((filter, index) => {
            filter.addEventListener('click', () => {
                this.filterTiles('myPortfolio', filter.dataset.filter);
            });
        });
    };

    filterTiles(sectionId, filter) {
        console.log(sectionId);
        console.log(filter);
    
        const tiles = document.body.querySelectorAll(`#${sectionId} .tile`);
        
        tiles.forEach(tile => {
            let tags2 = Array.from(tile.classList)
            const tags = tile.dataset.tags ? tile.dataset.tags.split(' ') : [];
            if (tags2.includes(filter)) {
                console.log(tags2)
                tile.classList.add('active');
            } else {
                tile.classList.remove('active');
            }
        })
    }

 
     showSlide() {
 
        const index = this.currentSectionIndex;
        const listOfSections = this.elementMainDiv.querySelectorAll('section');
        
        // Hide all sections
        listOfSections.forEach(section => section.classList.remove('active'));
        
        // Show the active section
        listOfSections[index].classList.add('active');
     };
 
 
     adjustDisplayedSection(action) {
         switch (action) {
             case '+1':
                 // Loops back to index 0 if the forward arrow goes too far
                 if (++this.currentSectionIndex > this.listofSections.length - 1 ) {this.currentSectionIndex = 0}
                 this.showSlide();
                 break;
             case '-1':
                 // Loops back to the last index is the prev button goes too far
                 if (--this.currentSectionIndex < 0) {this.currentSectionIndex = this.listofSections.length - 1}
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
 
 
 