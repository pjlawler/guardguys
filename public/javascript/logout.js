async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'}
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

// logout button clicked
document.querySelector('#logout-button').addEventListener('click', logout);
document.querySelector('#vert-logout-button').addEventListener('click', logout);