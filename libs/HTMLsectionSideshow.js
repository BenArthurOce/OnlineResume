
class HTMLsectionSlideshow {
    #elementWrapper;
    #elementNavbar
    #elementMainDiv
    #currentSectionIndex;
    #pageElements;
    constructor(wrapperElement) {
         this.#elementWrapper = wrapperElement;
         this.#elementNavbar = ''
         this.#elementMainDiv = ''
         this.#currentSectionIndex = 0;
 
         this.pageElements = {
             navBar: {
                  navIntroduction: document.querySelectorAll('nav')[0]
                 ,navSkillsEducation: document.querySelectorAll('nav')[1]
                 ,navExperience: document.querySelectorAll('nav')[2]
                 ,navPortfolio: document.querySelectorAll('nav')[3]
             }
             ,sections: {
                  myIntroduction: document.querySelector('#myIntroduction')
                 ,mySkillsEducation: document.querySelector('#mySkillsEducation')
                 ,myExperience: document.querySelector('#myExperience')
                 ,myPortfolio: document.querySelector('#myPortfolio')
             }
             ,filters: {
                  experienceFilters: document.querySelector('#myExperience .filter')
                 ,portfolioFilters: document.querySelector('#myPortfolio .filter')
             }
         };
 
 
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
     get pageElements() {
         return this.#pageElements;
     };
     set pageElements(value) {
         this.#pageElements = value;
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
             <article>
                <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>
             </article>
             <article>
                <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>
             </article>
         </section>
 
         <section id="myEducationSkills" class="">
             <h2>myEducationSkills:</h2>
             <article>
                <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>
             </article>
             <article>
                <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>
             </article>
         </section>
 
         <section id="myExperience" class="">
             <h2>myExperience:</h2>
             <div class="filter">
                 <ul class="filter-options">
                     <li data-filter="*" class="filterItem">All</li>
                     <li data-filter="Programming" class="filterItem">Programming</li>
                     <li data-filter="Accounting" class="filterItem">Accounting</li>
                     <li data-filter="CustomerService" class="filterItem">Customer Service</li>
                 </ul>
             </div>
         </section>
 
         <section id="myPortfolio" class="">
             <h2>myPortfolio:</h2>
             <div class="filter">
                 <ul class="filter-options">
                     <li data-filter="*" class="filterItem">All</li>
                     <li data-filter="UserInterface" class="filterItem">User Interfaces</li>
                     <li data-filter="Web" class="filterItem">Web</li>
                     <li data-filter="Database" class="filterItem">Databases</li>
                     <li data-filter="Logic" class="filterItem">Logic</li>
                     <li data-filter="Games" class="filterItem">Games</li>
                     <li data-filter="Efficiency" class="filterItem">Efficiency</li>
                     <li data-filter="DataSets" class="filterItem">DataSets</li>
                     <li data-filter="Finance" class="filterItem">Finance</li>
                 </ul>
             </div>
         </section>
         <button id="prev" class="arrow">❮</button>
         <button id="next" class="arrow">❯</button>
         `;
     };
 
     constructStyles() {}
 
     addEventListeners() {  
 
 
 
         this.leftArrow.addEventListener('click', () => {
             this.adjustDisplayedSection("-1");
         });
 
         this.rightArrow.addEventListener('click', () => {
             this.adjustDisplayedSection("+1");
         });
 
 
         this.listofNavs[0].addEventListener('click', () => {
             this.adjustDisplayedSection(0);
         });
 
         this.listofNavs[1].addEventListener('click', () => {
             this.adjustDisplayedSection(1);
         });
 
         this.listofNavs[2].addEventListener('click', () => {
             this.adjustDisplayedSection(2);
         });
 
         this.listofNavs[3].addEventListener('click', () => {
             this.adjustDisplayedSection(3);
         });
         
 ;
     };
 
 
     showSlide() {
 
         const index = this.currentSectionIndex
         const listOfSections = this.elementMainDiv.querySelectorAll('section');
 
         // Remove the active state of each resume section
         listOfSections.forEach(section => {
             section.classList.remove('active');
         });
 
         // Remove the active state of each navigation link
         this.listofNavs.forEach(link => {
             link.classList.remove('active');
         });
 
 
         // Set the active class
         listOfSections[index].classList.add('active');
         this.listofNavs[index].classList.add('active');
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
                 if (--this.currentSectionIndex < 0) {this.currentSectionIndex = this.listOfSections.length - 1}
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
 
 
 