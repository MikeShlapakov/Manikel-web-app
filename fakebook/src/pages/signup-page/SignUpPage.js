import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate(); // Use useNavigate hook

  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/feed")
    // Handle form submission or validation logic here
    // console.log('Form submitted:', formData);
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
                  <input type="text" className="form-control" id="username" name="username" onChange={handleChange} required  placeholder="Username" />
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
                <div className="d-grid gap-2 col-7 mx-auto">
                  <button type="submit" className="btn btn-primary">Sign Up</button>
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