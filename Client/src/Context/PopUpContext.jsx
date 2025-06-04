import React, { createContext, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SidebarContext = createContext();

export const PopUpProvider = ({children}) => {
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [search, setSearch] = useState(''); //takes care of the input in the search bar
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const submitHandler = useCallback((e) => {
        e.preventDefault();
        if(search) {
            navigate(`/shop?search=${search}`);
            setSearchValue(search);
            setSearch('');
        }
    }, [navigate, search]);

    const toggleCartDrawer = useCallback(() => {setCartDrawerOpen(prev => !prev)}, []);
    const closeCartDrawer = useCallback(() => {setCartDrawerOpen(false)}, []);

    const toggleMobileDrawer = useCallback(() => {setMobileDrawerOpen(prev => !prev)}, []);
    const closeMobileDrawer = useCallback(() => setMobileDrawerOpen(false), []);

    const toggleMobileFilter = useCallback(() => {setMobileFilterOpen(prev => !prev)}, []);
    const closeMobileFilter = useCallback(() => {setMobileFilterOpen(false)}, []);

    const value = useMemo(
        () => ({
            cartDrawerOpen,
            toggleCartDrawer,
            closeCartDrawer,
            mobileDrawerOpen,
            toggleMobileDrawer,
            closeMobileDrawer,
            mobileFilterOpen,
            toggleMobileFilter,
            closeMobileFilter,
            search,
            setSearch,
            submitHandler,
            searchValue,
            setSearchValue
        }),

        [cartDrawerOpen, mobileDrawerOpen, mobileFilterOpen, search, searchValue, closeCartDrawer, closeMobileDrawer, closeMobileFilter, submitHandler, toggleCartDrawer, toggleMobileDrawer, toggleMobileFilter]
    );

    return (
        <SidebarContext.Provider value={value}> {children} </SidebarContext.Provider>
    );
};