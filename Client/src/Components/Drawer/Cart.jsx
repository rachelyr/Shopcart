import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import MainDrawer from './MainDrawer';
import {RiDeleteBin6Fill} from 'react-icons/ri';
import {MdDelete} from 'react-icons/md';
import {toast} from 'react-hot-toast';
import {useDispatch, useSelector} from 'react-redux';
import {FaShoppingBag, FaShoppingBasket} from 'react-icons/fa';
import { removeFromCartAction, resetCartAction, updateCartAction } from '../../Redux/Actions/ProductAction';
import { createOrderAction } from '../../Redux/Actions/OrderAction';
import { CartQuantityRadio } from '../DetailRadio';


function Cart({cartDrawerOpen, closeCartDrawer }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {cartItems} = useSelector((state) => state.cart);
    const {userInfo} = useSelector((state) => state.userLogin);
    const {loading: orderLoading, success, order, error: orderError } = useSelector((state) => state.createOrder);


    const totalPrice = cartItems?.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
    );

    //clear cart
    const clearCart = () => {
        dispatch(resetCartAction())
        closeCartDrawer();
    };

    //removes a product from the cart
    const deleteProductFromCart = (id) => {
        dispatch(removeFromCartAction(id));
    };

    //updates cart item qty
    const updateQuantity= (id, quantity) => {
        dispatch(updateCartAction(id, quantity));
    }

    const summary = [
        {
            title: 'Total Products',
            value: cartItems?.length
        },
        {
            title: 'Total',
            value: `Rs. ${totalPrice}`
        },
    ];

    //handle cart item image
    const getCartImage= (cartItem) => {
        if(cartItem?.color && cartItem?.code){
            const match = cartItem.colors?.find(color => 
                color.colorName === cartItem.color || color.code === cartItem.code
            );
            if(match?.image?.length > 0){
                return match.image[0];
            }
        }
        if(cartItem.images?.length > 0) {
            return cartItem.images[0];
        }
        return null; //final fallback
    }

    //place order
    const placeOrderHandler = () =>{
        if (!userInfo){
            navigate('/registration');
            closeCartDrawer();
            return;
        } else{
            dispatch(createOrderAction({
                orderItems: cartItems?.map((item)=> {
                    return{
                        product: item?._id,
                        qty: item?.quantity,
                        name: item?.title,
                        image: getCartImage(item),
                        price: item?.price,
                        color: item?.color,
                        size: item?.size
                    };
                }),
                totalPrice: totalPrice,
                subTotalPrice: totalPrice,
            })
           );
        }
    };

    //order error handling
    useEffect(()=> {
        if(orderError){
            toast.error(orderError);
            dispatch({type: 'ORDER_CREATE_RESET'});
        }
    }, [orderError, dispatch]);

    //success handler
    useEffect(() => {
        if(success){
            navigate(`/orders/${order?._id}`);
            dispatch({type: 'ORDER_CREATE_RESET' });
            clearCart();
        }
    }, [success, dispatch, navigate, order, clearCart]); //may have to remove clear cart from here

    console.log(cartItems);
    return (
        <MainDrawer DrawerOpen={cartDrawerOpen} closeDrawer={closeCartDrawer}>
            <div className='flex flex-col w-full h-full justify-between items-middle bg-white rounded'>
                <div className='w-full flex justify-between items-center relative px-5 py-4 border-b bg-deepestGray'>
                    <h2 className='font-semibold text-lg m-0 text-heading flex items-center'>
                        <span className='text-xl mr-2 mb-1'>
                            <FaShoppingBag className='text-main'/>
                        </span>
                        Cart
                    </h2>
                    <button
                    onClick={closeCartDrawer}
                    className='flex-col p-2 font-medium text-flash bg-white rounded-full hover:bg-main hover:text-white'>
                        <IoClose/>
                    </button>
                </div>

                <div className='overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full'>
                    {cartItems?.length > 0 ? (
                        <div className='px-2 space-y-8'>
                            <div>
                                {cartItems?.map((p) => (
                                    <div
                                      key={p?.cartItemId}
                                      className='grid grid-cols-6 gap-2 my-6 items-center'>
                                        <Link
                                          to={`/card/${p._id}`}
                                          className='col-span-2 bg-deepGray rounded p-2 h-30 border border-deepest'>
                                            <img alt={p?.title}
                                                 src={getCartImage(p)}
                                                 className='w-full h-full object-cover rounded'/>
                                          </Link>
                                          <div className='col-span-3 flex flex-col text-sm gap-2'>
                                            <h3 className='truncate'>{p?.title}</h3>
                                            {(p?.color || p?.size) ? 
                                             <>
                                             <div className='flex items-center w-8 h-8 p-0.5 cursor-pointer rounded-md border border-gray-400'>
                                                 {console.log('Color code:', p?.code)}
                                                <div
                                                    className='w-full h-full rounded-md'
                                                    style={{backgroundColor: p?.code}}
                                                    title={p?.color}
                                                />        
                                            </div>
                                            <p className='text-xs text-gray-500'>
                                                {p?.size && `Size: ${p?.size}`}
                                                {p?.size && p?.color && ' | '}
                                                {p?.color && `Color: ${p?.color}`}
                                             </p>
                                             </>
                                            : 
                                            null }
                                            <CartQuantityRadio
                                                quantity={p?.quantity}
                                                updateQty={(newQuantity) => updateQuantity(p?.cartItemId, newQuantity)}
                                                stock={p?.stock}
                                            />
                                          </div>
                                          <div className='col-span-1 flex-col'>
                                            <button
                                               onClick={() => deleteProductFromCart(p?.cartItemId)}
                                               className='flex-col p-2 text-lg bg-flash rounded text-white'>
                                                <MdDelete className='text-lg'/>
                                               </button>
                                          </div>
                                      </div>
                                ))}
                            </div>
                            <div className='flex flex-col gap-5 py-2'>
                                {summary.map((s, i) => (
                                    <div key ={i} className='flex justify-between items-center'>
                                        <h3 className='text-sm'>{s?.title}</h3>
                                        <h3 className='text-sm font-bold'>{s?.value}</h3>
                                    </div>
                                ))}
                            </div>

                            <button
                               onClick={() => placeOrderHandler()}
                               className='w-full rounded hover:bg-subMain transitions py-3 px-3 bg-main text-sm'
                            >
                                {
                                orderLoading ? 'Placing Order...' :
                                userInfo ? 'Place Order' : 'Login to Place Order'}
                            </button>
                        </div>
                    ) : (
                        <div className='flex-col flex justify-center items-center w-full h-full gap-4'>
                            <div className='flex-col justify-center items-center flex w-24 rounded-full h-24 text-main border border-main'>
                                <FaShoppingBasket className='text-4xl'/>
                            </div>
                            <h1 className='text-sm text-center font-light'>
                                Your Cart is empty
                            </h1>
                        </div>
                    )}
                </div>
                {cartItems?.length > 0 && (
                    <button
                      onClick={clearCart}
                      className='w-full border hover:border-subMain transitions py-3 px-3 border-main flex flex-row items-center justify-between'>
                        Clear Cart < RiDeleteBin6Fill/>
                      </button>
                )}
            </div>
        </MainDrawer>
    )
};

export default Cart;