import React, { useContext, useEffect, useMemo, useState } from "react";
import Filter from "./Filter";
import Products from "./Products";
import { BiFilter } from "react-icons/bi";
import { SidebarContext } from "../Context/PopUpContext";
import FilterDrawer from "./Drawer/FilterDrawer";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPopularProductsAction,
  getAllProductsAction,
} from "../Redux/Actions/ProductAction";
import { getCategoriesAction } from "../Redux/Actions/CategoryAction";
import { CardLoader } from "./Notifications/Loader";

const SidebarFilter = ({ category }) => {
  const { mobileFilterOpen, toggleMobileFilter, cartDrawerOpen, mobileDrawerOpen, setSearchValue, searchValue } =
    useContext(SidebarContext);
  const [published, setPublished] = useState({});
  const [categor, setCategor] = useState({});
  const [tag, setTag] = useState({});
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);

  //states
  const { products, loading, error, page, pages } = useSelector(
    (state) => state.productList
  );
  const { categories, error: catError } = useSelector(
    (state) => state.categoriesList
  );
  const { tags, error: tagError } = useSelector((state) => state.tagsProduct);

  const queries = useMemo(() => {
    const query = {
      search: searchValue ? searchValue : "",
      category: categor?.value ? categor?.value : "",
      sort: published?.value ? published?.value : "",
      tag: tag?.value ? tag?.value : "",
    };
    return query;
  }, [searchValue, categor, published, tag]);

  //get all categories
  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);

  //get all tags
  useEffect(() => {
    dispatch(getAllPopularProductsAction());
  }, [dispatch]);

  //check categories in url
  useEffect(() => {
    if (category) {
      setCategor({ title: category, value: category });
    }
  }, [category]);

  // get all products
  useEffect(() => {
    dispatch(getAllProductsAction({ ...queries, pageNumber: pageNumber }));
  }, [dispatch, pageNumber, queries]);


  //error handeling
  useEffect(() => {
    if (error || catError || tagError) {
      toast.error(error || catError || tagError);
      dispatch({
        type: error
          ? "PRODUCT_LIST_RESET"
          : catError
          ? "CATEGORIES_LIST_RESET"
          : "TAGS_PRODUCTS_RESET",
      });
    }
  }, [error, dispatch, catError, tagError]);

  //load more
  const HandleLoadMore = (value) => {
    if (value === "Next") {
      setPageNumber((prev) => prev + 1);
    } else {
      setPageNumber((prev) => prev - 1);
    }

    window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })};

  //clear filters
  const clearFilters = (states) => {
    setPublished({});
    setCategor({});
    setTag({});
    setSearchValue("");
    states?.setActivePublish(null);
    states?.setActiveCategory(null);
    states?.setActiveTag(null);
    setPageNumber(1);
  };

  return (
    <>
      <FilterDrawer
        FilterDrawerOpen={mobileFilterOpen}
        toggleFilterDrawer={toggleMobileFilter}
      />
      {!mobileFilterOpen && !cartDrawerOpen && !mobileDrawerOpen && (
        <button
        onClick={toggleMobileFilter}
        className="overflow-hidden fixed lg:hidden shadow-lg top-[150px] right-2 z-50 border-main border bg-white text-main"
      >
        <BiFilter className="text-3xl" />
      </button>
      )}


      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-2 lg:block hidden">
          <Filter
            button={false}
            states={{
              published: published,
              category: categor,
              setCategory: setCategor,
              setPublished: setPublished,
              tag: tag,
              setTag: setTag,
            }}
            functions={{
              SidebarFilter: () => {},
              clearFilters: clearFilters,
            }}
            categories={categories}
            tags={tags}
          />
        </div>
        <div className="lg:col-span-10 col-span-12">
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-2 gap-3">
            {loading ? (
              // Show loaders only when actually loading
              Array.from(Array(6).keys()).map((p, i) => (
                <CardLoader key={i} />
              ))
            ) : products?.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
                <div className="text-center max-w-md">
                  <div className="mb-6">
                    <img
                      src="https://res.cloudinary.com/dcqjcnz6u/image/upload/v1749058744/Empty-pana_aexqjp.svg"
                      alt="No products found"
                      className="w-24 h-24 mx-auto opacity-60"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any products matching your current filters.
                    Try adjusting your search criteria or browse our popular items.
                  </p>
                    <div className="space-y-3">
                      {/* <button
                        onClick={() => clearFilters()}
                        className="w-full bg-main text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                      >
                        Clear All Filters
                      </button> */}
                    </div>
                </div>
              </div>
              )
              : 
                products?.map((p) => (
                  <Products bg={true} key={p._id} product={p} />
                ))
              }
          </div>

          {pages > 1 && (
            <div className="w-full flex flex-row justify-center gap-4 my-12">
              <button
                disabled={page === 1}
                onClick={() => HandleLoadMore("Prev")}
                className="flex-row disabled:bg-opacity-70 gap-3 text-white py-4 px-5 text-sm rounded font-semibold bg-main"
              >
                Prev
              </button>
              <button
                disabled={pages && pages === page}
                onClick={() => HandleLoadMore("Next")}
                className="flex-row gap-3 disabled:bg-opacity-70 text-white py-4 px-5 text-sm rounded font-semibold bg-main"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarFilter;
