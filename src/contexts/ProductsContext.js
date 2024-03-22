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
          Authorization: "Bearer 27fe20a350b4e2b68a19de4e4ccbe100805600ccb7cdc1c79e7801c4f146b9c3a2a6e55d9426f9ad4324e4d4f561aca2e746b7118b62d86e3076410caa0e6a841bdbabc622aaf21f28fd5594c15b3f1c1d19ceb9290d17a6045a2bd26f516c30d65c5a3d0c57b519ec3bdbe7fa2f8241c6037a31710a8ccb57e626d34f75136f"
        }
      });

      const products = await res.json();
      const res2 = await fetch("http://141.136.44.242:1337/api/categories", {
        headers: {
          Authorization: "Bearer b05341289ac399b5d48a42bda5fc609bf54b27e313f5cc39ec77206b1f0ad09ddab71caa9bfabb0eab1fc307589daaf3ea2862cc1432310761a93c52247d07c0d61aced186d39214141df627b04e70c72131ffe2e2d61607122413310a0ff092cceac819c456c343a0ee1af9c7d393e0359aae39ed97fcb9900afebf64600a1b"
        }
      });
      const categories = await res2.json();



      const res3 = await fetch("http://141.136.44.242:1337/api/brands", {
        headers: {
          Authorization: "Bearer b05341289ac399b5d48a42bda5fc609bf54b27e313f5cc39ec77206b1f0ad09ddab71caa9bfabb0eab1fc307589daaf3ea2862cc1432310761a93c52247d07c0d61aced186d39214141df627b04e70c72131ffe2e2d61607122413310a0ff092cceac819c456c343a0ee1af9c7d393e0359aae39ed97fcb9900afebf64600a1b"
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