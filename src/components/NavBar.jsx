import { Link } from "react-router-dom"
// import '../css/NavBar.css'
import { useAuth } from "../contexts/AuthContext"

function NavBar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="navbar bg-white dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
         <div className="navbar-brand">
            <Link to="/">Movie App</Link>
          </div>
  
          <div className="navbar-links items-center justify-between hidden w-full md:flex md:w-auto" id="navbar-sticky">
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
                <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">Home</Link>
            </li>
          
            <li>
               <Link to="/favorites" className="nav-lblock py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700ink">Favorites</Link>
            </li>
            </ul>
          </div>
           <div class="flex justify-center space-x-4 ">
              {user ? (
              <>
                <span className="nav-user text-white">{user.email}</span>
                <a onClick={signOut} className="nav-link btn-link">Logout</a>
              </>
            ) : (
              <>
                <Link to="/login" type="button" className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <span className="text-white">Login</span>
                </Link>
                
                <Link to="/signup" type="button" className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <span className="text-white">Sign Up</span>
                </Link>
              </>
            )}
          </div>
          
      </div>
         
    </nav>
  )
}
export default NavBar
