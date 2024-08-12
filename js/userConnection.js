const connectContainer = document.getElementById("connect-container");
const connectButton = document.getElementById("notConnected");
const onConnect = document.getElementById("connected");
const queryString = window.location.search;
const age = document.getElementById("age");
const governorate = document.getElementById("governorate");
const address = document.getElementById("address");
const qualification = document.getElementById("qualification");
const schoolType = document.getElementById("schoolType");
const college = document.getElementById("college");
const religion = document.getElementById("religion");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const habbits = document.getElementById("habbits");
const otherInfo = document.getElementById("otherInfo");
const car = document.getElementById("car");
const apartment = document.getElementById("apartment");
const jobTitle = document.getElementById("jobTitle");
const faceImageProfile = document.getElementById("faceImageProfile");
const faceImage = document.getElementById("faceImage");
const fullImage1 = document.getElementById('fullImage1');
const fullImage2 = document.getElementById('fullImage2');
const fullImage3 = document.getElementById('fullImage3');
const fullImage4 = document.getElementById('fullImage4');
const fullImage5 = document.getElementById('fullImage5');
const DOB = document.getElementById('DOB');
const nationality = document.getElementById('nationality');
const city = document.getElementById('city');
const region = document.getElementById('region');
const club = document.getElementById('club');
const school = document.getElementById('school');
const university = document.getElementById('university');
const specialization = document.getElementById('specialization');
const languagesContainer = document.getElementById('languagesContainer');
const skinColor = document.getElementById('skinColor');
const permanentDiseases = document.getElementById('permanentDiseases')
const permanentDiseasesDetails = document.getElementById('permanentDiseasesDetails');
const disability = document.getElementById('disability')
const disabilityDetails = document.getElementById('disabilityDetails');
const carType = document.getElementById('carType');
const carModel = document.getElementById('carModel');
const space = document.getElementById('space');
const site = document.getElementById('site');
const businessOwner = document.getElementById('businessOwner')
const businessType = document.getElementById('businessType');
const job = document.getElementById('job')
const jobCompany = document.getElementById('jobCompany');
const marriedBefore = document.getElementById('marriedBefore')
const marriedNow = document.getElementById('marriedNow')
const children = document.getElementById('children')
const numberOfChildren = document.getElementById('numberOfChildren');
const agesOfChildren = document.getElementById('agesOfChildren');
const hobbies = document.getElementById('hobbies');
const livingAbroad = document.getElementById('livingAbroad')
//-------------------------------------------------------------------------------------------------------------------
// fetch user data
const fetchData = async () => {
   const res = await fetch(`http://localhost:3000/api/v1/user/timeline/${id}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
      credentials: "include",
   });
   if (!res.ok) {
      const errorData = await response.json();
      const messages = errorData?.message || ["Unknown error"];
      throw new Error(`Error during verify: ${messages}`);
   }
   const data = await res.json();
   faceImageProfile.src = data.faceImage;
   age.innerHTML = data.age;
   governorate.innerHTML = data.governorate;
   qualification.innerHTML = data.qualification;
   schoolType.innerHTML = data.schoolType;
   college.innerHTML = data.college;
   religion.innerHTML = data.religion;
   height.innerHTML = data.height;
   weight.innerHTML = data.weight;
   habbits.innerHTML = data.habits;
   otherInfo.innerHTML = data.otherInfo;
   otherInfo.innerHTML = data.otherInfo;
   otherInfo.innerHTML = data.otherInfo;
   faceImage.src = data.faceImage;
   DOB.innerHTML = formatDate(data.DOB);
   nationality.innerHTML = data.nationality;
   city.innerHTML = data.city;
   region.innerHTML = data.region;
   club.innerHTML = data.club;
   school.innerHTML = data.school;
   university.innerHTML = data.university;
   specialization.innerHTML = data.specialization;
   const stringArray = data.languages[0];
   const arrayOfObjects = JSON.parse(stringArray);

   for (let i = 0; i < arrayOfObjects.length; i++) {
      const language = document.createElement('div');
      language.innerHTML = arrayOfObjects[i].language;
      const level = document.createElement('div');
      level.innerHTML = arrayOfObjects[i].level;
      const cont = document.createElement('div');
      cont.classList.add("languageContainer");
      cont.appendChild(language);
      cont.appendChild(level);
      cont.style.paddingRight = '5px';
      languagesContainer.appendChild(cont);
   }
   skinColor.innerHTML = data.skinColor;
   if (data.permanentDiseases == false) {
      permanentDiseases.innerHTML = "لا";
      permanentDiseasesDetails.innerHTML = "لا يوجد";
   } else {
      permanentDiseases.innerHTML = "نعم";
      permanentDiseasesDetails.innerHTML = data.permanentDiseasesDetails;
   }

   if (data.disability == false) {
      disability.innerHTML = "لا";
      disabilityDetails.innerHTML = "لا يوجد";
   } else {
      disability.innerHTML = "نعم";
      disabilityDetails.innerHTML = data.disabilityDetails;
   }
   if (data.car == false) {
      car.innerHTML = "لا";
      carModel.innerHTML = "لا يوجد";
      carType.innerHTML = "لا يوجد";
   } else {
      car.innerHTML = "نعم";
      carModel.innerHTML = data.carModel;
      carType.innerHTML = data.carType;
   }
   if (data.apartment == false) {
      apartment.innerHTML = "لا";
      space.innerHTML = "لا يوجد";
      site.innerHTML = "لا يوجد";
   } else {
      apartment.innerHTML = "نعم";
      space.innerHTML = data.space;
      site.innerHTML = data.site;
   }
   if (data.businessOwner == false) {
      businessOwner.innerHTML = "لا";
      businessType.innerHTML = "لا يوجد";
   } else {
      businessOwner.innerHTML = "نعم";
      businessType.innerHTML = data.businessType;
   }

   if (data.job == false) {
      job.innerHTML = "لا";
      jobTitle.innerHTML = "لا يوجد";
      jobCompany.innerHTML = "لا يوجد";
   } else {
      job.innerHTML = "نعم";
      jobTitle.innerHTML = data.jobTitle;
      jobCompany.innerHTML = data.jobCompany;
   }
   data.marriedBefore == false ?
      marriedBefore.innerHTML = "لا"
      : marriedBefore.innerHTML = "نعم";

   data.marriedNow == false ?
      marriedNow.innerHTML = "لا"
      : marriedNow.innerHTML = "نعم";

   if (data.children == false) {
      children.innerHTML = "لا";
      numberOfChildren.innerHTML = "لا يوجد";
      agesOfChildren.innerHTML = "لا يوجد";
   } else {
      children.innerHTML = "نعم";
      numberOfChildren.innerHTML = data.numberOfChildren;
      agesOfChildren.innerHTML = data.agesOfChildren;
   }
   hobbies.innerHTML = data.hobbies;
   data.livingAbroad == false ?
      livingAbroad.innerHTML = "لا"
   :  livingAbroad.innerHTML = "نعم";
   
   if (data.car == true) car.innerHTML = "يوجد";
   else car.innerHTML = "لا يوجد";
   if (data.apartment == true) apartment.innerHTML = "يوجد";
   else apartment.innerHTML = "لا يوجد";
   data.fullImage1 ?
      fullImage1.innerHTML =
      `
   <div class="col-lg-3 col-md-4 label"> صورة كاملة</div>
   <div class="col-lg-9 col-md-8 col-sm-12">
      <img  src="${data.fullImage1}" id="img1" class="img-fluid" alt="">
   </div>
   `
      : fullImage1.style.display = 'none'
   data.fullImage2 ?
      fullImage2.innerHTML =
      `
   <div class="col-lg-3 col-md-4 label"> صورة كاملة</div>
   <div class="col-lg-9 col-md-8">
      <img  src="${data.fullImage2}" id="img2" class="img-fluid" alt="">
   </div>
   `
      : fullImage2.style.display = 'none'
   data.fullImage3 ?
      fullImage3.innerHTML =
      `
   <div class="col-lg-3 col-md-4 label"> صورة كاملة</div>
   <div class="col-lg-9 col-md-8">
      <img  src="${data.fullImage3}" id="img3" class="img-fluid" alt="">
   </div>
   `
      : fullImage3.style.display = 'none'
   data.fullImage4 ?
      fullImage4.innerHTML =
      `
   <div class="col-lg-3 col-md-4 label"> صورة كاملة</div>
   <div class="col-lg-9 col-md-8">
      <img  src="${data.fullImage4}" id="img4" class="img-fluid" alt="">
   </div>
   `
      : fullImage4.style.display = 'none'
   data.fullImage5 ?
      fullImage5.innerHTML =
      `
   <div class="col-lg-3 col-md-4 label"> صورة كاملة</div>
   <div class="col-lg-9 col-md-8">
      <img  src="${data.fullImage5}" id="img5" class="img-fluid" alt="">
   </div>
   `
      : fullImage5.style.display = 'none'
   zoomIn()
};

//-------------------------------------------------------------------------------------------------------------------
// Extract id using substring and split
if (queryString) {
   const urlParams = new URLSearchParams(queryString.substring(1));
   id = urlParams.get("id");
   fetchData();
} else {
   console.warn("No query string present in the URL");
}


//-----------------------------------------------------------------------------------------
// zoom in image

function zoomIn() {
   const imageModal = document.getElementById('imageModal');
   const imageFirstModal = document.getElementById('imageFirstModal');
   const fullImageModal1 = document.getElementById('fullImageModal1');
   const fullImageModal2 = document.getElementById('fullImageModal2');
   const fullImageModal3 = document.getElementById('fullImageModal3');
   const fullImageModal4 = document.getElementById('fullImageModal4');
   const fullImageModal5 = document.getElementById('fullImageModal5');

   const modalImage = document.getElementById('modalImage');
   const modalFirstImage = document.getElementById('modalFirstImage');
   const modalFullImage1 = document.getElementById('modalFullImage1');
   const modalFullImage2 = document.getElementById('modalFullImage2');
   const modalFullImage3 = document.getElementById('modalFullImage3');
   const modalFullImage4 = document.getElementById('modalFullImage4');
   const modalFullImage5 = document.getElementById('modalFullImage5');


   const closeButton = document.querySelectorAll('.close-button');

   if (document.getElementById('img1')) {
      const img1 = document.getElementById('img1');
      img1.addEventListener('click', () => {
         modalFullImage1.src = img1.src;
         fullImageModal1.style.display = 'block';
      });
   }
   if (document.getElementById('img2')) {
      const img2 = document.getElementById('img2');
      img2.addEventListener('click', () => {
         modalFullImage2.src = img2.src;
         fullImageModal2.style.display = 'block';
      });
   }
   if (document.getElementById('img3')) {
      const img3 = document.getElementById('img3');
      img3.addEventListener('click', () => {
         modalFullImage3.src = img3.src;
         fullImageModal3.style.display = 'block';
      });
   }
   if (document.getElementById('img4')) {
      const img4 = document.getElementById('img4');
      img4.addEventListener('click', () => {
         modalFullImage4.src = img4.src;
         fullImageModal4.style.display = 'block';
      });
   }
   if (document.getElementById('img5')) {
      const img5 = document.getElementById('img5');
      img5.addEventListener('click', () => {
         modalFullImage5.src = img5.src;
         fullImageModal5.style.display = 'block';
      });
   }
   faceImage.addEventListener('click', () => {
      modalFirstImage.src = faceImage.src;
      imageFirstModal.style.display = 'block';
   });

   closeButton[0].addEventListener('click', () => fullImageModal1.style.display = 'none');
   closeButton[1].addEventListener('click', () => fullImageModal2.style.display = 'none');
   closeButton[2].addEventListener('click', () => fullImageModal3.style.display = 'none');
   closeButton[3].addEventListener('click', () => fullImageModal4.style.display = 'none');
   closeButton[4].addEventListener('click', () => fullImageModal5.style.display = 'none');
   closeButton[5].addEventListener('click', () => imageFirstModal.style.display = 'none');
   closeButton[6].addEventListener('click', () => imageModal.style.display = 'none');
}


//-------------------------------------------------------------------------------------------------------------------
// handle date format
function formatDate(dateString) {
   const date = new Date(dateString);
   const day = date.getDate().toString().padStart(2, '0');
   const month = (date.getMonth() + 1).toString().padStart(2, '0');
   const year = date.getFullYear();
   return `${day}-${month}-${year}`;
}
//-------------------------------------------------------------------------------------------------------------------
// confirm status
const confirmStatus = async () => {
   const res = await fetch(`http://localhost:3000/api/v1/user/confirmConnectionStatus/${id}`,{
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: "include",
   })
   if (!res.ok) {
      const errorData = await res.json();
      const messages = errorData?.message || ["Unknown error"];
      throw new Error(`Error during verify: ${messages}`);
   }
   const message = await res.json();
   console.log(message);
   return message
}

//-------------------------------------------------------------------------------------------------------------------
// remove connection

const removeConnection = async (id) => {
   const res = await fetch(`http://localhost:3000/api/v1/user/connections/${id}/remove`,{
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: "include",
   })
   if (!res.ok) {
      const errorData = await res.json();
      const messages = errorData?.message || ["Unknown error"];
      throw new Error(`Error during verify: ${messages}`);
   }
   const message = await res.text();
   console.log(message);
}

//-------------------------------------------------------------------------------------------------------------------
// remove connection button
const removeConnectionButton = async () => {
   const removeConnectionButton = document.getElementById('removeConnection');
   if(await confirmStatus() == true){
      const container = document.querySelector('.removeConnection');
      container.innerHTML = `تم تأكيد الطلب <i class="fa-solid fa-check"></i>`;
      container.style.marginTop = "15px";
      container.style.color = "green";
      container.style.fontSize = "20px";
      container.style.fontWeight = "bold";
      removeConnectionButton.style.display = 'none';
   }
   else{
      removeConnectionButton.style.display = 'inline-block';
      removeConnectionButton.addEventListener('click',  async () => {
         if (confirm('هل تريد حذف الاتصال��')) {
            await removeConnection(id)
            window.location.href = 'connections.html';
         }
      })
   }
}
removeConnectionButton()