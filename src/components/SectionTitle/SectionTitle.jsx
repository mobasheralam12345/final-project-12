
const SectionTitle = ({ heading, subHeading }) => {
    return (
        //heading,subheading er majhkhane border dite : border-y-4 
        
        <div className="mx-auto text-center md:w-4/12 my-8">
            <p className="text-yellow-600 mb-4">---{subHeading}---</p>
            <h3 className="text-3xl uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;