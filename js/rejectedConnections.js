const faceImageProfile = document.getElementById('faceImageProfile');
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
      const errorData = await response.json(); // Parse JSON error data
      const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
      error.innerHTML = messages;
      throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
   }
   const data = await response.json();
   faceImageProfile.src = data.faceImage
}
userApi()

//-------------------------------------------------------------------------------------------------------------------
const getUserRejectedConnections = async () => {
   res = await fetch('http://localhost:3000/api/v1/user/rejectedConnections', {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
      credentials: 'include'
   })
   const data = await res.json();
   console.log(data)
   return data
}

//-------------------------------------------------------------------------------------------------------------------

async function createUserCards() {
   const userCardContainer = document.getElementById("cards");
   const users = await getUserRejectedConnections()

   for (const user of users) {
      const card = document.createElement("div");
      card.classList.add("col-lg-6", "col-md-12", "col-sm-12", "userCard");

      const details = document.createElement("div");
      details.classList.add("details");

      const name = document.createElement("div");
      name.classList.add("name");
      name.innerHTML = ` <span class="reqD"> ألاسم:</span> ${user.user.firstName} ${user.user.lastName} ` ;

      const requestDate = document.createElement("div");
      requestDate.classList.add("requestDate");
      requestDate.innerHTML = `${user.requestDate} <span class="reqD"> :تاريخ الارسال </span>`  ;

      const rejectDate = document.createElement("div");
      rejectDate.classList.add("rejectDate");
      rejectDate.innerHTML = `${user.rejectDate} <span class="reqD"> :تاريخ الرفض </span>`;

      details.appendChild(name);
      details.appendChild(requestDate);
      details.appendChild(rejectDate);
      card.appendChild(details);

      userCardContainer.appendChild(card);
   }
}

createUserCards()