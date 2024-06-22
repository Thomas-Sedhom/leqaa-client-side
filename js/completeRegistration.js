const languagesSection = document.getElementById('languagesSection');
const addLanguageButton = document.getElementById('addLanguageButton');
const completeRegistration = document.querySelector('.completeRegistration');
const loadingBody = document.querySelector('.loadingBody');

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
   removeButton.style.display = 'block'

   removeButton.addEventListener('click', () => {
      languagesSection.removeChild(newLanguageSection);
   });

   languagesSection.appendChild(newLanguageSection);
});

//----------------------------------------------------------------------------------------------------------
const permanentDiseasesYes = document.getElementById('permanentDiseasesYes');
const permanentDiseasesNo = document.getElementById('permanentDiseasesNo');
const permanentDiseasesDetailsSection = document.getElementById('permanentDiseasesDetailsSection'); 4

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
// const manWithIdImageInput = document.getElementById('manWithIdImage');
const faceImagePreview = document.getElementById('faceImagePreview');
const fullImagePreview = document.getElementById('fullImagePreview');
const idImagePreview = document.getElementById('idImagePreview');
// const manWithIdImagePreview = document.getElementById('manWithIdImagePreview');

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

// manWithIdImageInput.addEventListener('change', () => {
//    const previewElement = document.createElement('img');
//    const updatedPreviewElement = displayImagePreview(manWithIdImageInput, previewElement);
//    while (manWithIdImagePreview.firstChild) {
//       manWithIdImagePreview.removeChild(manWithIdImagePreview.firstChild);
//    }
//    manWithIdImagePreview.appendChild(updatedPreviewElement);
// });

//----------------------------------------------------------------------------------------------------------

const errorCon = document.createElement('error');
const completeRedData = async (formData) => {

   const languageSections = document.querySelectorAll('.language-section');
   let languages = [];
   languageSections.forEach((section, i) => {
      const language = section.querySelector(`input[name="languages[${i}].language"]`).value;
      const level = section.querySelector(`input[name="languages[${i}].level"]`).value;
      languages.push({ language, level });
   });
   const response = await fetch('http://localhost:3000/api/v1/auth/completeRegistration', {
      method: 'POST',
      body: formData,
      credentials: 'include',
   })

   if (!response.ok) {
      const errorData = await response.json();
      const messages = errorData?.message || ["Unknown error"];
      error.innerHTML = messages;
      completeRegistration.style.display = 'block';
      loadingBody.style.display = 'none';
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
   const phoneOfGuardian = document.getElementById('phoneOfGuardian').value;
   const hobbies = document.getElementById('hobbies').value;
   const habbits = document.getElementById('habbits').value;
   const otherInfo = document.getElementById('otherInfo').value;
   const permanentDiseases = document.querySelector('input[name="permanentDiseases"]:checked').value;
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
   // const manWithIdImage = document.getElementById('manWithIdImage').files[0];

   
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
   formData.append('specialization', specialization);
   formData.append('languages', JSON.stringify(languages));
   formData.append('religion', religion);
   formData.append('height', height);
   formData.append('weight', weight);
   formData.append('skinColor', skinColor);
   formData.append('permanentDiseases', permanentDiseases);
   formData.append('permanentDiseasesDetails', permanentDiseasesDetails);
   formData.append('disability', disability);
   formData.append('disabilityDetails', disabilityDetails);
   formData.append('car', car);
   formData.append('carType', carType);
   formData.append('carModel', carModel);
   formData.append('apartment', apartment);
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
   formData.append('numberOfChildren', numberOfChildren);
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
   // formData.append('manWithIdImage', manWithIdImage);
   try {
      completeRegistration.style.display = 'none';
      loadingBody.style.display = 'grid';
      const res = await completeRedData(formData);
      window.location.href =
         `file:///D:/work/seeko/seeko-front/wating.html`;
   } catch (err) {
      console.log(err)
   }
})

const warnings = document.getElementById('warning');
const getWarning = async () => {
   const response = await fetch('http://localhost:3000/api/v1/auth/warning', {
      method: 'GET',
      credentials: 'include',
   })
   const data = await response.text();
   if (data != "") {
      warnings.innerHTML = data;
      warnings.style.display = "block";
      const user = await userApi();
      document.getElementById('firstName').value = user.firstName;
      document.getElementById('midName').value = user.midName;
      document.getElementById('lastName').value = user.lastName;
      document.getElementById('age').value = user.age;
      document.getElementById('gender').value = user.gender;
      document.getElementById('DOB').value =new Date(user.DOB).toISOString().slice(0, 10);
      document.getElementById('nationality').value = user.nationality;
      document.getElementById('governorate').value = user.governorate;
      document.getElementById('city').value = user.city;
      document.getElementById('region').value = user.region;
      document.getElementById('address').value = user.address;
      document.getElementById('phone').value = user.phone;
      document.getElementById('club').value = user.club;
      document.getElementById('qualification').value = user.qualification;
      document.getElementById('school').value = user.school;
      document.getElementById('schoolType').value = user.schoolType;
      document.getElementById('college').value = user.college;
      document.getElementById('university').value = user.university;
      document.getElementById('specialization').value = user.specialization;
      document.getElementById('religion').value = user.religion;
      document.getElementById('skin').value = user.skinColor;
      document.getElementById('height').value = user.height;
      document.getElementById('weight').value = user.weight;
      document.getElementById('nameOfTheApplicantGuardian').value = user.nameOfTheApplicantGuardian;
      document.getElementById('relationWithApplicant').value = user.relationWithApplicant;
      document.getElementById('phoneOfGuardian').value = user.phoneOfGuardian;
      document.getElementById('hobbies').value = user.hobbies;
      document.getElementById('address').value = user.address;
      document.getElementById('habbits').value = user.habits;
      document.getElementById('otherInfo').value = user.otherInfo;
      const permanentDiseases = document.querySelector('input[name="permanentDiseases"]');
      if(user.permanentDiseases == true){
         document.getElementById('permanentDiseasesYes').checked = true;
         document.getElementById('permanentDiseasesDetails').value = user.permanentDiseasesDetails;
         permanentDiseases.dispatchEvent(new Event('change'))
      }

      const disability = document.querySelector('input[name="disability"]')
      if(user.disability == true){
         document.getElementById('disabilityYes').checked = true;
         disability.dispatchEvent(new Event('change'))
         document.getElementById('disabilityDetails').value = user.disabilityDetails;
      }

      const car = document.querySelector('input[name="car"]')
      if(user.car == true){
         document.getElementById('carYes').checked = true;
         car.dispatchEvent(new Event('change'))
         document.getElementById('carTypeDetails').value = user.carType;
         document.getElementById('carModelDetails').value = user.carModel;
      }

      const apartment = document.querySelector('input[name="apartment"]')
      if(user.apartment == true){
         document.getElementById('apartmentYes').checked = true;
         apartment.dispatchEvent(new Event('change'))
         document.getElementById('apartmentSpaceDetails').value = user.space;
         document.getElementById('apartmentSiteDetails').value = user.site;
      }

      const businessOwner = document.querySelector('input[name="businessOwner"]')
      if(user.businessOwner == true){
         document.getElementById('businessOwnerYes').checked = true;
         businessOwner.dispatchEvent(new Event('change'))
         document.getElementById('businessType').value = user.businessType;
      }

      const job = document.querySelector('input[name="job"]')
      if(user.job == true){
         document.getElementById('jobYes').checked = true;
         job.dispatchEvent(new Event('change'));
         document.getElementById('jobTitleDetails').value = user.jobTitle;
         document.getElementById('jobCompanyDetails').value = user.jobCompany;
      }

      if(user.marriedNow == true)
         document.getElementById('marriedNowYes').checked = true;

      if(user.marriedBefore == true)
         document.getElementById('marriedBeforeYes').checked = true;
      
      const children = document.querySelector('input[name="children"]')
      if(user.children == true){
         document.getElementById('childrenYes').checked = true;
         children.dispatchEvent(new Event('change'));
         document.getElementById('numberOfChildrenDetails').value = user.numberOfChildren;
         document.getElementById('agesOfChildrenDetails').value = user.agesOfChildren;
      }

      if(user.livingAbroad == true)
         document.getElementById('livingAbroadYes').checked = true;

      const stringArray = user.languages[0];
      const arrayOfObjects = JSON.parse(stringArray);

      for(let i = 1; i < arrayOfObjects.length; i++) 
         addLanguageButton.dispatchEvent(new Event('click'))
      
      const langs = document.querySelectorAll('.language');
      const langsArray = [...langs]
      const levels = document.querySelectorAll('.level');
      const levelsArray = [...levels]
      for(let i = 0; i < langsArray.length; i++) {
         langsArray[i].value = arrayOfObjects[i].language;
         levelsArray[i].value = arrayOfObjects[i].level;
      }
   }
}
getWarning()

//-------------------------------------------------------------------------------------------------------------------
// fetch user data
const userApi = async () => {
   const response = await fetch(`http://localhost:3000/api/v1/user/profile`, {
      method: 'GET',
      headers: {
         "Content-Type": "application/json",

      },
      credentials: 'include'
   })
   if (!response.ok) {
      const errorData = await response.json(); // Parse JSON error data
      const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
      error.innerHTML = messages;
      throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
   }
   const message = await response.json();
   console.log(message)
   return message;
}

//-------------------------------------------------------------------------------------------------------------------
// fetch user data
function convertDate(dateString) {
   // Split the date string into components (month, day, year)
   const [year, month, day] = dateString.split("/");

   // Create a Date object with the extracted components (month is 0-indexed)
   const dateObject = new Date(year, month - 1, day);

   // Format the date object according to the desired format
   // const formattedDate = dateObject.toISOString().slice(0, 23); // Include milliseconds and set timezone to +00:00
console.log(dateObject)
   return dateObject;
}