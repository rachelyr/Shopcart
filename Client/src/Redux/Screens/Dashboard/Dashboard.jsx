import React, { useEffect } from "react";
import SideBar from './Sidebar';
import Table from '../../../Components/Table';
import { FaRegListAlt } from "react-icons/fa";
import { ImCancelCircle } from 'react-icons/im';
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdOutlineDownloading } from 'react-icons/md';
// import Promos from '../../../Components/Promos';
import { Empty } from '../../../Components/Notifications/Error';
import { useDispatch, useSelector } from "react-redux";
import {Loader} from '../../../Components/Notifications/Loader'
import toast from "react-hot-toast";
import { getAllOrdersAction } from "../../Actions/OrderAction";


function Dashboard() {
    const dispatch = useDispatch();

    //states
     const {loading, orders, total, pending, completed, cancelled, error} = useSelector((state) => state.getAllOrders);

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

    //boxes
    const Status = [
        {
            bg: 'bg-blue-100',
            icon: FaRegListAlt,
            color: 'text-main',
            title: 'Total Order',
            total: total ? total : 0
        },
        {
            bg: 'bg-red-100',
            icon: ImCancelCircle,
            color: 'text-flash',
            title: 'Cancelled Orders',
            total: cancelled ? cancelled : 0,
        },
        {
            bg: 'bg-orange-100',
            icon: MdOutlineDownloading,
            color: 'text-orange-500',
            title: 'Pending Order',
            total: pending ? pending : 0,
        },
        {
            bg: 'bg-orange-100',
            icon: BsFillCheckCircleFill,
            color: 'text-green-600',
            title: 'Completed Order',
            total: completed ? completed : 0
        },
    ];

    return (
        <SideBar>
            {
                loading ? (
                    <main className="flex justify-center items-center">
                        <div className="flex-col justify-center items-center flex h-96">
                            <Loader/>
                        </div>
                    </main>
                ) :
                (
                <div className="flex flex-col gap-4">
                    {/*<div className="md:block hidden">*/}
                        {/*<Promos/>*/}
                    {/*</div>*/}
                    <h2 className="text-xl font-bold"> Dashboard </h2>
                    <div className="grid lg:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 gap-3">
                    {Status.map((status, i) => (
                        <div key={i} className="p-4 rounded border grid grid-cols-4 gap-2">
                            <div
                              className={`rounded-full col-span-1 text-lg w-12 h-12 flex-col flex ${status.bg} ${status.color}`}>
                                <status.icon/>
                            </div>
                            <div className="col-span-3">
                                <h2 className="text-sm">{status.title}</h2>
                                <p className="font-bold mt-2">{status.total}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                        {orders?.length === 0 ? (
                            <div className="flex-col items-center justify-center flex h-96">
                                <Empty text={'No order found'}/>
                            </div>
                        ): (
                            <Table dashboard={true} datas={orders} />
                        )}
                    </div>
                )
            }
        </SideBar>
    )

}

export default Dashboard;