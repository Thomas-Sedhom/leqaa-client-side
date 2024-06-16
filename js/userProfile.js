const connectContainer = document.getElementById("connect-container")
const connectButton = document.getElementById('notConnected');
const onConnect = document.getElementById('connected');
const queryString = window.location.search;

const age = document.getElementById('age');
const governorate = document.getElementById('governorate');
const address = document.getElementById('address');
const qualification = document.getElementById('qualification');
const schoolType = document.getElementById('schoolType');
const college = document.getElementById('college');
const religion = document.getElementById('religion');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const habbits = document.getElementById('habbits');
const otherInfo = document.getElementById('otherInfo');
const car = document.getElementById('car')
const apartment = document.getElementById('apartment')
const jobTitle = document.getElementById('jobTitle');
const faceImage =  document.getElementById('faceImageProfile');

const checkConnect = async (id) => {
    const res = await fetch(`http://localhost:3000/api/v1/user/findConnection/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include'
    })
    if (!res.ok) {
		const errorData = await response.json();
		const messages = errorData?.message || ["Unknown error"]
		throw new Error(`Error during verify: ${messages}`); // Handle errors gracefully
	}
    const data = await res.text();
    console.log(data)
    if(data == 'not_connected'){
        connectContainer.style.display = 'static';
        onConnect.style.display = 'none';
    }else if(data == 'connected'){
        onConnect.removeAttribute('style');
        connectContainer.style.display = 'none';
        onConnect.innerHTML = 'in your connection'
        const icon = document.createElement('i');
        icon.classList.add("fa-solid")
        icon.classList.add("fa-check")
        onConnect.appendChild(icon)
    }else if(data == 'pending'){
        onConnect.removeAttribute('style');
        connectContainer.style.display = 'none';
        onConnect.innerHTML = 'pending connection'
        const icon = document.createElement('i');
        icon.classList.add("fa-solid")
        icon.classList.add("fa-spinner")
        onConnect.appendChild(icon)
    }
}

//-------------------------------------------------------------------------------------------------------------------
// send friend request
connectButton.addEventListener("click", async () => {
    const res = await fetch(`http://localhost:3000/api/v1/user/timeline/${id}/sendRequest`,{
        method: "GET",
        headers:{
            "Content-Type": "application/json",
        },
        credentials: 'include'
    })
    if (!res.ok) {
		const errorData = await response.json();
		const messages = errorData?.message || ["Unknown error"]
		throw new Error(`Error during verify: ${messages}`); // Handle errors gracefully
	}
    const data = await res.text();
    console.log(data)
    await checkConnect(id)
})

//-------------------------------------------------------------------------------------------------------------------
// fetch user data
const fetchData = async () =>{
    const res = await fetch(`http://localhost:3000/api/v1/user/timeline/${id}`,{
        method: "GET",
        headers:{
            "Content-Type": "application/json",
        },
        credentials: 'include'
    })
    if (!res.ok) {
		const errorData = await response.json();
		const messages = errorData?.message || ["Unknown error"]
		throw new Error(`Error during verify: ${messages}`); // Handle errors gracefully
	}
    const data = await res.json();
    console.log(data)
    faceImage.src = data.faceImage
    age.innerHTML = data.age
    governorate.innerHTML = data.governorate
    address.innerHTML = data.address
    qualification.innerHTML = data.qualification
    schoolType.innerHTML = data.schoolType
    college.innerHTML = data.college
    religion.innerHTML = data.religion
    height.innerHTML = data.height
    weight.innerHTML = data.weight
    habbits.innerHTML = data.habbits
    otherInfo.innerHTML = data.otherInfo
    if(data.car == true)
        car.innerHTML = "يوجد";
    else
        car.innerHTML = "لا يوجد"
    if(data.apartment == true)
        apartment.innerHTML = "يوجد"
    else 
        apartment.innerHTML = "لا يوجد"
    jobTitle.innerHTML = data.jobTitle

}

//-------------------------------------------------------------------------------------------------------------------
// Extract id using substring and split
if (queryString) {
	const urlParams = new URLSearchParams(queryString.substring(1));
	id = urlParams.get('id');
    console.log(id)
    checkConnect(id)
    fetchData()
} else {
	console.warn('No query string present in the URL');
}
