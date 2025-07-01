import { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setList(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, [list]);

  const removeFood = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/food/remove?id=${id}`);
      toast(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='list screen flex-col'>
      <p className='list-title'>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p className="list-header-img"><b>Image</b></p>
          <p className="list-header-name"><b>Name</b></p>
          <p className="list-header-category"><b>Category</b></p>
          <p className="list-header-price"><b>Price</b></p>
          <p className="list-header-action"><b>Action</b></p>
        </div>
        {
          list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img className="list-img" src={`${url}/image/${item.image}`} alt="" />
                <p className="list-name">{item.name}</p>
                <p className="list-category">{item.category}</p>
                <p className="list-price">{item.price}</p>
                <p className='cursor list-action' onClick={() => removeFood(item._id)}>X</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default List;
