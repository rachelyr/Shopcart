import React, {useState} from "react";
import {RadioGroup, Radio} from '@headlessui/react';
import {productdetailsData} from '../Data/FilterData';
import {FreeMode, Thumbs} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';


const title = 'text-sm font-medium';

export function SizeRadio({selected, setSelected}) {
    return (
        <div>
            <h2 className={title}>Choose your size</h2>

            <RadioGroup value={selected} onChange={setSelected}>
                <div className="gap-4 flex items-center flex-wrap mt-4">
                    {productdetailsData.size.map((item) => (
                        <Radio key={item.title} value={item}>
                            {({checked}) => (
                                <div className={`flex-colo w-12 cursor-pointer h-12 rounded-full border
                                    ${checked ? 'bg-main text-white' : 'border-gray-300'}`}>
                                        <h5 className="text-xs font-semibold text-center pt-3.5">{item.title}</h5>
                                    </div>
                            )}
                        </Radio>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
};


export function ColorRadio({selected, setSelected}) {
    return (
        <div>
            <h2 className={title}>Choose your colors</h2>
            <RadioGroup value={selected} onChange={setSelected}>
                <div className="gap-4 flex-wrap flex items-center mt-4">
                    {productdetailsData.colors.map((item) => (
                        <Radio key={item.title} value={item}>
                            {({checked}) => (
                                <div
                                className={`flex-colo w-12 p-1 cursor-pointer h-12 rounded-full border
                                    ${checked ? 'border-main' : 'border-gray-300'}`}>
                                        <div
                                        style={{backgroundColor: item.color}}
                                        className={`w-full h-full rounded-full`}>
                                        </div>
                                    </div>
                            )}
                        </Radio>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
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


export function ProductImages({images}) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
          <Swiper
          spaceBetween={10}
          thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
          modules={[FreeMode, Thumbs]}
          className="mySwiper2">
            {images?.map((image, i) => (
            <SwiperSlide key={i}>
                <img
                src={image}
                className="w-full h-[350px] sm:h-[450px] md:h-[600px] rounded-2xl object-cover"
                alt="product"/>
            </SwiperSlide>
        ))}
          </Swiper>
          <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="mt-4">
            {images?.map((image, i) => (
                <SwiperSlide key={i}>
                    <img
                    src={image}
                    className="w-full h-24 md:h-32 rounded-lg border cursor-pointer object-cover"/>
                </SwiperSlide>
            ))}
        </Swiper>
        </>
    );
};
