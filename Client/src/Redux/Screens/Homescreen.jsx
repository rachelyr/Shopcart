import React, { useEffect } from "react";
import Banner from "../../Components/Home/Banner";
import Categories from '../../Components/Home/Categories';
import FlashDeal from '../../Components/Home/FlashDeal';
import PopularProducts from '../../Components/Home/PopularProducts'
import Layout from '../../layout/Layout';
import {useDispatch, useSelector} from 'react-redux';
import { getAllProductsAction} from "../Actions/ProductAction";
import { getCategoriesAction } from "../Actions/CategoryAction";
import toast from "react-hot-toast";

function HomeScreen(){

    const dispatch = useDispatch();
    //states
    const {loading, error, categories} = useSelector((state) => state.categoriesList);
    const {products, offers, loading: loadingProducts, error: errorProducts} = useSelector((state) => state.productList);

    //get all categories
    useEffect(() =>{
        dispatch(getCategoriesAction());
    }, [dispatch]);

    //get all products
    useEffect(() =>{
        dispatch(getAllProductsAction({
            pageNumber: 1,
            category: '',
            search: '',
            sort: '',
            tag: ''})
        );
    }, [dispatch]);

    //error handeling
    useEffect(() =>{
        if(error || errorProducts){
            toast.error(error || errorProducts);
            dispatch({type: error? 'CATEGORIES_LIST_RESET': 'PRODUCT_LIST_RESET'});
        }
    }, [error, dispatch, errorProducts]);


    return(
        <Layout header={true}>
            <Banner/>
            <div className="min-h-screen container mx-auto xl:px-32 px-4 my-6">
                <Categories categories={categories} loading={loading}/>
                <PopularProducts datas={products} loading={loadingProducts}/>
                {/* <div className="mb-20">
                    <Promos/>
                </div> */}
                    <FlashDeal
                        datas={offers} loading={loadingProducts} />
            </div>
        </Layout>
    )
}

export default HomeScreen;