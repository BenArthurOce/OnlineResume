import ResumeData from "./factoryResumeData.js";
import HTMLcompetency from "./HTMLcompetency.js";
import HTMLexp from "./HTMLexp.js";
import HTMLeducation from "./HTMLeducation.js";
import HTMLportfolio from "./HTMLportfolio.js";


const classResumeData = new ResumeData;
const classComp = new HTMLcompetency;
const classEdu = new HTMLeducation;
const classExp = new HTMLexp;
const classPort = new HTMLportfolio;


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

    for (const {projectname, projectlang, projectdesc, projecturl, projectimages} of myPortfolio) {
        classPort.renderToPage(projectname, projectlang, projectdesc, projecturl, projectimages);
    };


})


// Read from the JSON file
// For each comp, exp, edu, port:
    // Add that into the document using the class function "renderToPage"
        // You also need to add code that adds each duty, software etc