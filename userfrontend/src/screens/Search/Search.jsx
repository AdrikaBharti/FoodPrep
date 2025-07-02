import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from "../../context/StoreContext";
import FoodItem from '../../components/FoodItem/FoodItem';

const Search = () => {
    const { search } = useLocation();
    const query = new URLSearchParams(search).get('q')?.toLowerCase() || '';

    const { food_list } = useContext(StoreContext);

    const filteredItems = food_list.filter(item =>
        item.name.toLowerCase().includes(query)
    );

    return (
        <div className="SearchBar" >
            {filteredItems.length > 0 ? (
                <div className="food-display-list">
                    {filteredItems.map(item => (
                        <FoodItem
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                            rating={item.rating}
                        />
                    ))}
                </div>
            ) : (
                <p>No results found for "{query}"</p>
            )}
        </div>
    );
};

export default Search;

