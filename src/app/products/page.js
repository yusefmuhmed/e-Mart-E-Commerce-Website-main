"use client";
import AllProducts from "../../components/AllProducts";
import AllProductsHeader from "../../components/AllProductsHeader";
import AllProductsPagination from "../../components/AllProductsPagination";
import AllProductsSidebar from "../../components/AllProductsSidebar";
// import AllProductsBreadCrumb from "../../components/AllProductsBreadCrumb";
import Link from "next/link";

import { useProducts } from "../../contexts/ProductsContext";
import { useCart } from "../../contexts/CartContext";
import { Skeleton } from "react-skeleton-generator";

export default function Products() {
  const {
    productsLoading,
    products,
    gridView,
    pageNumber,
    category,
    productsVisible,
  } = useProducts();
  // const { cartLoading, cart } = useCart();
  // console.log(loading);
  // if (productsLoading || cartLoading) {
  //   return <p>loading</p>;
  // } else
  {
    return (
      <>
        {/* Heading */}
        <div className="bg-primary mb-4">
          <div className="container py-4">
            {/* <h3 className="text-white mt-2">{productCategory.toUpperCase()}</h3> */}
            {/* Breadcrumb */}
            {/* <AllProductsBreadCrumb productCategory={productCategory} /> */}
            {/* Breadcrumb */}
          </div>
        </div>
        {/* Heading */}
        <>
          {/* sidebar + content */}
          <section className="">
            <div className="container">
              <div className="row">
                {/* sidebar */}
                <AllProductsSidebar />
                {/* sidebar */}
                {/* content */}
                <div className="col-lg-9">
                  {/* AllProductsHeader */}
                  <AllProductsHeader />
                  {/* AllProductsHeader */}
                  {/* products */}
                  {productsLoading && (
                    <div className="row">
                      {[...Array(12)].map((_, key) => {
                        return (
                          <div
                            key={key}
                            className="col-lg-4 col-md-6 col-sm-6 d-flex"
                          >
                            <div className="card w-100 my-2 shadow-2-strong">
                              <Skeleton.SkeletonThemeProvider>
                                <Skeleton
                                  style={{
                                    height: "400px",
                                  }}
                                />
                              </Skeleton.SkeletonThemeProvider>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {/* {productsLoading && (
                    <AllProducts products={productsVisible?.current} />
                  )} */}
                  {!productsLoading && gridView && (
                    <div className="row">
                      <AllProducts products={productsVisible?.current} />
                    </div>
                  )}
                  {!productsLoading && !gridView && (
                    <AllProducts products={productsVisible?.current} />
                  )}
                  {/* products */}
                  <hr />
                  {/* Pagination */}
                  <AllProductsPagination />
                  {/* Pagination */}
                </div>
              </div>
            </div>
          </section>
          {/* sidebar + content */}
          <footer className="text-center text-lg-start text-muted bg-primary mt-3">
        {/* Section: Links  */}
        <section className="">
          <div className="container text-center text-md-start pt-4 pb-4">
            {/* Grid row */}
            <div className="row mt-3">
              {/* Grid column */}
              <div className="col-12 col-lg-3 col-sm-12 mb-2">
                {/* Content */}
                <p className="text-white h2">hardsteleco</p>
                <p className="mt-1 text-white">
                  © 2023 Copyright:{" "}
                  <Link href="mushfiqxrabbi@gmail.com" className="text-white">
                    mushfiqxrabbi@gmail.com
                  </Link>
                </p>
              </div>
              <div className="col-6 col-sm-4 col-lg-2">
                {/* Links */}
                <h6 className="text-uppercase text-white fw-bold mb-2">
                  Store
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-white-50" href="#">
                      About us
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Find store
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Categories
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Blogs
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-sm-4 col-lg-2">
                {/* Links */}
                <h6 className="text-uppercase text-white fw-bold mb-2">
                  Information
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-white-50" href="#">
                      Help center
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Money refund
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Shipping info
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Refunds
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-sm-4 col-lg-2">
                {/* Links */}
                <h6 className="text-uppercase text-white fw-bold mb-2">
                  Support
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-white-50" href="#">
                      Help center
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Documents
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      Account restore
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="#">
                      My orders
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-sm-12 col-lg-3">
                {/* Links */}
                <h6 className="text-uppercase text-white fw-bold mb-2">
                  Newsletter
                </h6>
                <p className="text-white">
                  Stay in touch with latest updates about our products and
                  offers
                </p>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control border"
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="button-addon2"
                    disabled
                  />
                  <button
                    className="btn btn-light border shadow-0"
                    type="button"
                    id="button-addon2"
                    data-mdb-ripple-color="dark"
                    disabled
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
            {/* Grid row */}
          </div>
        </section>
        {/* Section: Links  */}
      </footer>
        </>
      </>
    );
  }
}
