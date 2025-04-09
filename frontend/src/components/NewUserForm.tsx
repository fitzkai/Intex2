import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewUserForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    age: 0,
    gender: '',
    city: '',
    state: '',
    zip: '',
    netflix: false,
    amazonPrime: false,
    disney: false,
    paramount: false,
    max: false,
    hulu: false,
    appleTv: false,
    peacock: false,
    passwordHash: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email || !form.passwordHash || !form.confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (form.passwordHash !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');

    try {
      const res = await fetch('https://intex2-4-8-backend-bkh8h0caezhmfhcj.eastus-01.azurewebsites.net/Movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setError('Successful registration. Please log in.');
      } else {
        setError('Error registering.');
      }
    } catch (err) {
      console.error(err);
      setError('Error registering.');
    }
  };

  const handleLoginClick = () => navigate('/login');

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card border-0 shadow rounded-4">
            <div className="card-body p-4 p-md-5">
              <h3 className="card-title text-center mb-4 fw-bold">
                Create Your Account
              </h3>

              <form onSubmit={handleSubmit}>
                {/* First Row: Name + Phone */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-control"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Second Row: Email + Age + Gender */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="age" className="form-label">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      className="form-control"
                      value={form.age}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="gender" className="form-label">
                      Gender
                    </label>
                    <input
                      type="text"
                      id="gender"
                      name="gender"
                      className="form-control"
                      value={form.gender}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Third Row: City + State + Zip */}
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="form-control"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className="form-control"
                      value={form.state}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="zip" className="form-label">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      className="form-control"
                      value={form.zip}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Fourth Row: Passwords */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="passwordHash" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="passwordHash"
                      name="passwordHash"
                      className="form-control"
                      value={form.passwordHash}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Streaming Services */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Streaming Services
                  </label>
                  <div className="row">
                    {[
                      'netflix',
                      'amazonPrime',
                      'disney',
                      'paramount',
                      'max',
                      'hulu',
                      'appleTv',
                      'peacock',
                    ].map((platform) => (
                      <div className="col-md-3" key={platform}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={platform}
                            name={platform}
                            checked={(form as any)[platform]}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={platform}
                          >
                            {platform.charAt(0).toUpperCase() +
                              platform.slice(1).replace(/([A-Z])/g, ' $1')}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit + Login Buttons */}
                <div className="d-grid gap-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg fw-bold text-uppercase"
                  >
                    Register
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg fw-bold text-uppercase"
                    onClick={handleLoginClick}
                  >
                    Go to Login
                  </button>
                </div>
              </form>

              {error && (
                <p className="text-danger fw-semibold mt-3 text-center">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUserForm;
