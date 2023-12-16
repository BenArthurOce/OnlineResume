import HTMLcompetency from "./HTMLcompetency.js"
import HTMLexp from "./HTMLexp.js"
import HTMLeducation from "./HTMLeducation.js"
import HTMLportfolio from "./HTMLportfolio.js"
import ResumeData from "./factoryResumeData.js"


const classResumeData = new ResumeData

// fetch json resume data
classResumeData.getJSONdata()
.then(resumeData => {
    console.log(resumeData)

    // Break up into its headers
    // loop through each one 

    Object.entries(resumeData).forEach(([key, value], i) => {
        console.log(`key: ${key}, value: ${value}, index: ${i}`);
    });

    }
)



const classComp = new HTMLcompetency
const appendParentComp = document.querySelector("#myCompetencies")
classComp.renderToPage(appendParentComp)


const classExp = new HTMLexp
const appendParentExp = document.querySelector("#myExperience")
classExp.renderToPage(appendParentExp)


const classEdu = new HTMLeducation
const appendParentEdu = document.querySelector("#myEducation")
classEdu.renderToPage(appendParentEdu)


const classPort = new HTMLportfolio
const appendParentPort = document.querySelector("#myPortfolio")
classPort.renderToPage(appendParentPort)




// Read from the JSON file
// For each comp, exp, edu, port:
    // Add that into the document using the class function "renderToPage"
        // You also need to add code that adds each duty, software etc