const faceImageProfile = document.getElementById('faceImageProfile');
const accept = document.getElementById('accept');
const reject = document.getElementById('reject');
const queryString = window.location.search;
//-------------------------------------------------------------------------------------------------------------------
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
   const data = await response.json();
   faceImageProfile.src = data.faceImage
}
userApi()

//-------------------------------------------------------------------------------------------------------------------
const getUserConnections = async () => {
   res = await fetch('http://localhost:3000/api/v1/user/sentRequests', {
      method: "GET",
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
   const data = await res.json();
   return data
}

//-------------------------------------------------------------------------------------------------------------------
// createUserCards
async function createUserCards() {
   const userCardContainer = document.getElementById("cards");
   const users = await getUserConnections()
   console.log(users)

   for (const user of users) {
      const card = document.createElement("div");
      card.classList.add("col-lg-6", "col-md-12", "col-sm-12", "userCard");

      const image = document.createElement("img");
      image.src = user.receiver.faceImage || "./images/default-user.png";
      image.alt = `${user.receiver.firstName}'s profile picture`; 

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image");
      imageContainer.appendChild(image);

      const details = document.createElement("div");
      details.classList.add("details");

      const name = document.createElement("div");
      name.classList.add("name");
      name.textContent = `${user.receiver.firstName} ${user.receiver.lastName}`;

      const age = document.createElement("div");
      age.classList.add("age");
      age.textContent = `${user.receiver.age} العمر`;

      details.appendChild(name);
      details.appendChild(age);

      const button = document.createElement("button");
      button.classList.add("userDetails");
      button.id = "userDetails";

      const link = document.createElement("a");
      link.href = `userWaiting.html?id=${user.receiver._id}`
      link.textContent = "تفاصيل اكثر"
      button.appendChild(link);
      card.appendChild(imageContainer);
      card.appendChild(details);
      card.appendChild(button);
      userCardContainer.appendChild(card);
   }
}
createUserCards()
