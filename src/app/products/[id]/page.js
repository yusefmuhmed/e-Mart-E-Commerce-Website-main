"use client";

import Image from "next/image";
// import prisma from "../../../../lib/db";
import SecondaryImages from "../../../components/SecondaryImages";
import Link from "next/link";
import { useProducts } from "../../../contexts/ProductsContext";
import { useState } from "react";
import { useCart } from "../../../contexts/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Skeleton } from "react-skeleton-generator";

export default function Product({ params }) {
  const { productsLoading, products } = useProducts();
  const { addToCart } = useCart();
  const [qt, setQt] = useState(1);
  const router = useRouter();

  const handleIncrement = (e) => {
    e.preventDefault();
    setQt((q) => (q = q + 1));
  };
  const handleDecrement = (e) => {
    e.preventDefault();

    setQt((q) => {
      if (q <= 1) {
        return 1;
      } else return q - 1;
    });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(Number(params.id), qt);

    // console.log(Nuparams.id);
  };
  const handleBuy = (e) => {
    e.preventDefault();
    addToCart(Number(params.id), qt);
    router.push("cart");
  };

  const handleAddToWishList = (e) => {
    e.preventDefault();
    toast("Feature coming soon!", {
      icon: "🧩",
      position: "top-center",
    });
  };

  if (productsLoading) {
    return (
      <div
        className="w-75 mx-auto"
        style={{
          padding: "5vh 5vw",
        }}
      >
        <Skeleton.SkeletonThemeProvider>
          <Skeleton
            style={{
              height: "60vh",
            }}
          ></Skeleton>
        </Skeleton.SkeletonThemeProvider>
      </div>
    );
  } else {
    const product = products[0].find((p) => p.id === Number(params.id));
    // console.log(products);
    const similarProducts = products?.filter(
      (p) => p?.category === product?.category
    );
    return (
      <>
       
        
        
        <>
          <section className="py-5">
            <div className="container" style={{ marginTop: "6rem" }}>
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
                      <Image
                        alt={product?.name + " image"}
                        style={{ width: "100%", height: "500px" }}
                        width={500}
                        height={500}
                        className="rounded-4 fit"
                        src={product?.product_img[0]?.formats?.thumbnail?.url}
                      />
                    </a>
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    {product?.images?.map((img, index) => {
                      return <SecondaryImages key={index} img={img} />;
                    })}
                  </div>
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
                      {product.name}
                    </h4>
                    <div className="d-flex flex-row my-3">
                      <div className="text-warning mb-1 me-2">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fas fa-star-half-alt" />
                        <span className="ms-1">
                          {product?.rating?.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-muted">
                        <i className="fas fa-shopping-basket fa-sm mx-1" />
                        154 orders
                      </span>
                      <span className="text-success ms-2">In stock</span>
                    </div>
                    <div className="mb-3">
                      <span className="h5">
                        $
                        {(
                          product?.price -
                          product?.price * (product?.discount / 100)
                        ).toFixed(2)}
                      </span>
                      <span className="text-muted">/per box</span>
                    </div>
                    <p>{product?.about}</p>
                    <div className="row">
                      <dt className="col-3">Category:</dt>
                      <dd className="col-9">{product?.categorie}</dd>
                      <dt className="col-3">Brand</dt>
                      <dd className="col-9">{product?.brand?.name}</dd>
                      <dt className="col-3">Model</dt>
                      <dd className="col-9">{product?.name}</dd>
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
                            onClick={handleDecrement}
                          >
                            <i className="fas fa-minus" />
                          </button>
                          <input
                            type="text"
                            className="form-control text-center border border-secondary"
                            value={qt}
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                            readOnly
                          />
                          <button
                            className="btn btn-white border border-secondary px-3"
                            type="button"
                            id="button-addon2"
                            data-mdb-ripple-color="dark"
                            onClick={handleIncrement}
                          >
                            <i className="fas fa-plus" />
                          </button>
                        </div>
                      </div>
                      <div className="col-md-4 col-6 mb-3">
                        <label className="mb-2 d-block">size</label>
                        <div
                          className="input-group mb-3"
                          style={{ width: 170 }}
                        >
                          <select class="form-select" aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4 col-6 mb-3">
                        <label className="mb-2 d-block">length</label>
                        <div
                          className="input-group mb-3"
                          style={{ width: 170 }}
                        >
                          <select class="form-select" aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-warning shadow-0"
                        onClick={handleBuy}
                      >
                        {" "}
                        get a quote{" "}
                      </button>
                      <button
                        className="btn btn-primary shadow-0"
                        onClick={handleAddToCart}
                      >
                        {" "}
                        <i className="me-1 fa fa-shopping-basket" /> Add to cart{" "}
                      </button>
                      <button
                        className="btn btn-light border border-secondary py-2 icon-hover px-3"
                        onClick={handleAddToWishList}
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
                          description
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
                         {product.about}          </p>
                      
                      </div>
                      <div
                        className="tab-pane fade mb-2"
                        id="ex1-pills-2"
                        role="tabpanel"
                        aria-labelledby="ex1-tab-2"
                      >
{                      product.details
}                      </div>
                      
                      
                    </div>
                    {/* Pills content */}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="px-0 border rounded-2 shadow-0">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">RELATED PRODUCTS
                        </h5>
                        {similarProducts.map((product, index) => {
                          return (
                            <div key={index} className="d-flex mb-3">
                              <Link
                                href={`/products/${product[index+1].id}`}
                                className="me-3"
                              >
                                <Image
                                  src={`${product[index+1].product_img[0].formats.thumbnail.url}`}
                                  alt={product[index+1].name + " image"}
                                  height={96}
                                  width={96}
                                  style={{ minWidth: 96, height: 96 }}
                                  className="img-md img-thumbnail"
                                ></Image>
                              </Link>
                              <div className="info">
                                <Link
                                  href={`/products/${product[index+1].id}`}
                                  className="nav-link mb-1"
                                >
                                  {product[index+1].name} <br />
                                  {product[index+1].brand?.name}
                                </Link>
                                <strong className="text-dark">
                                  $
                                  {(
                                    product[index+1].price -
                                    product[index+1].price *
                                    (product[index+1].discount/ 100)
                                  ).toFixed(2)}
                                </strong>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      </>
    );
  }

  // const product = await prisma.products.findFirst({
  //   where: {
  //     id_: Number(params.id),
  //   },
  // });
  // const similarProducts = await prisma.products.findMany({
  //   where: {
  //     category: product.category,
  //   },
  //   take: 4,
  // });
}
