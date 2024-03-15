// export const findUser = async (username) => {
//     return 
// }

export async function login (username, password) {
    const users = await getUsers();
    if (!users) return false;
    const user = users.find(user => user.username === username && user.password == password);
    // console.log(user);
    if (!user) return false; // Authentication failed
    return true; // Authentication failed
};

export const logout = () => {
    localStorage.removeItem('loggedInUser');
};

export const getLoggedInUser = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return loggedInUser ? {loggedInUser} : null;
};

export async function getUsers() {
    const users = await fetch('http://localhost:8080/api/users', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(data => data.json())

    // console.log(users);
    return users;
}

export async function getUserByUsername (username) {
    const users = await getUsers();
    if (!users) return null;
    const user = users.find(user => user.username === username);

    // console.log(user);
    if (!user) return null; // Authentication failed
    return user; // Authentication failed
};

// TOKENS
export async function createToken(id) {
    const token = await fetch('http://localhost:8080/api/tokens', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id
        })
    }).then(data => data.json())
    return token;
}

export async function isLoggedIn(token) {
    const result = await fetch('http://localhost:8080/api/tokens/'+ document.getElementById('checklogin1').value, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + token
        },
    }).then(response => {
            return response.json();
        })
        .then(data => {
            if (data) {
                return data;
            }
        })
        .catch(error => {
            console.error('Network error:', error);
        });
    if(result.error){
        console.log(result.error)
    }
    if(result.data){
        console.log(result.data)
    }
    return result
}