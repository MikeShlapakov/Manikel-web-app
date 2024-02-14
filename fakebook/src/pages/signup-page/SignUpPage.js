import { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../../data/users.json"
import Alert from "../../alerts/Alert"

const SignUpPage = () => {
  const navigate = useNavigate(); 

  const [usersList, setUsersList] = useState(users)

  const [alertVisible, setAlertVisible] = useState(false); // State to control alert visibility

  const [user, setUser] = useState({
    username: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { id, value, type } = e.target;

    setUser((prevData) => ({
      ...prevData,
      [id]: type === 'file' ? e.target.files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

      // Check if the new user already exists
    const isUserExists = users.some((u) => u.username === user.username);

    if (isUserExists) {
      setAlertVisible(true);
    }
    else{
      const newUser= {
        id: Date.now(), // Use a unique identifier (e.g., timestamp) as an ID
        username: user.username,
        password: user.password,
        nickname: user.nickname, // You might want to use a different field for the nickname
        img: user.profilePicture, // Set a default image or provide a way to upload an image
      };

      setUsersList([...usersList, newUser]);
    }

    console.log(usersList);
    // navigate("/feed")
    
    // Handle form submission or validation logic here
    // console.log('Form submitted:', formData);
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
                <label className="text-center">Sign Up</label>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input type="username" className="form-control" id="username" name="username" onChange={handleChange} required  placeholder="Username" />
                </div>
                <div className="mb-3">
                  <input type="nickname" className="form-control" id="nickname" name="nickname" onChange={handleChange} required  placeholder="Nickname" />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" id="password" name="password" onChange={handleChange} required  placeholder="Password" />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={handleChange} required  placeholder="Confirm Password"  />
                </div>
                <div className="mb-3">
                  <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                  <input type="file" className="form-control" id="profilePicture" name="profilePicture" accept="image/*" onChange={handleChange} />
                </div>
                <div className="d-grid gap-2 col-7 mx-auto mb-3">
                  <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>
                {/* alerts */}
                {alertVisible && (<Alert  message="User already exists! Please choose a different username." type="success" onClose={handleAlertClose}/>)} 
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;