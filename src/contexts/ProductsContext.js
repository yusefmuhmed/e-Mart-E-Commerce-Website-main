"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

import {
  Toaster
} from "react-hot-toast";

const ProductsContext = createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export default function ProductsProvider({
  children
}) {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsCount, setProductsCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [category, setCategory] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [gridView, setGridView] = useState(true);
  const [brands, setBrands] = useState([]);
  const [material, setMaterial] = useState([]);
  const [brandsCount, setBrandsCount] = useState(0);
  const [brand, setBrand] = useState([]);
  const [sizeType, setSizeType] = useState([]);


  const productsVisible = useRef([]);
  const productsFiltered = useRef([]);

  if (!productsLoading) {
    productsFiltered.current = products[0]
      .filter((p) => {
        if (category.length === 0) {
          return p;
        } else if (category === p.categorie) {
          return p;
        }
      })
      .filter((p1) => {
        if (brand.length === 0) {
          return p1;
        } else if (brand.includes(p1.brand)) {
          return p1;
        }
      })
      .filter((p2) => {
        if (material.length === 0) {
          return p2;
        } else if (material.includes(p2.material)) {
          return p2;
        }
      })
      .filter((p3) => {
        if (sizeType.length === 0) {
          return p3;
        } else {
          return p3.sizeTypes.some((st) =>
          st.sizes.some((size) => sizeType.includes(size.name))
        );
        }
      });

    productsVisible.current = productsFiltered.current.slice(
      (pageNumber - 1) * 12,
      pageNumber * 12
    );
  }



  useEffect(() => {
    (async () => {
      const res = await fetch("http://141.136.44.242:1337/api/products?populate=deep", {
        headers: {
          Authorization: "Bearer 79e5e267084cf7208054b64128f77ba4c93dff326950f8f4de48f679bbae67ac281b9318cd6d332c40b962e3c2a12e114bfab859299dd41cbff945127c00e0350819e0a87d4d0cca8542ca7299be4975a9c987ab3bb86d84df8d3ae5e7b31b0ca676e0e22ba394c8bc27d1d73843def52a808491f3bc1659eb02a7c508072f7b"
        }
      });

      const products = await res.json();
      const res2 = await fetch("http://141.136.44.242:1337/api/categories", {
        headers: {
          Authorization: "Bearer 79e5e267084cf7208054b64128f77ba4c93dff326950f8f4de48f679bbae67ac281b9318cd6d332c40b962e3c2a12e114bfab859299dd41cbff945127c00e0350819e0a87d4d0cca8542ca7299be4975a9c987ab3bb86d84df8d3ae5e7b31b0ca676e0e22ba394c8bc27d1d73843def52a808491f3bc1659eb02a7c508072f7b"
        }
      });
      const categories = await res2.json();



      const res3 = await fetch("http://141.136.44.242:1337/api/brands", {
        headers: {
          Authorization: "Bearer 79e5e267084cf7208054b64128f77ba4c93dff326950f8f4de48f679bbae67ac281b9318cd6d332c40b962e3c2a12e114bfab859299dd41cbff945127c00e0350819e0a87d4d0cca8542ca7299be4975a9c987ab3bb86d84df8d3ae5e7b31b0ca676e0e22ba394c8bc27d1d73843def52a808491f3bc1659eb02a7c508072f7b"
        }
      });
      const brands = await res3.json();

      setProducts([products.data]);
      setProductsCount(products.meta.pagination.total);
      setCategories([
        categories.data
      ]);
      setCategoriesCount(categories.meta.pagination.total);
      setBrands([brands.data]);
      setBrandsCount(brands.meta.pagination.total);
      setProductsLoading(false);
    })();
  }, []);

  return ( <
    ProductsContext.Provider value = {
      {
        products,
        productsCount,
        productsLoading,
        categories,
        categoriesCount,
        category,
        setCategory,
        pageNumber,
        setPageNumber,
        gridView,
        setGridView,
        productsVisible,
        brands,
        setBrands,
        brandsCount,
        setBrandsCount,
        brand,
        setBrand,
        productsFiltered,
        material,
        setMaterial,
        sizeType,
        setSizeType
      }
    } > {
      children
    } <
    Toaster position = "top-center" / >
    </ProductsContext.Provider>
  );
}