import { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ showLogin, setShowLogin }) => {
    const [menu, setMenu] = useState('home');
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate('/');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
            setShowSearch(false);
        }
    };

    return (
        <div className="navbar">
            <Link to='/'><img className='logo' src={assets.logo} alt="Logo" /></Link>

            <ul className='navbar-menu'>
              <Link to='/' className={menu === 'home' ? 'active' : ''} onClick={() => setMenu('home')}>Home</Link>
              <a href='#food-display' className={menu === 'menu' ? 'active' : ''} onClick={() => setMenu('menu')}>Menu</a>
              <a href='#footer' className={menu === 'contact-us' ? 'active' : ''} onClick={() => setMenu('contact-us')}>Contact us</a>
              <Link to='/wishlist' className={menu === 'wishlist' ? 'active' : ''} onClick={() => setMenu('wishlist')}>Wishlist</Link>
            </ul>


            <div className="navbar-right">
              
                {(showSearch || window.innerWidth > 750) && (
                    <form className="navbar-search" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onBlur={() => window.innerWidth <= 750 && setShowSearch(false)}
                            autoFocus={showSearch}
                        />
                    </form>
                )}

                
                {window.innerWidth <= 750 && !showSearch && (
                    <button className="navbar-search-icon" onClick={() => setShowSearch(true)}>🔍</button>
                )}

                <div className="dot-basket">
                    <Link to='/cart'><img src={assets.basket_icon} alt="Cart" /></Link>
                    <div className={getTotalCartAmount() !== 0 ? "dot" : ""}></div>
                </div>

                {!token
                    ? <button onClick={() => setShowLogin(true)}>Sign in</button>
                    : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="Profile" />
                        <ul className='nav-profile-dropdown'>
                            <Link to="/myorders"><img src={assets.bag_icon} alt="Orders" /><p>Orders</p></Link>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="Logout" /><p>Logout</p></li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;
