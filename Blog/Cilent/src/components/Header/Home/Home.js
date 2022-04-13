import React from "react";
import { useHistory } from 'react-router-dom';
import Footer from "../../Footer";
import Header from '../../Header';
import ImageSlider from "./ImageSlider";
import { SliderData } from "./SliderData";


export default function Home() {

  let history = useHistory();
  return (

    <div>
      <Header>
        <div className="mt-14">
          <div className="mb-52 h-450 relative">
            <img className="absolute h-550 w-full  "
              src="https://images.unsplash.com/photo-1586227740560-8cf2732c1531?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1561&q=80" />
            <h2 className="   relative   text-7xl pt-64  text-white text-center  font-bold "> Blog Nhà Quê  </h2>
            <p className=" p-8  relative  text-[#ffa400] text-3xl w-[1702px] text-white text-center font-normal uppercase font-sans "> - Create a unique and beautiful blog. It’s easy and free.
              -  </p>
          </div>
          <div className="grid grid-cols-2 my-20 gap-x-35 h-650 ">
            <div className="text-center">
              <div className="">
                <h3 className="mt-20 text-5xl   text-xanhla  font-bold"  > Choose the perfect design.</h3>
                <div className="text-xanhla  border-b-8 rounded-2xl border-xanhla mx-auto mt-2 w-2/12 mb-20 "></div>
              </div>

              <p className="mb-8 text-xl w-9/12 text-xanhla  text-left ml-40"> Create a beautiful blog that fits your style. Choose from a selection of easy-to-use templates.</p>
              <p className="mb-28 text-xanhla text-xl w-9/12  text-left ml-40">  Get paid for your hard work. Google AdSense can automatically display relevant targeted ads on your blog so that you can earn income by posting about your passion.</p>
              <button className=" w-72 rounded-5xl h-16 float-right bg-xanhla  text-center" onClick={
                () => {
                  history.push('/subject')
                }
              } ><p className="text-white text-2xl font-bold  ">Create Your Blog</p></button>
            </div>
            <div className="ml-7 select-none">
              {/* <img src="https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80"
                className="h-600 w-9/12  "/> */}

              <ImageSlider slides={SliderData} />
            </div>
          </div>
          <div className="relative">
            <img className=" absolute -z-1 h-full w-full"
              src="https://images.unsplash.com/photo-1647881105414-8046a26fa949?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
            <div className="grid pt-16 text-white grid-cols-3  gap-x-5 justify-center  text-center px-56 clear-both h-64 mt-12 w-full ">
              <div className=" ">

                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/White_plane_icon.svg/2048px-White_plane_icon.svg.png"
                  className="h-20 select-none w-28  mb-6 block mx-auto" />
                <p className="text-2xl">Create anywhere</p>
              </div>
              <div>
                <img src="https://freesvg.org/img/provider-internet.png"
                  className="h-20 select-none w-28 mb-6 mx-auto" />
                <p className="text-2xl">All Free</p>
              </div>
              <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png"
                  className="h-20 select-none w-28 mb-6 mx-auto" />
                <p className="text-2xl">Professionally</p>
              </div>
            </div>
            <div className="gap-x35 h-72 mt-10 bg-center w-9/12 mx-auto mb-16">

              <div className="col-span-3 my-auto w-full font-medium text-5xl font-serif  text-white uppercase text-center">“ It's been great to lean at my own <br /> pace and from the comfort of paradise ”</div>
            </div>

          </div>

        </div>


      </Header>
      <Footer />
    </div>
  );

}

