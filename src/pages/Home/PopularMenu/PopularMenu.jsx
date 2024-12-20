import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <section className="mb-12 border-black">
            <SectionTitle   // dynamic sectionTitle set
                heading='From Our Menu'
                subHeading='Popular Items'
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-5">
                {
                    popular.map(item => <MenuItem key={item._id}
                        item={item} >
                    </MenuItem>)
                }
            </div>
            <button className="btn items-center mx-auto btn-outline text-center border-0 border-b-4 mt-4">
                View Full Menu
            </button>

        </section>
    );
};

export default PopularMenu;