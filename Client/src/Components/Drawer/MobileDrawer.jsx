import React, { useEffect } from 'react';
import {IoClose} from 'react-icons/io5';
import {Link, NavLink} from 'react-router-dom';
import MainDrawer from './MainDrawer';
import {BiHomeAlt, BiPhoneCall, BiHelpCircle} from 'react-icons/bi';
import {MdSecurity} from 'react-icons/md';
import {HiOutlineUserGroup} from 'react-icons/hi';
import {BsFileEarmarkMedical} from 'react-icons/bs';
import {FiShoppingBag} from 'react-icons/fi';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../Notifications/Loader';
import {getCategoriesAction} from '../../Redux/Actions/CategoryAction';
import toast from 'react-hot-toast';


function MobileDrawer({mobileDrawerOpen, toggleMobileDrawer})  {
    const active= 'bg-deepGray';
    const inActive= 'flex sm:gap-8 gap-4 hover:bg-deepGray items-center py-4 rounded sm:px-8 px-4 text-sm';
    const Hover = ({ isActive }) =>
        isActive ? `${active} ${inActive}` : inActive;

    const dispatch = useDispatch();

    //state
    const {loading, categories, error} = useSelector(state => state.categoriesList);

    //get all categories
    useEffect(() => {
        dispatch(getCategoriesAction())
    }, [dispatch])

    //error handling
    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch({type: 'CATEGORIES_LIST_RESET'})
        }
    }, [error, dispatch]);

    const Links = [
        {
            link: '/',
            name: 'Home',
            icon: BiHomeAlt
        },
        {
            link: '/about-us',
            name: 'About Us',
            icon: HiOutlineUserGroup,
        },
        {
            link: '/shop',
            name: 'Shop',
            icon: FiShoppingBag,
        },
        {
            link: '/contact-us',
            name: 'Contact Us',
            icon: BiPhoneCall,
        },
        {
            link: '/faq',
            name: 'FAQ',
            icon: BiHelpCircle,
        },
        {
            link: '/policy',
            name: 'Privacy Policy',
            icon: MdSecurity,
        },
        {
            link: '/terms-condition',
            name: 'Terms and Conditions',
            icon: BsFileEarmarkMedical,
        },
    ];

    return (
        <MainDrawer DrawerOpen= {mobileDrawerOpen} closeDrawer= {toggleMobileDrawer} position='left'>
            <div className='flex flex-col w-full h-full justify-between items-middle bg-white rounded'>
                <div className='w-full flex justify-between items-center h-16 px-2 py-4 bg-main text-white'>
                    <h2 className='font-semibold font-serif text-lg m-0 text-heading flex align-center'>
                        <Link onClick={toggleMobileDrawer} to='/'>
                          <img
                          className='w-40 h-40 object-contain'
                          src="/images/logo.png"
                          alt="logo"
                          />
                        </Link>
                    </h2>
                    <button
                      onClick={toggleMobileDrawer}
                      className='flex text-xl items-center justify-center w-8 h-8 rounded-full text-subMain bg-gray-50'
                      aria-label='close'
                    >
                        <IoClose/>
                    </button>
                </div>

                {/* cart items */}
                <div className='overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full'>
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col'>
                            {Links.map((item, index) =>{
                                const Icon = item.icon;
                                return (
                                    <NavLink
                                     key={index}
                                     to={item.link}
                                     className={Hover}
                                     onClick={toggleMobileDrawer}
                                     >
                                        <Icon className='text-lg'/>
                                        <span>{item.name}</span>
                                     </NavLink>
                                );
                            })}
                        </div>

                        {/*categories section*/}
                        {
                            loading ? (
                                <div className='flex-col flex justify-center items-center h-56'>
                                    <Loader />
                                </div>
                            )
                            :
                            (
                                <div className='grid grid-cols-2'>
                            {categories?.map((c) => (
                                <NavLink
                                  onClick={toggleMobileDrawer}
                                  to={`/shop?category=${c?._id}`}
                                  key={c?._id}
                                  className={inActive}
                                >
                                    <div className='shadow rounded-full p-1 w-6 h-6'>
                                        <img
                                          src={c?.image}
                                          alt={c?.name}
                                          className='w-full h-full object-contain'
                                        />
                                    </div>
                                    <h2 className='font-semibold text-xs'>{c?.name}</h2>
                                </NavLink>
                            ))}
                        </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </MainDrawer>
    )
}

export default MobileDrawer;