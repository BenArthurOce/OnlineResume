import ResumeData from "./factoryResumeData.js";
import HTMLcompetency from "./HTMLcompetency.js";
import HTMLexp from "./HTMLexp.js";
import HTMLeducation from "./HTMLeducation.js";
import HTMLportfolio from "./HTMLportfolio.js";
import HTMLportfolioTile from "./HTMLportfolioTile.js";


const classResumeData = new ResumeData;
const classComp = new HTMLcompetency;
const classEdu = new HTMLeducation;
const classExp = new HTMLexp;
const classPort = new HTMLportfolio;
const classPortTile = new HTMLportfolioTile;


// fetch json resume data
classResumeData.getJSONdata()
.then(resumeData => {

    // Get the headers of the JSON file, and then render each section to the page
    const {aboutMe, myCompetencies, myEducation, myExperience, myPortfolio} = resumeData

    for (const {competencySoftware, competencyScore} of myCompetencies) {
        classComp.renderToPage(competencySoftware, competencyScore);
    };

    for (const {degree, institution} of myEducation) {
        classEdu.renderToPage(degree, institution);
    };

    for (const {company, address, position, period, softwares, duties} of myExperience) {
        classExp.renderToPage(company, address, position, period, softwares, duties);
    };

    // for (const {projectname, projectlangs, projectdesc, projecturl, projectimages} of myPortfolio) {
    //     classPort.renderToPage(projectname, projectlangs, projectdesc, projecturl, projectimages);
    // };

    for (const {projectname, projectlangs, projectdesc, projecturl, projectimages} of myPortfolio) {
        // classPort.renderToPage(projectname, projectlang, projectdesc, projecturl, projectimages);
        classPortTile.renderToPage(projectname, projectdesc, projectlangs, projecturl, projectimages);
    };


});


let visibleSectionIndex = -1;

function handleScrollPosition() {

    function getPosition(element) {
        let xPosition = 0;
        let yPosition = 0;
    
        while (element) {
            xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        };
    
        return { x: xPosition, y: yPosition };
    };


    const sectionTitles = document.querySelectorAll('section h2');
    const navTextElements = document.querySelectorAll('.navlink-container span');
    const navIconElements = document.querySelectorAll('.navlink-container i');

    // Find which h2 header has been passed
    sectionTitles.forEach((sectionTitle, index) => {
        const position = getPosition(sectionTitle);
        const distance = position.y - window.scrollY;

        if (distance >= 0 && distance < sectionTitle.clientHeight) {
            visibleSectionIndex = index;
        }
    });

    // Depending on which h2 element is passed, highlight the relevant navlink
    navTextElements.forEach((navElement, index) => {
        navElement.classList.toggle('active', index === visibleSectionIndex);
    });

    navIconElements.forEach((navElement, index) => {
        navElement.classList.toggle('active', index === visibleSectionIndex);
    });
}

document.addEventListener('scroll', handleScrollPosition);

