import React from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { toggle, toggleBrands } from "../../features/filter/filterSlice";
// import { getProducts } from "../../features/products/productsSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";

const Home = () => {
    const dispatch = useDispatch();
    const { stock, brands } = useSelector((state) => state.filter);
    // const { products, isLoading } = useSelector((state) => state.products);
    console.log(stock, brands);

    // useEffect(() => {
    //     dispatch(getProducts());
    // }, [dispatch]);
    const { data, isLoading, isError, error } = useGetProductsQuery();
    const products = data?.data;
    console.log(products);

    const activeClass = "text-white  bg-indigo-500 border-white";

    let content;
    if (isLoading) {
        content = (
            <div className="flex justify-center items-center h-[90vh] w-full">
                <h1>Loading...</h1>
            </div>
        );
    }
    if (products?.length) {
        content = products.map((product) => (
            <ProductCard key={product.model} product={product} />
        ));
    }

    if (products?.length && (brands?.length || stock)) {
        content = products
            .filter((product) => {
                if (stock) {
                    return product.status === true;
                }
                return product;
            })
            .filter((product) => {
                if (brands?.length) {
                    return brands.includes(product.brand);
                }
                return product;
            })
            .map((product) => (
                <ProductCard key={product.model} product={product} />
            ));
    }
    return (
        <div className="max-w-7xl gap-14 mx-auto my-10">
            <div className="mb-10 flex justify-end gap-5">
                <button
                    onClick={() => dispatch(toggle())}
                    className={`border px-3 py-2 rounded-full font-semibold ${
                        stock && activeClass
                    } `}
                >
                    In Stock
                </button>
                <button
                    onClick={() => dispatch(toggleBrands("amd"))}
                    className={`border px-3 py-2 rounded-full font-semibold ${
                        brands.includes("amd") && activeClass
                    }`}
                >
                    AMD
                </button>
                <button
                    onClick={() => dispatch(toggleBrands("intel"))}
                    className={`border px-3 py-2 rounded-full font-semibold ${
                        brands.includes("intel") && activeClass
                    }`}
                >
                    Intel
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
                {content}
            </div>
        </div>
    );
};

export default Home;
