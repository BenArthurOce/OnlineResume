


// import ResumeData from "./factoryResumeData.js";
// import HTMLcompetency from "./HTMLcompetency.js";
// import HTMLskill from "./HTMLskill.js";
// import HTMLeducation from "./HTMLeducation.js";
// import HTMLportfolioTile from "./HTMLportfolioTile.js";
// import HTMLexpTile from "./HTMLexpTile.js";





// const section1 = document.createElement('section');
// section1.id = `section1`
// document.body.appendChild(section1)

// const section2 = document.createElement('section');
// section2.id = `section2`
// document.body.appendChild(section2)

// const section3 = document.createElement('section');
// section3.id = `section3`
// document.body.appendChild(section3)

// const section4 = document.createElement('section');
// section4.id = `section4`
// document.body.appendChild(section4)

// const section5 = document.createElement('section');
// section5.id = `section5`
// document.body.appendChild(section5)
// tile.innerHTML = this.templateTileElement;

// tile.querySelector('.projectName').textContent = projectName;
// tile.querySelector('.summarySmall').textContent = summarySmall;


// import HTMLSectionSlideshow  from './HTMLsectionSideshow.js';
// const compSlideshow = new HTMLSectionSlideshow ("myCompetencies");
// const skillsSlideshow = new HTMLSectionSlideshow ("mySkills");
// const experienceSlideshow = new HTMLSectionSlideshow ("myExperience");
// const educationSlideshow = new HTMLSectionSlideshow ("myEducation");
// const portfolioSlideshow = new HTMLSectionSlideshow ("myPortfolio");



// Import the HTMLSectionSlideshow class
import HTMLSectionSlideshow  from './HTMLsectionSideshow.js';

// // Create an instance of HTMLSectionSlideshow
// const slideshow = new HTMLSectionSlideshow();

// // Append the slideshow to the body or any other container element
// document.body.appendChild(slideshow.parentElement);

// // Call the renderToDom method to set up event listeners and other functionalities
// slideshow.renderToDom();








// const classResumeData = new ResumeData;
// const classComp = new HTMLcompetency;
// const classSkill = new HTMLskill;
// const classEdu = new HTMLeducation;
// const classExpTile = new HTMLexpTile;
// const classPortTile = new HTMLportfolioTile;

// compSlideshow.renderToDom()
// skillsSlideshow.renderToDom()
// experienceSlideshow.renderToDom()
// educationSlideshow.renderToDom()
// portfolioSlideshow.renderToDom()


const slideshow = new HTMLSectionSlideshow('slideshow');
document.body.appendChild(slideshow.parentElement);
console.log(document.querySelector("#myCompetencies"))

console.log(document.querySelector("#myExperience"))




import ResumeData from "./factoryResumeData.js";
import HTMLskill from "./HTMLskill.js";
import HTMLeducation from "./HTMLeducation.js";
import HTMLportfolioTile from "./HTMLportfolioTile.js";
import HTMLexpTile from "./HTMLexpTile.js";


const classResumeData = new ResumeData;
const classSkill = new HTMLskill;
const classEdu = new HTMLeducation;
const classExpTile = new HTMLexpTile(document.querySelector("#myExperience"));
const classPortTile = new HTMLportfolioTile;




// fetch json resume data
classResumeData.getJSONdata()
.then(resumeData => {

    // Get the headers of the JSON file, and then render each section to the page
    const {aboutMe, myCompetencies, myEducation, myExperience, myPortfolio} = resumeData

    // classSkill.renderToPage()

    // for (const {degree, institution} of myEducation) {
    //     classEdu.renderToPage(degree, institution);
    // };


    for (const {company, address, position, period, softwares, duties} of myExperience) {
        classExpTile.renderToPage(company, address, position, period, softwares, duties);
    };


    for (const {projectName, projectLangs, summarySmall, summaryLarge, projectUrl, projectImages} of myPortfolio) {
        classPortTile.renderToPage(projectName, projectLangs, summarySmall, summaryLarge, projectUrl, projectImages);
    };


});




// createElement() {
//     const overlayElement = document.createElement('div');
//     overlayElement.innerHTML = this.templateOverlayElement;

//     overlayElement.querySelector('#projectTitleOlay').textContent = this.projectName;
//     overlayElement.querySelector('#projectSummaryOlay').textContent = this.projectSumLarge;
                                                
//     this.projectLangs.forEach(lang => {
//         const logoPath = `imgLogos/${lang}.svg`;

//         // Create a new image element for each language
//         const langLogo = document.createElement('img');
//         langLogo.src = logoPath;
//         langLogo.alt = lang; // You can set alt text as the language name
//         langLogo.classList.add('lang-logo');

//         overlayElement.querySelector('#projectLangsOlay').appendChild(langLogo);
//     });

//     // Prepare slideshow
//     const imageContainer = overlayElement.querySelector('#slideshowContainer');

//     const showImage = (index) => {
//         const images = imageContainer.querySelectorAll('img');
//         images.forEach((img, i) => {
//             img.style.display = i === index ? 'block' : 'none';
//         });
//     };

//     const nextImage = () => {
//         this.currentImageIndex = (this.currentImageIndex + 1) % this.projectImages.length;
//         showImage(this.currentImageIndex);
//     };

//     const prevImage = () => {
//         this.currentImageIndex = (this.currentImageIndex - 1 + this.projectImages.length) % this.projectImages.length;
//         showImage(this.currentImageIndex);
//     };

//     overlayElement.querySelector('.prev').addEventListener('click', prevImage);
//     overlayElement.querySelector('.next').addEventListener('click', nextImage);

//     this.projectImages.forEach((image, index) => {
//         const img = document.createElement('img');
//         img.src = image;
//         img.style.display = index === 0 ? 'block' : 'none';
//         imageContainer.appendChild(img);
//     });

//     overlayElement.querySelector('#closeBtn').onclick = () => {
//         this.removeFromPage();
//     };

//     document.body.appendChild(overlayElement);
// };

// renderToPage() {
//     document.body.querySelector('#infoOverlay').classList.add('active');
// };

// removeFromPage() {
//     const overlayElement = document.body.querySelector('#infoOverlay');
//     if (overlayElement) {
//         const parentElement = overlayElement.parentNode;
//         if (parentElement) {
//             parentElement.parentNode.removeChild(parentElement);
//         }
//     }                                                                       
// }





// // fetch json resume data
// classResumeData.getJSONdata()
// .then(resumeData => {

//     // Get the headers of the JSON file, and then render each section to the page
//     const {aboutMe, myCompetencies, myEducation, myExperience, myPortfolio} = resumeData

//     for (const {competencySoftware, competencyScore} of myCompetencies) {
//         classComp.renderToPage(competencySoftware, competencyScore);
//     };

//     classSkill.renderToPage()

//     for (const {degree, institution} of myEducation) {
//         classEdu.renderToPage(degree, institution);
//     };


//     for (const {company, address, position, period, softwares, duties} of myExperience) {
//         classExpTile.renderToPage(company, address, position, period, softwares, duties);
//     };


//     for (const {projectName, projectLangs, summarySmall, summaryLarge, projectUrl, projectImages} of myPortfolio) {
//         classPortTile.renderToPage(projectName, projectLangs, summarySmall, summaryLarge, projectUrl, projectImages);
//     };


// });


// let visibleSectionIndex = -1;

// function handleScrollPosition() {

//     function getPosition(element) {
//         let xPosition = 0;
//         let yPosition = 0;
    
//         while (element) {
//             xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
//             yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
//             element = element.offsetParent;
//         };
    
//         return { x: xPosition, y: yPosition };
//     };


//     const sectionTitles = document.querySelectorAll('section h2');
//     const navTextElements = document.querySelectorAll('.navlink-container span');
//     const navIconElements = document.querySelectorAll('.navlink-container i');

//     // Find which h2 header has been passed
//     sectionTitles.forEach((sectionTitle, index) => {
//         const position = getPosition(sectionTitle);
//         const distance = position.y - window.scrollY;

//         if (distance >= 0 && distance < sectionTitle.clientHeight) {
//             visibleSectionIndex = index;
//         }
//     });

//     // Depending on which h2 element is passed, highlight the relevant navlink
//     navTextElements.forEach((navElement, index) => {
//         navElement.classList.toggle('active', index === visibleSectionIndex);
//     });

//     navIconElements.forEach((navElement, index) => {
//         navElement.classList.toggle('active', index === visibleSectionIndex);
//     });
// }

// document.addEventListener('scroll', handleScrollPosition);

