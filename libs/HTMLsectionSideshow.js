class HTMLSectionSlideshow {
    #parentElement;
    #currentImageIndex;
    #container;
    #pageElements;

    constructor(idName) {
        this.#currentImageIndex = 0;
        console.log("HTMLSectionSlideshow");

        // Create a new container element
        this.#container = document.createElement('div');

        // Set the container as the #parentElement
        this.#parentElement = this.#container;

        // Append the slideshow content to the container
        this.#container.innerHTML = `
        <nav>
            <a href="#" data-index="0">Introduction</a>
            <a href="#" data-index="1">Education and Skills</a>
            <a href="#" data-index="2">Experience</a>
            <a href="#" data-index="3">Portfolio</a>
        </nav>

        <main>

            <section id="myIntroduction" class="">
                <h2>myIntroduction:</h2>
            </section>

            <section id="myEducationSkills" class="active">
                <h2>myEducationSkills:</h2>
            </section>

            <section id="myExperience" class="">
                <h2>myExperience:</h2>
                <div class="filter">
                    <ul class="filter-options">
                        <li data-filter="*" class="filterItem">All</li>
                        <li data-filter="Programming" class="filterItem">Programming Tech</li>
                        <li data-filter="Accounting" class="filterItem">Accounting</li>
                        <li data-filter="CustomerService" class="filterItem">Customer Service</li>
                    </ul>
                </div>
            </section>
        

            <section id="myPortfolio" class="">
                <h2>myPortfolio:</h2>

                <div class="filter">
                    <ul class="filter-options">
                        <li data-filter="*" class="filterItem active">All</li>
                        <li data-filter=".web-desd" class="filterItem">Design</li>
                        <li data-filter=".web-devd" class="filterItem">Development</li>
                        <li data-filter=".dig-mard" class="filterItem">Marketing</li>
                    </ul>
                </div>
            </section>
            <button id="prev" class="arrow">❮</button>
            <button id="next" class="arrow">❯</button>
        </main>
        `;
        this.#currentImageIndex = 0;
        this.addStyles();
        this.addEventListeners();


        this.#pageElements = {
            sections: {
                'myIntroduction':       document.querySelector('#myIntroduction')
                ,'myEducationSkills':   document.querySelector('#myEducationSkills')
                ,'myExperience':        document.querySelector('#myExperience')
                ,'myPortfolio':         document.querySelector('#myPortfolio')
            }
        };
    };

    get parentElement() {
        return this.#parentElement;
    };
    set parentElement(value) {
        this.#parentElement = value;
    };
    get currentImageIndex() {
        return this.#currentImageIndex;
    };
    set currentImageIndex(value) {
        this.#currentImageIndex = value;
    };
    get container() {
        return this.#container;
    };
    set container(value) {
        this.#container = value;
    };
    get pageElements() {
        return this.#pageElements;
    };
    set pageElements(value) {
        this.#pageElements = value;
    }
    get listofNavs() {
        return this.container.querySelectorAll('nav a');
    };
    get listofSections() {
        return this.container.querySelectorAll('section');
    };
    get leftArrow() {
        return this.container.querySelector('#prev');
    };
    get rightArrow() {
        return this.container.querySelector('#next');
    };

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            nav {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #ffffff; /* Background color for the navigation bar */
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow for depth */
                height: 60px;
                width: 100%;
                position: sticky;
                top: 0;
                z-index: 1000; /* Ensure the navigation bar appears above other elements */
            }
            
            nav a {
                text-decoration: none;
                color: #333333; /* Adjusted text color for better readability */
                padding: 15px 20px; /* Added padding for better spacing */
                font-weight: bold; /* Make the text bold for emphasis */
                transition: color 0.3s ease-in-out; /* Smooth transition for color change */
            }
            
            nav a:hover {
                color: #ff5733; /* Change text color on hover */
            }
            
            nav a.active {
                color: #ff5733; /* Adjusted color for the active link */
            }
            
            section {
                display: none;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 20px;
                height: 100vh;
            }

            section h2 {
                flex-basis: 100%;
            }
            
            section.active {
                display: flex;
            }
            
            /* Add styles for your specific sections (e.g., #mySkills, #myCompetencies, etc.) */
            #mySkills { background-color: #008080; }
            #myCompetencies { background-color: #ff5733; }
            #myEducation { background-color: #0000ff; }
            #myExperience { background-color: #008000; }
            #myPortfolio { background-color: #ffff00; }
            
            /* Add more styles based on your specific needs */
            
            /* Optional: Styles for navigation arrows */
            .arrow {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                font-size: 24px;
                cursor: pointer;
                color: #ffffff;
                background-color: rgba(0, 0, 0, 0.5);
                padding: 10px;
                border: none;
                outline: none;
            }
            
            #prev { left: 0; }
            #next { right: 0; }


            .filter {
                list-style: none;                   /* Prevents the list from displaying as a dot point list. */
                font-size: 0;                       /* Removes extra spacing between inline-block elements. */
                flex-basis: 100%;                   /* Keeps the width at 100% so it isnt lined up with other flex items */
            }
            
            .filter li {
                cursor: pointer;                    /* Mouse pointer turns into a pointer when hovering over li*/
                display: inline-block;              /* Keeps the list items next to each other in a horizontal way*/
                height: 35px;                       /* Increased Size to give button feel */
                padding: 10px;                      /* Increased Size to give button feel */
                color: #666666;                     /* Grey text */
                font-size: 13px;                    /* If omitted, no text displays*/
                text-transform: uppercase;          /* Sets all text in element to be uppercase*/
                border: 1px solid #FF6F61;          /* Button Boarder*/
                background: #ffffff;                /* White background */
                transition: all 0.3s ease-in-out;   /* Applies a smooth transition effect to all style changes */
            }
            
            .filter li:hover,
            .filter li.filter-active {
                background: #FF6F61;    /* Style change for when filter button is either clicked or moused over */
                color: #222222;
            }
        
        `;
        document.head.appendChild(style);
    }
    

    //TODO:
    // Need a full adjustment of code. Whenever an arrow or a nav link is clicked, we should be very quickly be able to get the index number of the section
    // Then display content based on that section

    addEventListeners() {  
        this.leftArrow.addEventListener('click', this.prevSlide.bind(this, this.listofSections));
        this.rightArrow.addEventListener('click', this.nextSlide.bind(this, this.listofSections));
    
        this.listofNavs.forEach(link => {
            link.addEventListener('click', this.navigateToSlide.bind(this, this.listofSections, this.listofNavs));
        });
    
        this.showSlide(this.currentImageIndex, this.listofSections);
    };
    
    showSlide(index, listOfSections) {
        // Remove the active state of each resume section
        listOfSections.forEach(section => {
            section.classList.remove('active');
        });

        // Remove the active state of each navigation link
        const navbarLinks = this.container.querySelectorAll('nav a');
        navbarLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Set the active class
        listOfSections[index].classList.add('active');
        navbarLinks[index].classList.add('active');
    };

    nextSlide(listofSections) {
        this.currentImageIndex++
        if (this.currentImageIndex > listofSections.length - 1 ) {this.currentImageIndex = 0}
        this.showSlide(this.currentImageIndex, listofSections);
    };

    prevSlide(listOfSections) {
        this.currentImageIndex--
        if (this.currentImageIndex < 0) {this.currentImageIndex = listOfSections.length - 1}
        this.showSlide(this.currentImageIndex, listOfSections);
    };

    navigateToSlide(listOfSections, navbarLinks, event) {
        const index = event.target.dataset.index;
        if (index !== undefined) {
            this.#currentImageIndex = parseInt(index);
            this.showSlide(this.#currentImageIndex, listOfSections);
        }
    }
    
}

export default HTMLSectionSlideshow;
