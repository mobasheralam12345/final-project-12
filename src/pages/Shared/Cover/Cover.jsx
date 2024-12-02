// import { Parallax } from 'react-parallax';

const Cover = ({  title }) => {
    return (
        // <Parallax
        //     blur={{ min: -15, max: 15 }}
        //     bgImage={img}
        //     bgImageAlt="the menu"
        //     strength={-200}
        // >
            <div className=" w-full mt-4"> {/* Adjust the margin-top to match navbar height */}
                <div className=" bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold uppercase text-black mx-auto text-center ml-10 ">{title}</h1>
                        <p className="mb-5 text-red-600"></p>
                    </div>
                </div>
            </div>
        // </Parallax>
    );
};

export default Cover;
