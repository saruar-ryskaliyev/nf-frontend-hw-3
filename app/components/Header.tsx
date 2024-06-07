
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`py-4 shadow ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">medium alike</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
          {isAuthenticated && (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
