const Name = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const contactForm = document.getElementById('contact-form');

const contactApi = async (email, name, message, contactDate) => {
    const response = await fetch('http://localhost:3000/api/v1/contact/writeMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            name,
            message,
            contactDate
        }),
        credentials: 'include'
    })
	if(!response.ok){
		const errorData = await response.json();
		const messages = errorData?.message || ["unknown error"];
		verificationMessage.innerHTML = messages;
		throw new Error(`Error during signup: ${messages}`);
	}
	const data = await response.text();
	return data;
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailValue = email.value;
    const nameValue = Name.value;
    const message = subject.value;
    const date = new Date().toISOString();
    await contactApi(emailValue, nameValue, message, date);
    alert('Message sent successfully');
    email.value = "";
    Name.value = "";
    subject.value = "";
})