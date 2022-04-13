import React, { useState } from "react";
import { SliderData } from "./SliderData";

const ImageSlider = ({slides}) => {

    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const handleNextSlide = () => {
        setCurrent( current === length - 1 ? 0 : current + 1  )

    };
    const handlePrevSlide = () => {
        setCurrent( current === 0 ? length - 1 : current - 1)

    };

    return (
        <section className="relative   flex">
            <button
            disabled={slides <= 0}
                onClick={handlePrevSlide}
                className=" absolute z-10 cursor-pointer select-none top-2/4 left-50  flex items-center px-4 py-2 text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
            </button>
           
            <button
            disabled={slides >= length}
                onClick={handleNextSlide}
                className=" absolute top-2/4 right-1/3 z-10 select-none cursor-pointer px-4 py-2 text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
               
            </button>
            {SliderData.map((slide, index) => {

                return (
                    <div className={index === current ? 'opacity-100 duration-1000 ' : 'opacity-0 duration-1000'} key={index}>
                        {index === current && (<img

                            className="h-600 w-9/12  rounded-xl"
                            src={slide.image} alt="appoint ment image" />)}

                    </div>)
            })}
    
        </section>
    );

};
export default ImageSlider;