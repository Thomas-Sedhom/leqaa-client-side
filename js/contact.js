const Name = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const contactForm = document.getElementById('contact-form');

const contactApi = async (email, name, message) => {
    const response = await fetch('http://localhost:3000/api/v1/contact/writeMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            name,
            message
        }),
        credentials: 'include'
    })
    console.log(response)
	if(!response.ok){
		const errorData = await response.json();
		const messages = errorData?.message || ["unknown error"];
		verificationMessage.innerHTML = messages;
		throw new Error(`Error during signup: ${messages}`); // Handle errors gracefully
	}
	const data = await response.text();
	return data;
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailValue = email.value;
    const nameValue = Name.value;
    const message = subject.value;
    await contactApi(emailValue, nameValue, message);
    console.log(emailValue, nameValue, message);
    alert('Message sent successfully');
    email.value = "";
    Name.value = "";
    subject.value = "";
})