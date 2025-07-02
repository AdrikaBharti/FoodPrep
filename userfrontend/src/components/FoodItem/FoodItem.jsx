import { useContext } from 'react';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 

const FoodItem = ({ id, name, description, price, image }) => {
    const {
        cartItems,
        addToCart,
        removeFromCart,
        url,
        wishlistItems,
        toggleWishlist,
    } = useContext(StoreContext);

    const isWishlisted = wishlistItems[id]; 

    return (
        <div className='food-item'>
            <div className="food-item-image-container">
                <img className='food-item-image' src={`${url}/image/${image}`} alt={name} />

              
                <div className="wishlist-icon" onClick={() => toggleWishlist(id)}>
                    {isWishlisted ? (
                        <FaHeart color="red" size={20} />
                    ) : (
                        <FaRegHeart color="gray" size={20} />
                    )}
                </div>

            
                {
                    !cartItems[id]
                        ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="add" />
                        : <div className="food-item-counter">
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="remove" />
                            <p className='food-count'>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="add" />
                        </div>
                }
            </div>

            <div className="food-item-info">
                <p className='food-item-name'>{name}</p>
                <p className='food-item-desc'>{description}</p>
                <div className="food-item-price-rating">
                    <p className='food-item-price'>₹{price}</p>
                    <img src={assets.rating_starts} alt="rating" />
                </div>
            </div>
        </div>
    );
};

export default FoodItem;
