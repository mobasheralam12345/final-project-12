import FoodCard from "../../../components/FoodCard/FoodCard";

const OrderTab = ({items}) => {
  
    return (
        <div className="grid grid-cols-3 gap-5 my-12">
            {
                items.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
            }
        </div>
    );
};

export default OrderTab;