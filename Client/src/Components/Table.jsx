import React from 'react'
import {Link} from 'react-router-dom';
import {toast} from 'react-hot-toast';
import {dateFormat} from '../Context/Functionality';
import {GoEye} from 'react-icons/go';
import {RiDeleteBinLine} from 'react-icons/ri';
import {useDispatch, useSelector} from 'react-redux';
import { deleteOrderAction } from '../Redux/Actions/OrderAction';

function Table ({dashboard, datas}){
  const Head = 'tex-xs font-semibold px-6 py-2 uppercase';
  const Text = 'px-5 text-sm py-3 leading-6 whitespace-nowrap';
  const badge = 'py-1 px-2 rounded-full text-xs font-semibold';
  const dispatch = useDispatch();

  //states
  const {success, error} = useSelector((state) => state.deleteOrder);
  const {error: ordersError} = useSelector((state) => state.getAllOrders);

  // console.log('from table: ', success, error);
  //delete order
  const deleteHandler =(id) => {
    if (window.confirm('This order will be deleted')){
      dispatch(deleteOrderAction(id));
    }
  };

  //error handling
  React.useEffect(()=> {
    if (error || ordersError) {
      toast.error(error || ordersError);
      dispatch({type: error ? 'ORDER_DELETE_RESET': 'ORDER_GET_ALL_RESET'});
    }
  }, [error, dispatch, ordersError]);

  //success handling
  React.useEffect(() => {
    if (success) {
      dispatch({type: 'ORDER_DELETE_RESET'});
    }
  }, [success, dispatch]);

  //rows
  const Rows = ({order}) => {
    return (
        <tr>
            <td className={`${Text} font-medium`}>{order?._id.slice(6, 15)}</td>
            <td className={`${Text} text-center`}>
                {dateFormat(order?.createdAt)}
            </td>

            <td className={`${Text} text-center`}>
                {order?.payments?.paymentMethod
                  ? order?.payments?.paymentMethod
                  : '---'}
            </td>
            <td className={`${Text} text-center`}>
                {order?.payments?.status === 'Completed' && (
                    <span className={`${badge} text-green-600 bg-green-100`}>
                      {order?.payments?.status}
                    </span>
                )}
                {order?.payments?.status === 'Pending' && (
                  <span className={`${badge} text-star bg-orange-100`}>
                    {order?.payments?.status}
                  </span>
                )}
                {order?.payments?.status === 'Cancelled' && (
                  <span className={`${badge} text-flash bg-red-100`}>
                    {order?.payments?.status}
                  </span>
                )}
            </td>
            <td className={`${Text} font-bold text-center`}>
              ₹{order?.totalPrice?.toLocaleString('en-IN')}
            </td>
            <td className={`${Text} float-right flex gap-2`}>
              {!dashboard && (
                <button
                  onClick={() => deleteHandler(order?._id)}
                  className='border text-flash border-flash rounded flex-col justify-center items-center flex w-6 h-6'>
                    <RiDeleteBinLine/>
                  </button>
              )}

              <Link
                to={`/orders/${order?._id}`}
                className='border text-main border-main rounded flex-col flex justify-center items-center w-6 h-6'>
                  <GoEye/>
                </Link>
            </td>
        </tr>
    );
  };

  return (
    <div className='w-full relative overflow-hidden overflow-x-scroll'>
      <table className='table-auto min-w-full border border-deepest divide-y divide-gray-200'>
        <thead>
          <tr className='bg-deepest'>
            <th scope='col' className={`${Head} text-left`}>
              ID
            </th>
            <th scope='col' className={`${Head} text-center`}>
              Date
            </th>
            <th scope='col' className={`${Head} text-center`}>
              Method
            </th>
            <th scope='col' className={`${Head} text-center`}>
              Payment Status
            </th>
            <th scope='col' className={`${Head} text-center`}>
              Total
            </th>
            <th scope='col' className={`${Head} text-end`}>
              Action
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-deepest'>
          {dashboard
            ? datas
              ?.slice(0, 5)
              ?.map((order) => <Rows key={order?._id} order={order}/>)
              : datas?.map((order) => <Rows key={order?._id} order={order}/>)}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
