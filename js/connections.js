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
const getUserConnections = async () => {
   res = await fetch('http://localhost:3000/api/v1/user/connections', {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
      credentials: 'include'
   })
   const data = await res.json();
   return data
}

//-------------------------------------------------------------------------------------------------------------------

async function createUserCards() {
   const userCardContainer = document.getElementById("cards");
   const users = await getUserConnections()
   console.log(users)

   for (const user of users) {
      const card = document.createElement("div");
      card.classList.add("col-lg-6", "col-md-12", "col-sm-12", "userCard");

      const image = document.createElement("img");
      image.src = user.faceImage || "./images/default-user.png";
      image.alt = `${user.firstName}'s profile picture`;

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image");
      imageContainer.appendChild(image);

      const details = document.createElement("div");
      details.classList.add("details");

      const name = document.createElement("div");
      name.classList.add("name");
      name.textContent = `${user.firstName} ${user.lastName}`;

      const age = document.createElement("div");
      age.classList.add("age");
      age.textContent = `${user.age} العمر`;

      details.appendChild(name);
      details.appendChild(age);

      const button = document.createElement("button");
      button.classList.add("userDetails");
      button.id = "userDetails";

      const link = document.createElement("a");
      link.href = `userConnectionProfile.html?id=${user._id}`
      link.textContent = "تفاصيل اكثر"
      button.appendChild(link);
      card.appendChild(imageContainer);
      card.appendChild(details);
      card.appendChild(button);

      userCardContainer.appendChild(card);
   }
}

createUserCards()