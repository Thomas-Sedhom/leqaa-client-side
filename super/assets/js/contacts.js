const messageTable = document.getElementById("user-messages");
const error = document.getElementById("error");

const contacts = async () => {
   const response = await fetch("http://localhost:3000/api/v1/contact/messages", {
      method: "Get",
      headers: {
         "Content-Type": "application/json",
      },
   });
   if (!response.ok) {
      const errorData = await response.json(); // Parse JSON error data
      const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
      error.innerHTML = messages;
      throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
   } else {
      error.innerHTML = "";
   }
   const message = await response.json();
   console.log(message)
   createMessageRow(message);
};



function createMessageRow(users) {
   users.forEach(user => {
      const row = document.createElement("tr");

   const usernameCell = document.createElement("td");
   usernameCell.textContent = user.name;
   row.appendChild(usernameCell);

   const emailCell = document.createElement("td");
   emailCell.textContent = user.email;
   row.appendChild(emailCell);

   const messageCell = document.createElement("td");
   messageCell.textContent = user.message;
   row.appendChild(messageCell);

   const actionCell = document.createElement("td");
   const deleteButton = document.createElement("button");
   deleteButton.className = "btn-delete";
   deleteButton.textContent = "Delete";
   deleteButton.addEventListener("click", async() => {
      deleteContact(user._id); 
      row.parentNode.removeChild(row);
   });
   actionCell.appendChild(deleteButton);
   row.appendChild(actionCell);
   messageTable.appendChild(row)
   })
   
}

const deleteContact = async (id) => {
   const response = await fetch(`http://localhost:3000/api/v1/contact/${id}`, {
      method: "Get",
      headers: {
         "Content-Type": "application/json",
      },
   });
   if (!response.ok) {
      const errorData = await response.json(); // Parse JSON error data
      const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
      error.innerHTML = messages;
      throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
   } else {
      error.innerHTML = "";
   }
   const message = await response.json();
   console.log(message)
}



contacts()