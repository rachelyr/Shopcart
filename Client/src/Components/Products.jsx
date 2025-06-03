import React from "react";
import {Link} from 'react-router-dom';

function Products({product}) {
    return (
        <>
        <div className="gap-2 rounded-lg py-4 md:p-4 flex-col flex bg-white hover:shadow-lg tansitions">
            <Link
            to={`/card/${product?._id}`}
            className="p-2 border border-gray-300 rounded-lg w-full md:h-86 relative block">
                <div className="w-full h-64 md:h-72 overflow-hidden rounded-lg">
                    <img
                        alt={product?.title}
                        src={
                            product?.images?.length > 0
                            ? product?.images[0]
                            : 'https://via.placeholder.com/150'
                        }
                        className="w-full h-full rounded-lg transitions object-contain" />
                        {product?.salesOffer?.status && (
                            <div className="hidden xl:flex xl:absolute xl:z-10 xl:top-3 xl:text-xs md:py-1 md:px-3 font-bold xl:left-3 bg-flash rounded-full">
                                {product?.salesOffer?.discount}% OFF
                            </div>
                        )}
                    </div>
            </Link>
            <h3 className="px-1 text-sm md:text-[16px] mt-2 truncate">{product.title}</h3>
            <div className="px-1 flex flex-row">
                <h2 className="text-md font-bold ">₹{product.price?.toLocaleString('en-IN')}</h2>
                {product?.salesOffer?.status &&(
                    <div className="xl:hidden z-10 top-3 text-xs py-1 px-2 mx-2 font-bold left-3 bg-flash rounded-md">
                        {product?.salesOffer?.discount}% OFF
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default Products;