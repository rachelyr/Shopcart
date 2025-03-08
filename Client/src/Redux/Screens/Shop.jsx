import React from 'react';
import Layout from '../../layout/Layout';
import SidebarFilter from '../../Components/SidebarFilter';
import { useSearchParams } from 'react-router-dom';

const Shop = () => {
    //get the product from query
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

  return (
    <Layout header={true}>
      <div className='min-h-screen container mx-auto px-4 my-6'>
        <SidebarFilter category={category}/>
      </div>
    </Layout>
  );
};

export default Shop;
