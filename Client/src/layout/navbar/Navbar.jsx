import React, {useContext} from "react";
import { FaSearch } from "react-icons/fa";
import { CgUser } from 'react-icons/cg';
import { Link, NavLink } from 'react-router-dom';
import { SidebarContext } from '../../Context/PopUpContext';
import Cart from "../../Components/Drawer/Cart";
import { FiShoppingBag, FiShoppingCart } from 'react-icons/fi'
import { BiMenu } from 'react-icons/bi'
import { HiOutlineUser} from 'react-icons/hi'
import MobileDrawer from '../../Components/Drawer/MobileDrawer';
import { useSelector } from "react-redux";
import logo from '../../images/logo.png';


const Navbar = () => {
  const {cartItems} = useSelector((state) => state.cart);

    const {
        toggleCartDrawer,
        cartDrawerOpen,
        setSearch,
        submitHandler,
        search,
        mobileDrawerOpen,
        toggleMobileDrawer,
    } = useContext(SidebarContext);

    const hover = 'hover:text-main transitions';
    const Hover = ({isActive }) => (isActive ? 'text-main' : hover);

    return (
        <>
          <MobileDrawer
            mobileDrawerOpen={mobileDrawerOpen}
            toggleMobileDrawer={toggleMobileDrawer}
            />
            <Cart
              cartDrawerOpen={cartDrawerOpen}
              closeCartDrawer={toggleCartDrawer}
            />
            <div className="bg-white shadow-md sticky top-0 z-40">
              <div className="container mx-auto py-4 px-2 gap-10 lg:grid grid-cols-7 justify-between items-center">
                <div className="col-span-1 flex flex-btn flex-wrap justify-between lg:pb-0">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMobileDrawer}
                      className="lg:hidden block text-2xl">
                        <BiMenu />
                      </button>
                      <Link to="/">
                         <img
                         src={logo}
                         alt="logo"
                         className="lg:w-full h-16 w-35 object-contain"
                         />
                      </Link>
                  </div>
                  <div className="flex lg:hidden items-center gap-4 pr-2">
                    <NavLink to={'/dashboard'} className={`${Hover} text-2xl`}>
                      <HiOutlineUser/>
                    </NavLink>
                    <button onClick={toggleCartDrawer} className="text-xl relative">
                      <div className="w-5 h-5 flex-col -top-5 flex justify-center items-center rounded-full text-[10px] bg-flash text-white absolute">
                        {cartItems?.length}
                      </div>

                      <FiShoppingBag/>
                    </button>
                  </div>
                </div>
                <div className="col-span-3">
                  <form
                    onSubmit={(e) => submitHandler(e)}
                    className="w-full bg-deepGray rouunded flex gap-4 justify-between">
                       <button
                         type="submit"
                         className="flex items-center justify-center w-12 transition-colors duration-300 hover:bg-subMain flex-col text-xs h-10 md:text-sm md:h-12">
                          <FaSearch/>
                         </button>
                         <input onChange={(e)=> setSearch(e.target.value)}
                            value={search}
                            type="text"
                            placeholder="Search dresses, skirts, tops, jewellery.."
                            className="font-semibold text-xs md:text-sm w-11/12 bg-transparent border-none px-2 text-gray-900 focus:outline-none focus:ring-0 focus:border-gray-700"/>
                  </form>
                </div>
                <div className="col-span-3 font-bold hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end">
                  <NavLink to={'/shop'} className={Hover}>
                    Shop
                  </NavLink>
                  <NavLink to={'/'} className="hover:text-main">
                    About Us
                  </NavLink>
                  <NavLink to={'/'} className="hover:text-main">
                    Contact Us
                  </NavLink>
                  <NavLink to={'/dashboard'} className={Hover}>
                    <CgUser className="w-8 h-8"/>
                  </NavLink>
                  <button onClick={toggleCartDrawer} className={`${hover} relative`}>
                    <FiShoppingCart className="w-6 h-6"/>
                    <div className=" w-6 h-6 -top-5 -right-2 flex-col flex justify-center rounded-full text-[12px] bg-flash text-white absolute m-0.5">
                      {cartItems?.length}
                    </div>
                  </button>
                </div>
              </div>
            </div>
        </>
    );
};

export default Navbar;