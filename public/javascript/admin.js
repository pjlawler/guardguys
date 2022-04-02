
const data = [
    {
        username: "Pat",
        password: "pass1234",
        email: "pat@guardguys.com"
    },
    {
        username: "Charlie",
        password: "pass1234",
        email: "charlie@guardguys.com"
    },
    {
        username: "Elizabeth",
        password: "pass1234",
        email: "elizabeth@guardguys.com"
    },
    {
        username: "Wendy",
        password: "pass1234",
        email: "wendy@guardguys.com"
    },
    {
        username: "Young",
        password: "pass1234",
        email: "young@guardguys.com"
    }]

async function create_users(user_data) {
    const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify(user_data),
            headers: {'Content-Type':'application/json'}
    })
    if(response.ok) {
        const data = response.json();
        console.log('success');
        return data;
        }
        else {
            console.log('error')
            return false;
        }
}

function init() {
    data.forEach(user => {
        create_users(user);
    })
}



init();