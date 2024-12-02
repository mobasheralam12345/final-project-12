import { Helmet } from "react-helmet";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg"
import saladImg from "../../../assets/menu/salad-bg.jpg";

const Menu = () => {

    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')

    return (
        <div>
            {/* Dynamic title set korte: Helmet  */}
            <Helmet>
                <title>Foodies Hub|| Menu</title>
            </Helmet>
            <div >
                <SectionTitle
                    subHeading="Don't Miss" heading='Your Offered'>
                </SectionTitle>
            </div>
            <MenuCategory items={offered}></MenuCategory>
            <MenuCategory items={dessert} title='dessert' img={dessertImg}></MenuCategory>
            <MenuCategory items={pizza} title='pizza' img={pizzaImg} ></MenuCategory>
            <MenuCategory items={soup} title='soup' img={soupImg} ></MenuCategory>
            <MenuCategory items={salad} title='salad' img={saladImg} ></MenuCategory>
        </div>
    );
};

export default Menu;