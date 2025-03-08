import React, { useContext, useMemo, useState } from "react";
import MainDrawer from "./MainDrawer";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import Filter from "../Filter";
import {SidebarContext} from '../../Context/PopUpContext';
import {useDispatch, useSelector} from 'react-redux';
import { getAllProductsAction } from "../../Redux/Actions/ProductAction";
import ScrollToTop from "../../ScrollToTop";


function FilterDrawer({ FilterDrawerOpen, toggleFilterDrawer}) {
    const { setSearchValue, searchValue } = useContext(SidebarContext);
    const [published, setPublished] = useState({});
    const [category, setCategory] = useState({});
    const [tag, setTag] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const dispatch = useDispatch();

    //states
    const {categories} = useSelector((state) => state.categoriesList);
    const {tags} = useSelector((state) => state.tagsProduct);

    //query params
    const queries = useMemo(() =>{
        const query = {
                search: searchValue ? searchValue : "",
                category: category?.value ? category?.value : "",
                sort: published?.value ? published?.value : "",
                tag: tag?.value ? tag?.value : "",
              };
              return query;
             }, [searchValue, category, published, tag]);

    //filter
    const SidebarFilter = () => {
        dispatch(getAllProductsAction({...queries, pageNumber: pageNumber}));
        toggleFilterDrawer();
    };

    //clear filters
    const clearFilters = (states) => {
        setPublished({});
        setCategory({});
        setTag({});
        setSearchValue('');
        states?.setActivePublish(null);
        states?.setActiveCategory(null);
        states?.setActiveTag(null);
        toggleFilterDrawer();
        setPageNumber(1);
        dispatch(getAllProductsAction({
            search: '',
            category: '',
            sort: '',
            tag: '',
            pageNumber: 1,
        }));
    };

    return (
        <MainDrawer DrawerOpen= {FilterDrawerOpen} closeDrawer= {toggleFilterDrawer}>
            <ScrollToTop/>
            <div className="flex flex-col w-full h-full justify-between items-middle bg-white rounded">
                <div className="w-full flex justify-between items-center h-16 px-2 py-4 bg-main text-white">
                    <h2 className="font-semibold font-serif text-lg m-0 text-heading flex align-center">
                        <Link onClick={toggleFilterDrawer} to='/'>
                           <img
                            src="/images/logo.png"
                            alt="logo"
                            className="w-40 h-40 object-contain"
                            />
                        </Link>
                    </h2>
                    <button
                      onClick={toggleFilterDrawer}
                      className="flex text-xl items-center justify-center w-8 h-8 rounded-full text-subMain bg-gray-50">
                        <IoClose />
                      </button>
                </div>
                {/* filters */}
                <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full p-12">
                    <Filter
                      button={true}
                      categories={categories}
                      tags={tags}
                      states={{
                        published: published,
                        category: category,
                        setCategory: setCategory,
                        setPublished: setPublished,
                        tag: tag,
                        setTag: setTag
                      }}
                      functions={{
                        SidebarFilter: SidebarFilter,
                        clearFilters: clearFilters,
                      }}
                    />
                </div>
            </div>
        </MainDrawer>
    );
}

export default FilterDrawer;