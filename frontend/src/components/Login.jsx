import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false); // State for welcome dashboard

  const handleLogin = (e) => {
    e.preventDefault();
    let valid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      setShowWelcome(true); // Show welcome dashboard
    }
  };

  const handleRedirectToHome = () => {
    navigate('/'); // Redirect to home page
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page or show modal
    alert('Forgot password functionality - redirect to reset page');
  };

  const handleSignUp = () => {
    navigate('/signup'); // Assuming a signup route
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 sm:px-6 animate-fade-in">
        {/* Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/netflix-bg.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Welcome Dashboard */}
        <div className="relative z-10 bg-black bg-opacity-80 p-8 sm:p-12 rounded-lg w-full max-w-md shadow-2xl text-center">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png"
            alt="Netflix"
            className="w-32 sm:w-40 h-8 sm:h-10 mx-auto mb-6"
          />
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Welcome back!</h1>
          <p className="text-lg sm:text-xl mb-6">You're now logged in. Enjoy your favorite shows and movies.</p>
          <button
            onClick={handleRedirectToHome}
            className="bg-red-600 text-white py-3 px-6 rounded hover:bg-red-700 hover:scale-105 transition-all font-semibold"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/netflix-bg.jpg')", // Use the same background as home
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Header with Logo */}
      <header className="relative z-10 flex justify-start items-center p-4 sm:p-6">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png"
          alt="Netflix"
          className="w-32 sm:w-40 h-8 sm:h-10 hover:scale-105 transition-transform cursor-pointer"
          onClick={() => navigate('/')} // Navigate to home on logo click
        />
      </header>

      {/* Login Form */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6">
        <div className="bg-black bg-opacity-80 p-8 sm:p-12 rounded-lg w-full max-w-md shadow-2xl animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-red-600 hover:bg-gray-700 transition"
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-red-600 hover:bg-gray-700 transition"
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 hover:scale-105 transition-all font-semibold"
            >
              Login
            </button>
          </form>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mt-4">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-red-600"
              />
              <span>Remember me</span>
            </label>
            <button
              onClick={handleForgotPassword}
              className="text-sm text-gray-400 hover:text-white hover:underline transition"
            >
              Forgot password?
            </button>
          </div>

          {/* OR Separator */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-600" />
            <span className="px-4 text-gray-400">OR</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          {/* Social Login (Additional Functionality) */}
          <div className="space-y-2">
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 hover:scale-105 transition-all flex items-center justify-center space-x-2">
              <i className="fab fa-facebook-f"></i>
              <span>Login with Facebook</span>
            </button>
            <button className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 hover:scale-105 transition-all flex items-center justify-center space-x-2">
              <i className="fab fa-google"></i>
              <span>Login with Google</span>
            </button>
          </div>

          {/* New to Netflix */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              New to Netflix?{' '}
              <button
                onClick={handleSignUp}
                className="text-white hover:underline hover:text-red-500 transition"
              >
                Sign up now.
              </button>
            </p>
          </div>

          {/* reCAPTCHA */}
          <div className="text-center mt-4 text-xs text-gray-500">
            <p>This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
            <button className="text-blue-400 hover:underline hover:text-blue-300 transition">
              Learn more.
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-4 sm:px-6 bg-black text-gray-400 border-t border-gray-700 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-gray-400 mb-4 hover:text-white transition">Questions? Call 1-844-505-2993</h4>
            </div>
            <div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Investor Relations</a></li>
                <li><a href="#" className="hover:text-white transition">Ways to Watch</a></li>
                <li><a href="#" className="hover:text-white transition">Corporate Information</a></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Jobs</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Use</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Account</a></li>
                <li><a href="#" className="hover:text-white transition">Redeem Gift Cards</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Speed Test</a></li>
              </ul>
            </div>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <select className="bg-gray-800 text-gray-400 border border-gray-600 px-3 py-1 rounded hover:bg-gray-700 hover:text-white transition">
              <option>English</option>
              <option>Español</option>
            </select>
            <span>Netflix United States</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
