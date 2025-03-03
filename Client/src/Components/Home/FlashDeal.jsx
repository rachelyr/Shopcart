import React, {useState} from "react";
import  {MdLocalOffer} from 'react-icons/md';
import Titles from "../Titles";
import {FaShareAlt} from 'react-icons/fa';
import {BsCaretLeftFill, BsCaretRightFill, BsFillEyeFill} from 'react-icons/bs';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Autoplay} from 'swiper/modules';
import ShareMovieModal from "../Modals/ShareMovieModal";  //need to be created
import { useNavigate } from "react-router-dom";
import {OfferLoader} from "../Notifications/Loader";


function FlashDeal({datas, loading}){
    const [modalOpen, setModalOpen] = useState(false);
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);
    const [card, setCard] =useState(null);
    const navigate = useNavigate();

   // const classNames = 'hover:bg-main transitions hover:text-white rounded-full w-10 h-10 flex-col flex bg-subMain text-white'

    const buttons = [
        {
            id: 2,
            title: 'View Card',
            icon: (f) => {
                return <BsFillEyeFill/>;
            },
            onClick: (f) => {
                navigate(`/card/${f?._id}`);
            },
        },
        {
            id: 3,
            title: 'Share Card',
            icon: (f) => {
                return <FaShareAlt/>;
            },
            onClick: (f) => {
                setCard(f);
                setModalOpen(!modalOpen);
            },
        },
    ];

    return (
        <>
          {modalOpen && (
            <ShareMovieModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            card={card}
            />
          )}
          <div className="my-12">
            <Titles title='Flash Deal' Icon={MdLocalOffer}/>
            <div className="mt-10">
                <Swiper
                slidesPerView={4}
                spaceBetween={20}
                navigation={{prevEl, nextEl}}
                speed={1000}
                modules={[Navigation, Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                breakpoints={{
                    0:{
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    649:{
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    1024:{
                        slidesPerView: 3,
                        spaceBetween: 10
                    },
                    1550:{
                        slidesPerView: 4,
                        spaceBetween: 10
                    },
                }}
                >
                    {
                    loading || !datas?.length === 0
                    ? Array.from(Array(10).keys()).map((p, i) => (
                        <SwiperSlide key={i}>
                            <OfferLoader />
                        </SwiperSlide>
                    ))
                    :

                    datas?.map((f) =>(
                        <SwiperSlide key={f?._id}>
                            <div className="rounded-lg z-10 group hover:shadow-lg transitions overflow-hidden relative">
                                <div>
                                    <img
                                    alt={f?.title}
                                    src={
                                        f?.images?.length > 0
                                        ? f?.images[0]
                                        : 'https://via.placeholder.com/150'
                                        }
                                    onClick={() => navigate(`/card/${f?._id}`)
                                    }
                                    className="w-full transitions h-full object-cover"
                                    />
                                    <div className="absolute top-3 text-xs py-1 px-3 font-bold left-3 bg-flash rounded">
                                        {f?.salesOffer?.discount}% OFF
                                    </div>
                                </div>
                                <div className="hidden md:absolute inset-0 md:flex items-center justify-center gap-3 text-lg bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-subMain rounded-md">
                                    {buttons.map((button) => (
                                        <button
                                        title={button.title}
                                        key={button.id}
                                        onClick={(e) =>{
                                            e.stopPropagation(); //prevents clicking on image
                                            button.onClick(f);
                                        }}
                                        className="w-8 h-8 text-lg flex items-center justify-center transition hover:text-white">
                                            {button.icon(f)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }

                <div className="w-full px-1 z-50 absolute top-2/4 justify-between flex">
                    <button
                      className="w-10 h-10 bg-subMain text-white flex items-center justify-center rounded-full hover:bg-main transition"
                      ref={(node)=> setPrevEl(node)}
                    >
                        <BsCaretLeftFill size={20}/>
                    </button>
                    <button
                      className="w-10 h-10 bg-subMain text-white flex items-center justify-center rounded-full hover:bg-main transition"
                      ref={(node)=> setNextEl(node)}
                    >
                        <BsCaretRightFill size={20}/>
                    </button>
                </div>
                </Swiper>
            </div>
          </div>
        </>
    )
};

export default FlashDeal;