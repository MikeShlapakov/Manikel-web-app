import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import Alert from "../../alerts/Alert";
import { login } from '../../Authentication';

function LoginPage(usersList) {

  const navigate = useNavigate(); // Use useNavigate hook

  const [alert, setAlert] = useState(null); // State to control alert

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value} = e.target;
    setUser((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isAuthenticated = login(usersList, user.username, user.password);
    
    // Check if the new user already exists
    if (isAuthenticated) {
      // Handle successful login, such as redirecting to another page
      navigate("/feed")
      return;
    } 
    // Handle failed login, such as displaying an error message
    if (user.username === '' || user.password === ''){
      setAlert(<Alert  message="Please fill out all fields." type="warning"/>);
    }
    else{
      setAlert(<Alert  message="User not found! Please check username and password." type="error"/>);
    }
  };

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h2 className="text-primary text-center">Fakebook</h2>
          </div>
          <div className="card-body">
          <div className="d-grid mb-3">
                  <label className="text-center">Login</label>
                </div>
            <form onSubmit={handleSubmit}>
              <div className="d-grid gap-2 col-10 mx-auto mb-3">
                <input type="text" className="form-control" id="username" title="username" onChange={handleChange} required placeholder="Username" />
              </div>
              <div className="d-grid gap-2 col-10 mx-auto mb-3">
                <input type="password" className="form-control" id="password" title="password" onChange={handleChange} required placeholder="Password" />
              </div>
              <div className="d-grid gap-2 col-7 mx-auto mb-3">
                <button type="submit" className="btn btn-primary" title="Login-btn">Login</button>
              </div>
              {alert} 
              <div className="mt-3 text-center">
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default LoginPage;
