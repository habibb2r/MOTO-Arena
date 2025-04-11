import { useState } from 'react';
import {  Input, Spin } from "antd";
import { useAllbrandandcategoryQuery, useGetAllProductsQuery, useGetSingleProductQuery } from '../redux/features/products/productApi';
import { toast } from 'sonner';
import {  LoadingOutlined } from "@ant-design/icons";
import { FilterModal } from '../components/modalFilter/Filtermodal';
import { TProduct } from '../redux/types/product';
import ProductCard from '../components/ui/ProductCard';
import Title from '../components/HomePageComponents/Title';
import filterLogo from '../assets/filter.png'




const AllProducts = () => {
  const   [openFilter, setOpenFilter] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [getminPrice, setMinPrice] = useState(0)
    const [getmaxPrice, setMaxPrice] = useState(Infinity)
    const [getCategory, setCategory] = useState('');
    const [getbrand, setBrand] = useState('');
    const [available,setAvailable] = useState(true)

    const { data: getAllProducts, isLoading } = useGetAllProductsQuery({ inStock:available,search: searchTerm, brand: getbrand, category: getCategory, maxPrice: getmaxPrice, minPrice: getminPrice });
    const { data: allbrandandcategory, isLoading: filterLoading } = useAllbrandandcategoryQuery({})
    const { data } = useGetSingleProductQuery({id: '646c0f2b1a3d4e5b8f7a9c3d'})

    console.log('allProducts', getAllProducts);
    console.log('brandAndCategory', allbrandandcategory);
    console.log('data', data);
    const { Search } = Input
    const allBrand = allbrandandcategory?.data[0]?.brands
    const allCategory = allbrandandcategory?.data[0]?.categories
   
    const handleFillter = async (value: any) => {
   
        setMinPrice(value?.minPrice)
        setMaxPrice(value?.maxPrice)
        setCategory(value?.model)
        setBrand(value?.brand)
        setAvailable(value?.isAvailable)

    }
   
    const categoryArray =allCategory?.map((cate:string) => ({
        name: cate,
        value: cate
    }));
    const brandArray = allBrand?.map((brand: string) => ({
        name: brand,
        value: brand
    }));

    const handleFillterFailed = (error : any) => {
        if(error){
            toast.error('Failed to filter')
        }
        
    }
    const handleSearch = (event: any) => {
        event.preventDefault();
        setSearchTerm(event.target.value);
    }
    return (
        <div className="px-5">
            <FilterModal
                open={openFilter}
                setOpen={setOpenFilter}
                handleFillter={handleFillter}
                categories={categoryArray}
                brands={brandArray}
                handleFillterFailed={handleFillterFailed}
            />
            {/*  header */}
            <Title title="All Products" subtitle="Explore our wide range of products" />
            {/* seacrh and filter  */}
            <div className="flex flex-row rounded-box justify-between shadow-md items-center my-5 px-4 ">
                <div className="px-5 md:w-[250px] w-[400px] flex justify-center items-center py-5">
                    <Search onChange={handleSearch} size="middle"
                     placeholder="Search by Name, Brand, Category" 
                     enterButton="Search" loading={isLoading} />
                </div>
                <div className=" md:w-1/2 w-1/3  flex justify-end">
                    <button  onClick={() => setOpenFilter(!openFilter)} > <img className='h-[50px]' src={filterLogo} alt="" /></button>
                </div>
            </div>
            {/* show card */}
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-5">
                {!isLoading || !filterLoading ? (getAllProducts?.data?.map((product: TProduct, idx: any) => (
                    <ProductCard
                        key={idx}
                        name={product?.name}
                        category={product?.category}
                        brand={product?.brand}
                        price={product?.price}
                        inStock={product?.inStock}
                        photoURL ={product?.photo as string}
                        url={`/product/${product?._id}`}
                    />
                ))) : (<div className="flex justify-center items-center lg:col-span-4 md:col-span-3 sm:col-span-2 col-span-1">
                     <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                </div>)}
            </div>

        </div>
    );
}

export default AllProducts;
