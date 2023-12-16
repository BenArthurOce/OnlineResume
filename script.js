'use strict';

const navIconElements = document.querySelectorAll('.navlink-container a');
const navTextElements = document.querySelectorAll('.navlink-container i');
const sectionTitles = document.querySelectorAll('section h2');

/**************************************/
/**** Dynamically add Elements ********/
/**************************************/
// Function to add template article content for a section
function addSectionContent(jsonData, sectionId, templateId, sectionName, articleName) {

  const section = document.querySelector(`#${sectionId}`);
  const template = document.querySelector(`#${templateId}`);

  if (section && template) {
    const templateContent = template.innerHTML;
    const dataToAdd = jsonData[sectionName][articleName];

    // For each article, add the template element
    for (let i = 0; i < dataToAdd.length; i++) {
      const newElement = document.createElement('div');
      newElement.innerHTML = templateContent;
      section.appendChild(newElement);
    };
  };
};


/******************************/
/**** Scrolling Functions *****/
/******************************/
$(document).ready(function () {
  // Optimize scroll event by using debounce to reduce the frequency of function calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };
});

$(document).ready(function () {
  runCode();
});




/******************************/
/**** Scrolling Nav Bar ********/
/******************************/
function getVisibleSection() {
  let minDistance = Infinity;
  let visibleSectionIndex = -1;

  sectionTitles.forEach((sectionTitle, index) => {
    const rect = sectionTitle.getBoundingClientRect();
    const distance = Math.abs(rect.top);

    if (distance < minDistance) {
      minDistance = distance;
      visibleSectionIndex = index;
    };
  });

  return visibleSectionIndex;
};

function updateActiveNavigation() {
  const visibleSectionIndex = getVisibleSection();

  navTextElements.forEach((navElement, index) => {
    navElement.closest('a').classList.toggle('active', index === visibleSectionIndex);
  });

  navIconElements.forEach((navElement, index) => {
    navElement.closest('i').classList.toggle('active', index === visibleSectionIndex);
  });
};

document.addEventListener('scroll', debounce(updateActiveNavigation, 200));


function runCode() {
  console.log("RUNNING CODE")

  fetch('resumeDataJSON.json')
  .then(response => response.json())
  .then(resumeData => {

    addSectionContent(resumeData, "myCompetencies", "template-competency", "myCompetencies", "competency");
    addSectionContent(resumeData, "myEducation", "template-education", "myEducation", "education");
    addSectionContent(resumeData, "myExperience", "template-experience", "myExperience" ,"job");
    addSectionContent(resumeData, "myPortfolio", "template-portfolio", "myPortfolio" ,"project");

const domMapping = {
    aboutMe: {
        email: document.querySelector('.email-icon')
        ,phone: document.querySelector('.personal-phone')
        ,linkedin: document.querySelector('.linkedin-icon')
        ,github: document.querySelector('.github-icon')
        ,background: document.querySelector(".my-background")
        ,introduction: document.querySelector(".my-introduction")
    }
    ,myCompetencies: {
        competencySoftware: document.querySelectorAll(".competencySoftware")
        ,competencyScore: document.querySelectorAll(".competencyScore-container")
    }
    ,myEducation: {
        degree: document.querySelectorAll(".institution")
        ,institution: document.querySelectorAll(".degree")
    }
    ,myExperience: {
        company: document.querySelectorAll(".company")
        ,address: document.querySelectorAll(".address")
        ,position: document.querySelectorAll(".position")
        ,period: document.querySelectorAll(".period")
        ,softwares: document.querySelectorAll(".softwares")
        ,duties: document.querySelectorAll(".duties")
    }
    ,myPortfolio: {
        projectName: document.querySelectorAll(".project-name")
        ,projectLang: document.querySelectorAll(".project-lang")
        ,projectDesc: document.querySelectorAll(".project-desc")
        ,projectUrl: document.querySelectorAll(".project-url")
        ,projectGallery: document.querySelectorAll(".image-slideshow-container")
    }
};

    console.log(`DOMMAPPING:`)
    console.log(domMapping)


// PERSONAL INFO
    domMapping.aboutMe.email = resumeData.aboutMe.email
    domMapping.aboutMe.phone = resumeData.aboutMe.phone
    domMapping.aboutMe.linkedin = resumeData.aboutMe.linkedin
    domMapping.aboutMe.github = resumeData.aboutMe.github
    domMapping.aboutMe.background.textContent = resumeData.aboutMe.background
    domMapping.aboutMe.introduction.textContent = resumeData.aboutMe.introduction


    // // Add links to social media icons
    // domMapping.aboutMe.linkedin.addEventListener('click', function() {
    //     window.location.href = resumeData.aboutMe.linkedin;
    // });

    // domMapping.aboutMe.email.addEventListener('click', function() {
    //     window.location.href = resumeData.aboutMe.email
    // });

    // domMapping.aboutMe.github.addEventListener('click', function() {
    //     window.location.href = resumeData.aboutMe.github
    // });


// COMPENTENCY
    resumeData.myCompetencies.competency.forEach((competency, i) => {

      // Update HTML elements for this competency
      domMapping.myCompetencies.competencySoftware[i].textContent = competency["competencySoftware"];
      const softwareScore = parseInt(competency.competencyScore);

      // Add circle elements
      for (let j = 0; j < 10; j++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        if (j < softwareScore) {
          circle.classList.add('active');
        }
        else {
          circle.classList.remove('active'); // Remove 'active' class if not needed
        }
        domMapping.myCompetencies.competencyScore[i].appendChild(circle);
      }
    });


// EDUCATION
    resumeData.myEducation.education.forEach((education, i) => {

      // Update HTML elements for this education
      domMapping.myEducation.degree[i].textContent = education["degree"];
      domMapping.myEducation.institution[i].textContent = education["institution"];
    });


// EXPERIENCE
    resumeData.myExperience.job.forEach((job, i) => {

      // Update HTML elements for this job
      domMapping.myExperience.company[i].textContent = job["company"];
      domMapping.myExperience.address[i].textContent = job["address"];
      domMapping.myExperience.position[i].textContent = job["position"];
      domMapping.myExperience.period[i].textContent = job["period"];

      // Add softwares
      const softwares = Array.from(job.softwares.software).map(s => s.trim());
      domMapping.myExperience.softwares[i].innerHTML = ''; // Clear previous items
      softwares.forEach(s => {
        const li = document.createElement('li');
        li.textContent = s;
        domMapping.myExperience.softwares[i].appendChild(li);
      });

      // Add duties
      const duties = Array.from(job.duties.duty).map(s => s.trim());
      domMapping.myExperience.duties[i].innerHTML = ''; // Clear previous items
      duties.forEach(d => {
          const li = document.createElement('li');
          li.textContent = d;
          domMapping.myExperience.duties[i].appendChild(li);
      });
    });
    

// PORTFOLIO
    resumeData.myPortfolio.project.forEach((project, i) => {

      domMapping.myPortfolio.projectName[i].textContent = project["project-name"];
      domMapping.myPortfolio.projectLang[i].textContent = project["project-lang"];
      domMapping.myPortfolio.projectDesc[i].textContent = project["project-desc"];
      domMapping.myPortfolio.projectUrl[i].textContent = project["project-url"];

      // Add images
      const images = Array.from(project.project_images.project_image).map(j => j.trim());
      createProjectGallery(images, domMapping.myPortfolio.projectGallery[i]);
    });


// ADD IMAGES TO GALLERY
    function createProjectGallery(imageArray, galleryElement) {
      imageArray.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        img.style.display = index === 0 ? 'block' : 'none';   // Hide all images except the first one when the page loads
        // showSlides(1, 1)
        galleryElement.appendChild(img);
      });
    };


// GALLERY FUNCTION
    // Press left arrow on slideshow
    document.querySelectorAll(".prev").forEach(el => el.addEventListener('click',function (e) {
      const target = e.target
      const galleryElement = target.closest('.image-slideshow-container');
      showSlides(-1, galleryElement);
    }));

    // Press right arrow on slideshow
    document.querySelectorAll(".next").forEach(el => el.addEventListener('click',function (e) {
      const target = e.target
      const galleryElement = target.closest('.image-slideshow-container');
      showSlides(1, galleryElement);
    }));

    function showSlides(n, containerElement) {
      let slides = containerElement.querySelectorAll('img');

      let inx
      for (let i = 0; i < slides.length; i++) {
        if (slides[i].style.display === 'block') {
          inx = i   // current active slide
        };
      };

      let nxt = inx+n;  // index number of the next slide to come up
      if (inx + n >= slides.length) {nxt = 0};  // if the next slide was to go over max slides, return to 0
      if (inx + n < 0) {nxt = slides.length-1}; // if the prev slide was to go under 0, return the max length number

      slides[inx].style.display = "none";   // current visible image is hidden
      slides[nxt].style.display = "block";  // next image is visible
    }
  });
};  // End of runCode()


runCode()


//   //////////////////////////////////
//   ////////MOBILE SLIDESHOW//////////
//   //////////////////////////////////
//   function openSlideshow(index) {
//     console.log("Function: openSlideshow")
//     const slideshows = document.querySelectorAll('.portfolio-image-container');
//     const slideContainers = document.querySelectorAll('.image-slideshow-container');
  
//     slideshows[index].style.display = "block";
//     slideshows[index].classList.add('active');
//   }
  
//   function showImage(index) {
//     console.log("Function: showImage")
//     let images = document.getElementById("image-slideshow-container").getElementsByTagName("img");
  
//     for (let i = 0; i < images.length; i++) {
//       images[i].style.display = "none";
//     }
  
//     images[index].style.display = "block";
//   }
  
//   //////////////////////////////////
//   ////////MOBILE GITHUB/////////////
//   //////////////////////////////////
  
//   document.addEventListener('DOMContentLoaded', function() {
//     console.log("addEventListener: DomContentLoaded")
//     let imageContainers = document.querySelectorAll('.portfolio-image-container');
  
//     document.addEventListener('touchstart', function(event) {
//     console.log("addEventListener: touchstart")
//       let isGallery = false;
  
//       for (let i = 0; i < imageContainers.length; i++) {
//         if (event.target === imageContainers[i] || imageContainers[i].contains(event.target)) {
//           isGallery = true;
//           break;
//         }
//       }
  
//       if (!isGallery) {
//         console.log("User touched outside the image container");
//         closeGallery();
//       }
//     });
  
//     function closeGallery() {
//         console.log("Function: closeGallery")
//       for (let i = 0; i < imageContainers.length; i++) {
//         imageContainers[i].style.display = "none";
//         imageContainers[i].classList.remove('active');
//       }
//       console.log("Gallery closed");
//     }
//   });
