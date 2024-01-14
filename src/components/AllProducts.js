"use client";
import SingleProduct from "./SingleProduct";

export default function AllProducts({ products }) {
  //for (let i = 0; i < products.length; i++) {
    return products.map((product) => {
      return <SingleProduct key={product.id} product={product} />;
    });
    
  //}
  
  
}

