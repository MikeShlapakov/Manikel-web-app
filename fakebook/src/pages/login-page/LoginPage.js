import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate(); // Use useNavigate hook

  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
                  <label className="text-center">Login</label>
                </div>
            <form onSubmit={handleSubmit}>
            <div className="d-grid gap-2 col-10 mx-auto mb-3">
                <input type="username" className="form-control" id="username" onChange={handleChange} placeholder="Username" />
              </div>
              <div className="d-grid gap-2 col-10 mx-auto mb-3">
                <input type="password" className="form-control" id="password" onChange={handleChange} placeholder="Password" />
              </div>
              <div className="d-grid gap-2 col-7 mx-auto">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
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
