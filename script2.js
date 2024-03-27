// "use strict";

// // import ResumeData from "./libs/factoryResumeData.js";
// import ResumeDataNEW from "./libs/ResumeData.js";
// import {FrontPageNEW, FrontPageWithResumeData} from "./libs/FrontPage.js";



"use strict";

// import ResumeData from "./libs/factoryResumeData.js";
// import ResumeDataNEW from "./libs/ResumeData.js";
// import {FrontPageNEW, FrontPageWithResumeData} from "./libs/FrontPage.js";

import FrontPageNEW from "./libs/FrontPageNEW25Mar.js";


const myNewPage = new FrontPageNEW();
// console.log("aaaa")

// console.log(JSON.stringify(myNewPage, null, 4));
// const a = Object.keys(myNewPage).forEach((prop)=> console.log(prop));
// console.log(a)


// function printMethodsAndProperties(classInstance) {
//     if (!classInstance || typeof classInstance !== 'object') {
//         console.error('Invalid class instance.');
//         return;
//     }

//     const props = Object.getOwnPropertyNames(classInstance.constructor.prototype);
//     props.forEach(prop => {
//         const propDesc = Object.getOwnPropertyDescriptor(classInstance.constructor.prototype, prop);
//         console.log(`${prop}: ${typeof classInstance[prop]} ${propDesc.get ? '(getter)' : ''} ${propDesc.set ? '(setter)' : ''} ${propDesc.value && typeof propDesc.value === 'function' ? '(method)' : ''}`);
        
//         // Check if the property is an array
//         if (Array.isArray(classInstance[prop]) && classInstance[prop].length > 0) {
//             console.log(`  ${prop} (Array):`);
//             classInstance[prop].forEach((item, index) => {
//                 if (typeof item === 'object') {
//                     console.log(`    [${index}]:`);
//                     printMethodsAndProperties(item); // Recursively call the function for each object in the array
//                 }
//             });
//         }
//         // Check if the property is an object
//         else if (typeof classInstance[prop] === 'object') {
//             console.log(`  ${prop} (Object):`);
//             printMethodsAndProperties(classInstance[prop]); // Recursively call the function for the object
//         }
//     });
// }



        
// printMethodsAndProperties(myNewPage)


//some of these are arrays that have other objects in them. How do i loop and return those as well?
// console.log("----")
// console.log(myNewPage)
// const classResumeData = new ResumeDataNEW();

// const frontpage = new FrontPageNEW();

// // Fetch JSON resume data
// classResumeData.fetchData()
//     .then(() => {
//         // Get the headers of the JSON file, and then render each section to the page
//         const aboutMe = classResumeData.aboutMe;
//         const myEducations = classResumeData.educations;
//         const mySkills = classResumeData.skills;
//         const myExperiences = classResumeData.experiences;
//         const myPortfolio = classResumeData.portfolio;

//         // Add Intro Section
//         const { email, phone, linkedin, github, background, introduction, skillsKey } = aboutMe;
//         const introData = { email, phone, linkedin, github, background, introduction, skillsKey };
//         frontpage.addIntro(introData);

//         // Add Skills Section
//         const { skillsLangages, skillsTechincal, skillsSoft } = mySkills;
//         const skillsData = { skillsLangages, skillsTechincal, skillsSoft };
//         frontpage.addSkills(skillsData);

//         // Add Education Section
//         // for (const {degree, institution, tags} of myEducations) {
//         //     frontpage.addEducations(degree, institution, tags);
//         // };
//         // console.log(mySkills)
//         // console.log(myEducations)


//         console.log(frontpage.sectionsObj)

//         // // Add Experience Section
//         // for (const {company, address, position, period, extraInfo, tags, softwares, duties} of myExperiences) {
//         //     frontpage.addExperienceTile(company, address, position, period, extraInfo, tags, softwares, duties)
//         // };

//         // Add other sections as needed
//     })
//     // .catch(error => {
//     //     console.error('Error fetching resume data:', error);
//     //     // Handle error here
//     // });




