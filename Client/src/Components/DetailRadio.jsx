import React, {useEffect, useRef, useState} from "react";
import {RadioGroup, Radio} from '@headlessui/react';
import {FreeMode, Navigation, Thumbs} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Zoom } from "swiper/modules";
import { useSelector } from "react-redux";


const title = 'text-sm font-medium';

export function SizeRadio({selected, setSelected}) {
    const{product} = useSelector((state) => state.singleProduct);

    const hasSizes = product.size && product.size.length > 0;

    return (
        <div>
            { hasSizes ?
            <div className="py-4">
                <h2 className={title}>Choose your size</h2>
                <RadioGroup value={selected} onChange={setSelected}>
                    <div className="gap-4 flex items-center flex-wrap mt-4">
                        {product.size.map((item) => (
                            <Radio key={item} value={item}>
                                {({checked}) => (
                                    <div className={`flex flex-col w-12 cursor-pointer h-12 rounded-full border
                                        ${checked ? 'bg-main text-white' : 'border-gray-300'}`}>
                                        <h5 className="text-xs font-semibold text-center pt-3.5">{item}</h5>
                                    </div>
                                )}
                            </Radio>
                        ))}
                    </div>
                </RadioGroup>
            </div>
            : null
            }
        </div>
    )
};


export function ColorRadio({selected, setSelected}) {
    const{product} = useSelector((state) => state.singleProduct);

    const colorsExist = product.colors && product.colors.length > 0;

    const isColorSelected = (color) => {
        if (!selected) return false;
        return selected._id === color._id || selected.value === color.code;
    };

        return (
        <div>
            {colorsExist ?
            <div>
                <h2 className={title}>Choose your colors</h2>
            <div className="gap-4 flex-wrap flex items-center mt-4">
                {product.colors.map((color, i) => {
                    const isSelected = isColorSelected(color);
                    
                    // Create the value object once
                    const colorValue = {
                        name: color.colorName,
                        value: color.code,
                        _id: color._id,
                        images: color.image || []
                    };
                    
                    return (
                        <div 
                            key={color._id || i}
                            onClick={() => setSelected(colorValue)}
                            className={`flex-col w-12 p-1 cursor-pointer h-12 rounded-full border
                                ${isSelected ? 'border-main' : 'border-gray-300'}`}
                        >
                            <div
                                style={{backgroundColor: color.code}}
                                className={`w-full h-full rounded-full`}
                                title={color.colorName}
                            >
                            </div>
                        </div>
                    );
                })}
            </div>
            </div>
            : null}
        </div>
    );
};


export function QuantityRadio({quantity, setQuantity, stock}) {
    const classes= 'border border-gray-300 rounded w-10 h-10 flex-col disabled:bg-dryGray disabled:cursor-not-allowed';
    return (
        <div className="space-y-2">
            <div className="flex w-fit items-center gap-4 border rounded-md p-2">
                <button
                   disabled={quantity === 1}
                   onClick={() => setQuantity(quantity - 1)}
                   className={classes}>
                    -
                   </button>
                   <h2 className="text-lg font-semibold">{quantity}</h2>
                   <button
                      disabled={quantity === stock}
                      onClick={() => setQuantity(quantity + 1)}
                      className={classes}>
                        +
                      </button>
            </div>
        </div>
    );
};


export function CartQuantityRadio({quantity, updateQty, stock}) {
    const classes= 'border border-gray-300 rounded w-10 h-10 flex-col disabled:bg-dryGray disabled:cursor-not-allowed';

    return (
        <div className="space-y-2">
            <div className="flex w-fit items-center gap-4 border rounded-md p-2">
                <button
                   disabled={quantity === 1}
                   onClick={() => updateQty(quantity - 1)}
                   className={classes}>
                    -
                   </button>
                   <h2 className="text-lg font-semibold">{quantity}</h2>
                   <button
                      disabled={quantity === stock}
                      onClick={() => updateQty(quantity + 1)}
                      className={classes}>
                        +
                      </button>
            </div>
        </div>
    );
};


export function ProductImages({selected}) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [allImg, setAllImg] = useState([]);
    const mainSwiperRef = useRef(null);

    const {product} = useSelector((state) =>state.singleProduct);

    useEffect(() => {
        if (!product) return;

        let Currimages = [];

        //adds images as per color if given
        if (product.colors && product.colors.length > 0 ){
            product.colors.forEach(color => {
                if(color.image && color.image.length > 0){
                    color.image.forEach(img => { //iterating through the images
                        Currimages.push({
                            url: img,
                            colorName: color.colorName,
                            colorId: color._id
                        })
                    });
                }
            });
        }

        //add regular product images
        if(product.images && product.images.length > 0){
            product.images.forEach(img => {
                Currimages.push({
                    url: img,
                    colorName: null,
                    colorId: null
                })
            })
        }

        setAllImg(Currimages);
    }, [product]);

    //naviagtes us to the first image of the color selected
    useEffect(() => {
        if (selected && selected._id && mainSwiperRef.current && mainSwiperRef.current.swiper){
            //find the first image index that matches selected color
            const imageUrl = selected.images[0];
            const index = allImg.findIndex(img => img.url === imageUrl);

            if(index !== -1){
                mainSwiperRef.current.swiper.slideTo(index);
                return;
            }

            //otherwise finds by color id or name
            const colorIndex = allImg.findIndex(img =>
                (selected._id && img.colorId === selected._id) ||
                (selected.title && img.colorName === selected.title)
            );

            if(colorIndex !== -1){
                mainSwiperRef.current.swiper.slideTo(colorIndex);
            }
        }
    }, [selected, allImg]);

    return (
        <>
          <Swiper
          ref={mainSwiperRef}
          spaceBetween={10}
          thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
          modules={[Zoom, Navigation, FreeMode, Thumbs]} //so that phone sliding can be done
          zoom={true}
          className="mySwiper2">
            {allImg?.map((image, i) => (
            <SwiperSlide key={i}>
                    <div className="swiper-zoom-container">
                        <img
                            src={image.url}
                            className="w-max h-[350px] sm:h-[450px] md:h-[400px] rounded-2xl object-cover object-center mx-auto"
                            alt="product"
                        />
                    </div>
            </SwiperSlide>
        ))}
          </Swiper>
          <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs, Navigation]}
          className="mt-4">
            {allImg?.map((image, i) => (
                <SwiperSlide key={i}>
                    <img
                    src={image.url}
                    className="w-full h-24 md:h-32 rounded-lg border cursor-pointer object-cover"
                    alt={`thumbnail-${i}`}                    
                    />
                </SwiperSlide>
            ))}
        </Swiper>
        </>
    );
};
