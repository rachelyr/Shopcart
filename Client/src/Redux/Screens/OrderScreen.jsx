import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import {Link, useParams} from "react-router-dom";
import {dateFormat} from '../../Context/Functionality';
// import toast from "react-hot-toast";
import {useDispatch, useSelector} from 'react-redux';
import {getOrderByIdAction } from "../Actions/OrderAction";
import { Empty } from "../../Components/Notifications/Error";
import {Loader} from "../../Components/Notifications/Loader";

function OrderScreen(){
    const {id} = useParams();
    const dispatch = useDispatch();

    //states
    const {loading, error, order} = useSelector((state) => state.getOrderById);

    //SHORTCUTS
    const shipping = order?.shippingAddress;
    const payments = order?.payments;
    const user = order?.user;
    const orderItems = order?.orderItems;
    const paymentStatus = {
        pending: order?.payments?.status === 'Pending',
        complete: order?.payments?.status === 'Completed',
        cancelled: order?.payments?.status === 'Cancelled'
    };
    const delivery= order?.delivery;


    //----functions---
    const handlePayment = () => {
        //not implemented yet
    };

    const handleDownload = () => {
        //not implemented yet
    };
    const classNames = 'text-xs bg-opacity-20 py-1.5 px-4 rounded-full ml-3';

    //use effects
    useEffect(() => {
        dispatch(getOrderByIdAction(id));
    }, [dispatch, id]);

    //INFO
    const Totals = [
        {
            name: 'Subtotal',
            cost: `${order?.subTotalPrice ? order?.subTotalPrice?.toLocaleString('en-IN') : 0}`,
        },
        {
            name: 'Tax',
            cost: `${order?.taxprice ? order?.taxprice?.toLocaleString('en-IN') : 0}`,
        },
        {
            name: 'Shipping',
            cost: `${shipping?.shippingCost ? shipping?.shippingCost?.toLocaleString('en-IN') : 0}`,
        },
    ];

    const paymentInfo = [
        {
            title: 'Paid Status',
            value: payments?.status,
            bg: true,
        },
        {
            title: 'Payment Method',
            value: payments?.paymentMethod,
            bg: false,
        },
        {
            title: 'Paid At',
            value: payments?.paymentDate ? dateFormat(payments?.paymentDate): '---',
            bg: true
        },
    ];

    const deliveryInfo = [
        {
            title: 'Delivery Status',
            value: delivery?.status,
            bg: true,
        },
        {
            title: 'Delivery Method',
            value: delivery?.deliveryMethod,
            bg: false,
        },
        {
            title: 'Delivery Date',
            value: delivery?.deliveryDate ? dateFormat(delivery?.deliveryDate): '---',
            bg: false,
        },
    ];

    const shippingInfo =[
        {
            title: "Customer's Name",
            value: shipping?.fullName,
        },
        {
            title: "Phone Number",
            value: shipping?.phoneNumber,
        },
        {
            title: "Email Address",
            value: shipping?.email,
        },
        {
            title: "Location",
            value: shipping?.location,
        },
        {
            title: "Address",
            value: shipping?.address,
        },
        {
            title: "Shipping Method",
            value: shipping?.shippingMethod,
        },
        {
            title: "Shipping Cost",
            value: `Rs. ${shipping?.shippingCost}`,
        },
    ];

    const userInfo = [
        {
            title: "Customer's Name",
            value: user?.fullName,
        },
        {
            title: "Customer's Email",
            value: user?.email,
        },
        {
            title: "Customer's Phone Number",
            value: user?.phone,
        },
    ];

    return(
        <Layout header={true}>
            <div className="bg-deepGray min-h-screen flex items-center justify-center">
                {
                    loading ? (
                        <div className="flex flex-col justify-center items-center">
                            <Loader/>
                        </div>
                    )
                    :
                    error ? (
                        <div className="flex-col flex container mx-auto min-h-screen">
                            <Empty text={error}/>
                        </div>
                    )
                    :
                    order?.createdAt ? (
                        <div className="min-h-screen container mx-auto px-4 lg:px-32 py-12">
                    <div className="flex-col flex gap-4 sm:p-6 py-6 px-4 rounded-md top-28 col-span-4 bg-white border">
                        <>
                           <h2 className="font-semibold text-lg">
                              <>
                              <span>Order Summary</span>
                              {paymentStatus.pending ? (
                                <span className={`text-star bg-star ${classNames}`}>
                                    Pending
                                </span>
                              ): paymentStatus.pending ? (
                                <span
                                  className={`text-green-600 bg-green-600 ${classNames}`}>
                                    Complete
                                  </span>
                              ): paymentStatus.cancelled ? (
                                <span className={`text-red-600 bg-red-600 ${classNames}`}>
                                    Cancelled
                                </span>
                              ): null}
                              </>
                           </h2>
                           <div className="grid xl:grid-cols-2 gap-12 w-full items-start">
                            <div className="w-full space-y-8">
                                <div className="space-y-8">
                                    {/* card */}
                                    {orderItems?.map((product) => (
                                        <Link
                                          title="View Product"
                                          to={`/card/${product?.product}`}
                                          key={product?.product}
                                          className="grid grid-cols-8 gap-2 my-6 items-center">
                                            <div className="col-span-2 bg-deepGray rounded">
                                                <img
                                                src={product?.image}
                                                alt={product?.name}
                                                className="w-full h-full object-cover rounded" />
                                            </div>
                                            <div className="col-span-6 flex flex-col text-sm gap-2">
                                                <h3 className="truncate">{product?.name}</h3>
                                                <h2 className="text-xs text-gray-800">
                                                    ₹{product?.price?.toLocaleString('en-IN')} x {product?.qty} = {' '}
                                                    <span className="font-bold">
                                                        ₹{(product?.price * product?.qty)?.toLocaleString('en-IN')}
                                                    </span>
                                                </h2>
                                                {(product?.color || product?.size) && (
                                                    <div className="text-xs space-y-2 flex-wrap bg-dryGray p-2 rounded text-gray-800">
                                                    {product?.color && (
                                                        <p>
                                                            <span className="font-medium">Color: </span>
                                                            {product?.color}
                                                        </p>
                                                    )}
                                                    {product?.size && (
                                                        <p>
                                                            <span className="font-medium">Size: </span>
                                                            {product?.size}
                                                        </p>
                                                    )}
                                                </div>
                                                )}
                                            </div>
                                          </Link>
                                    ))}
                                </div>

                                {/* USER */}
                                <div className="bg-deepGray border p-8 rounded">
                                    <h2 className="text-md font-semibold mb-4">
                                        User Information
                                    </h2>
                                    {userInfo?.map((item, index) => (
                                        <div
                                          key={index}
                                          className="grid grid-cols-2 gap-2 py-5 px-2 border-t border-gray-200">
                                            <h5 className="text-sm">{item.title}</h5>
                                            <p className={`text-sm text-gray-500`}>
                                                {item?.value ? item.value : '---'}
                                            </p>
                                          </div>
                                    ))}
                                </div>

                                {/* PAYMENT INFO */}
                                <div className="bg-dryGray border p-8 rounded">
                                    <h2 className="text-md font-semibold mb-4">
                                        Payment Information
                                    </h2>
                                    {paymentInfo?.map((item, index) => (
                                        <div
                                          key={index}
                                          className="grid grid-cols-2 gap-2 py-5 px-2 border-t border-gray-200">

                                            <h5 className="text-sm">{item.title}</h5>
                                            <p
                                              className={`text-xs capitalize ${
                                                item.bg
                                                  ? item.value === 'Completed'
                                                     ? 'text-green-600'
                                                     : (item.value === 'awaiting') |
                                                       (item.value === 'Pending')
                                                    ?  'text-orange-500'
                                                    :  'text-red-600'
                                                  : 'text-gray-500'
                                              }`}
                                              >
                                                {item?.value? item.value : '---'}
                                              </p>
                                          </div>
                                    ))}
                                </div>

                                {paymentStatus.complete && (
                                    <>
                                      {/* delivery info */}
                                      <div className="bg-dryGray borderp-8 rounded">
                                        <h2 className="text-md font-semibold mb-4">
                                            Delivery Information
                                        </h2>
                                        {deliveryInfo?.map((item, index) => (
                                            <div
                                            key={index}
                                                className="grid grid-cols-2 gap-2 py-5 px-2 border-t border-gray-200">
                                                    <h5 className="text-sm">{item.title}</h5>
                                                    <p
                                                    className={`text-xs capitalize ${
                                                        item.bg
                                                          ? item.value === 'Completed'
                                                            ?  'text-green-600'
                                                            : (item.value === 'awaiting')
                                                              (item.value === 'Pending')
                                                            ? 'text-orange-500'
                                                            : item.value === 'shipped'
                                                            ? 'text-blue-500'
                                                            : 'text-red-600'
                                                          :  'text-gray-500'
                                                    }`}
                                                    >
                                                        {item?.value ? item.value : '---'}
                                                    </p>
                                            </div>
                                        ))}
                                      </div>

                                      {/* shipping info */}
                                      <div className="bg-dryGray p-8 rounded">
                                        <h2 className="text-md font-semibold mb-4">
                                            Shipping Info
                                        </h2>

                                        {shippingInfo.map((item, index) => (
                                            <div
                                            key={index}
                                            className='grid grid-cols-2 gap-2 py-5 px-2 border-t border-gray-200'>
                                                <h5 className="text-sm">{item.title}</h5>
                                                <p className={'text-xs text-gray-500'}>
                                                    {item?.value ? item.value : '---'}
                                                </p>
                                            </div>
                                        ))}
                                      </div>
                                    </>
                                )}
                            </div>

                            <div className="w-full sticky top-28 xl:mt-4 border-[0.5px] border-main rounded-md sm:p-12 p-4">
                                <div className="flex flex-col gap-8 mb-6">
                                    {Totals.map((t, i) => (
                                        <div
                                          key={i}
                                          className="flex items-center justify-between text-sm w-full font-semibold">
                                            {t.name}
                                            <span className="font-bold">{t.cost}</span>
                                          </div>
                                    ))}
                                    <div className="p-1 pl-4 items-center text-gray-800 bg-dryGray border rounded w-full flex justify-between">
                                        <h2 className="font-semibold text-sm">Total</h2>
                                        <button
                                          type="button"
                                          className="px-8 bg-white py-4 font-bold flex-colo text-sm rounded"
                                          >
                                            ₹{order?.totalPrice?.toLocaleString('en-IN')}
                                          </button>
                                    </div>
                                </div>
                                {/*buttons*/}
                                <>
                                  {paymentStatus.pending && (
                                    <>
                                      <button
                                        onClick={handlePayment}
                                        className="bg-main py-4 w-full rounded text-white flex-colo"
                                        >
                                            Purchase Order
                                        </button>
                                    </>
                                  )}
                                  {paymentStatus.complete && (
                                    <div className="grid sm:grid-cols-2 gap-6 text-sm">
                                        <Link
                                          to="/shop"
                                          className="border border-main py-4 rounded flex-colo"
                                          >
                                            Shop Again
                                          </Link>
                                          <button
                                            onClick={handleDownload}
                                            className="bg-main py-4 rounded text-white flex-colo"
                                            >
                                                Download Invoice
                                            </button>
                                    </div>
                                  )}
                                  {(paymentStatus?.cancelled ||
                                    shipping?.status === 'cancelled') && (
                                        <>
                                          <p className="text-red-600 text-sm text-center">
                                            {shipping?.status === 'cancelled'
                                            ? 'Order has been cancelled'
                                            : 'Payment has been cancelled'}{' '}
                                            {' '}
                                            If you have any questions, please contact us
                                          </p>
                                          <Link
                                            to="/contact-us"
                                            className="bg-white py-4 rounded text-main mt-4 border flex-colo">
                                                Contact Us
                                            </Link>
                                        </>
                                    )}
                                </>
                            </div>
                           </div>
                        </>
                    </div>
                </div>
                    )
                : (
                <div className="flex flex-col conatiner mx-auto min-h-screen">
                    <Empty text="No Order Found"/>
                </div>
                )}
            </div>
        </Layout>
    );
}

export default OrderScreen;