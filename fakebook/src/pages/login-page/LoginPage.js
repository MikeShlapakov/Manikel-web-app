import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import users from '../../data/users.json'
import Alert from "../../alerts/Alert";

function LoginPage() {
  const navigate = useNavigate(); // Use useNavigate hook

  const [usersList, setUsersList] = useState(users) 

  const [alertVisible, setAlertVisible] = useState(false); // State to control alert visibility

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

      // Check if the new user already exists
    const isUserExists = users.some((u) => (u.username === user.username & u.password === user.password));
    // console.log(user)
    if (!isUserExists) {
      setAlertVisible(true);
    }
    else{
      navigate("/feed")
    }

  };

  const handleAlertClose = () => {
    setAlertVisible(false);
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
                <input type="text" className="form-control" id="username" onChange={handleChange} placeholder="Username" />
              </div>
              <div className="d-grid gap-2 col-10 mx-auto mb-3">
                <input type="password" className="form-control" id="password" onChange={handleChange} placeholder="Password" />
              </div>
              <div className="d-grid gap-2 col-7 mx-auto mb-3">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
              {alertVisible && (<Alert  message="User not found! Please check username and password." type="error" onClose={handleAlertClose}/>)} 
            </form>
            <div className="mt-3 text-center">
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default LoginPage;
