import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Footer() {
    const {userInfo} = useSelector((state) =>state.userLogin);

    const Links= [
        {
            title: 'Shopcart',
            links: [
                {
                    link: '/about-us',
                    name: 'About Us'
                },
                {
                    link: '/faq',
                    name: 'FAQ'
                },
                {
                    link: '/policy',
                    name: 'Policy'
                },
                {
                    link: '/terms-condition',
                    name: 'Terms and Conditions'
                },
            ],
        },
        {
            title: 'Top Category',
            links: [
                {
                    link: '/shop',
                    name: 'Men Clothing'
                },
                {
                    link: '/shop',
                    name: 'Women Clothing'
                },
                {
                    link: '/shop',
                    name: 'Shoes'
                },
                {
                    link: '/shop',
                    name: 'Kids Clothing'
                },
            ],
        },
        {
            title: 'My Account',
            links: [
                {
                    link: userInfo ? '/dashboard' : '/registration',
                    name: 'Dashboard'
                },
                {
                    link: userInfo ? '/orders' : '/registration',
                    name: 'My Orders'
                },
                {
                    link: userInfo ? '/profile' : '/registration',
                    name: 'Updated Profile'
                },
                {
                    link: userInfo ? '/password' : '/registration',
                    name: 'Change Password'
                },
            ],
        },
    ];

    return (
        <div className="bg-gray-50 py-4 border-t-2">
            <div className="container mx-auto px-2">
                <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11">
                    {Links.map((l, i) => (
                        <div
                          key={i}
                          className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3"
                        >
                            <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
                                {l.title}
                            </h3>
                            <ul className="text-sm flex flex-col space-y-3">
                                {l.links.map((t, index) => (
                                    <li className="flex items-baseline" key={index}>
                                        <Link
                                          to={t.link}
                                          className="text-gray-600 inline-block w-full hover:text-main"
                                        >
                                            {t.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
                        <Link to='/'>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;