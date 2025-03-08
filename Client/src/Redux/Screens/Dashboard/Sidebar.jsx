import React from "react";
import Layout from "../../../layout/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import {BsGridFill} from "react-icons/bs";
import {FaRegListAlt} from "react-icons/fa";
import {FiSettings} from "react-icons/fi";
import {RiLockPasswordLine, RiLogoutCircleLine} from "react-icons/ri";
import {toast} from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { logoutAction } from "../../Actions/UserAction";


function Sidebar({children}) {
    const nav= useNavigate();
    const dispatch = useDispatch();

    const logoutHandler= () => {
        dispatch(logoutAction()); //action perfomed when user logged out
        toast.success('Logged out successfully');
        nav('/registration');
    };

    const SideLink = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: BsGridFill
        },
        {
            name: 'Orders',
            path: '/orders',
            icon: FaRegListAlt
        },
        {
            name: 'Update Profile',
            path: '/profile',
            icon: FiSettings
        },
        {
            name: 'Change Password',
            path: '/password',
            icon: RiLockPasswordLine
        },
    ];

    const active= 'bg-main text-white flex gap-3 items-center p-4';
    const hover= 'hover:text-main hover:bg-deepGray';
    const inActive= 'rounded font-medium text-sm transitions flex gap-3 items-center p-4';

    const Hover = ({isActive}) =>{
        return isActive? `${active} ${hover}` : `${inActive} ${hover}`;
    };

    return (
      <Layout header={true}>
        <div className="bg-deepGray">
          <div className="min-h-screen container mx-auto px-2">
            <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
              <div className="sticky col-span-2 bg-white p-6 rounded-md xl:mb-0 mb-5">
                {SideLink.map((item, i) => (
                  <NavLink key={i} className={Hover} to={item.path}>
                    <item.icon /> <p>{item.name}</p>
                  </NavLink>
                ))}
                <button
                  onClick={logoutHandler}
                  className={`${inActive} ${hover} w-full`}
                >
                  <RiLogoutCircleLine /> Logout
                </button>
              </div>
              <div
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="10"
                data-aos-duration="1000"
                className="col-span-6 rounded-md bg-white p-6"
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
}

export default Sidebar;