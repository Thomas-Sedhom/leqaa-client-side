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
const governorates = document.querySelectorAll(".item-label")

//-------------------------------------------------------------------------------------------------
//fetch timeline
const fetchTimeLine = async (form) => {
    console.log(form)
    res = await fetch(
        `http://localhost:3000/api/v1/user/timeline?governorate=${form.governorate}&minAge=${form.minAge}&maxAge=${form.maxAge}&apartment=${form.apartment}&car=${form.car}&job=${form.job}&businessOwner=${form.businessOwner}&marriedBefore=${form.marriedBefore}&children=${form.children}&schoolType=${form.schoolType}&religion=${form.religion}&livingAbroad=${form.livingAbroad}`
        , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
    if (!res.ok) {
        const errorData = await response.json();
        const messages = errorData?.message || ["Unknown error"];
        throw new Error(`Error during signup: ${messages}`);
    }

    const data = await res.json();
    console.log(data);
    return data
}

//-------------------------------------------------------------------------------------------------
//create user card
const createCard = async (form) => {

    const sender = document.querySelector(".sender");
    const receiver = document.querySelector(".receiver");
    const cards = document.getElementById('cards');
    const receiverCards = document.getElementById('receiverCards')
    const senderCards = document.getElementById('senderCards')
    const users = await fetchTimeLine(form);
    while (cards.firstChild)
        cards.removeChild(cards.firstChild);
    while (receiverCards.firstChild)
        receiverCards.removeChild(receiverCards.firstChild);
    while (senderCards.firstChild)
        senderCards.removeChild(senderCards.firstChild);
    const shuffledTimelineUsers = shuffleArray(users.timelineUsers)
    shuffledTimelineUsers.forEach(user => {
        // console.log(user)
        const card = document.createElement("div");
        card.id = user._id;
        card.classList.add("card", "col-lg-4", "col-md-6", "col-sm-12");

        const image = document.createElement("img");
        image.classList.add("card-img-top");
        image.alt = "...";
        image.src = user.fullImage1;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const nationalityTitle = document.createElement("h5");
        nationalityTitle.classList.add("card-title");
        nationalityTitle.textContent = "المحافظة: ";
        const nationalitySpan = document.createElement("span");
        nationalitySpan.id = "nationality";
        nationalitySpan.textContent = user.governorate;

        const ageTitle = document.createElement("h5");
        ageTitle.classList.add("card-title");
        ageTitle.textContent = "العمر: ";
        const ageSpan = document.createElement("span");
        ageSpan.id = "age";
        ageSpan.textContent = user.age;

        const jobTitle = document.createElement("h5");
        jobTitle.classList.add("card-title");
        jobTitle.textContent = "العمل: ";
        const jobSpan = document.createElement("span");
        jobSpan.id = "job";
        if (user.jobTitle == "" && user.businessType == "")
            jobSpan.textContent = "لا يوجد";
        else if(user.jobTitle != "")
            jobSpan.textContent = user.jobTitle;
        else
            jobSpan.textContent = user.businessType;

        const detailsButton = document.createElement("a");
        detailsButton.classList.add("btn", "btn-primary");
        detailsButton.id = "user";
        detailsButton.textContent = "تفاصيل اكثر";
        detailsButton.href = `userProfile.html?id=${user._id}`;

        nationalityTitle.appendChild(nationalitySpan);
        ageTitle.appendChild(ageSpan);
        jobTitle.appendChild(jobSpan);

        cardBody.appendChild(nationalityTitle);
        cardBody.appendChild(ageTitle);
        cardBody.appendChild(jobTitle);
        cardBody.appendChild(detailsButton);

        card.appendChild(image);
        card.appendChild(cardBody);
        cards.appendChild(card);
    });
    if (users.pendingSenderConnections.length > 0) {
        sender.style.display = 'block';
    }
    if (users.pendingReciverConnections.length > 0) {
        receiver.style.display = 'block';
    }
    users.pendingSenderConnections.sort((a, b) => {
        if (!a.requestDate) return 1;
        if (!b.requestDate) return -1;
        return new Date(b.requestDate) - new Date(a.requestDate);
    });
    users.pendingSenderConnections.forEach(user => {
        const card = document.createElement("div");
        card.id = user._id;
        card.classList.add("card", "col-lg-3", "col-md-6", "col-sm-12");

        const image = document.createElement("img");
        image.classList.add("card-img-top");
        image.alt = "...";
        image.src = user.user.fullImage1;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const nationalityTitle = document.createElement("h5");
        nationalityTitle.classList.add("card-title");
        nationalityTitle.textContent = "المحافظة: ";
        const nationalitySpan = document.createElement("span");
        nationalitySpan.id = "nationality";
        nationalitySpan.textContent = user.user.governorate;

        const ageTitle = document.createElement("h5");
        ageTitle.classList.add("card-title");
        ageTitle.textContent = "العمر: ";
        const ageSpan = document.createElement("span");
        ageSpan.id = "age";
        ageSpan.textContent = user.user.age;

        const dateTitle = document.createElement("h5");
        dateTitle.classList.add("card-title");
        dateTitle.textContent = "تاريخ الارسال: ";
        const dateSpan = document.createElement("span");
        dateSpan.id = "date";
        dateSpan.textContent = user.requestDate;

        const jobTitle = document.createElement("h5");
        jobTitle.classList.add("card-title");
        jobTitle.textContent = "العمل: ";
        const jobSpan = document.createElement("span");
        jobSpan.id = "job";
        if (user.user.jobTitle == "" && user.user.businessType == "")
            jobSpan.textContent = "لا يوجد";
        else if(user.user.jobTitle != "")
            jobSpan.textContent = user.user.jobTitle;
        else
            jobSpan.textContent = user.user.businessType;

        const detailsButton = document.createElement("a");
        detailsButton.classList.add("btn", "btn-primary");
        detailsButton.id = "user";
        detailsButton.textContent = "تفاصيل اكثر";
        detailsButton.href = `userRequest.html?id=${user.user._id}`;

        nationalityTitle.appendChild(nationalitySpan);
        ageTitle.appendChild(ageSpan);
        dateTitle.appendChild(dateSpan);
        jobTitle.appendChild(jobSpan);

        cardBody.appendChild(dateTitle);
        cardBody.appendChild(nationalityTitle);
        cardBody.appendChild(ageTitle);
        cardBody.appendChild(jobTitle);
        cardBody.appendChild(detailsButton);

        card.appendChild(image);
        card.appendChild(cardBody);

        senderCards.appendChild(card);
    });
    users.pendingReciverConnections.sort((a, b) => {
        if (!a.requestDate) return 1;
        if (!b.requestDate) return -1;
        return new Date(b.requestDate) - new Date(a.requestDate);
    });
    users.pendingReciverConnections.forEach(user => {
        const card = document.createElement("div");
        card.id = user._id;
        card.classList.add("card", "col-lg-3", "col-md-6", "col-sm-12");

        const image = document.createElement("img");
        image.classList.add("card-img-top");
        image.alt = "image";
        image.src = user.user.fullImage1;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const nationalityTitle = document.createElement("h5");
        nationalityTitle.classList.add("card-title");
        nationalityTitle.textContent = "المحافظة: ";
        const nationalitySpan = document.createElement("span");
        nationalitySpan.id = "nationality";
        nationalitySpan.textContent = user.user.governorate;

        const dateTitle = document.createElement("h5");
        dateTitle.classList.add("card-title");
        dateTitle.textContent = "تاريخ الارسال: ";
        const dateSpan = document.createElement("span");
        dateSpan.id = "date";
        dateSpan.textContent = user.requestDate;

        const ageTitle = document.createElement("h5");
        ageTitle.classList.add("card-title");
        ageTitle.textContent = "العمر: ";
        const ageSpan = document.createElement("span");
        ageSpan.id = "age";
        ageSpan.textContent = user.user.age;

        const jobTitle = document.createElement("h5");
        jobTitle.classList.add("card-title");
        jobTitle.textContent = "العمل: ";
        const jobSpan = document.createElement("span");
        jobSpan.id = "job";
        if (user.user.jobTitle == "")
            jobSpan.textContent = "لا يوجد";
        else
            jobSpan.textContent = user.user.jobTitle;

        const detailsButton = document.createElement("a");
        detailsButton.classList.add("btn", "btn-primary");
        detailsButton.id = "user";
        detailsButton.textContent = "تفاصيل اكثر";
        detailsButton.href = `userProfile.html?id=${user.user._id}`;

        nationalityTitle.appendChild(nationalitySpan);
        ageTitle.appendChild(ageSpan);
        jobTitle.appendChild(jobSpan);
        dateTitle.appendChild(dateSpan);

        cardBody.appendChild(dateTitle);
        cardBody.appendChild(nationalityTitle);
        cardBody.appendChild(ageTitle);
        cardBody.appendChild(jobTitle);
        cardBody.appendChild(detailsButton);

        card.appendChild(image);
        card.appendChild(cardBody);

        receiverCards.appendChild(card);
    });
}

createCard(form)

//-------------------------------------------------------------------------------------------------
//fetch timeline after filter

const filter = async (form) => {
    console.log(form)
    res = await fetch(
        `http://localhost:3000/api/v1/user/timeline?governorate=${form.governorate}&minAge=${form.minAge}&maxAge=${form.maxAge}&apartment=${form.apartment}&car=${form.car}&job=${form.job}&businessOwner=${form.businessOwner}&marriedBefore=${form.marriedBefore}&children=${form.children}&schoolType=${form.schoolType}&religion=${form.religion}&livingAbroad=${form.livingAbroad}`
        , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
    if (!res.ok) {
        const errorData = await response.json();
        const messages = errorData?.message || ["Unknown error"];
        throw new Error(`Error during signup: ${messages}`);
    }
    const data = await res.json();
    console.log(data)
    return data
}

timelineFilterForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let govs = [], schos = [];
    if(governorate[governorate.length - 1])
        governorate[governorate.length - 1].forEach(gov => {
            govs.push(gov.value)
        })
    if(schoolsTypes[schoolsTypes.length - 1])
        schoolsTypes[schoolsTypes.length - 1].forEach(scho => {
            schos.push(scho.value)
        })
    form.apartment = document.querySelector('input[name="apartment"]:checked').value
    form.car = document.querySelector('input[name="car"]:checked').value
    form.job = document.querySelector('input[name="job"]:checked').value
    form.businessOwner = document.querySelector('input[name="businessOwner"]:checked').value
    form.marriedBefore = document.querySelector('input[name="marriedBefore"]:checked').value
    form.children = document.querySelector('input[name="children"]:checked').value
    form.livingAbroad = document.querySelector('input[name="livingAbroad"]:checked').value
    form.minAge = document.getElementById('minAge').value;
    form.maxAge = document.getElementById('maxAge').value;
    form.governorate = govs;
    form.schoolType = schos;
    form.religion = document.getElementById('religion').value;
    createCard(form)
})

//-------------------------------------------------------------------------------------------------
//shuffle array 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}