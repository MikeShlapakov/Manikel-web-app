export const login = (users, username, password) => {
    const user = users.usersList.find((user) => user.username === username && user.password === password)
    
    if (user) {
      localStorage.setItem('loggedInUser', user.username);
      return true; // Authentication successful
    }
    return false; // Authentication failed
};

export const logout = () => {
    localStorage.removeItem('loggedInUser');
};

export const getLoggedInUser = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return loggedInUser ? {loggedInUser} : null;
};