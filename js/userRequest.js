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
const fullImage = document.getElementById("fullImage");


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
      throw new Error(`Error during verify: ${messages}`); // Handle errors gracefully
   }
   const data = await res.json();
   console.log(data);
   faceImageProfile.src = data.faceImage;
   age.innerHTML = data.age;
   governorate.innerHTML = data.governorate;
   address.innerHTML = data.address;
   qualification.innerHTML = data.qualification;
   schoolType.innerHTML = data.schoolType;
   college.innerHTML = data.college;
   religion.innerHTML = data.religion;
   height.innerHTML = data.height;
   weight.innerHTML = data.weight;
   habbits.innerHTML = data.habbits;
   otherInfo.innerHTML = data.otherInfo;
   otherInfo.innerHTML = data.otherInfo;
   otherInfo.innerHTML = data.otherInfo;
   faceImage.src = data.faceImage;
   fullImage.src = data.fullImage;

   if (data.car == true) car.innerHTML = "يوجد";
   else car.innerHTML = "لا يوجد";
   if (data.apartment == true) apartment.innerHTML = "يوجد";
   else apartment.innerHTML = "لا يوجد";
   jobTitle.innerHTML = data.jobTitle;
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

//-------------------------------------------------------------------------------------------------------------------
// accept user

accept.addEventListener("click", async () => {
   const res = await fetch(`http://localhost:3000/api/v1/user/requests/${id}/accept`,{
      method: "GET",
      headers:{
         "Content-Type": "application/json",
      },
      credentials: 'include'
   });
   if (!res.ok) {
      const errorData = await response.json(); // Parse JSON error data
      const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
      error.innerHTML = messages;
      throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
   }
   window.location.href =
      "file:///D:/work/seeko/seeko-front/receivedConnections.html";
});

//-------------------------------------------------------------------------------------------------------------------
// accept user

reject.addEventListener("click", async () => {
   const res = await fetch(`http://localhost:3000/api/v1/user/requests/${id}/reject`,{
      method: "GET",
      headers:{
         "Content-Type": "application/json",
      },
      credentials: 'include'
   });
   if (!res.ok) {
      const errorData = await response.json(); // Parse JSON error data
      const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
      error.innerHTML = messages;
      throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
   }
   window.location.href =
      "file:///D:/work/seeko/seeko-front/receivedConnections.html";
});


//-----------------------------------------------------------------------------------------
// zoom in image
// console.log(imgCont)
// imgCont.addEventListener("click", () =>{
//    console.log(1)
//    imgCont.classList.toggle("zoomIn")
// })
const imgCont = document.querySelector(".imgCont");
const imgCont2 = document.querySelector(".imgCont2");
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeButton = document.querySelector('.close-button');
const backGr = document.querySelector('.backGr');
const backGr2 = document.querySelector('.backGr2');
imgCont.addEventListener('click', () => {
  modalImage.src = faceImage.src;
  imageModal.style.display = 'block';
  backGr.style.opacity = 0
  backGr2.style.opacity = 0
});
imgCont2.addEventListener('click', () => {
   modalImage.src = fullImage.src;
   imageModal.style.display = 'block';
   backGr.classList.add("op")
   backGr2.classList.add("op")
 });
 
closeButton.addEventListener('click', () => {
  imageModal.style.display = 'none';
  backGr.classList.remove("op")
  backGr2.classList.remove("op")
});

window.addEventListener('click', (event) => {
  if (event.target === imageModal) {
    imageModal.style.display = 'none';
  }
});