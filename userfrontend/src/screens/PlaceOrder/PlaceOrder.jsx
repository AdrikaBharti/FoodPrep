import {useContext,useState,useEffect} from 'react'
import './PlaceOrder.css'
import {StoreContext} from '../../context/StoreContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const PlaceOrder = () => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [data,setData] = useState({
    first_name:"",
    last_name:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zip_code:"",
    country:"",
    phone:""
  })

  const validateForm = () => {
    const newErrors = {};
    if (!data.first_name.trim()) newErrors.first_name = "First name is required";
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Please enter a valid email";
    if (!data.phone.match(/^\d{10}$/)) newErrors.phone = "Phone number must be 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const {getTotalCartAmount,food_list,cartItems,url,token} = useContext(StoreContext);

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    // Special handling for phone number to only allow digits
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      setData({...data, [name]: digitsOnly.slice(0, 10)});
    } else {
      setData({...data, [name]: value});
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      let orderItem = [];
      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = {...item};
          itemInfo.quantity = cartItems[item._id];
          orderItem.push(itemInfo);
        }
      });
      
      let orderData = {
        address: data,
        items: orderItem,
        amount: getTotalCartAmount() + 20
      };
      
      let response = await axios.post(url+"/api/order/place", orderData, {headers: {token}});
      const {session_url} = response.data;
      window.location.replace(session_url);
    } catch (error) {
      console.error("Order submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <div className="input-group">
            <input required
              name="first_name" 
              value={data.first_name} 
              onChange={onChangeHandler} 
              type="text" 
              placeholder='First Name'
            />
            {errors.first_name && <span className="error">{errors.first_name}</span>}
          </div>
          <div className="input-group">
            <input required
              name="last_name" 
              value={data.last_name} 
              onChange={onChangeHandler} 
              type="text" 
              placeholder='Last Name'
            />
          </div>
        </div>
        <div className="input-group">
          <input required
            name="email" 
            value={data.email} 
            onChange={onChangeHandler} 
            type="email" 
            placeholder='Email address'
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="input-group">
          <input required
            name="street" 
            value={data.street} 
            onChange={onChangeHandler} 
            type="text" 
            placeholder='Street'
          />
        </div>
        <div className="multi-fields">
          <div className="input-group">
            <input required
              name="city" 
              value={data.city} 
              onChange={onChangeHandler} 
              type="text" 
              placeholder='City'
            />
          </div>
          <div className="input-group">
            <input required
              name="state" 
              value={data.state} 
              onChange={onChangeHandler} 
              type="text" 
              placeholder='State'
            />
          </div>
        </div>
        <div className="multi-fields">
          <div className="input-group">
            <input required
              name="zip_code" 
              value={data.zip_code} 
              onChange={onChangeHandler} 
              type="text" 
              placeholder='Zip code'
            />
          </div>
          <div className="input-group">
            <input required
              name="country" 
              value={data.country} 
              onChange={onChangeHandler} 
              type="text" 
              placeholder='Country'
            />
          </div>
        </div>
        <div className="input-group">
          <input required
            name="phone" 
            value={data.phone} 
            onChange={onChangeHandler} 
            type="tel" 
            placeholder='Phone'
            maxLength="10"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2 className='title'>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{getTotalCartAmount()+20}</p>
            </div>
          </div>
          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;