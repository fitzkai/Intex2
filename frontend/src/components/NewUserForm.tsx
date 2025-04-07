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
    password: '',
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

    if (!form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');

    try {
      const res = await fetch('https://localhost:5000/register', {
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
    <div className="container">
      <div className="row">
        <div className="card border-0 shadow rounded-3">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">
              Register
            </h5>
            <form onSubmit={handleSubmit}>
              {/* Basic Inputs */}
              {[
                { label: 'Name', name: 'name', type: 'text' },
                { label: 'Phone', name: 'phone', type: 'text' },
                { label: 'Email address', name: 'email', type: 'email' },
                { label: 'Age', name: 'age', type: 'number' },
                { label: 'Gender', name: 'gender', type: 'text' },
                { label: 'City', name: 'city', type: 'text' },
                { label: 'State', name: 'state', type: 'text' },
                { label: 'Zip Code', name: 'zip', type: 'text' },
                { label: 'Password', name: 'password', type: 'password' },
                {
                  label: 'Confirm Password',
                  name: 'confirmPassword',
                  type: 'password',
                },
              ].map(({ label, name, type }) => (
                <div className="form-floating mb-3" key={name}>
                  <input
                    className="form-control"
                    id={name}
                    name={name}
                    type={type}
                    value={(form as any)[name]}
                    onChange={handleChange}
                  />
                  <label htmlFor={name}>{label}</label>
                </div>
              ))}

              {/* Subscription checkboxes */}
              <div className="mb-3">
                <label className="form-label">Streaming Services</label>
                <div className="form-check">
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
                    <div key={platform}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name={platform}
                        id={platform}
                        checked={(form as any)[platform]}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={platform}>
                        {platform.charAt(0).toUpperCase() +
                          platform.slice(1).replace(/([A-Z])/g, ' $1')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="d-grid mb-2">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit"
                >
                  Register
                </button>
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-outline-secondary text-uppercase fw-bold"
                  type="button"
                  onClick={handleLoginClick}
                >
                  Go to Login
                </button>
              </div>
            </form>
            {error && <p className="error text-danger fw-bold">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUserForm;
