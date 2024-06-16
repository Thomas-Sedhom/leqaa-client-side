
const openFilter = document.getElementById('openFilter')
const timelineFilterForm = document.getElementById('timeline-filter-form')
const form = {
    apartment: "",
    car: "",
    job: "",
    businessOwner: "",
    marriedBefore: "",
    children: "",
    livingAbroad: "",
    minAge: "",
    maxAge: "",
    governorate: "",
    schoolType: "",
    religion: ""
}
//-------------------------------------------------------------------------------------------------
//open filter toggle
openFilter.addEventListener('click', () => {
    timelineFilterForm.classList.toggle('show-filter');
});

//-------------------------------------------------------------------------------------------------
//fetch timeline
const fetchTimeLine = async (form) => {
    res = await fetch(
        `http://localhost:3000/api/v1/user/timeline?governorate=${form.governorate}&minAge=${form.minAge}&maxAge=${form.maxAge}&apartment=${form.apartment}&car=${form.car}&job=${form.job}&businessOwner=${form.businessOwner}&marriedBefore=${form.marriedBefore}&children=${form.children}&schoolType=${form.schoolType}&religion=${form.religion}&livingAbroad=${form.livingAbroad}`
        ,{
        method: "GET",
        headers:{
            "Content-Type": "application/json",
        },
        credentials: 'include'
    })
    if (!res.ok) {
        const errorData = await response.json(); // Parse JSON error data
        const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
        throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
    }

    const data = await res.json();
    console.log(data)
    return data
}

//-------------------------------------------------------------------------------------------------
//create user card
const createCard = async (form) => {
    const cards = document.getElementById('cards');
    const users = await fetchTimeLine(form);
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }
    users.forEach(user => {
        const card = document.createElement("div");
        card.id = user._id;
        card.classList.add("card", "col-lg-4", "col-md-6", "col-sm-12");
    
        const image = document.createElement("img");
        image.classList.add("card-img-top");
        image.alt = "...";
        image.src = user.fullImage; // Set image source dynamically from user data
    
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
    
        const nationalityTitle = document.createElement("h5");
        nationalityTitle.classList.add("card-title");
        nationalityTitle.textContent = "المحافظة: ";
        const nationalitySpan = document.createElement("span");
        nationalitySpan.id = "nationality";
        nationalitySpan.textContent = user.governorate; // Or fetch specific user's location dynamically
    
        const ageTitle = document.createElement("h5");
        ageTitle.classList.add("card-title");
        ageTitle.textContent = "العمر: ";
        const ageSpan = document.createElement("span");
        ageSpan.id = "age";
        ageSpan.textContent = user.age; // Set age dynamically from user data
    
        const jobTitle = document.createElement("h5");
        jobTitle.classList.add("card-title");
        jobTitle.textContent = "العمل: ";
        const jobSpan = document.createElement("span");
        jobSpan.id = "job";
        if(user.jobTitle == "")
            jobSpan.textContent = "لا يوجد";
        else
            jobSpan.textContent = user.jobTitle;
    
        const detailsButton = document.createElement("a");
        detailsButton.classList.add("btn", "btn-primary");
        detailsButton.id = "user";
        detailsButton.textContent = "تفاصيل اكثر";
        detailsButton.href = `file:///D:/work/seeko/seeko-front/userProfile.html?id=${user._id}`; // Or set a link to a user details page
    
        nationalityTitle.appendChild(nationalitySpan);
        ageTitle.appendChild(ageSpan);
        jobTitle.appendChild(jobSpan);
    
        cardBody.appendChild(nationalityTitle);
        cardBody.appendChild(ageTitle);
        cardBody.appendChild(jobTitle);
        cardBody.appendChild(detailsButton);
    
        card.appendChild(image);
        card.appendChild(cardBody);
    
        // Append the card to a container element (replace with your desired container ID)
        cards.appendChild(card);
    });
}

createCard(form)

//-------------------------------------------------------------------------------------------------
//fetch timeline after filter

const filter = async (form) => {
    res = await fetch(
        `http://localhost:3000/api/v1/user/timeline?governorate=${form.governorate}&minAge=${form.minAge}&maxAge=${form.maxAge}&apartment=${form.apartment}&car=${form.car}&job=${form.job}&businessOwner=${form.businessOwner}&marriedBefore=${form.marriedBefore}&children=${form.children}&schoolType=${form.schoolType}&religion=${form.religion}&livingAbroad=${form.livingAbroad}`
        ,{
        method: "GET",
        headers:{
            "Content-Type": "application/json",
        },
        credentials: 'include'
    })
    if (!res.ok) {
        const errorData = await response.json(); // Parse JSON error data
        const messages = errorData?.message || ["Unknown error"]; // Handle potential missing message
        throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
    }
    const data = await res.json();
    console.log(data)
    return data
}

timelineFilterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    form.apartment = document.querySelector('input[name="apartment"]:checked').value
    form.car = document.querySelector('input[name="car"]:checked').value
    form.job = document.querySelector('input[name="job"]:checked').value
    form.businessOwner = document.querySelector('input[name="businessOwner"]:checked').value
    form.marriedBefore = document.querySelector('input[name="marriedBefore"]:checked').value
    form.children = document.querySelector('input[name="children"]:checked').value
    form.livingAbroad = document.querySelector('input[name="livingAbroad"]:checked').value
    form.minAge = document.getElementById('minAge').value;
    form.maxAge = document.getElementById('maxAge').value;
    form.governorate = document.getElementById('governorate').value;
    form.schoolType = document.getElementById('schoolType').value;
    form.religion = document.getElementById('religion').value;
    createCard(form)
})