const firstName = document.getElementById('firstName');
const midName = document.getElementById('midName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const gender = document.getElementById('gender');
const DOB = document.getElementById('DOB');
const nationality = document.getElementById('nationality');
const governorate = document.getElementById('governorate');
const city = document.getElementById('city');
const region = document.getElementById('region');
const address = document.getElementById('address');
const phone = document.getElementById('phone');
const club = document.getElementById('club');
const qualification = document.getElementById('qualification');
const school = document.getElementById('school');
const schoolType = document.getElementById('schoolType');
const college = document.getElementById('college');
const university = document.getElementById('university');
const specialization = document.getElementById('specialization');
const religion = document.getElementById('religion');
const skinColor = document.getElementById('skinColor');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const nameOfTheApplicantGuardian = document.getElementById('nameOfTheApplicantGuardian');
const relationWithApplicant = document.getElementById('relationWithApplicant');
const phoneOfGuardian = document.getElementById('phoneOfGuardian');
const hobbies = document.getElementById('hobbies');
const habbits = document.getElementById('habbits');
const otherInfo = document.getElementById('otherInfo');
const permanentDiseases = document.getElementById('permanentDiseases')
const permanentDiseasesDetails = document.getElementById('permanentDiseasesDetails');
const disability = document.getElementById('disability')
const disabilityDetails = document.getElementById('disabilityDetails');
const car = document.getElementById('car')
const carType = document.getElementById('carType');
const carModel = document.getElementById('carModel');
const apartment = document.getElementById('apartment')
const space = document.getElementById('space');
const site = document.getElementById('site');
const businessOwner = document.getElementById('businessOwner')
const businessType = document.getElementById('businessType');
const job = document.getElementById('job')
const jobTitle = document.getElementById('jobTitle');
const jobCompany = document.getElementById('jobCompany');
const marriedBefore = document.getElementById('marriedBefore')
const marriedNow = document.getElementById('marriedNow')
const children = document.getElementById('children')
const numberOfChildren = document.getElementById('numberOfChildren');
const agesOfChildren = document.getElementById('agesOfChildren');
const livingAbroad = document.getElementById('livingAbroad')
const languagesContainer = document.getElementById('languagesContainer');
const faceImage = document.getElementById('faceImageProfile');
const idImage = document.getElementById('idImage');
const manWithIdImage = document.getElementById('manWithIdImage');
const userName = document.getElementById('name');
const connections = document.getElementById('connections');
const profileStatus = document.getElementById('profileStatus');
const profileStatusCont = document.querySelector('.profileStatus');
const registrationDate = document.getElementById('registrationDate')
const fullImage1 =  document.getElementById('fullImage1');
const fullImage2 =  document.getElementById('fullImage2');
const fullImage3 =  document.getElementById('fullImage3');
const fullImage4 =  document.getElementById('fullImage4');
const fullImage5 =  document.getElementById('fullImage5');

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
// read all data from api respond
const completeData = async () => {
    const data = await userApi();
    data.fullImage1 ?
        fullImage1.innerHTML = 
        `
        <div class="col-lg-3 col-md-4 label"> صورة كاملة</div>
        <div class="col-lg-9 col-md-8">
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
    firstName.innerHTML = data.firstName
    midName.innerHTML = data.midName;
    lastName.innerHTML = data.lastName;
    age.innerHTML = data.age;
    gender.innerHTML = data.gender;
    DOB.innerHTML = formatDate(data.DOB);
    nationality.innerHTML = data.nationality;
    governorate.innerHTML = data.governorate;
    city.innerHTML = data.city;
    region.innerHTML = data.region;
    address.innerHTML = data.address;
    phone.innerHTML = data.phone;
    club.innerHTML = data.club;
    qualification.innerHTML = data.qualification;
    school.innerHTML = data.school;
    schoolType.innerHTML = data.schoolType;
    college.innerHTML = data.college;
    university.innerHTML = data.university;
    specialization.innerHTML = data.specialization;
    registrationDate.innerHTML = data.registrationDate;
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
        languagesContainer.appendChild(cont);
    }
    religion.innerHTML = data.religion;
    height.innerHTML = data.height;
    weight.innerHTML = data.weight;
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

    faceImage.src = data.faceImage;
    idImage.src = data.idImage;

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
    if (data.marriedBefore == false) {
        marriedBefore.innerHTML = "لا";
    } else {
        marriedBefore.innerHTML = "نعم";
    }

    if (data.marriedNow == false) {
        marriedNow.innerHTML = "لا";
    } else {
        marriedNow.innerHTML = "نعم";
    }

    if (data.children == false) {
        children.innerHTML = "لا";
        numberOfChildren.innerHTML = "لا يوجد";
        agesOfChildren.innerHTML = "لا يوجد";
    } else {
        children.innerHTML = "نعم";
        numberOfChildren.innerHTML = data.numberOfChildren;
        agesOfChildren.innerHTML = data.agesOfChildren;
    }
    nameOfTheApplicantGuardian.innerHTML = data.nameOfTheApplicantGuardian;
    relationWithApplicant.innerHTML = data.relationWithApplicant;
    phoneOfGuardian.innerHTML = data.phoneOfGuardian;
    hobbies.innerHTML = data.hobbies;
    habbits.innerHTML = data.habits;
    otherInfo.innerHTML = data.otherInfo;

    if (data.livingAbroad == false) {
        livingAbroad.innerHTML = "لا";
    } else {
        livingAbroad.innerHTML = "نعم";
    }
}
completeData()

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
// get user gender

const getGender = async () => {
    const res = await fetch('http://localhost:3000/api/v1/user/gender', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include'
    })
    if (!res.ok) {
        const errorData = await response.json();
        const messages = errorData?.message || ["Unknown error"]; 
        error.innerHTML = messages;
        throw new Error(`Error during signup: ${messages}`); 
    }
    const profileStatus = await res.text();
    return profileStatus;
} 

//-------------------------------------------------------------------------------------------------------------------
// get user status
const getStatus = async () => {
    const res = await fetch('http://localhost:3000/api/v1/user/getProfileStatus', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include'
    })
    if (!res.ok) {
        const errorData = await response.json();
        const messages = errorData?.message || ["Unknown error"]; 
        error.innerHTML = messages;
        throw new Error(`Error during signup: ${messages}`); 
    }
    const profileStatus = await res.text();
    return profileStatus;
} 

//-------------------------------------------------------------------------------------------------------------------
// change user status
const changeUserStatus = async () => {
    const res = await fetch('http://localhost:3000/api/v1/user/changeProfileStatus', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include'
    })
    if (!res.ok) {
        const errorData = await response.json();
        const messages = errorData?.message || ["Unknown error"]; 
        error.innerHTML = messages;
        throw new Error(`Error during signup: ${messages}`); 
    }
    const profileStatus = await res.text();
    return profileStatus;
} 

//-------------------------------------------------------------------------------------------------------------------
// change user status button context

const updateStatusButton = async () => {
    const userGender = await getGender();
    if(userGender == 'انثي'){
        profileStatusCont.style.display = 'block';
        const userStatus = await getStatus();
        if(userStatus == 'false')
            profileStatus.innerHTML = "اخفاء الحساب";
        else
            profileStatus.innerHTML = "اظهار الحساب";
    }
}
updateStatusButton();

//-------------------------------------------------------------------------------------------------------------------
// change user status 

profileStatus.addEventListener('click', async () => {
    await changeUserStatus();
    await updateStatusButton();
})