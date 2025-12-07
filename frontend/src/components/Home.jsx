import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Mock movie data (replaced The Crown with Narcos for reliable image)
const movies = [
  { id: 1, title: 'Stranger Things', image: 'https://image.tmdb.org/t/p/w300/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg' },
  { id: 2, title: 'Narcos', image: 'https://image.tmdb.org/t/p/w300/6IBaXzqb3n8oUoA4a5n3kZ8gZ8g.jpg' },  // Replaced The Crown
  { id: 3, title: 'Breaking Bad', image: 'https://image.tmdb.org/t/p/w300/ggFHVNu6YYI5L9pCfOacjizRGt.jpg' },
  { id: 4, title: 'The Witcher', image: 'https://image.tmdb.org/t/p/w300/7vjaCdMw15FEbXyLQTVa04URsPm.jpg' },
  { id: 5, title: 'Money Heist', image: 'https://image.tmdb.org/t/p/w300/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg' },
];

// Additional trending movies for the second slider
const trendingMovies = [
  { id: 6, title: 'The Mandalorian', image: 'https://image.tmdb.org/t/p/w300/BbNvKCuEF4SRzFXR16aK6ISFtR.jpg' },
  { id: 7, title: 'Squid Game', image: 'https://image.tmdb.org/t/p/w300/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg' },
  { id: 8, title: 'Wednesday', image: 'https://image.tmdb.org/t/p/w300/9PFonBhy4cQy7Jz20NpMygczOkv.jpg' },
  { id: 9, title: 'The Umbrella Academy', image: 'https://image.tmdb.org/t/p/w300/scZlQQYnDVlnpxFTxaIv2g0BWnL.jpg' },
  { id: 10, title: 'Dark', image: 'https://image.tmdb.org/t/p/w300/apbrbWs8M9lyOpJYU5WXrpFopVh.jpg' },
];

// FAQ data (unchanged)
const faqs = [
  { question: 'What is Netflix?', answer: 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.' },
  { question: 'How much does Netflix cost?', answer: 'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $6.99 to $19.99 a month.' },
  { question: 'Where can I watch?', answer: 'Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device.' },
  { question: 'How do I cancel?', answer: 'Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks.' },
  { question: 'What can I watch on Netflix?', answer: 'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more.' },
];

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);  // For search suggestions
  const [showSuggestions, setShowSuggestions] = useState(false);  // Toggle dropdown
  const [openFaq, setOpenFaq] = useState(null);

  // All movies for search suggestions
  const allMovies = [...movies, ...trendingMovies];

  // Slider settings (responsive breakpoints)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },  // Laptop
      { breakpoint: 768, settings: { slidesToShow: 2 } },   // Tablet
      { breakpoint: 480, settings: { slidesToShow: 1 } },   // Mobile
    ],
  };

  const handleGetStarted = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    navigate('/login');
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);  // Limit to 5 suggestions
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Select a suggestion
  const selectSuggestion = (title) => {
    setSearchQuery(title);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center flex flex-col justify-center items-center animate-fade-in"
        style={{
          backgroundImage: "url('/images/netflix-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 z-10">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png"
            alt="Netflix"
            className="w-32 sm:w-40 h-8 sm:h-10 hover:scale-105 transition-transform mb-4 sm:mb-0"
          />

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Search Bar with Suggestions */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-black bg-opacity-50 border border-gray-600 px-3 py-1 rounded text-white placeholder-gray-400 focus:outline-none focus:border-red-600 w-48 sm:w-56"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1 text-gray-400 hover:text-white"
              >
                🔍
              </button>
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 rounded mt-1 z-20 max-h-40 overflow-y-auto">
                  {suggestions.map((movie) => (
                    <li
                      key={movie.id}
                      onClick={() => selectSuggestion(movie.title)}
                      className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      {movie.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <select className="bg-black text-white border border-gray-600 px-3 py-1 rounded hover:bg-gray-800 transition">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
            </select>
            <button
              onClick={() => navigate('/login')}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 hover:scale-105 transition-all"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Unlimited movies, TV shows, and more.</h2>
          <p className="text-lg sm:text-xl mb-6">Watch anywhere. Cancel anytime.</p>
          <p className="text-base sm:text-lg mb-6">Ready to watch? Enter your email to create or restart your membership.</p>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 p-3 bg-black bg-opacity-50 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-red-600 hover:bg-opacity-70 transition"
            />
            <button
              onClick={handleGetStarted}
              className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 hover:scale-105 transition-all text-lg font-semibold"
            >
              Get Started
            </button>
          </div>
          {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
        </div>
      </div>

      {/* Popular Slider */}
      <div className="py-10 px-4 sm:px-6 animate-fade-in">
        <h3 className="text-xl sm:text-2xl font-bold mb-6">Popular on Netflix</h3>
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} className="px-2">
              <div className="relative group">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg hover:scale-105 transition-transform shadow-lg"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200/000000/FFFFFF?text=Image+Not+Found'; }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center rounded-lg">
                  <button className="bg-red-600 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition">
                    Watch Now
                  </button>
                </div>
              </div>
              <p className="text-center mt-2 text-sm sm:text-base">{movie.title}</p>
            </div>
          ))}
        </Slider>
      </div>

      {/* Trending Slider */}
      <div className="py-10 px-4 sm:px-6 bg-gray-900 animate-fade-in">
        <h3 className="text-xl sm:text-2xl font-bold mb-6">Trending Now</h3>
        <Slider {...settings}>
          {trendingMovies.map((movie) => (
            <div key={movie.id} className="px-2">
              <div className="relative group">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg hover:scale-105 transition-transform shadow-lg"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200/000000/FFFFFF?text=Image+Not+Found'; }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center rounded-lg">
                  <button className="bg-red-600 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition">
                    Watch Now
                  </button>
                </div>
              </div>
              <p className="text-center mt-2 text-sm sm:text-base">{movie.title}</p>
            </div>
          ))}
        </Slider>
      </div>

      {/* More Reasons to Join */}
      <div className="py-10 px-4 sm:px-6 bg-gray-900 animate-fade-in">
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10">More reasons to join</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center hover:scale-105 transition-transform">
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/cards/v2.1/enjoyOnTv/en.png"
              alt="TV"
              className="mx-auto mb-4 w-32 sm:w-40 h-32 sm:h-40 object-contain"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150/000000/FFFFFF?text=TV'; }}
            />
            <h4 className="text-lg sm:text-xl font-semibold mb-2">Enjoy on your TV</h4>
            <p className="text-sm sm:text-base">Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
          </div>
          <div className="text-center hover:scale-105 transition-transform">
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/cards/v2.1/download/en.png"
              alt="Download"
              className="mx-auto mb-4 w-32 sm:w-40 h-32 sm:h-40 object-contain"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150/000000/FFFFFF?text=Download'; }}
            />
            <h4 className="text-lg sm:text-xl font-semibold mb-2">Download your shows to watch offline</h4>
            <p className="text-sm sm:text-base">Save your favorites easily and always have something to watch.</p>
          </div>
          <div className="text-center hover:scale-105 transition-transform">
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/cards/v2.1/watchEverywhere/en.png"
              alt="Watch Anywhere"
              className="mx-auto mb-4 w-32 sm:w-40 h-32 sm:h-40 object-contain"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150/000000/FFFFFF?text=Watch+Anywhere'; }}
            />
            <h4 className="text-lg sm:text-xl font-semibold mb-2">Watch everywhere</h4>
            <p className="text-sm sm:text-base">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-10 px-4 sm:px-6 animate-fade-in">
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h3>
        <div className="max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left bg-gray-800 p-4 rounded hover:bg-gray-700 hover:scale-101 transition-all flex justify-between items-center"
              >
                <span className="text-base sm:text-lg">{faq.question}</span>
                <span>{openFaq === index ? '-' : '+'}</span>
              </button>
              {openFaq === index && (
                <div className="bg-gray-800 p-4 mt-1 rounded-b animate-fade-in">
                  <p className="text-sm sm:text-base">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 bg-black text-gray-400 border-t border-gray-700 animate-fade-in">
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
export default Home;         