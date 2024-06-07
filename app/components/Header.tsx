import { useAuth } from '../context/AuthContext';

const Header = () => {

    const {isAuthenticated, logout} = useAuth();

    return (
      <header className="py-4 bg-black shadow">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">medium alike</h1>
          <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </header>
    );
  };
  
  export default Header;
  