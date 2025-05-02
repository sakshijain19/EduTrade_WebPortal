import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (!isAuthenticated) {
    return null; // Don't show navbar if not authenticated
  }

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-xl">
                EduTrade
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/books"
                  className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Books
                </Link>
                <Link
                  to="/notes"
                  className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Notes
                </Link>
                <Link
                  to="/question-papers"
                  className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Question Papers
                </Link>
                <Link
                  to="/feedback"
                  className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Feedback
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-white mr-4">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-indigo-700 text-white hover:bg-indigo-800 px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 