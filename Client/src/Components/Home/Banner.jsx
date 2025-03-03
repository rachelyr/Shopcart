import React, {useContext} from "react";
import { FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { SidebarContext } from "../../Context/PopUpContext";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper/modules';
import {Banners} from '../../Data/BannerData';
import {CategoriesData} from '../../Data/CategoriesData';


function Banner() {
    const {setSearch, submitHandler, search} = useContext(SidebarContext);

    return (
        <>
          <div className="bg-main relative">
            <Swiper
              navigation={false}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              speed={2000}
              modules={[Autoplay]}
              slidesPerView={1}
              className="z-0 lg:h-[600px] sm:h-[500px] h-[400px] w-full"
              direction={'vertical'}
              loop={true}
              >
                {Banners.map((item) => (
                    <SwiperSlide key={item?._id}>
                        <img
                          src={item?.image}
                          alt={'Banner'}
                          className="w-full h-full object-cover"
                          />
                    </SwiperSlide>
                ))}
              </Swiper>
              <div className="z-30 bg-black bg-opacity-50 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <div className="container mx-auto lg:px-32 px-4">
                    <div className="flex flex-col gap-4 text-center md:p-16 md:m-14">
                        <h1 className="text-3xl font-semibold md:font-medium text-white">
                            All the assets you need in one place
                        </h1>
                        <p className="text-white sm:text-base text-sm">
                            Shop for fashion, beauty, home and so much more from independent sellers around the world.
                        </p>
                        <form
                          onSubmit={(e) => submitHandler(e)}
                          className="flex-btn flex flex-row gap-2 w-full justify-between bg-white rounded-md overflow-hidden p-2 m-2">
                            <input
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              type="text"
                              placeholder="Search clothing, laptops, smartphones and more..."
                              className="w-11/12 px-4 py-2 border-none outline-none text-sm"
                              />
                                <button
                                  type='submit'
                                  className="bg-main text-white px-4 py-3 rounded-md">
                                    <FaSearch />
                                  </button>
                        </form>
                        <div className="mt-6 w-full hidden sm:flex justify-center items-center flex-wrap gap-4">
                            {CategoriesData?.slice(0, 5).map((item) => (
                                <Link
                                  key={item?._id}
                                  to='/'
                                  className="bg-opacity-20 text-xs py-2 px-4 text-white bg-white rounded-md"
                                  >
                                    {item?.name}
                                  </Link>
                            ))}
                        </div>
                    </div>
                </div>
              </div>
          </div>
        </>
    );
}

export default Banner;