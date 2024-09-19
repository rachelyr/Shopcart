import bycrypt from 'bcryptjs';

export const users = [
    {
    fullName: 'Demo User',
    email: 'demo@example.com',
    password: bycrypt.hashSync('123456', 10),
    phone: '1234567890',
   },
    {
    fullName: 'Zpunet Company',
    email: 'onlineshop@example.com',
    password: bycrypt.hashSync('123456', 10),
    phone: '1234567890',
   },
];


//export products
export const products = [
    {
        title: 'Wireless Headphones',
        description: 'Noise-cancelling over-ear headphones with Bluetooth connectivity.',
        price: 120.00,
        tags: ['electronics', 'audio', 'wireless'],
        salesOffer: {
            discount: 10, // Percentage discount
            status: 'active' // Can be 'active', 'expired', or 'upcoming'
        },
        images: [
            '/images/headphones-1.jpg',
            '/images/headphones-2.jpg'
        ],
        stock: 50
    },
    {
        title: 'Smartphone',
        description: 'Latest model with advanced features and sleek design.',
        price: 799.99,
        tags: ['electronics', 'mobile', 'smartphone'],
        salesOffer: {
            discount: 5,
            status: 'active'
        },
        images: [
            '/images/smartphone-1.jpg',
            '/images/smartphone-2.jpg'
        ],
        stock: 30
    },
    {
        title: 'Running Shoes',
        description: 'Comfortable and durable running shoes for all terrains.',
        price: 85.00,
        tags: ['footwear', 'shoes', 'running'],
        salesOffer: {
            discount: 15,
            status: 'upcoming'
        },
        images: [
            '/images/running-shoes-1.jpg',
            '/images/running-shoes-2.jpg'
        ],
        stock: 100
    },
    {
        title: 'Gaming Laptop',
        description: 'High-performance laptop with powerful graphics card.',
        price: 1500.00,
        tags: ['electronics', 'computers', 'gaming'],
        salesOffer: {
            discount: 20,
            status: 'expired'
        },
        images: [
            '/images/gaming-laptop-1.jpg',
            '/images/gaming-laptop-2.jpg'
        ],
        stock: 20
    },
    {
        title: 'Wrist Watch',
        description: 'Stylish wrist watch with leather strap and water resistance.',
        price: 250.00,
        tags: ['accessories', 'watch', 'fashion'],
        salesOffer: {
            discount: 0,
            status: 'active'
        },
        images: [
            '/images/wrist-watch-1.jpg',
            '/images/wrist-watch-2.jpg'
        ],
        stock: 75
    }
];

export const categories = [
    {
        name: `Women's Fashion`,
        image: 'https://res.cloudinary.com/dcqjcnz6u/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1724944716/women-over-40-fashion-trends-d2line-1024x683_vvr4fa.png'
    },
    {
        name: `Women's Footwear`,
        image: 'https://res.cloudinary.com/dcqjcnz6u/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1724944964/I4QE2T624FEZPJE36RJZK3ZENY_h7mun0.jpg'
    },
    {
        name: `Men's Fashion`,
        image: 'https://res.cloudinary.com/dcqjcnz6u/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1724944478/960x0_muhzqh.jpg'
    },
    {
        name: `Men's Footwear`,
        image: 'https://res.cloudinary.com/dcqjcnz6u/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1724944994/lighter_ryrs3v.jpg'
    },
    {
        name: 'Electronics',
        image: 'https://res.cloudinary.com/dcqjcnz6u/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1724945065/90_zioc7b.jpg'
    },
    {
        name: 'Kitchenware',
        image: 'https://res.cloudinary.com/dcqjcnz6u/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1724945196/a-big-kitchen-with-black-stained-lerhyttan-fronts-and-a-wood-de29a4fef1e9519e7dec3b2104c12b76_mibll6.jpg'
    },
    {
        name: `Mobiles and Tablets`,
        image: 'https://res.cloudinary.com/dcqjcnz6u/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1724945135/best-phones-zdnet-thumb-image_cpp9z0.jpg'
    },
    {
        name: `Laptops`,
        image: 'https://res.cloudinary.com/dcqjcnz6u/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1724945099/surface-laptop-7th-edition-family-sizzle-poster_zuawr2.jpg'
    },
    {
        name: `Watches`,
        image: 'https://res.cloudinary.com/dcqjcnz6u/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1724946940/71CXO5AegEL._AC_UY1000__nn8iqq.jpg'
    },
    {
        name: `Books`,
        image: 'https://res.cloudinary.com/dcqjcnz6u/image/upload/v1724947053/author-books-of-2023-16x9_y0hsmn.jpg'
    }
]