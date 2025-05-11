// /js/signup-handler.js
document.querySelector('#signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;

    const userData = {
        email: form.email.value,
        password: form.password.value,
        username: form.username.value,
        location: form.location.value,
        terms: form.terms.checked,
    };

    try {
        await window.authFunctions.signUpUser(userData);
        alert('Signup successful! Check your email to confirm.');
        form.reset();
    } catch (err) {
        alert('Signup failed: ' + err.message);
        console.error(err);
    }
});
