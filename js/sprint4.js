// check auth

const checkAuth = async () => {
   const response = await fetch(`http://localhost:3000/api/v1/auth/getSprintsStatus`, {
      method: 'GET',
      headers: {
         "Content-Type": "application/json",
      },
      credentials: 'include'
   })
   if (!response.ok) {
      const errorData = await response.json();
      const messages = errorData?.message || ["Unknown error"];
      error.innerHTML = messages;
      throw new Error(`Error during checkAuth: ${messages}`);
   }
	const message = await response.json();
	if(message.sprint3 == false)
		window.location.href = "sprint3.html";
	else if(message.sprint2 == false)
		window.location.href = "sprint2.html";
	else if(message.sprint1 == false)
		window.location.href = "sprint1.html";
}
checkAuth()
//----------------------------------------------------------------------------------------------------------

let fullImages = [], updatedImages = [];

const addLanguageButton = document.getElementById('addLanguageButton');
const completeRegistration = document.querySelector('.completeRegistration');
const loadingBody = document.querySelector('.loadingBody');

const initialLanguageSection = languagesSection.querySelector('.language-section');

addLanguageButton.addEventListener('click', () => {
   const newLanguageSection = initialLanguageSection.cloneNode(true);

   const newLanguageInputs = newLanguageSection.querySelectorAll('select');
   newLanguageInputs.forEach((input, index) => {
      const newInputName = input.name.replace(/\[[0-9]+\]/, `[${languagesSection.children.length}]`);
      input.name = newInputName;
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

counter = 1;
const fullImageSection = document.getElementById('fullImageSection')
const addFullImage = document.getElementById('addFullImage');
const initialFullImageSection = fullImageSection.querySelector('.image-section');
addFullImage.addEventListener('click', () => {
   const newFullImageSection = initialFullImageSection.cloneNode(true);
   newFullImageSection.querySelector('.preview').id = `fullImagePreview${counter++}`
   if(newFullImageSection.querySelector('.preview').children.length > 0)
      newFullImageSection.querySelector('.preview').removeChild(newFullImageSection.querySelector('.preview').firstChild);
   newFullImageSection.querySelector('label').setAttribute('for',`fullImage${counter}`)
   console.log(newFullImageSection.querySelector('label'))
   const newFullImageInput = newFullImageSection.querySelector('input');
   newFullImageInput.id = `fullImage${counter}`
   newFullImageInput.value = null;

   const removeButton = document.createElement('button');
   removeButton.type = 'button';
   removeButton.classList.add('removeFullImageButton');
   removeButton.textContent = 'Remove';
   removeButton.style.display = 'block'
   removeButton.addEventListener('click', () => {
      fullImageSection.removeChild(newFullImageSection);
      if(fullImageSection.children.length < 5)
         addFullImage.disabled = false

   });
   newFullImageSection.appendChild(removeButton);
   fullImageSection.appendChild(newFullImageSection)

   const fullImageInputs = Array.from(document.querySelectorAll("input[type='file'].fullImage"));
   fullImageInputs.forEach((input, index) => {
      input.addEventListener("change", (event) => {
         const previewElement = document.createElement('img');
         const previewDiv = input.closest('.image-section').querySelector('.preview');
         const updatedPreviewElement = displayImagePreview(input, previewElement);
         while (previewDiv.firstChild) {
            previewDiv.removeChild(previewDiv.firstChild);
         }
         previewDiv.appendChild(updatedPreviewElement);
      });
   });
   if(fullImageSection.children.length == 5)
      addFullImage.disabled = true
})
const fullImageInputs = Array.from(document.querySelectorAll("input[type='file'].fullImage"));
fullImageInputs.forEach((input, index) => {
   input.addEventListener("change", (event) => {
      const previewElement = document.createElement('img');
      const previewDiv = input.closest('.image-section').querySelector('.preview');
      const updatedPreviewElement = displayImagePreview(input, previewElement);
      while (previewDiv.firstChild) 
         previewDiv.removeChild(previewDiv.firstChild);
      previewDiv.appendChild(updatedPreviewElement);
   });
});

idImageInput.addEventListener('change', () => {
   const previewElement = document.createElement('img');
   const updatedPreviewElement = displayImagePreview(idImageInput, previewElement);
   while (idImagePreview.firstChild) {
      idImagePreview.removeChild(idImagePreview.firstChild);
      console.log(document.getElementById('idImage').files[0])
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
      const language = section.querySelector(`select[name="languages[${i}].language"]`).value;
      const level = section.querySelector(`select[name="languages[${i}].level"]`).value;
      languages.push({ language, level });
   });
   const response = await fetch('http://localhost:3000/api/v1/auth/sprint4', {
      method: 'POST',
      body: formData,
      credentials: 'include',
   })
   const message = await response.json()
   if (!response.ok || message.status == 400 ) {
      const messages = message?.message || ["Unknown error"];

      error.innerHTML = messages;
      error.style.paddingTop = "20px";
      error.style.paddingBottom = "20px";
      error.style.fontSize = "25px";
      completeRegistration.style.display = 'block';
      loadingBody.style.display = 'none';
      throw new Error(`Error during signup: ${messages}`);
   } else {
      error.innerHTML = "";
      window.location.href =
      `wating.html`;
   }
   return message;
}  
const completeRegistrationForm = document.getElementById("completeRegistration");
completeRegistrationForm.addEventListener("submit", async (e) => {

   e.preventDefault();
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
      const language = section.querySelector(`select[name="languages[${i}].language"]`).value;
      const level = section.querySelector(`select[name="languages[${i}].level"]`).value;

      languages.push({ language, level });
   });
   const faceImage = document.getElementById('faceImage').files[0];
   const idImage = document.getElementById('idImage').files[0];
   const fullImageInputs = Array.from(document.querySelectorAll("input[type='file'].fullImage"));
   let full = [null, null, null, null, null];
   fullImageInputs.forEach((input, index) => {
      const previewImg = input.closest('.image-section').querySelector('.preview img');
      if(previewImg)
         if(fullImages.includes(previewImg.src)){
            const i = fullImages.indexOf(previewImg.src)
            full[i] = undefined;
         }
   });
   fullImageInputs.forEach((input, index) => {
      const previewImg = input.closest('.image-section').querySelector('.preview img');
      if(previewImg)
         if(!fullImages.includes(previewImg.src))
            for(let i = 0; i < 5; i++){
               if(full[i] === null) {full[i] = input.files[0]; break;}; 
            }
   });
   const formData = new FormData();
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
   formData.append('livingAbroad', livingAbroad);
   formData.append('fullImage1', full[0]);
   formData.append('fullImage2', full[1]);
   formData.append('fullImage3', full[2]);
   formData.append('fullImage4', full[3]);
   formData.append('fullImage5', full[4]);

   if (faceImage != undefined)
      formData.append('faceImage', faceImage);
   if (idImage !== undefined) 
      formData.append('idImage', idImage);
      completeRegistration.style.display = 'none';
      loadingBody.style.display = 'grid';
      await completeRedData(formData);
})

const warnings = document.getElementById('warning');
const getWarning = async () => {
   const response = await fetch('http://localhost:3000/api/v1/auth/warning', {
      method: 'GET',
      credentials: 'include',
   })
   const data = await response.text();
   if (data != "") {
      warnings.innerHTML = `
      <span style = "color: black">برجاء استيفاء تلك الملاحظات:</span>
      <br>
      ${data}
      `;
      warnings.style.display = "block";
      const user = await userApi();
      if(user.fullImage1 != null){
         fullImages.push(user.fullImage1);
         updatedImages.push(user.fullImage1);
      }
      if(user.fullImage2 != null){
         fullImages.push(user.fullImage2);
         updatedImages.push(user.fullImage2);
      }
      if(user.fullImage3 != null){
         fullImages.push(user.fullImage3);
         updatedImages.push(user.fullImage3);
      }
      if(user.fullImage4 != null){
         fullImages.push(user.fullImage4);
         updatedImages.push(user.fullImage4);
      }
      if(user.fullImage5 != null){
         fullImages.push(user.fullImage5);
         updatedImages.push(user.fullImage5);
      }
      for(let i = 0; i < fullImages.length - 1; i++ )
         addFullImage.dispatchEvent(new Event('click'))
      const fullImageInputs = Array.from(document.querySelectorAll("input[type='file'].fullImage"));
      fullImageInputs.forEach((input, index) => {
         const previewElement = document.createElement('img');
         const previewDiv = input.closest('.image-section').querySelector('.preview');
         input.required = false;
         previewElement.src = fullImages[index];
         while (previewDiv.firstChild) 
            previewDiv.removeChild(previewDiv.firstChild);
         previewDiv.appendChild(previewElement);
      });

      const previewElement1 = document.createElement('img');
      const previewElement2 = document.createElement('img');

      previewElement1.src = user.faceImage
      faceImagePreview.appendChild(previewElement1)
      document.getElementById('faceImage').required = false;

      previewElement2.src = user.idImage
      idImagePreview.appendChild(previewElement2)
      document.getElementById('idImage').required = false;

      const permanentDiseases = document.querySelector('input[name="permanentDiseases"]');
      if (user.permanentDiseases == true) {
         document.getElementById('permanentDiseasesYes').checked = true;
         document.getElementById('permanentDiseasesDetails').value = user.permanentDiseasesDetails;
         permanentDiseases.dispatchEvent(new Event('change'))
      }

      const disability = document.querySelector('input[name="disability"]')
      if (user.disability == true) {
         document.getElementById('disabilityYes').checked = true;
         disability.dispatchEvent(new Event('change'))
         document.getElementById('disabilityDetails').value = user.disabilityDetails;
      }

      const car = document.querySelector('input[name="car"]')
      if (user.car == true) {
         document.getElementById('carYes').checked = true;
         car.dispatchEvent(new Event('change'))
         document.getElementById('carTypeDetails').value = user.carType;
         document.getElementById('carModelDetails').value = user.carModel;
      }

      const apartment = document.querySelector('input[name="apartment"]')
      if (user.apartment == true) {
         document.getElementById('apartmentYes').checked = true;
         apartment.dispatchEvent(new Event('change'))
         document.getElementById('apartmentSpaceDetails').value = user.space;
         document.getElementById('apartmentSiteDetails').value = user.site;
      }

      const businessOwner = document.querySelector('input[name="businessOwner"]')
      if (user.businessOwner == true) {
         document.getElementById('businessOwnerYes').checked = true;
         businessOwner.dispatchEvent(new Event('change'))
         document.getElementById('businessType').value = user.businessType;
      }

      const job = document.querySelector('input[name="job"]')
      if (user.job == true) {
         document.getElementById('jobYes').checked = true;
         job.dispatchEvent(new Event('change'));
         document.getElementById('jobTitleDetails').value = user.jobTitle;
         document.getElementById('jobCompanyDetails').value = user.jobCompany;
      }

      if (user.marriedNow == true)
         document.getElementById('marriedNowYes').checked = true;

      if (user.marriedBefore == true)
         document.getElementById('marriedBeforeYes').checked = true;

      const children = document.querySelector('input[name="children"]')
      if (user.children == true) {
         document.getElementById('childrenYes').checked = true;
         children.dispatchEvent(new Event('change'));
         document.getElementById('numberOfChildrenDetails').value = user.numberOfChildren;
         document.getElementById('agesOfChildrenDetails').value = user.agesOfChildren;
      }

      if (user.livingAbroad == true)
         document.getElementById('livingAbroadYes').checked = true;

      const stringArray = user.languages[0];
      const arrayOfObjects = JSON.parse(stringArray);

      for (let i = 1; i < arrayOfObjects.length; i++)
         addLanguageButton.dispatchEvent(new Event('click'))

      const langs = document.querySelectorAll('.language');
      const langsArray = [...langs]
      const levels = document.querySelectorAll('.level');
      const levelsArray = [...levels]
      for (let i = 0; i < langsArray.length; i++) {
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
      const errorData = await response.json();
      const messages = errorData?.message || ["Unknown error"];
      error.innerHTML = messages;
      throw new Error(`Error during signup: ${messages}`);
   }
   const message = await response.json();
   return message;
}

//-------------------------------------------------------------------------------------------------------------------
// fetch user data
function convertDate(dateString) {
   const [year, month, day] = dateString.split("/");
   const dateObject = new Date(year, month - 1, day);
   return dateObject;
}
