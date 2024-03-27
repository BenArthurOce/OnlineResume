






// class ExperienceArticle extends ArticleObject {
//     constructor(data, parentObj) {
//         super(data, parentObj); 
//         this.classType = "Experience"
//         this.testInit();
//     };

//     testInit() {
//         console.log(this)
//     }

//     createArticleElement() {
         
//         const tempEl = document.createElement('div');
//         tempEl.innerHTML = `
//         <div class="article activated for-experience">
//             <div class="icon-container">
// 		        <i class="icon"></i>
// 		    </div>
//             <p class="position">${this.data.position}</p>
//             <p class="company">${this.data.company}</p>
//         </div>
//         `.trim();
//         this.element = tempEl.firstChild
//     };

//     applyInfoToElement() {
//         // Add tags for job types
//         // console.log(this.data)
//         this.data.tags.forEach(tag => this.element.classList.add(tag));

//         // Add small icon in top left
//         const iconClass = this.getIconClassBasedOnTag(this.data.tags[0]);
//         this.element.querySelector('i').className = `sidebar-icon fa ${iconClass}`;
//     };

//     // Helper method to get icon class based on the tag
//     getIconClassBasedOnTag(tag) {
//         switch (tag) {
//             case "Programming":
//                 return 'fa-desktop';
//             case "Accounting":
//                 return 'fa-dollar';
//             case "CustomerService":
//                 return 'fa-bell';
//             default:
//                 return '';
//         }
//     };

// };


// class PortfolioArticle extends ArticleObject {
//     constructor(data, parentObj) {
//         super(data, parentObj);
//         this.classType = "Portfolio"
//     };

//     createArticleElement() {
//         const tempEl = document.createElement('div');
//         tempEl.innerHTML = `
//             <div class="article activated for-portfolio">
//                 <div class="container for-icons"></div>
//                 <p class="projectName">${this.data.projectName}</p>
//                 <p class="projectSumSmall">${this.data.summarySmall}</p>
//             </div>
//         `.trim();
//         this.element = tempEl.firstChild;
//     };

//     applyInfoToElement() {
//         // Add tags for each portfolio
//         this.data.projectTags.forEach(tag => this.element.classList.add(tag));

//         // Add programming icons
//         const iconContainer = this.element.querySelector('.container.for-icons');
//         this.data.projectLangs.forEach(lang => {
//             const logoPath = `imgLogos/${lang}.svg`;                        // Get SVG of programming logo
//             const langLogo = document.createElement('img');                 // Create a new image element for each language
            
//             langLogo.src = logoPath;
//             langLogo.alt = lang;
//             langLogo.classList.add('program-icon');
    
//             iconContainer.appendChild(langLogo);
//         });
//     };
// }

// export { ExperienceArticle, PortfolioArticle};