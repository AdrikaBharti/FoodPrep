import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import './Wishlist.css'
const Wishlist = () => {
  const { food_list, wishlistItems, url } = useContext(StoreContext);

  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      <div className="wishlist-items">
        {food_list.map((food) =>
          wishlistItems[food._id] ? (
            <div className="wishlist-card" key={food._id}>
              <img src={`${url}/image/${food.image}`} alt={food.name} />
              <p className="foodName">{food.name}</p>
              <p className="Price">₹{food.price}</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Wishlist;
