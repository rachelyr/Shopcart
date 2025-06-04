import React, { useEffect } from "react";
import Table from "../../../Components/Table";
import Sidebar from "./Sidebar";
import {toast, Toaster} from 'react-hot-toast';
import { Empty } from "../../../Components/Notifications/Error";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAction } from "../../Actions/OrderAction";
import { Loader } from "../../../Components/Notifications/Loader";

//the orders component under dashboard
function Orders(){
    const dispatch = useDispatch();

    //states
     const {loading, orders, error} = useSelector((state) => state.getAllOrders);

     //get all orders
     useEffect(() => {
        dispatch(getAllOrdersAction());
     }, [dispatch]);

     //error handling
     useEffect(() => {
         if (error) {
            toast.error(error);
            dispatch({type: 'ORDER_GET_ALL_RESET'});
         }
     }, [error, dispatch]);

    //delete all orders
    // const deleteAllOrdersHandler = () => {
    //     toast.success('All orders deleted');
    // };


    return (
        <Sidebar>
            {loading ? (
                <main className="flex justify-center items-center">
                    <div className="flex-col justify-center items-center flex h-96">
                        <Loader />
                    </div>
                </main>
                ) : (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center gap-2">
                    <h2 className="text-xl font-bold">Order History</h2>
                    {/* {orders?.length > 0 && (
                        <button
                          onClick={deleteAllOrdersHandler}
                          className="bg-flash font-medium text-white py-2 px-6 rounded">
                            Delete All
                          </button>
                    )} */}
                </div>

                {orders?.length === 0 ? (
                    <div className="flex-col flex justify-center items-center h-96">
                        <Empty text={'No orders found'}/>
                    </div>
                ):(
                    <Table datas={orders} dashboard={false}/>
                )}
            </div>
                )}
        </Sidebar>
    );
}

export default Orders;