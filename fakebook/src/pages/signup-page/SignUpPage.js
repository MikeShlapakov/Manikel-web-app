import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import users from "../../data/users.json"
import Alert from "../../alerts/Alert"

const SignUpPage = () => {
  const navigate = useNavigate(); 

  const [usersList, setUsersList] = useState(users)

  const [alert, setAlert] = useState(null); // State to control alert

  const [user, setUser] = useState({
    username: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    profilePicture: '',
  });

  const [strengthMessage, setStrengthMessage] = useState('');

  const isStrongPassword = (password) => {
    // Check if password has at least 8 characters
    if (password.length < 8) {
      return false;
    }

    // Check if password contains at least one letter, one number, and one special character
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Return true if all conditions are met
    return hasLetter && hasNumber && hasSpecialCharacter;
  };

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    if (id === 'password'){
      // Check password strength and set message accordingly
      if (isStrongPassword(value)) {
        setStrengthMessage('Strong Password!');
      } else {
        setStrengthMessage('Password should have at least 8 characters. Including letters, numbers, and special characters.');
      }
    }
    setUser((prevData) => ({
      ...prevData,
      [id]: type === 'file' ? e.target.files[0].name : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the new user already exists
    const isUserExists = users.some((u) => u.username === user.username);

    if (isUserExists) {
      setAlert(<Alert  message="User already exists! Please choose a different username." type="error"/>);
      return;
    }
    if (!isStrongPassword(user.password)){
      setAlert(<Alert  message="You must choose a strong password." type="error"/>);
      return;
    }
    if (user.password !== user.confirmPassword){
      setAlert(<Alert  message="Please make sure that the confirmed password matches the written password." type="warning"/>);
      return;
    }

    const newUser= {
      id: Date.now(), // Use a unique identifier (e.g., timestamp) as an ID
      username: user.username,
      password: user.password,
      nickname: user.nickname,
      img: user.profilePicture,
    };

    setUsersList([...usersList, newUser]);
    navigate("/")
    
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
                <label className="text-center">Sign Up</label>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input type="text" className="form-control" id="username" title="username" onChange={handleChange} required  placeholder="Username" />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" id="nickname" title="nickname" onChange={handleChange} required  placeholder="Nickname" />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" id="password" title="password" onChange={handleChange} required  placeholder="Password" />
                  <p className={strengthMessage==="Strong Password!"? "text-success p-2": "text-danger p-2"}>{strengthMessage}</p>
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" id="confirmPassword" title="confirm" onChange={handleChange} required  placeholder="Confirm Password"  />
                </div>
                <div className="mb-3">
                  <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                  <input type="file" className="form-control" id="profilePicture" title="Picture" accept="image/*" required onChange={handleChange} />
                </div>
                <div className="d-grid gap-2 col-7 mx-auto mb-3">
                  <button type="submit" className="btn btn-primary" title="SignUp-btn">Sign Up</button>
                </div>
                {alert}
                <div className="mt-3 text-center">
                  <p>Back to <Link to="/">Login</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;