import React, { useEffect, useState} from "react";
import Layout from '../../layout/Layout';
import { BsShareFill} from 'react-icons/bs';
import Titles from '../../Components/Titles';
import { TbListDetails } from 'react-icons/tb';
import Products from '../../Components/Products';
import {toast, Toaster} from 'react-hot-toast';
import { ColorRadio, ProductImages, QuantityRadio, SizeRadio } from '../../Components/DetailRadio';
import { useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { addToCartAction, getSingleProductAction } from '../Actions/ProductAction';
import {Empty} from '../../Components/Notifications/Error';
import { CardLoader, Loader } from "../../Components/Notifications/Loader";


function ProductDetails() {
    const [modalOpen, setModalOpen] = useState(false);
    const [size, setSize] = useState(''); //state was expecting an object so i had to change it
    const [colors, setColors] = useState({});
    const [quantity, setQuantity] = useState(1);
    const {id} = useParams();
    const dispatch = useDispatch();

    const {loading, error, product, related} = useSelector((state) => state.singleProduct);
    //const {cartItems} = useSelector((state) => state.cart);

    //add to cart
    const addToCart = (data) => {
        const selectedSize = size || 'no-size';
        const selectedColorCode = colors?.code || 'no-color';
        const cartItemId = `${data._id}-${selectedSize}-${selectedColorCode}`;
            dispatch(
                addToCartAction({
                    ...data,
                    cartItemId: cartItemId,
                    size: size || null,
                    color: colors?.name || null,
                    code: colors?.value || null,
                    quantity: quantity
            })
        );
        toast.success('Added to cart', {
            position: "bottom-center"
        });
    };

    //get a single product
    useEffect(() => {
        if(id) {
            dispatch(getSingleProductAction(id))
        }
    }, [dispatch, id]);

    //to set initial color
    useEffect(() => {
        if(product?.colors && product.colors.length > 0){
            const firstColor = product.colors[0];
            setColors({
                name: firstColor.colorName,
                value: firstColor.code,
                _id: firstColor._id,
                images: firstColor.image || []
            })
        }else {
            setColors({}); //done to handle the state of products with no colors
        }
    }, [product]);

    //error handling
    useEffect(() => {
        if(error){
            dispatch({type: 'GET_PRODUCT_RESET'});
        }
    }, [error, dispatch]);



    return(
        <Layout header={true}>
            <div><Toaster/></div>
            {
                loading ? (
                    <div className="min-h-screen container mx-auto px-2 flex-col">
                        <Loader/>
                    </div>
                ) : error ? (
                    <div className="min-h-screen container mx-auto flex-col">
                        <Empty text={'Product not Found'}/>
                    </div>
                ): product?.createdAt ? (
                    <div className="min-h-screen containermx-auto px-2 sm:px-4 xl:px-32 my-8 sm:my-12">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 items-start">
                    <div className="p-2 lg:sticky top-28">
                        <ProductImages selected={colors}/>
                    </div>
                    <div className="w-full flex gap-4 flex-col px-5 md:px-8 text-left">
                        <div className="block">
                            <h1 className="text-lg md:text-lg lg:text-xl">
                                {product?.title}
                            </h1>
                        </div>
                        <h1 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold">
                            ₹{product?.price?.toLocaleString('en-IN')}
                        </h1>

                        <div className="space-v-8">
                            <ColorRadio selected={colors} setSelected={setColors}/>
                            <SizeRadio selected={size} setSelected={setSize}/>
                                {product?.stock > 0 &&(
                                <div className="mt-4">
                                    <QuantityRadio
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                    stock={product?.stock}
                                    />
                                    <p className="text-xs text-gray-500 mt-2 italic">
                                        Only {product?.stock} left in stock
                                    </p>
                                </div>
                            )}
                        </div>
                        <p className="text-sm leading-6 text-gray-500 md:leading-6">
                            {product?.description}
                        </p>

                        <div className="grid mt-4 2xl:grid-cols-7 sm:grid-cols-2 lg:grid-cols-1 gap-3 items-center">
                            { product?.stock > 0 ? (
                                <button
                                disabled={!quantity || (product.size?.length > 0 && !size)}
                                onClick={() => addToCart(product)}
                                className="2xl:col-span-6 disabled:bg-orange-300 transitions bg-subMain p-4 rounded disabled:cursor-not-allowed">
                                    Add to Cart
                                </button>
                            ): (
                                <div className="2xl:col-span-6 border bg-deepest py-4 px-2 rounded-md flex-col flex font-semibold text-sm text-white">
                                    Out of Stock
                                </div>
                            )}

                            <button
                            onClick={() => setModalOpen(true)}
                            className="border-[.5px] border-main bg-deepest 2xl:py-5 py-5 px-7 rounded-md flex flex-col justify-center items-center">
                                <BsShareFill/>
                            </button>
                        </div>
                        <div className="flex flex-row gap-3 mt-4 flex-wrap">
                            {product?.tags?.map((tag) => (
                                <div
                                key={tag}
                                className="bg-deepest border border-deepest font-medium text-main rounded-full p-2 ">
                                    #{tag}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:mt-24 mt-12">
                    <Titles title='You might also like' Icon={TbListDetails}/>
                    <div className="grid mt-6 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                        {loading || related?.length === 0
                        ? ( Array.from(Array(3).keys()).map((i) =>(
                                <CardLoader key={i}/>
                            )))
                        : related?.map((p) => (
                            <Products bg={false} key={p?._id} product={p}/>
                        ))}
                    </div>
                </div>
            </div>
                ) : (
                    <div className="min-h-screen container mx-auto flex-colo px-2 sm:px-4 xl:px-32 my-8 sm:my-12">
                        <Empty text={'Product not Found'}/>
                    </div>
                )
            }

        </Layout>
    );
};

export default ProductDetails;