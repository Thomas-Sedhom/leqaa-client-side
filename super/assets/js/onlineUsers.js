const usersContainer = document.getElementById("users-container");

async function fetchAllUsers() {
    try {
        const response = await fetch("http://localhost:3000/api/v1/admin/allUsers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });
        if (!response.ok) {
            const errorData = await response.json(); 
            const messages = errorData?.message || ["Unknown error"]; 
            error.innerHTML = messages;
            throw new Error(`Error during signup: ${messages}`); 
        }
        const connections = await response.json();
        console.log(connections)
        const filteredConnections = connections.filter(connection => !connection.password.includes("00000000"));
        return filteredConnections;
    } catch (error) {
        console.error("Error fetching connections:", error);
    }
}

async function createUserRow() {
    const connections = await fetchAllUsers()
    connections.sort((a, b) => {
        if (!a.registrationDate) return 1;
        if (!b.registrationDate) return -1;
        return new Date(b.registrationDate) - new Date(a.registrationDate);
    })
    connections.forEach((user) => {
        const row = document.createElement("tr");
        const firstCell = document.createElement("td");
        const secondCell = document.createElement("td");
        secondCell.textContent = user.phone
        const userLink = document.createElement("a");
        userLink.href = `user.html?id=${user._id}`;
        userLink.textContent = `${user.firstName} ${user.lastName}`
        firstCell.appendChild(userLink)
        const phone = document.createElement("td");
        phone.textContent = `${formatDate(user.registrationDate)}`;
        const login = document.createElement("td");
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Login";
        button.classList.add("btn", "btn-success");
        button.addEventListener('click', async () => {
            await userLogin(user.email);
        });
        login.appendChild(button);
        row.appendChild(firstCell);
        row.appendChild(secondCell);
        row.appendChild(phone)
        row.appendChild(login)
        usersContainer.appendChild(row);
    })
}
createUserRow();

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
// user login logic

const fetchLoginForm = async (email) => {
    console.log(email)
    const response = await fetch('http://localhost:3000/api/v1/auth/emailLogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email }),
        credentials: 'include'
    });
    const res = await response.json();
    if (res.status == 400 || res.statusCode == 400) {
        const messages = res?.message || ["Unknown error"];
        throw new Error(`Error during login: ${messages}`);
    }
    return res;
}

const userLogin = async (email) => {
    const response = await fetchLoginForm(email);
    if (response.role == 'user') {
        if (response.isCompleted == false)
            window.location.href = "../completeRegistration.html";
        else if (response.isApprove == false)
            window.location.href = "../wating.html";
        else if (response.block == true)
            window.location.href = "../block.html";
        else
            window.location.href = "../timeLine.html";
    } else if (response.role == 'admin')
        window.location.href = "../admin/index.html";
    else if (response.role == 'super')
        window.location.href = "../super/index.html";
}

//-------------------------------------------------------------------------------------------------------------------
// filter item input
function filterItems() {
    const filterInput = document.querySelector('.filter-input');
    const filterText = filterInput.value.toLowerCase();
    const users = document.querySelectorAll('#users-container tr td a');
    users.forEach(user => {
        const userName = user.textContent.toLowerCase();
        userName.includes(filterText) ?
            user.parentNode.parentNode.style.display = 'table-row' :
            user.parentNode.parentNode.style.display = 'none';
    });
}
//-------------------------------------------------------------------------------------------------------------------
// export to csv file

function tableToCSV() {

    // Variable to store the final csv data
    let csv_data = [];

    // Get each row data
    let rows = document.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {

        // Get each column data
        let cols = rows[i].querySelectorAll('td,th');
        // Stores each csv row data
        let csvrow = [];
        for (let j = 0; j < cols.length - 1; j++) {
            if (cols[j].firstElementChild)
                csvrow.push(cols[j].firstElementChild.textContent)
            else {
                csvrow.push(cols[j].innerHTML)
            }
        }

        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }

    // Combine each row data with new line character
    csv_data = csv_data.join('\n');

    // Call this function to download csv file  
    downloadCSVFile(csv_data);
}

function downloadCSVFile(csv_data) {

    // Create CSV file object and feed
    // our csv_data into it
    CSVFile = new Blob([csv_data], {
        type: "text/csv"
    });

    // Create to temporary link to initiate
    // download process
    let temp_link = document.createElement('a');

    // Download csv file
    temp_link.download = "GfG.csv";
    let url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to
    // trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
}