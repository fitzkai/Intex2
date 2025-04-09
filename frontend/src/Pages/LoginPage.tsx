import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import '../css/identity.css';
import '@fortawesome/fontawesome-free/css/all.css';

function LoginPage() {
  // state variables for email and passwords
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);

  // state variable for error messages
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // handle change events for input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === 'checkbox') {
      setRememberme(checked);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  // handle submit event for the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const loginUrl = rememberme
      ? 'https://index2-4-8-backend-bwe2c5c2a3dzfhdd.eastus-01.azurewebsites.net/login?useCookies=true'
      : 'https://index2-4-8-backend-bwe2c5c2a3dzfhdd.eastus-01.azurewebsites.net/login?useSessionCookies=true';

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include', // ✅ Ensures cookies are sent & received
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Ensure we only parse JSON if there is content
      let data = null;
      try {
        data = await response.json();
      } catch (err) {
        // It's okay — maybe there's no JSON response
        console.warn('No JSON body returned from login.');
      }

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      // Build recommender payload (you can store this data in session/context too)
      const recommenderPayload = {
        age: data.age, // assuming your backend sends back age, gender, etc.
        gender: data.gender,
        platforms: {
          Netflix: data.netflix ? 1 : 0,
          'Amazon Prime': data.amazonPrime ? 1 : 0,
          Hulu: data.hulu ? 1 : 0,
          'Disney+': data.disney ? 1 : 0,
          'Apple TV+': data.appleTv ? 1 : 0,
          'Paramount+': data.paramount ? 1 : 0,
          Peacock: data.peacock ? 1 : 0,
          Max: data.max ? 1 : 0,
        },
        genres: ['Action', 'Comedies', 'Dramas', 'Fantasy', 'Family'], // Or let user choose
      };

      // Fetch recommendations from Flask
      const recRes = await fetch('http://localhost:5050/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recommenderPayload),
      });

      if (!recRes.ok) {
        throw new Error('Could not load recommendations.');
      }

      const recData = await recRes.json();

      // Navigate to recommendations page with data
      navigate('/recommendations', {
        state: { recommendations: recData.recommendations },
      });
    } catch (error: any) {
      setError(error.message || 'Error logging in.');
      console.error('Fetch attempt failed:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card border-0 shadow rounded-3 ">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">
              Sign In
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="rememberme"
                  name="rememberme"
                  checked={rememberme}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="rememberme">
                  Remember password
                </label>
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  onClick={handleRegisterClick}
                >
                  Register
                </button>
              </div>
              <hr className="my-4" />
              <div className="d-grid mb-2">
                <button
                  className="btn btn-google btn-login text-uppercase fw-bold"
                  type="button"
                >
                  <i className="fa-brands fa-google me-2"></i> Sign in with
                  Google
                </button>
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-facebook btn-login text-uppercase fw-bold"
                  type="button"
                >
                  <i className="fa-brands fa-facebook-f me-2"></i> Sign in with
                  Facebook
                </button>
              </div>
            </form>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
