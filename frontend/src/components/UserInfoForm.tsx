import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/identity.css';

function UserInfoForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: 0,
    gender: '',
    city: '',
    state: '',
    zip: 0,
    netflix: 0,
    amazonPrime: 0,
    disney: 0,
    paramount: 0,
    max: 0,
    hulu: 0,
    appleTv: 0,
    peacock: 0,
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? 1 : 0,
      }));
    } else if (name === 'age' || name === 'zip') {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.age || !formData.city || !formData.gender) {
      setError('Please fill out all required fields.');
      return;
    }

    fetch('https://localhost:5000/Movies/AddUserInfo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          navigate('/register');
        } else {
          res.text().then(setError); // show backend error if available
        }
      })
      .catch(() => {
        setError('Unable to connect to server.');
      });
  };

  const streamingServices = [
    { name: 'netflix', label: 'Netflix' },
    { name: 'amazonPrime', label: 'Amazon Prime' },
    { name: 'disney', label: 'Disney+' },
    { name: 'paramount', label: 'Paramount+' },
    { name: 'max', label: 'Max' },
    { name: 'hulu', label: 'Hulu' },
    { name: 'appleTv', label: 'Apple TV+' },
    { name: 'peacock', label: 'Peacock' },
  ];

  return (
    <div className="container mt-5">
      <div className="form_background">
        <h3 className="mb-4 text-center">Step 1: Tell us about yourself</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Age</label>
              <input
                className="form-control"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Gender</label>
              <input
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">City</label>
              <input
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">State</label>
              <input
                className="form-control"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Zip Code</label>
              <input
                className="form-control"
                name="zip"
                type="number"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 mt-4">
              <h5>Streaming Services</h5>
              {streamingServices.map(({ name, label }) => (
                <div className="form-check form-check-inline" key={name}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={name}
                    name={name}
                    checked={formData[name as keyof typeof formData] === 1}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={name}>
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn-next">
              Next
            </button>
          </div>

          {error && <div className="error mt-3">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default UserInfoForm;
