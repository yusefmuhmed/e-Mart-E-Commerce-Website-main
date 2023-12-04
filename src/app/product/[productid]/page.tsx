
import getServices from "../../cms/getservices";
import Image from "next/image";
// import prisma from "../../../../lib/db";
 import Link from "next/link";
 import { useState } from "react";
 import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Skeleton } from "react-skeleton-generator";

import Navbar from "../../../components/core/navbar";
import Footer from "../../../components/core/footer";
import TopHeader from "../../../components/core/topheader";
import getApp from "../../cms/getapp";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faHighlighter,
  faStar,
  faBasketShopping,
} from "@fortawesome/free-solid-svg-icons";
import "./main.css";
import Sliders from "../../Slider/Sliders";
export default async function Productdatails({ params }: { params: any }) {
  // concurrent fetch
  async function Productid() {
    const res = await fetch(
      `http://localhost:1337/api/products/${params.productid}?populate=deep`,
      {
        headers: {
          Authorization:
            "Bearer 27fe20a350b4e2b68a19de4e4ccbe100805600ccb7cdc1c79e7801c4f146b9c3a2a6e55d9426f9ad4324e4d4f561aca2e746b7118b62d86e3076410caa0e6a841bdbabc622aaf21f28fd5594c15b3f1c1d19ceb9290d17a6045a2bd26f516c30d65c5a3d0c57b519ec3bdbe7fa2f8241c6037a31710a8ccb57e626d34f75136f",
        },
      }
    );
    const finalres = await res.json();
    //   console.log(finalres);
    return finalres.data;
  }
  const productid = await Productid();
  const [app] = await Promise.all([getApp(params.locale)]);

  return (
    <>
       <TopHeader app={app} />
        <Navbar app={app} />
    {/* Heading */}
    <div className="bg-primary">
      <div className="container py-4">
        {/* Breadcrumb */}
        {/* <nav className="d-flex">
          <h6 className="mb-0">
            <Link href="/" className="text-white-50">
              Home
            </Link>

            <span className="text-white-50 mx-2"> &gt; </span>
            <Link href="/products" className="text-white-50">
              Products
            </Link>
            <span className="text-white-50 mx-2"> &gt; </span>
            <Link href={`/products/${product?.id_}`} className="text-white">
              <u>{product?.title}</u>
            </Link>
          </h6>
        </nav> */}
        {/* Breadcrumb */}
      </div>
    </div>
    {/* Heading */}
    <>
      <section className="py-5">
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-6">
              <div className="border rounded-4 mb-3 d-flex justify-content-center ">
                <a
                  data-fslightbox="mygalley"
                  className="rounded-4 w-100"
                  target="_blank"
                  data-type="image"
                  href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp"
                >
                {productid?.product_img.map((image:any,ibx:any)=><Image className='w-100 rounded-4 fit' style={{ width: "300px", height: "400px" }} height={400} width={300} key={ibx} src={image.formats.thumbnail.url} alt={productid.name}/>)}
                </a>
              </div>
              {/* <div className="d-flex justify-content-center mb-3">
                {product?.images?.map((img, index) => {
                  return <SecondaryImages key={index} img={img} />;
                })}
              </div> */}
              {/* thumbs-wrap.// */}
              {/* gallery-wrap .end// */}
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4
                  className="title text-dark"
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                  }}
                >
                  {productid.name}
                </h4>
                <div className="d-flex flex-row my-3">
                  <div className="text-warning mb-1 me-2">
                  <FontAwesomeIcon icon={faStar} style={{width:"15px",padding:"2px"}}/> 
                  <FontAwesomeIcon icon={faStar} style={{width:"15px",padding:"2px"}}/> 
                  <FontAwesomeIcon icon={faStar} style={{width:"15px",padding:"2px"}}/> 
                    <FontAwesomeIcon icon={faStar} style={{width:"15px",padding:"2px"}}/> 
                    <FontAwesomeIcon icon={faStar} style={{width:"15px",padding:"2px"}}/> 
                    <i className="fas fa-star-half-alt" />
                    <span className="ms-1">
                      {productid?.rating?.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-muted">
                    <i className="fas fa-shopping-basket fa-sm mx-1" />
                  <FontAwesomeIcon icon={faBasketShopping} style={{width:"40px",padding:"1px",margin:"2px",color:"0aad0a"}} />
                    154 orders
                  </span>
                  <span className="text-success ms-2">In stock</span>
                </div>
                <div className="mb-3">
                  <span className="h5">
                    $
                    {(
                      productid?.price -
                      productid?.price * (productid?.dicount / 100)
                    ).toFixed(2)}
                  </span>
                  <span className="text-muted">/per box</span>
                </div>
                <p>{productid?.description}</p>
                <div className="row">
                  <dt className="col-3">Category:</dt>
                  <dd className="col-9">{productid?.material}</dd>
                  <dt className="col-3">Brand:</dt>
                  <dd className="col-9">{productid?.brand}</dd>
                  <dt className="col-3">Model:</dt>
                  <dd className="col-9">{productid?.material}</dd>
                </div>
                <hr />
                <div className="row mb-4">
                  {/* col.// */}
                  <div className="col-md-4 col-6 mb-3">
                    <label className="mb-2 d-block">Quantity</label>
                    <div
                      className="input-group mb-3"
                      style={{ width: 170 }}
                    >
                      <button
                        className="btn btn-white border border-secondary px-3"
                        type="button"
                        id="button-addon1"
                        data-mdb-ripple-color="dark"
                        // onClick={handleDecrement}
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <input
                        type="text"
                        className="form-control text-center border border-secondary"
                        // value={qt}
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        readOnly
                      />
                      <button
                        className="btn btn-white border border-secondary px-3"
                        type="button"
                        id="button-addon2"
                        data-mdb-ripple-color="dark"
                        // onClick={handleIncrement}
                      >
                        <i className="fas fa-plus" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-warning shadow-0"
                    // onClick={handleBuy}
                  >
                    {" "}
                    Buy now{" "}
                  </button>
                  <button
                    className="btn btn-primary shadow-0"
                    // onClick={handleAddToCart}
                  >
                    {" "}
                    <i className="me-1 fa fa-shopping-basket" /> Add to cart{" "}
                  </button>
                  <button
                    className="btn btn-light border border-secondary py-2 icon-hover px-3"
                    // onClick={handleAddToWishList}
                  >
                    {" "}
                    <i className="me-1 fa fa-heart fa-lg" /> Save{" "}
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
      {/* content */}
      <section className="bg-light border-top py-4">
        <div className="container">
          <div className="row gx-4">
            <div className="col-lg-8 mb-4">
              <div className="border rounded-2 px-3 py-2 bg-white">
                {/* Pills navs */}
                <ul
                  className="nav nav-pills nav-justified mb-3"
                  id="ex1"
                  role="tablist"
                >
                  <li className="nav-item d-flex" role="presentation">
                    <a
                      className="nav-link d-flex align-items-center justify-content-center w-100 active"
                      id="ex1-tab-1"
                      data-mdb-toggle="pill"
                      href="#ex1-pills-1"
                      role="tab"
                      aria-controls="ex1-pills-1"
                      aria-selected="true"
                    >
                      Specification
                    </a>
                  </li>
                  <li className="nav-item d-flex" role="presentation">
                    <a
                      className="nav-link d-flex align-items-center justify-content-center w-100"
                      id="ex1-tab-2"
                      data-mdb-toggle="pill"
                      href="#ex1-pills-2"
                      role="tab"
                      aria-controls="ex1-pills-2"
                      aria-selected="false"
                    >
                      Warranty info
                    </a>
                  </li>
                  <li className="nav-item d-flex" role="presentation">
                    <a
                      className="nav-link d-flex align-items-center justify-content-center w-100"
                      id="ex1-tab-3"
                      data-mdb-toggle="pill"
                      href="#ex1-pills-3"
                      role="tab"
                      aria-controls="ex1-pills-3"
                      aria-selected="false"
                    >
                      Shipping info
                    </a>
                  </li>
                  <li className="nav-item d-flex" role="presentation">
                    <a
                      className="nav-link d-flex align-items-center justify-content-center w-100"
                      id="ex1-tab-4"
                      data-mdb-toggle="pill"
                      href="#ex1-pills-4"
                      role="tab"
                      aria-controls="ex1-pills-4"
                      aria-selected="false"
                    >
                      Seller profile
                    </a>
                  </li>
                </ul>
                {/* Pills navs */}
                {/* Pills content */}
                <div className="tab-content" id="ex1-content">
                  <div
                    className="tab-pane fade show active"
                    id="ex1-pills-1"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-1"
                  >
                    <p>
                     {productid.details}
                    </p>
                    <p>
                     {productid.about}
                    </p>
                    <div className="row mb-2">
                      <div className="col-12 col-md-6">
                        <ul className="list-unstyled mb-0">
                          <li>
                            <i className="fas fa-check text-success me-2" />
                            Some great feature name here
                          </li>
                          <li>
                            <i className="fas fa-check text-success me-2" />
                            Lorem ipsum dolor sit amet, consectetur
                          </li>
                          <li>
                            <i className="fas fa-check text-success me-2" />
                            Duis aute irure dolor in reprehenderit
                          </li>
                          <li>
                            <i className="fas fa-check text-success me-2" />
                            Optical heart sensor
                          </li>
                        </ul>
                      </div>
                      <div className="col-12 col-md-6 mb-0">
                        <ul className="list-unstyled">
                          <li>
                            <i className="fas fa-check text-success me-2" />
                            Easy fast and ver good
                          </li>
                          <li>
                            <i className="fas fa-check text-success me-2" />
                            Some great feature name here
                          </li>
                          <li>
                            <i className="fas fa-check text-success me-2" />
                            Modern style and design
                          </li>
                        </ul>
                      </div>
                    </div>
                    <table className="table border mt-3 mb-2">
                      <tbody>
                        <tr>
                          <th className="py-2">Display:</th>
                          <td className="py-2">
                            13.3-inch LED-backlit display with IPS
                          </td>
                        </tr>
                        <tr>
                          <th className="py-2">Processor capacity:</th>
                          <td className="py-2">
                            2.3GHz dual-core Intel Core i5
                          </td>
                        </tr>
                        <tr>
                          <th className="py-2">Camera quality:</th>
                          <td className="py-2">720p FaceTime HD camera</td>
                        </tr>
                        <tr>
                          <th className="py-2">Memory</th>
                          <td className="py-2">8 GB RAM or 16 GB RAM</td>
                        </tr>
                        <tr>
                          <th className="py-2">Graphics</th>
                          <td className="py-2">
                            Intel Iris Plus Graphics 640
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="tab-pane fade mb-2"
                    id="ex1-pills-2"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-2"
                  >
                    Tab content or sample information now <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum. Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo
                  </div>
                  <div
                    className="tab-pane fade mb-2"
                    id="ex1-pills-3"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-3"
                  >
                    Another tab content or sample information now <br />
                    Dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.
                  </div>
                  <div
                    className="tab-pane fade mb-2"
                    id="ex1-pills-4"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-4"
                  >
                    Some other tab content or sample information now <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.
                  </div>
                </div>
                {/* Pills content */}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="px-0 border rounded-2 shadow-0">
                <div className="card">
                  {/* <div className="card-body">
                    <h5 className="card-title">Similar items</h5>
                    {similarProducts.map((product, index) => {
                      return (
                        <div key={index} className="d-flex mb-3">
                          <Link
                            href={`/products/${product.id_}`}
                            className="me-3"
                          >
                            <Image
                              src={`${product.thumbnail}`}
                              alt={product.title + " image"}
                              height={96}
                              width={96}
                              style={{ minWidth: 96, height: 96 }}
                              className="img-md img-thumbnail"
                            ></Image>
                          </Link>
                          <div className="info">
                            <Link
                              href={`/products/${product.id_}`}
                              className="nav-link mb-1"
                            >
                              {product.title} <br />
                              {product.brand}
                            </Link>
                            <strong className="text-dark">
                              $
                              {(
                                product.price -
                                product.price *
                                  (product.discountPercentage / 100)
                              ).toFixed(2)}
                            </strong>
                          </div>
                        </div>
                      );
                    })}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
    <Footer app={app} />
  </>
  );
}

interface Props {
  params: {
    productid: number;
  };
}
export const generateStaticParams = async () => {
  const [servicesAR, servicesEN] = await Promise.all([
    getServices("ar"),
    getServices("en"),
  ]);

  const paramsAR = servicesAR.map((s) => {
    return { locale: "ar", productid: ` ar/product/${s.productid}` };
  });

  const paramsEN = servicesEN.map((s) => {
    return { locale: "en", productid: ` en/product/${s.productid}` };
  });

  return [...paramsAR, ...paramsEN];
};
