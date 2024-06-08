const languagesSection = document.getElementById('languagesSection');
const addLanguageButton = document.getElementById('addLanguageButton');

const initialLanguageSection = languagesSection.querySelector('.language-section');

addLanguageButton.addEventListener('click', () => {
   const newLanguageSection = initialLanguageSection.cloneNode(true);

   const newLanguageInputs = newLanguageSection.querySelectorAll('input');
   newLanguageInputs.forEach((input, index) => {
      const newInputName = input.name.replace(/\[[0-9]+\]/, `[${languagesSection.children.length}]`);
      input.name = newInputName;
      input.value = "";
   });

   const removeButton = document.createElement('button');
   removeButton.type = 'button';
   removeButton.classList.add('removeLanguageButton');
   removeButton.textContent = 'Remove';
   newLanguageSection.appendChild(removeButton);
   removeButton.style.display='block'

   removeButton.addEventListener('click', () => {
      languagesSection.removeChild(newLanguageSection);
   });

   languagesSection.appendChild(newLanguageSection);
});

//----------------------------------------------------------------------------------------------------------
const permanentDiseasesYes = document.getElementById('permanentDiseasesYes');
const permanentDiseasesNo = document.getElementById('permanentDiseasesNo');
const permanentDiseasesDetailsSection = document.getElementById('permanentDiseasesDetailsSection');4

permanentDiseasesYes.addEventListener('change', () => {
   permanentDiseasesDetailsSection.style.display = 'flex';
});

permanentDiseasesNo.addEventListener('change', () => {
   permanentDiseasesDetailsSection.style.display = 'none';
});

//----------------------------------------------------------------------------------------------------------
const disabilityDiseasesYes = document.getElementById('disabilityYes');
const disabilityNo = document.getElementById('disabilityNo');
const disabilityDetailsSection = document.getElementById('disabilityDetailsSection');

disabilityDiseasesYes.addEventListener('change', () => {
   disabilityDetailsSection.style.display = 'flex';
});

disabilityNo.addEventListener('change', () => {
   disabilityDetailsSection.style.display = 'none';
});

//----------------------------------------------------------------------------------------------------------
const carYes = document.getElementById('carYes');
const carNo = document.getElementById('carNo');
const carDetailsSection = document.getElementById('carDetailsSection');

carYes.addEventListener('change', () => {
   carDetailsSection.style.display = 'flex';
});

carNo.addEventListener('change', () => {
   carDetailsSection.style.display = 'none';
});

//----------------------------------------------------------------------------------------------------------
const apartmentYes = document.getElementById('apartmentYes');
const apartmentNo = document.getElementById('apartmentNo');
const apartmentDetailsSection = document.getElementById('apartmentDetailsSection');

apartmentYes.addEventListener('change', () => {
   apartmentDetailsSection.style.display = 'flex';
});

apartmentNo.addEventListener('change', () => {
   apartmentDetailsSection.style.display = 'none';
});

//----------------------------------------------------------------------------------------------------------
const businessOwnerYes = document.getElementById('businessOwnerYes');
const businessOwnerNo = document.getElementById('businessOwnerNo');
const businessOwnerSection = document.getElementById('businessOwnerSection');

businessOwnerYes.addEventListener('change', () => {
   businessOwnerSection.style.display = 'flex';
});

businessOwnerNo.addEventListener('change', () => {
   businessOwnerSection.style.display = 'none';
});

//----------------------------------------------------------------------------------------------------------
const jobYes = document.getElementById('jobYes');
const jobNo = document.getElementById('jobNo');
const jobSection = document.getElementById('jobSection');

jobYes.addEventListener('change', () => {
   jobSection.style.display = 'flex';
});

jobNo.addEventListener('change', () => {
   jobSection.style.display = 'none';
});

//----------------------------------------------------------------------------------------------------------
const childrenYes = document.getElementById('childrenYes');
const childrenNo = document.getElementById('childrenNo');
const childrenSection = document.getElementById('childrenSection');

childrenYes.addEventListener('change', () => {
   childrenSection.style.display = 'flex';
});

childrenNo.addEventListener('change', () => {
   childrenSection.style.display = 'none';
});

//----------------------------------------------------------------------------------------------------------
const faceImageInput = document.getElementById('faceImage');
const fullImageInput = document.getElementById('fullImage');
const idImageInput = document.getElementById('idImage');
const manWithIdImageInput = document.getElementById('manWithIdImage');
const faceImagePreview = document.getElementById('faceImagePreview');
const fullImagePreview = document.getElementById('fullImagePreview');
const idImagePreview = document.getElementById('idImagePreview');
const manWithIdImagePreview = document.getElementById('manWithIdImagePreview');

function displayImagePreview(input, previewElement) {
   const file = input.files[0];
   if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
      previewElement.src = e.target.result;
   };
      reader.readAsDataURL(file);
   } else {
      previewElement.src = ''; 
   }
   return previewElement

}

faceImageInput.addEventListener('change', () => {
   const previewElement = document.createElement('img');
   const updatedPreviewElement = displayImagePreview(faceImageInput, previewElement);
   while (faceImagePreview.firstChild) {
      faceImagePreview.removeChild(faceImagePreview.firstChild);
   }
   faceImagePreview.appendChild(updatedPreviewElement);
});

fullImageInput.addEventListener('change', () => {
   const previewElement = document.createElement('img');
   const updatedPreviewElement = displayImagePreview(fullImageInput, previewElement);
   while (fullImagePreview.firstChild) {
      fullImagePreview.removeChild(fullImagePreview.firstChild);
   }
   fullImagePreview.appendChild(updatedPreviewElement);
});

idImageInput.addEventListener('change', () => {
   const previewElement = document.createElement('img'); 
   const updatedPreviewElement = displayImagePreview(idImageInput, previewElement);
   while (idImagePreview.firstChild) {
      idImagePreview.removeChild(idImagePreview.firstChild);
   }
   idImagePreview.appendChild(updatedPreviewElement);
});

manWithIdImageInput.addEventListener('change', () => {
   const previewElement = document.createElement('img'); 
   const updatedPreviewElement = displayImagePreview(manWithIdImageInput, previewElement);
   while (manWithIdImagePreview.firstChild) {
      manWithIdImagePreview.removeChild(manWithIdImagePreview.firstChild);
   }
   manWithIdImagePreview.appendChild(updatedPreviewElement);
});

//----------------------------------------------------------------------------------------------------------

const errorCon = document.createElement('error');
const completeRedData = async (formData) => {
   const firstName = document.getElementById('firstName').value;
   const midName = document.getElementById('midName').value;
   const lastName = document.getElementById('lastName').value;
   const age = document.getElementById('age').value;
   const gender = document.getElementById('gender').value;
   const DOB = document.getElementById('DOB').value;
   const nationality = document.getElementById('nationality').value;
   const governorate = document.getElementById('governorate').value;
   const city = document.getElementById('city').value;
   const region = document.getElementById('region').value;
   const address = document.getElementById('address').value;
   const phone = document.getElementById('phone').value;
   const club = document.getElementById('club').value;
   const qualification = document.getElementById('qualification').value;
   const school = document.getElementById('school').value;
   const schoolType = document.getElementById('schoolType').value;
   const college = document.getElementById('college').value;
   const university = document.getElementById('university').value;
   const specialization = document.getElementById('specialization').value;
   const religion = document.getElementById('religion').value;
   const skinColor = document.getElementById('skin').value;
   const height = document.getElementById('height').value;
   const weight = document.getElementById('weight').value;
   const nameOfTheApplicantGuardian = document.getElementById('nameOfTheApplicantGuardian').value;
   const relationWithApplicant = document.getElementById('relationWithApplicant').value;
   const phoneOfGuardian = document.getElementById('hobbies').value;
   const hobbies = document.getElementById('address').value;
   const habbits = document.getElementById('habbits').value;
   const otherInfo = document.getElementById('otherInfo').value;
   const permanentDiseases = document.querySelector('input[name="permanentDiseases"]:checked').value
   const permanentDiseasesDetails = document.getElementById('permanentDiseasesDetails').value;
   const disability = document.querySelector('input[name="disability"]:checked').value
   const disabilityDetails = document.getElementById('disabilityDetails').value;
   const car = document.querySelector('input[name="car"]:checked').value
   const carType = document.getElementById('carTypeDetails').value;
   const carModel = document.getElementById('carModelDetails').value;
   const apartment = document.querySelector('input[name="apartment"]:checked').value
   const space = document.getElementById('apartmentSpaceDetails').value;
   const site = document.getElementById('apartmentSiteDetails').value;
   const businessOwner = document.querySelector('input[name="businessOwner"]:checked').value
   const businessType = document.getElementById('businessType').value;
   const job = document.querySelector('input[name="job"]:checked').value
   const jobTitle = document.getElementById('jobTitleDetails').value;
   const jobCompany = document.getElementById('jobCompanyDetails').value;
   const marriedBefore = document.querySelector('input[name="marriedBefore"]:checked').value
   const marriedNow = document.querySelector('input[name="marriedNow"]:checked').value
   const children = document.querySelector('input[name="children"]:checked').value
   const numberOfChildren = document.getElementById('numberOfChildrenDetails').value;
   const agesOfChildren = document.getElementById('agesOfChildrenDetails').value;
   const livingAbroad = document.querySelector('input[name="livingAbroad"]:checked').value
   const languageSections = document.querySelectorAll('.language-section');
   let languages = [];
   languageSections.forEach((section, i) => {
      const language = section.querySelector(`input[name="languages[${i}].language"]`).value;
      const level = section.querySelector(`input[name="languages[${i}].level"]`).value;

      languages.push({ language, level });
   });
   const faceImage = document.getElementById('faceImage').files[0];
   const fullImage = document.getElementById('fullImage').files[0];
   const idImage = document.getElementById('idImage').files[0];
   const manWithIdImage = document.getElementById('manWithIdImage').files[0];
   const response = await fetch('http://localhost:3000/api/v1/auth/completeRegistration', {
      method: 'POST',
      body: formData,
      credentials: 'include', 
   })

   if (!response.ok) {
      const errorData = await response.json(); 
      const messages = errorData?.message || ["Unknown error"]; 
      error.innerHTML = messages;
      throw new Error(`Error during signup: ${messages}`);
   } else {
      error.innerHTML = "";
   }

   const message = await response.text();
   console.log(message);
   return message;
}

const completeRegistrationForm = document.getElementById("completeRegistration");
console.log(completeRegistrationForm)
completeRegistrationForm.addEventListener("submit", async (e) => {
   e.preventDefault();
   console.log("form")
   const firstName = document.getElementById('firstName').value;
   const midName = document.getElementById('midName').value;
   const lastName = document.getElementById('lastName').value;
   const age = document.getElementById('age').value;
   const gender = document.getElementById('gender').value;
   const DOB = document.getElementById('DOB').value;
   const nationality = document.getElementById('nationality').value;
   const governorate = document.getElementById('governorate').value;
   const city = document.getElementById('city').value;
   const region = document.getElementById('region').value;
   const address = document.getElementById('address').value;
   const phone = document.getElementById('phone').value;
   const club = document.getElementById('club').value;
   const qualification = document.getElementById('qualification').value;
   const school = document.getElementById('school').value;
   const schoolType = document.getElementById('schoolType').value;
   const college = document.getElementById('college').value;
   const university = document.getElementById('university').value;
   const specialization = document.getElementById('specialization').value;
   const religion = document.getElementById('religion').value;
   const skinColor = document.getElementById('skin').value;
   const height = document.getElementById('height').value;
   const weight = document.getElementById('weight').value;
   const nameOfTheApplicantGuardian = document.getElementById('nameOfTheApplicantGuardian').value;
   const relationWithApplicant = document.getElementById('relationWithApplicant').value;
   const phoneOfGuardian = document.getElementById('hobbies').value;
   const hobbies = document.getElementById('address').value;
   const habbits = document.getElementById('habbits').value;
   const otherInfo = document.getElementById('otherInfo').value;
   const permanentDiseases = document.querySelector('input[name="permanentDiseases"]:checked').value
   const permanentDiseasesDetails = document.getElementById('permanentDiseasesDetails').value;
   const disability = document.querySelector('input[name="disability"]:checked').value
   const disabilityDetails = document.getElementById('disabilityDetails').value;
   const car = document.querySelector('input[name="car"]:checked').value
   const carType = document.getElementById('carTypeDetails').value;
   const carModel = document.getElementById('carModelDetails').value;
   const apartment = document.querySelector('input[name="apartment"]:checked').value
   const space = document.getElementById('apartmentSpaceDetails').value;
   const site = document.getElementById('apartmentSiteDetails').value;
   const businessOwner = document.querySelector('input[name="businessOwner"]:checked').value
   const businessType = document.getElementById('businessType').value;
   const job = document.querySelector('input[name="job"]:checked').value
   const jobTitle = document.getElementById('jobTitleDetails').value;
   const jobCompany = document.getElementById('jobCompanyDetails').value;
   const marriedBefore = document.querySelector('input[name="marriedBefore"]:checked').value
   const marriedNow = document.querySelector('input[name="marriedNow"]:checked').value
   const children = document.querySelector('input[name="children"]:checked').value
   const numberOfChildren = document.getElementById('numberOfChildrenDetails').value;
   const agesOfChildren = document.getElementById('agesOfChildrenDetails').value;
   const livingAbroad = document.querySelector('input[name="livingAbroad"]:checked').value
   const languageSections = document.querySelectorAll('.language-section');
   let languages = [];
   languageSections.forEach((section, i) => {
      const language = section.querySelector(`input[name="languages[${i}].language"]`).value;
      const level = section.querySelector(`input[name="languages[${i}].level"]`).value;

      languages.push({ language, level });
   });
   const faceImage = document.getElementById('faceImage').files[0];
   const fullImage = document.getElementById('fullImage').files[0];
   const idImage = document.getElementById('idImage').files[0];
   const manWithIdImage = document.getElementById('manWithIdImage').files[0];
   
   const formData = new FormData();
   formData.append('firstName', firstName);
   formData.append('midName', midName);
   formData.append('lastName', lastName);
   formData.append('age', age);
   formData.append('gender', gender);
   formData.append('DOB', DOB);
   formData.append('nationality', nationality);
   formData.append('governorate', governorate);
   formData.append('city', city);
   formData.append('region', region);
   formData.append('address', address);
   formData.append('phone', phone);
   formData.append('club', club);
   formData.append('qualification', qualification);
   formData.append('school', school);
   formData.append('schoolType', schoolType);
   formData.append('college', college);
   formData.append('university', university);
   formData.append('specialization',specialization);
   formData.append('languages',  JSON.stringify(languages));
   formData.append('religion', religion);
   formData.append('height',height);
   formData.append('weight', weight);
   formData.append('skinColor', skinColor);
   formData.append('permanentDiseases', permanentDiseases);
   formData.append('permanentDiseasesDetails', permanentDiseasesDetails);
   formData.append('disability', disability);
   formData.append('disabilityDetails', disabilityDetails);
   formData.append('car', car);
   formData.append('carType', carType);
   formData.append('carModel', carModel);
   formData.append('apartment',apartment);
   formData.append('space', space);
   formData.append('site', site);
   formData.append('businessOwner', businessOwner);
   formData.append('businessType', businessType);
   formData.append('job', job);
   formData.append('jobTitle', jobTitle);
   formData.append('jobCompany', jobCompany);
   formData.append('marriedBefore', marriedBefore);
   formData.append('marriedNow', marriedNow);
   formData.append('children', children);
   formData.append('numberOfChildren',numberOfChildren);
   formData.append('agesOfChildren', agesOfChildren);
   formData.append('nameOfTheApplicantGuardian', nameOfTheApplicantGuardian);
   formData.append('relationWithApplicant', relationWithApplicant);
   formData.append('phoneOfGuardian', phoneOfGuardian);
   formData.append('hobbies', hobbies);
   formData.append('habbits', habbits);
   formData.append('otherInfo', otherInfo);
   formData.append('livingAbroad', livingAbroad);
   formData.append('faceImage', faceImage);
   formData.append('fullImage', fullImage);
   formData.append('idImage', idImage);
   formData.append('manWithIdImage', manWithIdImage);
   try{
      const res = await completeRedData(formData);
      window.location.href =
      `file:///D:/work/seeko/seeko-front/wating.html`;
   }catch(err){
      console.log(err)
   }
})

 // Handle "Remove" button clicks for existing language sections (if any)
// document.querySelectorAll('.removeLanguageButton').forEach(button => {
//    button.addEventListener('click', () => {
//       const languageSectionToRemove = button.parentElement;
//       languagesSection.removeChild(languageSectionToRemove);
//    });
// });

// const form = document.getElementById('registrationForm');
// form.addEventListener('submit', (event) => {
//    event.preventDefault(); // Prevent default form submission

//    const languageSections = document.querySelectorAll('.language-section');
//    let languages = [];

//    languageSections.forEach(section => {
//       const language = section.querySelector('input[name*="[language]"]').value;
//       const level = section.querySelector('input[name*="[level]"]').value;

//       languages.push({ language, level });
//    });

//    const completeRegData = {
   

// ... other form data (access form elements using their IDs or names)
   //    languages
   // };

   // Submit data to your server (using AJAX, fetch, etc.)
   // console.log(completeRegData); 
   // Replace with your actual submission logic
   // fetch('/submit-registration', {
   //   method: 'POST',
   //   body: JSON.stringify(completeRegData),
   //   headers: { 'Content-Type': 'application/json' }
   // })
   // .then(response => response.json())
   // .then(data => {
   //   // Handle successful submission
   // })
   // .catch(error => {
   //   // Handle submission errors
   // });
// });

