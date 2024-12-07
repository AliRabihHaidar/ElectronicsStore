var form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    // get email, name and message
    var email = document.getElementById('email').value;
    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;
    // send post request to backend
    fetch('/contact/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, name: name, message: message })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    // clear inputs
    document.getElementById('email').value = '';
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
    alert('Form submitted successfully!');
});