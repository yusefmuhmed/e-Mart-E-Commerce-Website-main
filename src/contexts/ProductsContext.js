"use client";

import { createContext, useEffect, useState, useContext, useRef } from "react";
import { Toaster } from "react-hot-toast";

const ProductsContext = createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsCount, setProductsCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [category, setCategory] = useState("all");
  const [pageNumber, setPageNumber] = useState(1);
  const [gridView, setGridView] = useState(true);
  const [brands, setBrands] = useState([]);
  const [brandsCount, setBrandsCount] = useState(0);
  const [brand, setBrand] = useState([]);

  const productsVisible = useRef([]);
  const productsFiltered = useRef([]);

  if (!productsLoading) {
    productsFiltered.current = products
      .filter((p) => {
        if (category === "all") {
          return p;
        } else if (category === p.category) {
          return p;
        }
      })
      .filter((p1) => {
        if (brand.length === 0) {
          return p1;
        } else if (brand.includes(p1.brand)) {
          return p1;
        }
      });

    productsVisible.current = productsFiltered.current.slice(
      (pageNumber - 1) * 12,
      pageNumber * 12
    );

    // console.log(productsVisible.current);
  }

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:1337/api/products?populate=*", {
        headers: { Authorization: "Bearer 27fe20a350b4e2b68a19de4e4ccbe100805600ccb7cdc1c79e7801c4f146b9c3a2a6e55d9426f9ad4324e4d4f561aca2e746b7118b62d86e3076410caa0e6a841bdbabc622aaf21f28fd5594c15b3f1c1d19ceb9290d17a6045a2bd26f516c30d65c5a3d0c57b519ec3bdbe7fa2f8241c6037a31710a8ccb57e626d34f75136f" }
      });
      const products = await res.json();
      const res2 =await fetch("http://localhost:1337/api/categories", {
        headers: { Authorization: "Bearer 27fe20a350b4e2b68a19de4e4ccbe100805600ccb7cdc1c79e7801c4f146b9c3a2a6e55d9426f9ad4324e4d4f561aca2e746b7118b62d86e3076410caa0e6a841bdbabc622aaf21f28fd5594c15b3f1c1d19ceb9290d17a6045a2bd26f516c30d65c5a3d0c57b519ec3bdbe7fa2f8241c6037a31710a8ccb57e626d34f75136f" }
      });
      const categories = await res2.json();
      const res3 =await fetch("http://localhost:1337/api/brands", {
        headers: { Authorization: "Bearer 27fe20a350b4e2b68a19de4e4ccbe100805600ccb7cdc1c79e7801c4f146b9c3a2a6e55d9426f9ad4324e4d4f561aca2e746b7118b62d86e3076410caa0e6a841bdbabc622aaf21f28fd5594c15b3f1c1d19ceb9290d17a6045a2bd26f516c30d65c5a3d0c57b519ec3bdbe7fa2f8241c6037a31710a8ccb57e626d34f75136f" }
      });
      const brands = await res3.json();

      // const data={
      //   "products": [
      //     {
      //       "id": "647a5b149e04660c445580ce",
      //       "brand": "Hemani Tea",
      //       "category": "skincare",
      //       "description": "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
      //       "discountPercentage": 4.09,
      //       "id_": 17,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/17/1.jpg",
      //         "https://i.dummyjson.com/data/products/17/2.jpg",
      //         "https://i.dummyjson.com/data/products/17/3.jpg",
      //         "https://i.dummyjson.com/data/products/17/thumbnail.jpg"
      //       ],
      //       "price": 12,
      //       "rating": 4.52,
      //       "stock": 78,
      //       "thumbnail": "https://i.dummyjson.com/data/products/17/thumbnail.jpg",
      //       "title": "Tree Oil 30ml"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580be",
      //       "brand": "Apple",
      //       "category": "smartphones",
      //       "description": "An apple mobile which is nothing like apple",
      //       "discountPercentage": 12.96,
      //       "id_": 1,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/1/1.jpg",
      //         "https://i.dummyjson.com/data/products/1/2.jpg",
      //         "https://i.dummyjson.com/data/products/1/3.jpg",
      //         "https://i.dummyjson.com/data/products/1/4.jpg",
      //         "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
      //       ],
      //       "price": 549,
      //       "rating": 4.69,
      //       "stock": 94,
      //       "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      //       "title": "iPhone 9"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580d2",
      //       "brand": "Saaf & Khaas",
      //       "category": "groceries",
      //       "description": "Fine quality Branded Product Keep in a cool and dry place",
      //       "discountPercentage": 4.81,
      //       "id_": 21,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/21/1.png",
      //         "https://i.dummyjson.com/data/products/21/2.jpg",
      //         "https://i.dummyjson.com/data/products/21/3.jpg"
      //       ],
      //       "price": 20,
      //       "rating": 4.44,
      //       "stock": 133,
      //       "thumbnail": "https://i.dummyjson.com/data/products/21/thumbnail.png",
      //       "title": "- Daal Masoor 500 grams"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580da",
      //       "brand": "luxury palace",
      //       "category": "home-decoration",
      //       "description": "Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate",
      //       "discountPercentage": 15.34,
      //       "id_": 29,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/29/1.jpg",
      //         "https://i.dummyjson.com/data/products/29/2.jpg",
      //         "https://i.dummyjson.com/data/products/29/3.webp",
      //         "https://i.dummyjson.com/data/products/29/4.webp",
      //         "https://i.dummyjson.com/data/products/29/thumbnail.webp"
      //       ],
      //       "price": 60,
      //       "rating": 4.44,
      //       "stock": 7,
      //       "thumbnail": "https://i.dummyjson.com/data/products/29/thumbnail.webp",
      //       "title": "Handcraft Chinese style"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580e9",
      //       "brand": "Ghazi Fabric",
      //       "category": "womens-dresses",
      //       "description": "This classy shirt for women gives you a gorgeous look on everyday wear and specially for semi-casual wears.",
      //       "discountPercentage": 16.88,
      //       "id_": 44,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/44/1.jpg",
      //         "https://i.dummyjson.com/data/products/44/2.jpg",
      //         "https://i.dummyjson.com/data/products/44/3.jpg",
      //         "https://i.dummyjson.com/data/products/44/4.jpg",
      //         "https://i.dummyjson.com/data/products/44/thumbnail.jpg"
      //       ],
      //       "price": 79,
      //       "rating": 4.03,
      //       "stock": 2,
      //       "thumbnail": "https://i.dummyjson.com/data/products/44/thumbnail.jpg",
      //       "title": "Ladies Multicolored Dress"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580f9",
      //       "brand": "Sneakers",
      //       "category": "mens-shoes",
      //       "description": "High Quality ,Stylish design ,Comfortable wear ,FAshion ,Durable",
      //       "discountPercentage": 7.55,
      //       "id_": 60,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/60/1.jpg",
      //         "https://i.dummyjson.com/data/products/60/2.jpg",
      //         "https://i.dummyjson.com/data/products/60/3.jpg",
      //         "https://i.dummyjson.com/data/products/60/thumbnail.jpg"
      //       ],
      //       "price": 58,
      //       "rating": 4.55,
      //       "stock": 129,
      //       "thumbnail": "https://i.dummyjson.com/data/products/60/thumbnail.jpg",
      //       "title": "Stylish Casual Jeans Shoes"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558101",
      //       "brand": "Luxury Digital",
      //       "category": "womens-watches",
      //       "description": "Stylish Luxury Digital Watch For Girls / Women - Led Smart Ladies Watches For Girls",
      //       "discountPercentage": 9.03,
      //       "id_": 68,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/68/1.jpg",
      //         "https://i.dummyjson.com/data/products/68/2.jpg"
      //       ],
      //       "price": 57,
      //       "rating": 4.55,
      //       "stock": 77,
      //       "thumbnail": "https://i.dummyjson.com/data/products/68/thumbnail.webp",
      //       "title": "Stylish Luxury Digital Watch"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558107",
      //       "brand": "Copenhagen Luxe",
      //       "category": "womens-bags",
      //       "description": "It features an attractive design that makes it a must have accessory in your collection. We sell different kind of bags for boys, kids, women, girls and also for unisex.",
      //       "discountPercentage": 11.19,
      //       "id_": 74,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/74/1.jpg",
      //         "https://i.dummyjson.com/data/products/74/2.jpg",
      //         "https://i.dummyjson.com/data/products/74/3.jpg",
      //         "https://i.dummyjson.com/data/products/74/4.jpg",
      //         "https://i.dummyjson.com/data/products/74/thumbnail.jpg"
      //       ],
      //       "price": 57,
      //       "rating": 4.01,
      //       "stock": 43,
      //       "thumbnail": "https://i.dummyjson.com/data/products/74/thumbnail.jpg",
      //       "title": "Leather Hand Bag"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558115",
      //       "brand": "TC Reusable",
      //       "category": "automotive",
      //       "description": "TC Reusable Silicone Magic Washing Gloves with Scrubber, Cleaning Brush Scrubber Gloves Heat Resistant Pair for Cleaning of Kitchen, Dishes, Vegetables and Fruits, Bathroom, Car Wash, Pet Care and Multipurpose",
      //       "discountPercentage": 3.19,
      //       "id_": 88,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/88/1.jpg",
      //         "https://i.dummyjson.com/data/products/88/2.jpg",
      //         "https://i.dummyjson.com/data/products/88/3.jpg",
      //         "https://i.dummyjson.com/data/products/88/4.webp",
      //         "https://i.dummyjson.com/data/products/88/thumbnail.jpg"
      //       ],
      //       "price": 29,
      //       "rating": 4.98,
      //       "stock": 42,
      //       "thumbnail": "https://i.dummyjson.com/data/products/88/thumbnail.jpg",
      //       "title": "TC Reusable Silicone Magic Washing Gloves"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558120",
      //       "brand": "Ifei Home",
      //       "category": "lighting",
      //       "description": "American Vintage Wood Pendant Light Farmhouse Antique Hanging Lamp Lampara Colgante",
      //       "discountPercentage": 8.84,
      //       "id_": 99,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/99/1.jpg",
      //         "https://i.dummyjson.com/data/products/99/2.jpg",
      //         "https://i.dummyjson.com/data/products/99/3.jpg",
      //         "https://i.dummyjson.com/data/products/99/4.jpg",
      //         "https://i.dummyjson.com/data/products/99/thumbnail.jpg"
      //       ],
      //       "price": 46,
      //       "rating": 4.32,
      //       "stock": 138,
      //       "thumbnail": "https://i.dummyjson.com/data/products/99/thumbnail.jpg",
      //       "title": "American Vintage Wood Pendant Light"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580c7",
      //       "brand": "HP Pavilion",
      //       "category": "laptops",
      //       "description": "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
      //       "discountPercentage": 6.18,
      //       "id_": 10,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/10/1.jpg",
      //         "https://i.dummyjson.com/data/products/10/2.jpg",
      //         "https://i.dummyjson.com/data/products/10/3.jpg",
      //         "https://i.dummyjson.com/data/products/10/thumbnail.jpeg"
      //       ],
      //       "price": 1099,
      //       "rating": 4.43,
      //       "stock": 89,
      //       "thumbnail": "https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
      //       "title": "HP Pavilion 15-DK1056WM"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580c2",
      //       "brand": "Huawei",
      //       "category": "smartphones",
      //       "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
      //       "discountPercentage": 10.58,
      //       "id_": 5,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/5/1.jpg",
      //         "https://i.dummyjson.com/data/products/5/2.jpg",
      //         "https://i.dummyjson.com/data/products/5/3.jpg"
      //       ],
      //       "price": 499,
      //       "rating": 4.09,
      //       "stock": 32,
      //       "thumbnail": "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
      //       "title": "Huawei P30"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580e3",
      //       "brand": "Soft Cotton",
      //       "category": "tops",
      //       "description": "sublimation plain kids tank tops wholesale",
      //       "discountPercentage": 11.12,
      //       "id_": 38,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/38/1.png",
      //         "https://i.dummyjson.com/data/products/38/2.jpg",
      //         "https://i.dummyjson.com/data/products/38/3.jpg",
      //         "https://i.dummyjson.com/data/products/38/4.jpg"
      //       ],
      //       "price": 100,
      //       "rating": 4.8,
      //       "stock": 20,
      //       "thumbnail": "https://i.dummyjson.com/data/products/38/thumbnail.jpg",
      //       "title": "sublimation plain kids tank"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580e5",
      //       "brand": "Top Sweater",
      //       "category": "tops",
      //       "description": "women winter clothes thick fleece hoodie top with sweat pantjogger women sweatsuit set joggers pants two piece pants set",
      //       "discountPercentage": 13.39,
      //       "id_": 40,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/40/1.jpg",
      //         "https://i.dummyjson.com/data/products/40/2.jpg"
      //       ],
      //       "price": 57,
      //       "rating": 4.91,
      //       "stock": 84,
      //       "thumbnail": "https://i.dummyjson.com/data/products/40/thumbnail.jpg",
      //       "title": "women winter clothes"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580ee",
      //       "brand": "Maasai Sandals",
      //       "category": "womens-shoes",
      //       "description": "Womens Chappals & Shoe Ladies Metallic Tong Thong Sandal Flat Summer 2020 Maasai Sandals",
      //       "discountPercentage": 2.62,
      //       "id_": 49,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/49/1.jpg",
      //         "https://i.dummyjson.com/data/products/49/2.jpg",
      //         "https://i.dummyjson.com/data/products/49/3.webp",
      //         "https://i.dummyjson.com/data/products/49/thumbnail.jpg"
      //       ],
      //       "price": 23,
      //       "rating": 4.72,
      //       "stock": 107,
      //       "thumbnail": "https://i.dummyjson.com/data/products/49/thumbnail.jpg",
      //       "title": "Chappals & Shoe Ladies Metallic"
      //     },
      //     {
      //       "id": "647a5b149e04660c4455811a",
      //       "brand": "shock absorber",
      //       "category": "motorcycle",
      //       "description": "150cc 4-Stroke Motorcycle Automatic Motor Gas Motorcycles Scooter motorcycles 150cc scooter",
      //       "discountPercentage": 3.34,
      //       "id_": 93,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/93/1.jpg",
      //         "https://i.dummyjson.com/data/products/93/2.jpg",
      //         "https://i.dummyjson.com/data/products/93/3.jpg",
      //         "https://i.dummyjson.com/data/products/93/4.jpg",
      //         "https://i.dummyjson.com/data/products/93/thumbnail.jpg"
      //       ],
      //       "price": 1050,
      //       "rating": 4.84,
      //       "stock": 127,
      //       "thumbnail": "https://i.dummyjson.com/data/products/93/thumbnail.jpg",
      //       "title": "Automatic Motor Gas Motorcycles"
      //     },
      //     {
      //       "id": "647a5b149e04660c4455811b",
      //       "brand": "JIEPOLLY",
      //       "category": "motorcycle",
      //       "description": "new arrivals Fashion motocross goggles motorcycle motocross racing motorcycle",
      //       "discountPercentage": 3.85,
      //       "id_": 94,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/94/1.webp",
      //         "https://i.dummyjson.com/data/products/94/2.jpg",
      //         "https://i.dummyjson.com/data/products/94/3.jpg",
      //         "https://i.dummyjson.com/data/products/94/thumbnail.webp"
      //       ],
      //       "price": 900,
      //       "rating": 4.06,
      //       "stock": 109,
      //       "thumbnail": "https://i.dummyjson.com/data/products/94/thumbnail.webp",
      //       "title": "new arrivals Fashion motocross goggles"
      //     },
      //     {
      //       "id": "647a5b149e04660c4455811d",
      //       "brand": "lightingbrilliance",
      //       "category": "lighting",
      //       "description": "Wholesale slim hanging decorative kid room lighting ceiling kitchen chandeliers pendant light modern",
      //       "discountPercentage": 14.89,
      //       "id_": 96,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/96/1.jpg",
      //         "https://i.dummyjson.com/data/products/96/2.jpg",
      //         "https://i.dummyjson.com/data/products/96/3.jpg",
      //         "https://i.dummyjson.com/data/products/96/4.jpg",
      //         "https://i.dummyjson.com/data/products/96/thumbnail.jpg"
      //       ],
      //       "price": 30,
      //       "rating": 4.83,
      //       "stock": 96,
      //       "thumbnail": "https://i.dummyjson.com/data/products/96/thumbnail.jpg",
      //       "title": "lighting ceiling kitchen"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580c0",
      //       "brand": "Samsung",
      //       "category": "smartphones",
      //       "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
      //       "discountPercentage": 15.46,
      //       "id_": 3,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/3/1.jpg"
      //       ],
      //       "price": 1249,
      //       "rating": 4.09,
      //       "stock": 36,
      //       "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
      //       "title": "Samsung Universe 9"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580c5",
      //       "brand": "Microsoft Surface",
      //       "category": "laptops",
      //       "description": "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
      //       "discountPercentage": 10.23,
      //       "id_": 8,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/8/1.jpg",
      //         "https://i.dummyjson.com/data/products/8/2.jpg",
      //         "https://i.dummyjson.com/data/products/8/3.jpg",
      //         "https://i.dummyjson.com/data/products/8/4.jpg",
      //         "https://i.dummyjson.com/data/products/8/thumbnail.jpg"
      //       ],
      //       "price": 1499,
      //       "rating": 4.43,
      //       "stock": 68,
      //       "thumbnail": "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
      //       "title": "Microsoft Surface Laptop 4"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580c6",
      //       "brand": "Infinix",
      //       "category": "laptops",
      //       "description": "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
      //       "discountPercentage": 11.83,
      //       "id_": 9,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/9/1.jpg",
      //         "https://i.dummyjson.com/data/products/9/2.png",
      //         "https://i.dummyjson.com/data/products/9/3.png",
      //         "https://i.dummyjson.com/data/products/9/4.jpg",
      //         "https://i.dummyjson.com/data/products/9/thumbnail.jpg"
      //       ],
      //       "price": 1099,
      //       "rating": 4.54,
      //       "stock": 96,
      //       "thumbnail": "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
      //       "title": "Infinix INBOOK"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580db",
      //       "brand": "Golden",
      //       "category": "home-decoration",
      //       "description": "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
      //       "discountPercentage": 2.92,
      //       "id_": 30,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/30/1.jpg",
      //         "https://i.dummyjson.com/data/products/30/2.jpg",
      //         "https://i.dummyjson.com/data/products/30/3.jpg",
      //         "https://i.dummyjson.com/data/products/30/thumbnail.jpg"
      //       ],
      //       "price": 30,
      //       "rating": 4.92,
      //       "stock": 54,
      //       "thumbnail": "https://i.dummyjson.com/data/products/30/thumbnail.jpg",
      //       "title": "Key Holder"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580e7",
      //       "brand": "Digital Printed",
      //       "category": "womens-dresses",
      //       "description": "FABRIC: LILEIN CHEST: 21 LENGHT: 37 TROUSER: (38) :ARABIC LILEIN",
      //       "discountPercentage": 15.37,
      //       "id_": 42,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/42/1.png",
      //         "https://i.dummyjson.com/data/products/42/2.png",
      //         "https://i.dummyjson.com/data/products/42/3.png",
      //         "https://i.dummyjson.com/data/products/42/4.jpg",
      //         "https://i.dummyjson.com/data/products/42/thumbnail.jpg"
      //       ],
      //       "price": 80,
      //       "rating": 4.05,
      //       "stock": 148,
      //       "thumbnail": "https://i.dummyjson.com/data/products/42/thumbnail.jpg",
      //       "title": "Stiched Kurta plus trouser"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580eb",
      //       "brand": "IELGY fashion",
      //       "category": "womens-shoes",
      //       "description": "Close: Lace, Style with bottom: Increased inside, Sole Material: Rubber",
      //       "discountPercentage": 16.96,
      //       "id_": 46,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/46/1.webp",
      //         "https://i.dummyjson.com/data/products/46/2.jpg",
      //         "https://i.dummyjson.com/data/products/46/3.jpg",
      //         "https://i.dummyjson.com/data/products/46/4.jpg",
      //         "https://i.dummyjson.com/data/products/46/thumbnail.jpg"
      //       ],
      //       "price": 40,
      //       "rating": 4.14,
      //       "stock": 72,
      //       "thumbnail": "https://i.dummyjson.com/data/products/46/thumbnail.jpg",
      //       "title": "women's shoes"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580fb",
      //       "brand": "SKMEI 9117",
      //       "category": "mens-watches",
      //       "description": "Watch Crown With Environmental IPS Bronze Electroplating; Display system of 12 hours",
      //       "discountPercentage": 3.15,
      //       "id_": 62,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/62/1.jpg",
      //         "https://i.dummyjson.com/data/products/62/2.jpg"
      //       ],
      //       "price": 46,
      //       "rating": 4.05,
      //       "stock": 95,
      //       "thumbnail": "https://i.dummyjson.com/data/products/62/thumbnail.jpg",
      //       "title": "Waterproof Leather Brand Watch"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580ff",
      //       "brand": "Eastern Watches",
      //       "category": "womens-watches",
      //       "description": "Elegant design, Stylish ,Unique & Trendy,Comfortable wear",
      //       "discountPercentage": 3.23,
      //       "id_": 66,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/66/1.jpg",
      //         "https://i.dummyjson.com/data/products/66/2.jpg",
      //         "https://i.dummyjson.com/data/products/66/3.jpg",
      //         "https://i.dummyjson.com/data/products/66/4.JPG",
      //         "https://i.dummyjson.com/data/products/66/thumbnail.jpg"
      //       ],
      //       "price": 35,
      //       "rating": 4.79,
      //       "stock": 24,
      //       "thumbnail": "https://i.dummyjson.com/data/products/66/thumbnail.jpg",
      //       "title": "Steel Analog Couple Watches"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558102",
      //       "brand": "Watch Pearls",
      //       "category": "womens-watches",
      //       "description": "Product details of Golden Watch Pearls Bracelet Watch For Girls - Golden Chain Ladies Bracelate Watch for Women",
      //       "discountPercentage": 17.55,
      //       "id_": 69,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/69/1.jpg",
      //         "https://i.dummyjson.com/data/products/69/2.jpg",
      //         "https://i.dummyjson.com/data/products/69/3.webp",
      //         "https://i.dummyjson.com/data/products/69/4.jpg",
      //         "https://i.dummyjson.com/data/products/69/thumbnail.jpg"
      //       ],
      //       "price": 47,
      //       "rating": 4.77,
      //       "stock": 89,
      //       "thumbnail": "https://i.dummyjson.com/data/products/69/thumbnail.jpg",
      //       "title": "Golden Watch Pearls Bracelet Watch"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558111",
      //       "brand": "mastar watch",
      //       "category": "sunglasses",
      //       "description": "Fashion Oversized Square Sunglasses Retro Gradient Big Frame Sunglasses For Women One Piece Gafas Shade Mirror Clear Lens 17059",
      //       "discountPercentage": 13.89,
      //       "id_": 84,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/84/1.jpg",
      //         "https://i.dummyjson.com/data/products/84/2.jpg",
      //         "https://i.dummyjson.com/data/products/84/thumbnail.jpg"
      //       ],
      //       "price": 28,
      //       "rating": 4.64,
      //       "stock": 64,
      //       "thumbnail": "https://i.dummyjson.com/data/products/84/thumbnail.jpg",
      //       "title": "Square Sunglasses"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558118",
      //       "brand": "METRO 70cc Motorcycle - MR70",
      //       "category": "motorcycle",
      //       "description": "Engine Type:Wet sump, Single Cylinder, Four Stroke, Two Valves, Air Cooled with SOHC (Single Over Head Cam) Chain Drive Bore & Stroke:47.0 x 49.5 MM",
      //       "discountPercentage": 13.63,
      //       "id_": 91,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/91/1.jpg",
      //         "https://i.dummyjson.com/data/products/91/2.jpg",
      //         "https://i.dummyjson.com/data/products/91/3.jpg",
      //         "https://i.dummyjson.com/data/products/91/4.jpg",
      //         "https://i.dummyjson.com/data/products/91/thumbnail.jpg"
      //       ],
      //       "price": 569,
      //       "rating": 4.04,
      //       "stock": 115,
      //       "thumbnail": "https://i.dummyjson.com/data/products/91/thumbnail.jpg",
      //       "title": "Black Motorbike"
      //     },
      //     {
      //       "id": "647a5b149e04660c4455811f",
      //       "brand": "DADAWU",
      //       "category": "lighting",
      //       "description": "3 lights lndenpant kitchen islang dining room pendant rice paper chandelier contemporary led pendant light modern chandelier",
      //       "discountPercentage": 5.92,
      //       "id_": 98,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/98/1.jpg",
      //         "https://i.dummyjson.com/data/products/98/2.jpg",
      //         "https://i.dummyjson.com/data/products/98/3.jpg",
      //         "https://i.dummyjson.com/data/products/98/4.jpg",
      //         "https://i.dummyjson.com/data/products/98/thumbnail.jpg"
      //       ],
      //       "price": 34,
      //       "rating": 4.99,
      //       "stock": 44,
      //       "thumbnail": "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
      //       "title": "3 lights lndenpant kitchen islang"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580c3",
      //       "brand": "Apple",
      //       "category": "laptops",
      //       "description": "MacBook Pro 2021 with mini-LED display may launch between September, November",
      //       "discountPercentage": 11.02,
      //       "id_": 6,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/6/1.png",
      //         "https://i.dummyjson.com/data/products/6/2.jpg",
      //         "https://i.dummyjson.com/data/products/6/3.png",
      //         "https://i.dummyjson.com/data/products/6/4.jpg"
      //       ],
      //       "price": 1749,
      //       "rating": 4.57,
      //       "stock": 83,
      //       "thumbnail": "https://i.dummyjson.com/data/products/6/thumbnail.png",
      //       "title": "MacBook Pro"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580cb",
      //       "brand": "Al Munakh",
      //       "category": "fragrances",
      //       "description": "Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil",
      //       "discountPercentage": 15.6,
      //       "id_": 14,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/14/1.jpg",
      //         "https://i.dummyjson.com/data/products/14/2.jpg",
      //         "https://i.dummyjson.com/data/products/14/3.jpg",
      //         "https://i.dummyjson.com/data/products/14/thumbnail.jpg"
      //       ],
      //       "price": 120,
      //       "rating": 4.21,
      //       "stock": 114,
      //       "thumbnail": "https://i.dummyjson.com/data/products/14/thumbnail.jpg",
      //       "title": "Non-Alcoholic Concentrated Perfume Oil"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580cc",
      //       "brand": "Lord - Al-Rehab",
      //       "category": "fragrances",
      //       "description": "Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
      //       "discountPercentage": 10.99,
      //       "id_": 15,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/15/1.jpg",
      //         "https://i.dummyjson.com/data/products/15/2.jpg",
      //         "https://i.dummyjson.com/data/products/15/3.jpg",
      //         "https://i.dummyjson.com/data/products/15/4.jpg",
      //         "https://i.dummyjson.com/data/products/15/thumbnail.jpg"
      //       ],
      //       "price": 30,
      //       "rating": 4.7,
      //       "stock": 105,
      //       "thumbnail": "https://i.dummyjson.com/data/products/15/thumbnail.jpg",
      //       "title": "Eau De Perfume Spray"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580d3",
      //       "brand": "Bake Parlor Big",
      //       "category": "groceries",
      //       "description": "Product details of Bake Parlor Big Elbow Macaroni - 400 gm",
      //       "discountPercentage": 15.58,
      //       "id_": 22,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/22/1.jpg",
      //         "https://i.dummyjson.com/data/products/22/2.jpg",
      //         "https://i.dummyjson.com/data/products/22/3.jpg"
      //       ],
      //       "price": 14,
      //       "rating": 4.57,
      //       "stock": 146,
      //       "thumbnail": "https://i.dummyjson.com/data/products/22/thumbnail.jpg",
      //       "title": "Elbow Macaroni - 400 gm"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580d5",
      //       "brand": "fauji",
      //       "category": "groceries",
      //       "description": "original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji",
      //       "discountPercentage": 16.8,
      //       "id_": 24,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/24/1.jpg",
      //         "https://i.dummyjson.com/data/products/24/2.jpg",
      //         "https://i.dummyjson.com/data/products/24/3.jpg",
      //         "https://i.dummyjson.com/data/products/24/4.jpg",
      //         "https://i.dummyjson.com/data/products/24/thumbnail.jpg"
      //       ],
      //       "price": 46,
      //       "rating": 4.94,
      //       "stock": 113,
      //       "thumbnail": "https://i.dummyjson.com/data/products/24/thumbnail.jpg",
      //       "title": "cereals muesli fruit nuts"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580d7",
      //       "brand": "Boho Decor",
      //       "category": "home-decoration",
      //       "description": "Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf",
      //       "discountPercentage": 17.86,
      //       "id_": 26,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/26/1.jpg",
      //         "https://i.dummyjson.com/data/products/26/2.jpg",
      //         "https://i.dummyjson.com/data/products/26/3.jpg",
      //         "https://i.dummyjson.com/data/products/26/4.jpg",
      //         "https://i.dummyjson.com/data/products/26/5.jpg",
      //         "https://i.dummyjson.com/data/products/26/thumbnail.jpg"
      //       ],
      //       "price": 41,
      //       "rating": 4.08,
      //       "stock": 131,
      //       "thumbnail": "https://i.dummyjson.com/data/products/26/thumbnail.jpg",
      //       "title": "Plant Hanger For Home"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580fa",
      //       "brand": "Naviforce",
      //       "category": "mens-watches",
      //       "description": "Style:Sport ,Clasp:Buckles ,Water Resistance Depth:3Bar",
      //       "discountPercentage": 7.14,
      //       "id_": 61,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/61/1.jpg",
      //         "https://i.dummyjson.com/data/products/61/2.png",
      //         "https://i.dummyjson.com/data/products/61/3.jpg"
      //       ],
      //       "price": 120,
      //       "rating": 4.63,
      //       "stock": 91,
      //       "thumbnail": "https://i.dummyjson.com/data/products/61/thumbnail.jpg",
      //       "title": "Leather Straps Wristwatch"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558100",
      //       "brand": "Eastern Watches",
      //       "category": "womens-watches",
      //       "description": "Buy this awesome  The product is originally manufactured by the company and it's a top selling product with a very reasonable",
      //       "discountPercentage": 16.69,
      //       "id_": 67,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/67/1.jpg",
      //         "https://i.dummyjson.com/data/products/67/2.jpg",
      //         "https://i.dummyjson.com/data/products/67/3.jpg",
      //         "https://i.dummyjson.com/data/products/67/4.jpg",
      //         "https://i.dummyjson.com/data/products/67/thumbnail.jpg"
      //       ],
      //       "price": 60,
      //       "rating": 4.03,
      //       "stock": 46,
      //       "thumbnail": "https://i.dummyjson.com/data/products/67/thumbnail.jpg",
      //       "title": "Fashion Magnetic Wrist Watch"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558106",
      //       "brand": "Bracelet",
      //       "category": "womens-bags",
      //       "description": "This fashion is designed to add a charming effect to your casual outfit. This Bag is made of synthetic leather.",
      //       "discountPercentage": 10.39,
      //       "id_": 73,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/73/1.jpg",
      //         "https://i.dummyjson.com/data/products/73/2.webp",
      //         "https://i.dummyjson.com/data/products/73/3.jpg",
      //         "https://i.dummyjson.com/data/products/73/thumbnail.jpg"
      //       ],
      //       "price": 44,
      //       "rating": 4.18,
      //       "stock": 101,
      //       "thumbnail": "https://i.dummyjson.com/data/products/73/thumbnail.jpg",
      //       "title": "Fancy hand clutch"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558108",
      //       "brand": "Steal Frame",
      //       "category": "womens-bags",
      //       "description": "Seven Pocket Women Bag Handbags Lady Shoulder Crossbody Bag Female Purse Seven Pocket Bag",
      //       "discountPercentage": 14.87,
      //       "id_": 75,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/75/1.jpg",
      //         "https://i.dummyjson.com/data/products/75/2.jpg",
      //         "https://i.dummyjson.com/data/products/75/3.jpg",
      //         "https://i.dummyjson.com/data/products/75/thumbnail.jpg"
      //       ],
      //       "price": 68,
      //       "rating": 4.93,
      //       "stock": 13,
      //       "thumbnail": "https://i.dummyjson.com/data/products/75/thumbnail.jpg",
      //       "title": "Seven Pocket Women Bag"
      //     },
      //     {
      //       "id": "647a5b149e04660c4455810c",
      //       "brand": "Fashion Jewellery",
      //       "category": "womens-jewellery",
      //       "description": "Elegant Female Pearl Earrings Set Zircon Pearl Earings Women Party Accessories 9 Pairs/Set",
      //       "discountPercentage": 12.8,
      //       "id_": 79,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/79/1.jpg"
      //       ],
      //       "price": 30,
      //       "rating": 4.74,
      //       "stock": 16,
      //       "thumbnail": "https://i.dummyjson.com/data/products/79/thumbnail.jpg",
      //       "title": "Elegant Female Pearl Earrings"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558119",
      //       "brand": "BRAVE BULL",
      //       "category": "motorcycle",
      //       "description": "HOT SALE IN EUROPE electric racing motorcycle electric motorcycle for sale adult electric motorcycles",
      //       "discountPercentage": 14.4,
      //       "id_": 92,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/92/1.jpg",
      //         "https://i.dummyjson.com/data/products/92/2.jpg",
      //         "https://i.dummyjson.com/data/products/92/3.jpg",
      //         "https://i.dummyjson.com/data/products/92/4.jpg"
      //       ],
      //       "price": 920,
      //       "rating": 4.19,
      //       "stock": 22,
      //       "thumbnail": "https://i.dummyjson.com/data/products/92/thumbnail.jpg",
      //       "title": "HOT SALE IN EUROPE electric racing motorcycle"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580c4",
      //       "brand": "Samsung",
      //       "category": "laptops",
      //       "description": "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
      //       "discountPercentage": 4.15,
      //       "id_": 7,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/7/1.jpg",
      //         "https://i.dummyjson.com/data/products/7/2.jpg",
      //         "https://i.dummyjson.com/data/products/7/3.jpg",
      //         "https://i.dummyjson.com/data/products/7/thumbnail.jpg"
      //       ],
      //       "price": 1499,
      //       "rating": 4.25,
      //       "stock": 50,
      //       "thumbnail": "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
      //       "title": "Samsung Galaxy Book"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580c1",
      //       "brand": "OPPO",
      //       "category": "smartphones",
      //       "description": "OPPO F19 is officially announced on April 2021.",
      //       "discountPercentage": 17.91,
      //       "id_": 4,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/4/1.jpg",
      //         "https://i.dummyjson.com/data/products/4/2.jpg",
      //         "https://i.dummyjson.com/data/products/4/3.jpg",
      //         "https://i.dummyjson.com/data/products/4/4.jpg",
      //         "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
      //       ],
      //       "price": 280,
      //       "rating": 4.3,
      //       "stock": 123,
      //       "thumbnail": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
      //       "title": "OPPOF19"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580c8",
      //       "brand": "Impression of Acqua Di Gio",
      //       "category": "fragrances",
      //       "description": "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
      //       "discountPercentage": 8.4,
      //       "id_": 11,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/11/1.jpg",
      //         "https://i.dummyjson.com/data/products/11/2.jpg",
      //         "https://i.dummyjson.com/data/products/11/3.jpg",
      //         "https://i.dummyjson.com/data/products/11/thumbnail.jpg"
      //       ],
      //       "price": 13,
      //       "rating": 4.26,
      //       "stock": 65,
      //       "thumbnail": "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
      //       "title": "perfume Oil"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580d4",
      //       "brand": "Baking Food Items",
      //       "category": "groceries",
      //       "description": "Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item",
      //       "discountPercentage": 8.04,
      //       "id_": 23,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/23/1.jpg",
      //         "https://i.dummyjson.com/data/products/23/2.jpg",
      //         "https://i.dummyjson.com/data/products/23/3.jpg",
      //         "https://i.dummyjson.com/data/products/23/4.jpg",
      //         "https://i.dummyjson.com/data/products/23/thumbnail.jpg"
      //       ],
      //       "price": 14,
      //       "rating": 4.85,
      //       "stock": 26,
      //       "thumbnail": "https://i.dummyjson.com/data/products/23/thumbnail.jpg",
      //       "title": "Orange Essence Food Flavou"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580d8",
      //       "brand": "Flying Wooden",
      //       "category": "home-decoration",
      //       "description": "Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm",
      //       "discountPercentage": 15.58,
      //       "id_": 27,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/27/1.jpg",
      //         "https://i.dummyjson.com/data/products/27/2.jpg",
      //         "https://i.dummyjson.com/data/products/27/3.jpg",
      //         "https://i.dummyjson.com/data/products/27/4.jpg",
      //         "https://i.dummyjson.com/data/products/27/thumbnail.webp"
      //       ],
      //       "price": 51,
      //       "rating": 4.41,
      //       "stock": 17,
      //       "thumbnail": "https://i.dummyjson.com/data/products/27/thumbnail.webp",
      //       "title": "Flying Wooden Bird"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580e2",
      //       "brand": "Soft Cotton",
      //       "category": "tops",
      //       "description": "PACK OF 3 CAMISOLES ,VERY COMFORTABLE SOFT COTTON STUFF, COMFORTABLE IN ALL FOUR SEASONS",
      //       "discountPercentage": 12.05,
      //       "id_": 37,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/37/1.jpg",
      //         "https://i.dummyjson.com/data/products/37/2.jpg",
      //         "https://i.dummyjson.com/data/products/37/3.jpg",
      //         "https://i.dummyjson.com/data/products/37/4.jpg",
      //         "https://i.dummyjson.com/data/products/37/thumbnail.jpg"
      //       ],
      //       "price": 50,
      //       "rating": 4.52,
      //       "stock": 107,
      //       "thumbnail": "https://i.dummyjson.com/data/products/37/thumbnail.jpg",
      //       "title": "ank Tops for Womens/Girls"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580e6",
      //       "brand": "RED MICKY MOUSE..",
      //       "category": "womens-dresses",
      //       "description": "NIGHT SUIT RED MICKY MOUSE..  For Girls. Fantastic Suits.",
      //       "discountPercentage": 15.05,
      //       "id_": 41,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/41/1.jpg",
      //         "https://i.dummyjson.com/data/products/41/2.webp",
      //         "https://i.dummyjson.com/data/products/41/3.jpg",
      //         "https://i.dummyjson.com/data/products/41/4.jpg",
      //         "https://i.dummyjson.com/data/products/41/thumbnail.webp"
      //       ],
      //       "price": 55,
      //       "rating": 4.65,
      //       "stock": 21,
      //       "thumbnail": "https://i.dummyjson.com/data/products/41/thumbnail.webp",
      //       "title": "NIGHT SUIT"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580e8",
      //       "brand": "Ghazi Fabric",
      //       "category": "womens-dresses",
      //       "description": "Ghazi fabric long frock gold printed ready to wear stitched collection (G992)",
      //       "discountPercentage": 15.55,
      //       "id_": 43,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/43/1.jpg",
      //         "https://i.dummyjson.com/data/products/43/2.jpg",
      //         "https://i.dummyjson.com/data/products/43/3.jpg",
      //         "https://i.dummyjson.com/data/products/43/4.jpg",
      //         "https://i.dummyjson.com/data/products/43/thumbnail.jpg"
      //       ],
      //       "price": 600,
      //       "rating": 4.31,
      //       "stock": 150,
      //       "thumbnail": "https://i.dummyjson.com/data/products/43/thumbnail.jpg",
      //       "title": "frock gold printed"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580ed",
      //       "brand": "Sandals Flip Flops",
      //       "category": "womens-shoes",
      //       "description": "Features: Flip-flops, Mid Heel, Comfortable, Striped Heel, Antiskid, Striped",
      //       "discountPercentage": 10.83,
      //       "id_": 48,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/48/1.jpg",
      //         "https://i.dummyjson.com/data/products/48/2.jpg",
      //         "https://i.dummyjson.com/data/products/48/3.jpg",
      //         "https://i.dummyjson.com/data/products/48/4.jpg",
      //         "https://i.dummyjson.com/data/products/48/thumbnail.jpg"
      //       ],
      //       "price": 40,
      //       "rating": 4.02,
      //       "stock": 25,
      //       "thumbnail": "https://i.dummyjson.com/data/products/48/thumbnail.jpg",
      //       "title": "Women Strip Heel"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580f4",
      //       "brand": "The Warehouse",
      //       "category": "mens-shirts",
      //       "description": "Fabric Jercy, Size: M & L Wear Stylish Dual Stiched",
      //       "discountPercentage": 15.97,
      //       "id_": 55,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/55/1.jpg",
      //         "https://i.dummyjson.com/data/products/55/2.webp",
      //         "https://i.dummyjson.com/data/products/55/3.jpg",
      //         "https://i.dummyjson.com/data/products/55/4.jpg",
      //         "https://i.dummyjson.com/data/products/55/thumbnail.jpg"
      //       ],
      //       "price": 66,
      //       "rating": 4.9,
      //       "stock": 122,
      //       "thumbnail": "https://i.dummyjson.com/data/products/55/thumbnail.jpg",
      //       "title": "Money Heist Printed Summer T Shirts"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580f5",
      //       "brand": "Sneakers",
      //       "category": "mens-shoes",
      //       "description": "Gender: Men , Colors: Same as DisplayedCondition: 100% Brand New",
      //       "discountPercentage": 12.57,
      //       "id_": 56,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/56/1.jpg",
      //         "https://i.dummyjson.com/data/products/56/2.jpg",
      //         "https://i.dummyjson.com/data/products/56/3.jpg",
      //         "https://i.dummyjson.com/data/products/56/4.jpg",
      //         "https://i.dummyjson.com/data/products/56/5.jpg",
      //         "https://i.dummyjson.com/data/products/56/thumbnail.jpg"
      //       ],
      //       "price": 40,
      //       "rating": 4.38,
      //       "stock": 6,
      //       "thumbnail": "https://i.dummyjson.com/data/products/56/thumbnail.jpg",
      //       "title": "Sneakers Joggers Shoes"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580fe",
      //       "brand": "Stainless",
      //       "category": "mens-watches",
      //       "description": "Stylish Watch For Man (Luxury) Classy Men's Stainless Steel Wrist Watch - Box Packed",
      //       "discountPercentage": 17.79,
      //       "id_": 65,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/65/1.jpg",
      //         "https://i.dummyjson.com/data/products/65/2.webp",
      //         "https://i.dummyjson.com/data/products/65/3.jpg",
      //         "https://i.dummyjson.com/data/products/65/4.webp",
      //         "https://i.dummyjson.com/data/products/65/thumbnail.webp"
      //       ],
      //       "price": 47,
      //       "rating": 4.79,
      //       "stock": 94,
      //       "thumbnail": "https://i.dummyjson.com/data/products/65/thumbnail.webp",
      //       "title": "Stainless Steel Wrist Watch"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558104",
      //       "brand": "LouisWill",
      //       "category": "womens-bags",
      //       "description": "LouisWill Women Shoulder Bags Long Clutches Cross Body Bags Phone Bags PU Leather Hand Bags Large Capacity Card Holders Zipper Coin Purses Fashion Crossbody Bags for Girls Ladies",
      //       "discountPercentage": 14.65,
      //       "id_": 71,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/71/1.jpg",
      //         "https://i.dummyjson.com/data/products/71/2.jpg",
      //         "https://i.dummyjson.com/data/products/71/3.webp",
      //         "https://i.dummyjson.com/data/products/71/thumbnail.jpg"
      //       ],
      //       "price": 46,
      //       "rating": 4.71,
      //       "stock": 17,
      //       "thumbnail": "https://i.dummyjson.com/data/products/71/thumbnail.jpg",
      //       "title": "Women Shoulder Bags"
      //     },
      //     {
      //       "id": "647a5b149e04660c4455810a",
      //       "brand": "Copenhagen Luxe",
      //       "category": "womens-jewellery",
      //       "description": "Brand: The Greetings Flower Colour: RedRing Colour: GoldenSize: Adjustable",
      //       "discountPercentage": 3.22,
      //       "id_": 77,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/77/1.jpg",
      //         "https://i.dummyjson.com/data/products/77/2.jpg",
      //         "https://i.dummyjson.com/data/products/77/3.jpg",
      //         "https://i.dummyjson.com/data/products/77/thumbnail.jpg"
      //       ],
      //       "price": 100,
      //       "rating": 4.21,
      //       "stock": 149,
      //       "thumbnail": "https://i.dummyjson.com/data/products/77/thumbnail.jpg",
      //       "title": "Rose Ring"
      //     },
      //     {
      //       "id": "647a5b149e04660c4455810d",
      //       "brand": "Cuff Butterfly",
      //       "category": "womens-jewellery",
      //       "description": "Pair Of Ear Cuff Butterfly Long Chain Pin Tassel Earrings - Silver ( Long Life Quality Product)",
      //       "discountPercentage": 17.75,
      //       "id_": 80,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/80/1.jpg",
      //         "https://i.dummyjson.com/data/products/80/2.jpg",
      //         "https://i.dummyjson.com/data/products/80/3.png",
      //         "https://i.dummyjson.com/data/products/80/4.jpg",
      //         "https://i.dummyjson.com/data/products/80/thumbnail.jpg"
      //       ],
      //       "price": 45,
      //       "rating": 4.59,
      //       "stock": 9,
      //       "thumbnail": "https://i.dummyjson.com/data/products/80/thumbnail.jpg",
      //       "title": "Chain Pin Tassel Earrings"
      //     },
      //     {
      //       "id": "647a5b149e04660c4455810e",
      //       "brand": "Designer Sun Glasses",
      //       "category": "sunglasses",
      //       "description": "A pair of sunglasses can protect your eyes from being hurt. For car driving, vacation travel, outdoor activities, social gatherings,",
      //       "discountPercentage": 10.1,
      //       "id_": 81,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/81/1.jpg",
      //         "https://i.dummyjson.com/data/products/81/2.jpg",
      //         "https://i.dummyjson.com/data/products/81/3.jpg",
      //         "https://i.dummyjson.com/data/products/81/4.webp",
      //         "https://i.dummyjson.com/data/products/81/thumbnail.jpg"
      //       ],
      //       "price": 19,
      //       "rating": 4.94,
      //       "stock": 78,
      //       "thumbnail": "https://i.dummyjson.com/data/products/81/thumbnail.jpg",
      //       "title": "Round Silver Frame Sun Glasses"
      //     },
      //     {
      //       "id": "647a5b149e04660c4455810f",
      //       "brand": "Designer Sun Glasses",
      //       "category": "sunglasses",
      //       "description": "Orignal Metal Kabir Singh design 2020 Sunglasses Men Brand Designer Sun Glasses Kabir Singh Square Sunglass",
      //       "discountPercentage": 15.6,
      //       "id_": 82,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/82/1.jpg",
      //         "https://i.dummyjson.com/data/products/82/2.webp",
      //         "https://i.dummyjson.com/data/products/82/3.jpg",
      //         "https://i.dummyjson.com/data/products/82/4.jpg",
      //         "https://i.dummyjson.com/data/products/82/thumbnail.jpg"
      //       ],
      //       "price": 50,
      //       "rating": 4.62,
      //       "stock": 78,
      //       "thumbnail": "https://i.dummyjson.com/data/products/82/thumbnail.jpg",
      //       "title": "Kabir Singh Square Sunglass"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580ca",
      //       "brand": "Fog Scent Xpressio",
      //       "category": "fragrances",
      //       "description": "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
      //       "discountPercentage": 8.14,
      //       "id_": 13,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/13/1.jpg",
      //         "https://i.dummyjson.com/data/products/13/2.png",
      //         "https://i.dummyjson.com/data/products/13/3.jpg",
      //         "https://i.dummyjson.com/data/products/13/4.jpg",
      //         "https://i.dummyjson.com/data/products/13/thumbnail.webp"
      //       ],
      //       "price": 13,
      //       "rating": 4.59,
      //       "stock": 61,
      //       "thumbnail": "https://i.dummyjson.com/data/products/13/thumbnail.webp",
      //       "title": "Fog Scent Xpressio Perfume"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580cd",
      //       "brand": "L'Oreal Paris",
      //       "category": "skincare",
      //       "description": "L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
      //       "discountPercentage": 13.31,
      //       "id_": 16,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/16/1.png",
      //         "https://i.dummyjson.com/data/products/16/2.webp",
      //         "https://i.dummyjson.com/data/products/16/3.jpg",
      //         "https://i.dummyjson.com/data/products/16/4.jpg",
      //         "https://i.dummyjson.com/data/products/16/thumbnail.jpg"
      //       ],
      //       "price": 19,
      //       "rating": 4.83,
      //       "stock": 110,
      //       "thumbnail": "https://i.dummyjson.com/data/products/16/thumbnail.jpg",
      //       "title": "Hyaluronic Acid Serum"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580d1",
      //       "brand": "Fair & Clear",
      //       "category": "skincare",
      //       "description": "Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.",
      //       "discountPercentage": 16.99,
      //       "id_": 20,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/20/1.jpg",
      //         "https://i.dummyjson.com/data/products/20/2.jpg",
      //         "https://i.dummyjson.com/data/products/20/3.jpg",
      //         "https://i.dummyjson.com/data/products/20/4.jpg",
      //         "https://i.dummyjson.com/data/products/20/thumbnail.jpg"
      //       ],
      //       "price": 70,
      //       "rating": 4.06,
      //       "stock": 140,
      //       "thumbnail": "https://i.dummyjson.com/data/products/20/thumbnail.jpg",
      //       "title": "Freckle Treatment Cream- 15gm"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580d9",
      //       "brand": "LED Lights",
      //       "category": "home-decoration",
      //       "description": "3D led lamp sticker Wall sticker 3d wall art light on/off button  cell operated (included)",
      //       "discountPercentage": 16.49,
      //       "id_": 28,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/28/1.jpg",
      //         "https://i.dummyjson.com/data/products/28/2.jpg",
      //         "https://i.dummyjson.com/data/products/28/3.png",
      //         "https://i.dummyjson.com/data/products/28/4.jpg",
      //         "https://i.dummyjson.com/data/products/28/thumbnail.jpg"
      //       ],
      //       "price": 20,
      //       "rating": 4.82,
      //       "stock": 54,
      //       "thumbnail": "https://i.dummyjson.com/data/products/28/thumbnail.jpg",
      //       "title": "3D Embellishment Art Lamp"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580ea",
      //       "brand": "IELGY",
      //       "category": "womens-dresses",
      //       "description": "Ready to wear, Unique design according to modern standard fashion, Best fitting ,Imported stuff",
      //       "discountPercentage": 5.07,
      //       "id_": 45,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/45/1.jpg",
      //         "https://i.dummyjson.com/data/products/45/2.webp",
      //         "https://i.dummyjson.com/data/products/45/3.jpg",
      //         "https://i.dummyjson.com/data/products/45/4.jpg",
      //         "https://i.dummyjson.com/data/products/45/thumbnail.jpg"
      //       ],
      //       "price": 50,
      //       "rating": 4.67,
      //       "stock": 96,
      //       "thumbnail": "https://i.dummyjson.com/data/products/45/thumbnail.jpg",
      //       "title": "Malai Maxi Dress"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580ef",
      //       "brand": "Arrivals Genuine",
      //       "category": "womens-shoes",
      //       "description": "2020 New Arrivals Genuine Leather Fashion Trend Platform Summer Women Shoes",
      //       "discountPercentage": 16.87,
      //       "id_": 50,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/50/1.jpeg",
      //         "https://i.dummyjson.com/data/products/50/2.jpg",
      //         "https://i.dummyjson.com/data/products/50/3.jpg"
      //       ],
      //       "price": 36,
      //       "rating": 4.33,
      //       "stock": 46,
      //       "thumbnail": "https://i.dummyjson.com/data/products/50/thumbnail.jpg",
      //       "title": "Women Shoes"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558103",
      //       "brand": "Bracelet",
      //       "category": "womens-watches",
      //       "description": "Fashion Skmei 1830 Shell Dial Stainless Steel Women Wrist Watch Lady Bracelet Watch Quartz Watches Ladies",
      //       "discountPercentage": 8.98,
      //       "id_": 70,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/70/1.jpg",
      //         "https://i.dummyjson.com/data/products/70/2.jpg",
      //         "https://i.dummyjson.com/data/products/70/thumbnail.jpg"
      //       ],
      //       "price": 35,
      //       "rating": 4.08,
      //       "stock": 111,
      //       "thumbnail": "https://i.dummyjson.com/data/products/70/thumbnail.jpg",
      //       "title": "Stainless Steel Women"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558109",
      //       "brand": "Darojay",
      //       "category": "womens-jewellery",
      //       "description": "Jewelry Type:RingsCertificate Type:NonePlating:Silver PlatedShapeattern:noneStyle:CLASSICReligious",
      //       "discountPercentage": 13.57,
      //       "id_": 76,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/76/1.jpg",
      //         "https://i.dummyjson.com/data/products/76/2.jpg",
      //         "https://i.dummyjson.com/data/products/76/thumbnail.jpg"
      //       ],
      //       "price": 70,
      //       "rating": 4.61,
      //       "stock": 51,
      //       "thumbnail": "https://i.dummyjson.com/data/products/76/thumbnail.jpg",
      //       "title": "Silver Ring Set Women"
      //     },
      //     {
      //       "id": "647a5b149e04660c4455810b",
      //       "brand": "Fashion Jewellery",
      //       "category": "womens-jewellery",
      //       "description": "Fashion Jewellery 3Pcs Adjustable Pearl Rhinestone Korean Style Open Rings For Women",
      //       "discountPercentage": 8.02,
      //       "id_": 78,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/78/thumbnail.jpg"
      //       ],
      //       "price": 30,
      //       "rating": 4.69,
      //       "stock": 9,
      //       "thumbnail": "https://i.dummyjson.com/data/products/78/thumbnail.jpg",
      //       "title": "Rhinestone Korean Style Open Rings"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558110",
      //       "brand": "mastar watch",
      //       "category": "sunglasses",
      //       "description": "Wiley X Night Vision Yellow Glasses for Riders - Night Vision Anti Fog Driving Glasses - Free Night Glass Cover - Shield Eyes From Dust and Virus- For Night Sport Matches",
      //       "discountPercentage": 6.33,
      //       "id_": 83,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/83/1.jpg",
      //         "https://i.dummyjson.com/data/products/83/2.jpg",
      //         "https://i.dummyjson.com/data/products/83/3.jpg",
      //         "https://i.dummyjson.com/data/products/83/4.jpg",
      //         "https://i.dummyjson.com/data/products/83/thumbnail.jpg"
      //       ],
      //       "price": 30,
      //       "rating": 4.97,
      //       "stock": 115,
      //       "thumbnail": "https://i.dummyjson.com/data/products/83/thumbnail.jpg",
      //       "title": "Wiley X Night Vision Yellow Glasses"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558112",
      //       "brand": "LouisWill",
      //       "category": "sunglasses",
      //       "description": "LouisWill Men Sunglasses Polarized Sunglasses UV400 Sunglasses Day Night Dual Use Safety Driving Night Vision Eyewear AL-MG Frame Sun Glasses with Free Box for Drivers",
      //       "discountPercentage": 11.27,
      //       "id_": 85,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/85/1.jpg",
      //         "https://i.dummyjson.com/data/products/85/2.jpg",
      //         "https://i.dummyjson.com/data/products/85/thumbnail.jpg"
      //       ],
      //       "price": 50,
      //       "rating": 4.98,
      //       "stock": 92,
      //       "thumbnail": "https://i.dummyjson.com/data/products/85/thumbnail.jpg",
      //       "title": "LouisWill Men Sunglasses"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558113",
      //       "brand": "Car Aux",
      //       "category": "automotive",
      //       "description": "Bluetooth Aux Bluetooth Car Aux Car Bluetooth Transmitter Aux Audio Receiver Handfree Car Bluetooth Music Receiver Universal 3.5mm Streaming A2DP Wireless Auto AUX Audio Adapter With Mic For Phone MP3",
      //       "discountPercentage": 10.56,
      //       "id_": 86,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/86/1.jpg",
      //         "https://i.dummyjson.com/data/products/86/2.webp",
      //         "https://i.dummyjson.com/data/products/86/3.jpg",
      //         "https://i.dummyjson.com/data/products/86/4.jpg",
      //         "https://i.dummyjson.com/data/products/86/thumbnail.jpg"
      //       ],
      //       "price": 25,
      //       "rating": 4.57,
      //       "stock": 22,
      //       "thumbnail": "https://i.dummyjson.com/data/products/86/thumbnail.jpg",
      //       "title": "Bluetooth Aux"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558117",
      //       "brand": "Neon LED Light",
      //       "category": "automotive",
      //       "description": "Universal fitment and easy to install no special wires, can be easily installed and removed. Fits most standard tyre air stem valves of road, mountain bicycles, motocycles and cars.Bright led will turn on w",
      //       "discountPercentage": 11.08,
      //       "id_": 90,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/90/1.jpg",
      //         "https://i.dummyjson.com/data/products/90/2.jpg",
      //         "https://i.dummyjson.com/data/products/90/3.jpg",
      //         "https://i.dummyjson.com/data/products/90/4.jpg",
      //         "https://i.dummyjson.com/data/products/90/thumbnail.jpg"
      //       ],
      //       "price": 35,
      //       "rating": 4.1,
      //       "stock": 63,
      //       "thumbnail": "https://i.dummyjson.com/data/products/90/thumbnail.jpg",
      //       "title": "Cycle Bike Glow"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580bf",
      //       "brand": "Apple",
      //       "category": "smartphones",
      //       "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      //       "discountPercentage": 17.94,
      //       "id_": 2,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/2/1.jpg",
      //         "https://i.dummyjson.com/data/products/2/2.jpg",
      //         "https://i.dummyjson.com/data/products/2/3.jpg",
      //         "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
      //       ],
      //       "price": 899,
      //       "rating": 4.44,
      //       "stock": 34,
      //       "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
      //       "title": "iPhone X"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580d0",
      //       "brand": "ROREC White Rice",
      //       "category": "skincare",
      //       "description": "Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m",
      //       "discountPercentage": 10.68,
      //       "id_": 19,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/19/1.jpg",
      //         "https://i.dummyjson.com/data/products/19/2.jpg",
      //         "https://i.dummyjson.com/data/products/19/3.png",
      //         "https://i.dummyjson.com/data/products/19/thumbnail.jpg"
      //       ],
      //       "price": 46,
      //       "rating": 4.42,
      //       "stock": 54,
      //       "thumbnail": "https://i.dummyjson.com/data/products/19/thumbnail.jpg",
      //       "title": "Skin Beauty Serum."
      //     },
      //     {
      //       "id": "647a5b149e04660c445580d6",
      //       "brand": "Dry Rose",
      //       "category": "groceries",
      //       "description": "Dry Rose Flower Powder Gulab Powder 50 Gram • Treats Wounds",
      //       "discountPercentage": 13.58,
      //       "id_": 25,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/25/1.png",
      //         "https://i.dummyjson.com/data/products/25/2.jpg",
      //         "https://i.dummyjson.com/data/products/25/3.png",
      //         "https://i.dummyjson.com/data/products/25/4.jpg",
      //         "https://i.dummyjson.com/data/products/25/thumbnail.jpg"
      //       ],
      //       "price": 70,
      //       "rating": 4.87,
      //       "stock": 47,
      //       "thumbnail": "https://i.dummyjson.com/data/products/25/thumbnail.jpg",
      //       "title": "Gulab Powder 50 Gram"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580dd",
      //       "brand": "Ratttan Outdoor",
      //       "category": "furniture",
      //       "description": "Ratttan Outdoor furniture Set Waterproof  Rattan Sofa for Coffe Cafe",
      //       "discountPercentage": 15.59,
      //       "id_": 32,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/32/1.jpg",
      //         "https://i.dummyjson.com/data/products/32/2.jpg",
      //         "https://i.dummyjson.com/data/products/32/3.jpg",
      //         "https://i.dummyjson.com/data/products/32/thumbnail.jpg"
      //       ],
      //       "price": 50,
      //       "rating": 4.74,
      //       "stock": 30,
      //       "thumbnail": "https://i.dummyjson.com/data/products/32/thumbnail.jpg",
      //       "title": "Sofa for Coffe Cafe"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580e0",
      //       "brand": "AmnaMart",
      //       "category": "furniture",
      //       "description": "Material: Stainless Steel and Fabric  Item Size: 110 cm x 45 cm x 175 cm Package Contents: 1 Storage Wardrobe",
      //       "discountPercentage": 7.98,
      //       "id_": 35,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/35/1.jpg",
      //         "https://i.dummyjson.com/data/products/35/2.jpg",
      //         "https://i.dummyjson.com/data/products/35/3.jpg",
      //         "https://i.dummyjson.com/data/products/35/4.jpg",
      //         "https://i.dummyjson.com/data/products/35/thumbnail.jpg"
      //       ],
      //       "price": 41,
      //       "rating": 4.06,
      //       "stock": 68,
      //       "thumbnail": "https://i.dummyjson.com/data/products/35/thumbnail.jpg",
      //       "title": "3 DOOR PORTABLE"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580ec",
      //       "brand": "Synthetic Leather",
      //       "category": "womens-shoes",
      //       "description": "Synthetic Leather Casual Sneaker shoes for Women/girls Sneakers For Women",
      //       "discountPercentage": 10.37,
      //       "id_": 47,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/47/1.jpg",
      //         "https://i.dummyjson.com/data/products/47/2.jpg",
      //         "https://i.dummyjson.com/data/products/47/3.jpg",
      //         "https://i.dummyjson.com/data/products/47/thumbnail.jpeg"
      //       ],
      //       "price": 120,
      //       "rating": 4.19,
      //       "stock": 50,
      //       "thumbnail": "https://i.dummyjson.com/data/products/47/thumbnail.jpeg",
      //       "title": "Sneaker shoes"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580f0",
      //       "brand": "Vintage Apparel",
      //       "category": "mens-shirts",
      //       "description": "Many store is creating new designs and trend every month and every year. Daraz.pk have a beautiful range of men fashion brands",
      //       "discountPercentage": 12.76,
      //       "id_": 51,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/51/1.png",
      //         "https://i.dummyjson.com/data/products/51/2.jpg",
      //         "https://i.dummyjson.com/data/products/51/3.jpg",
      //         "https://i.dummyjson.com/data/products/51/thumbnail.jpg"
      //       ],
      //       "price": 23,
      //       "rating": 4.26,
      //       "stock": 132,
      //       "thumbnail": "https://i.dummyjson.com/data/products/51/thumbnail.jpg",
      //       "title": "half sleeves T shirts"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580f1",
      //       "brand": "FREE FIRE",
      //       "category": "mens-shirts",
      //       "description": "quality and professional print - It doesn't just look high quality, it is high quality.",
      //       "discountPercentage": 14.72,
      //       "id_": 52,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/52/1.png",
      //         "https://i.dummyjson.com/data/products/52/2.png",
      //         "https://i.dummyjson.com/data/products/52/3.jpg",
      //         "https://i.dummyjson.com/data/products/52/4.jpg",
      //         "https://i.dummyjson.com/data/products/52/thumbnail.jpg"
      //       ],
      //       "price": 10,
      //       "rating": 4.52,
      //       "stock": 128,
      //       "thumbnail": "https://i.dummyjson.com/data/products/52/thumbnail.jpg",
      //       "title": "FREE FIRE T Shirt"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580f2",
      //       "brand": "Vintage Apparel",
      //       "category": "mens-shirts",
      //       "description": "Brand: vintage Apparel ,Export quality",
      //       "discountPercentage": 7.54,
      //       "id_": 53,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/53/1.webp",
      //         "https://i.dummyjson.com/data/products/53/2.jpg",
      //         "https://i.dummyjson.com/data/products/53/3.jpg",
      //         "https://i.dummyjson.com/data/products/53/4.jpg",
      //         "https://i.dummyjson.com/data/products/53/thumbnail.jpg"
      //       ],
      //       "price": 35,
      //       "rating": 4.89,
      //       "stock": 6,
      //       "thumbnail": "https://i.dummyjson.com/data/products/53/thumbnail.jpg",
      //       "title": "printed high quality T shirts"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580f3",
      //       "brand": "The Warehouse",
      //       "category": "mens-shirts",
      //       "description": "Product Description Features: 100% Ultra soft Polyester Jersey. Vibrant & colorful printing on front. Feels soft as cotton without ever cracking",
      //       "discountPercentage": 16.44,
      //       "id_": 54,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/54/1.jpg",
      //         "https://i.dummyjson.com/data/products/54/2.jpg",
      //         "https://i.dummyjson.com/data/products/54/3.jpg",
      //         "https://i.dummyjson.com/data/products/54/4.jpg",
      //         "https://i.dummyjson.com/data/products/54/thumbnail.jpg"
      //       ],
      //       "price": 46,
      //       "rating": 4.62,
      //       "stock": 136,
      //       "thumbnail": "https://i.dummyjson.com/data/products/54/thumbnail.jpg",
      //       "title": "Pubg Printed Graphic T-Shirt"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580f6",
      //       "brand": "Rubber",
      //       "category": "mens-shoes",
      //       "description": "Men Shoes - Loafers for men - Rubber Shoes - Nylon Shoes - Shoes for men - Moccassion - Pure Nylon (Rubber) Expot Quality.",
      //       "discountPercentage": 10.91,
      //       "id_": 57,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/57/1.jpg",
      //         "https://i.dummyjson.com/data/products/57/2.jpg",
      //         "https://i.dummyjson.com/data/products/57/3.jpg",
      //         "https://i.dummyjson.com/data/products/57/4.jpg",
      //         "https://i.dummyjson.com/data/products/57/thumbnail.jpg"
      //       ],
      //       "price": 47,
      //       "rating": 4.91,
      //       "stock": 20,
      //       "thumbnail": "https://i.dummyjson.com/data/products/57/thumbnail.jpg",
      //       "title": "Loafers for men"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580f8",
      //       "brand": "Sneakers",
      //       "category": "mens-shoes",
      //       "description": "Comfortable stretch cloth, lightweight body; ,rubber sole, anti-skid wear;",
      //       "discountPercentage": 8.71,
      //       "id_": 59,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/59/1.jpg",
      //         "https://i.dummyjson.com/data/products/59/2.jpg",
      //         "https://i.dummyjson.com/data/products/59/3.jpg",
      //         "https://i.dummyjson.com/data/products/59/4.jpg",
      //         "https://i.dummyjson.com/data/products/59/thumbnail.jpg"
      //       ],
      //       "price": 20,
      //       "rating": 4.33,
      //       "stock": 137,
      //       "thumbnail": "https://i.dummyjson.com/data/products/59/thumbnail.jpg",
      //       "title": "Spring and summershoes"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580fc",
      //       "brand": "SKMEI 9117",
      //       "category": "mens-watches",
      //       "description": "Men Silver Chain Royal Blue Premium Watch Latest Analog Watch",
      //       "discountPercentage": 2.56,
      //       "id_": 63,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/63/1.jpg",
      //         "https://i.dummyjson.com/data/products/63/2.jpg",
      //         "https://i.dummyjson.com/data/products/63/3.png",
      //         "https://i.dummyjson.com/data/products/63/4.jpeg"
      //       ],
      //       "price": 50,
      //       "rating": 4.89,
      //       "stock": 142,
      //       "thumbnail": "https://i.dummyjson.com/data/products/63/thumbnail.webp",
      //       "title": "Royal Blue Premium Watch"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580fd",
      //       "brand": "Strap Skeleton",
      //       "category": "mens-watches",
      //       "description": "Leather Strap Skeleton Watch for Men - Stylish and Latest Design",
      //       "discountPercentage": 10.2,
      //       "id_": 64,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/64/1.jpg",
      //         "https://i.dummyjson.com/data/products/64/2.webp",
      //         "https://i.dummyjson.com/data/products/64/3.jpg",
      //         "https://i.dummyjson.com/data/products/64/thumbnail.jpg"
      //       ],
      //       "price": 46,
      //       "rating": 4.98,
      //       "stock": 61,
      //       "thumbnail": "https://i.dummyjson.com/data/products/64/thumbnail.jpg",
      //       "title": "Leather Strap Skeleton Watch"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558114",
      //       "brand": "W1209 DC12V",
      //       "category": "automotive",
      //       "description": "Both Heat and Cool Purpose, Temperature control range; -50 to +110, Temperature measurement accuracy; 0.1, Control accuracy; 0.1",
      //       "discountPercentage": 11.3,
      //       "id_": 87,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/87/1.jpg",
      //         "https://i.dummyjson.com/data/products/87/2.jpg",
      //         "https://i.dummyjson.com/data/products/87/3.jpg",
      //         "https://i.dummyjson.com/data/products/87/4.jpg",
      //         "https://i.dummyjson.com/data/products/87/thumbnail.jpg"
      //       ],
      //       "price": 40,
      //       "rating": 4.54,
      //       "stock": 37,
      //       "thumbnail": "https://i.dummyjson.com/data/products/87/thumbnail.jpg",
      //       "title": "t Temperature Controller Incubator Controller"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558116",
      //       "brand": "TC Reusable",
      //       "category": "automotive",
      //       "description": "best Quality CHarger , Highly Recommended to all best Quality CHarger , Highly Recommended to all",
      //       "discountPercentage": 17.53,
      //       "id_": 89,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/89/1.jpg",
      //         "https://i.dummyjson.com/data/products/89/2.jpg",
      //         "https://i.dummyjson.com/data/products/89/3.jpg",
      //         "https://i.dummyjson.com/data/products/89/4.jpg",
      //         "https://i.dummyjson.com/data/products/89/thumbnail.jpg"
      //       ],
      //       "price": 40,
      //       "rating": 4.2,
      //       "stock": 79,
      //       "thumbnail": "https://i.dummyjson.com/data/products/89/thumbnail.jpg",
      //       "title": "Qualcomm original Car Charger"
      //     },
      //     {
      //       "id": "647a5b149e04660c4455811c",
      //       "brand": "Xiangle",
      //       "category": "motorcycle",
      //       "description": "Wholesale cargo lashing Belt Tie Down end Ratchet strap customized strap 25mm motorcycle 1500kgs with rubber handle",
      //       "discountPercentage": 17.67,
      //       "id_": 95,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/95/1.jpg",
      //         "https://i.dummyjson.com/data/products/95/2.jpg",
      //         "https://i.dummyjson.com/data/products/95/3.jpg",
      //         "https://i.dummyjson.com/data/products/95/4.jpg",
      //         "https://i.dummyjson.com/data/products/95/thumbnail.jpg"
      //       ],
      //       "price": 930,
      //       "rating": 4.21,
      //       "stock": 144,
      //       "thumbnail": "https://i.dummyjson.com/data/products/95/thumbnail.jpg",
      //       "title": "Wholesale cargo lashing Belt"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580cf",
      //       "brand": "Dermive",
      //       "category": "skincare",
      //       "description": "Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
      //       "discountPercentage": 13.1,
      //       "id_": 18,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/18/1.jpg",
      //         "https://i.dummyjson.com/data/products/18/2.jpg",
      //         "https://i.dummyjson.com/data/products/18/3.jpg",
      //         "https://i.dummyjson.com/data/products/18/4.jpg",
      //         "https://i.dummyjson.com/data/products/18/thumbnail.jpg"
      //       ],
      //       "price": 40,
      //       "rating": 4.56,
      //       "stock": 88,
      //       "thumbnail": "https://i.dummyjson.com/data/products/18/thumbnail.jpg",
      //       "title": "Oil Free Moisturizer 100ml"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580e1",
      //       "brand": "Professional Wear",
      //       "category": "tops",
      //       "description": "Cotton Solid Color Professional Wear Sleeve Shirt Womens Work Blouses Wholesale Clothing Casual Plain Custom Top OEM Customized",
      //       "discountPercentage": 10.89,
      //       "id_": 36,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/36/1.jpg",
      //         "https://i.dummyjson.com/data/products/36/2.webp",
      //         "https://i.dummyjson.com/data/products/36/3.webp",
      //         "https://i.dummyjson.com/data/products/36/4.jpg",
      //         "https://i.dummyjson.com/data/products/36/thumbnail.jpg"
      //       ],
      //       "price": 90,
      //       "rating": 4.26,
      //       "stock": 39,
      //       "thumbnail": "https://i.dummyjson.com/data/products/36/thumbnail.jpg",
      //       "title": "Sleeve Shirt Womens"
      //     },
      //     {
      //       "id": "647a5b149e04660c445580e4",
      //       "brand": "Top Sweater",
      //       "category": "tops",
      //       "description": "2021 Custom Winter Fall Zebra Knit Crop Top Women Sweaters Wool Mohair Cos Customize Crew Neck Women' S Crop Top Sweater",
      //       "discountPercentage": 17.2,
      //       "id_": 39,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/39/1.jpg",
      //         "https://i.dummyjson.com/data/products/39/2.jpg",
      //         "https://i.dummyjson.com/data/products/39/3.jpg",
      //         "https://i.dummyjson.com/data/products/39/4.jpg",
      //         "https://i.dummyjson.com/data/products/39/thumbnail.jpg"
      //       ],
      //       "price": 600,
      //       "rating": 4.55,
      //       "stock": 55,
      //       "thumbnail": "https://i.dummyjson.com/data/products/39/thumbnail.jpg",
      //       "title": "Women Sweaters Wool"
      //     },
      //     {
      //       "id": "647a5b149e04660c44558105",
      //       "brand": "LouisWill",
      //       "category": "womens-bags",
      //       "description": "This fashion is designed to add a charming effect to your casual outfit. This Bag is made of synthetic leather.",
      //       "discountPercentage": 17.5,
      //       "id_": 72,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/72/1.jpg",
      //         "https://i.dummyjson.com/data/products/72/2.png",
      //         "https://i.dummyjson.com/data/products/72/3.webp",
      //         "https://i.dummyjson.com/data/products/72/4.jpg",
      //         "https://i.dummyjson.com/data/products/72/thumbnail.webp"
      //       ],
      //       "price": 23,
      //       "rating": 4.91,
      //       "stock": 27,
      //       "thumbnail": "https://i.dummyjson.com/data/products/72/thumbnail.webp",
      //       "title": "Handbag For Girls"
      //     },
      //     {
      //       "id": "647a5b149e04660c4455811e",
      //       "brand": "Ifei Home",
      //       "category": "lighting",
      //       "description": "Metal Ceramic Flower Chandelier Home Lighting American Vintage Hanging Lighting Pendant Lamp",
      //       "discountPercentage": 10.94,
      //       "id_": 97,
      //       "images": [
      //         "https://i.dummyjson.com/data/products/97/1.jpg",
      //         "https://i.dummyjson.com/data/products/97/2.jpg",
      //         "https://i.dummyjson.com/data/products/97/3.jpg",
      //         "https://i.dummyjson.com/data/products/97/4.webp",
      //         "https://i.dummyjson.com/data/products/97/thumbnail.jpg"
      //       ],
      //       "price": 35,
      //       "rating": 4.93,
      //       "stock": 146,
      //       "thumbnail": "https://i.dummyjson.com/data/products/97/thumbnail.jpg",
      //       "title": "Metal Ceramic Flower"
      //     }
      //   ],
      //   "productsCount": 94,
      //   "categories": [
      //     {
      //       "category": "automotive"
      //     },
      //     {
      //       "category": "fragrances"
      //     },
      //     {
      //       "category": "furniture"
      //     },
      //     {
      //       "category": "groceries"
      //     },
      //     {
      //       "category": "home-decoration"
      //     },
      //     {
      //       "category": "laptops"
      //     },
      //     {
      //       "category": "lighting"
      //     },
      //     {
      //       "category": "mens-shirts"
      //     },
      //     {
      //       "category": "mens-shoes"
      //     },
      //     {
      //       "category": "mens-watches"
      //     },
      //     {
      //       "category": "motorcycle"
      //     },
      //     {
      //       "category": "skincare"
      //     },
      //     {
      //       "category": "smartphones"
      //     },
      //     {
      //       "category": "sunglasses"
      //     },
      //     {
      //       "category": "tops"
      //     },
      //     {
      //       "category": "womens-bags"
      //     },
      //     {
      //       "category": "womens-dresses"
      //     },
      //     {
      //       "category": "womens-jewellery"
      //     },
      //     {
      //       "category": "womens-shoes"
      //     },
      //     {
      //       "category": "womens-watches"
      //     }
      //   ],
      //   "categoriesCount": 20,
      //   "brands": [
      //     {
      //       "_count": 1,
      //       "brand": "Al Munakh"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "AmnaMart"
      //     },
      //     {
      //       "_count": 3,
      //       "brand": "Apple"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Arrivals Genuine"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "BRAVE BULL"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Bake Parlor Big"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Baking Food Items"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Boho Decor"
      //     },
      //     {
      //       "_count": 2,
      //       "brand": "Bracelet"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Car Aux"
      //     },
      //     {
      //       "_count": 2,
      //       "brand": "Copenhagen Luxe"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Cuff Butterfly"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "DADAWU"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Darojay"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Dermive"
      //     },
      //     {
      //       "_count": 2,
      //       "brand": "Designer Sun Glasses"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Digital Printed"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Dry Rose"
      //     },
      //     {
      //       "_count": 2,
      //       "brand": "Eastern Watches"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "FREE FIRE"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Fair & Clear"
      //     },
      //     {
      //       "_count": 2,
      //       "brand": "Fashion Jewellery"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Flying Wooden"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Fog Scent Xpressio"
      //     },
      //     {
      //       "_count": 2,
      //       "brand": "Ghazi Fabric"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Golden"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "HP Pavilion"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Hemani Tea"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Huawei"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "IELGY"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "IELGY fashion"
      //     },
      //     {
      //       "_count": 2,
      //       "brand": "Ifei Home"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Impression of Acqua Di Gio"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Infinix"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "JIEPOLLY"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "L'Oreal Paris"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "LED Lights"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Lord - Al-Rehab"
      //     },
      //     {
      //       "_count": 3,
      //       "brand": "LouisWill"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Luxury Digital"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "METRO 70cc Motorcycle - MR70"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Maasai Sandals"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Microsoft Surface"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Naviforce"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Neon LED Light"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "OPPO"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Professional Wear"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "RED MICKY MOUSE.."
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "ROREC White Rice"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Ratttan Outdoor"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Rubber"
      //     },
      //     {
      //       "_count": 2,
      //       "brand": "SKMEI 9117"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Saaf & Khaas"
      //     },
      //     {
      //       "_count": 2,
      //       "brand": "Samsung"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Sandals Flip Flops"
      //     },
      //     {
      //       "_count": 3,
      //       "brand": "Sneakers"
      //     },
      //     {
      //       "_count": 2,
      //       "brand": "Soft Cotton"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Stainless"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Steal Frame"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Strap Skeleton"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Synthetic Leather"
      //     },
      //     {
      //       "_count": 2,
      //       "brand": "TC Reusable"
      //     },
      //     {
      //       "_count": 2,
      //       "brand": "The Warehouse"
      //     },
      //     {
      //       "_count": 2,
      //       "brand": "Top Sweater"
      //     },
      //     {
      //       "_count": 2,
      //       "brand": "Vintage Apparel"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "W1209 DC12V"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Watch Pearls"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "Xiangle"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "fauji"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "lightingbrilliance"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "luxury palace"
      //     },
      //     {
      //       "_count": 2,
      //       "brand": "mastar watch"
      //     },
      //     {
      //       "_count": 1,
      //       "brand": "shock absorber"
      //     }
      //   ],
      //   "brandsCount": 73
      // }
      // console.log(data);
      setProducts([products.data]);
      setProductsCount(products.meta.pagination.total);
      // data.categories.unshift("all");
      setCategories([
        categories.data
         
      ]);
      setCategoriesCount(categories.meta.pagination.total);
      setBrands([brands]);
      setBrandsCount(brands.meta.pagination.total);
      setProductsLoading(false);
      // console.log(data.productsCount);
    })();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
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
      }}
    >
      {children}
      <Toaster position="top-center" />
    </ProductsContext.Provider>
  );
}
