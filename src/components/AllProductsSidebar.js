"use client";

import { useProducts } from "../contexts/ProductsContext";
import { Skeleton } from "react-skeleton-generator";

const cf = [];

export default function AllProductsSidebar() {
  const {
    categories,
    setCategory,
    brands,
    productsCount,
    brand,
    setBrand,
    productsVisible,
    category,
    products,
    setPageNumber,
    productsLoading,
    sizes,
    setSizes,
    material,
    setMaterial,
    sizesObject,
    sizeType,
    setSizeType
  } = useProducts();


  const handleCheck = (e) => {
    const filterType = e.target.id;
    const filterValue = e.target.value;
  
    if (e.target.checked) {
      switch (filterType) {
        case 'material':
          material.push(filterValue);
          setMaterial([...material]);
          break;
        case 'category':
          category.push(filterValue);
          setCategory([...category]);
          break;
        case 'brand':
          brand.push(filterValue);
          setBrand([...brand]);
          break;
        case 'size':
          sizeType.push(filterValue);
          setSizeType([...sizeType]);
          break;
        default:
          break;
      }
      return
    } else {
      // Remove the value from the respective array based on filter type
      switch (filterType) {
        case 'material':
          setMaterial((prevMaterial) => prevMaterial.filter((item) => item !== filterValue));
          break;
        case 'category':
          setCategory((prevCategory) => prevCategory.filter((item) => item !== filterValue));
          break;
        case 'brand':
          setBrand((prevBrand) => prevBrand.filter((item) => item !== filterValue));
          break;
        case 'size':
          setSizeType((prevSizes) => prevSizes.filter((item) => item !== filterValue));
          break;
        default:
          break;
      }
    }
  };
  
  // const sizesObject = products[0]?.reduce((acc, product) => {
  //   if (product.sizeTypes) {
  //     product.sizeTypes.forEach((sizeType) => {
  //       const { __component, sizes } = sizeType;
  //       acc[__component] = acc[__component] || [];
  //       acc[__component] = acc[__component].concat(sizes);
  //     });
  //   }
  //   return acc;
  // }, {});
  
  //  console.log(sizesObject);


  return (
    <div className="col-lg-3">
      {/* Toggle button */}
      <button
        className="btn btn-outline-secondary mb-3 w-100 d-lg-none"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span>Show filter</span>
      </button>
      {/* Collapsible wrapper */}
      <div
        className="collapse card d-lg-block mb-5"
        id="navbarSupportedContent"
      >
        <div className="accordion" id="accordionPanelsStayOpenExample">
          {/* Categories Filter*/}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button text-dark bg-light"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                Categories
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
            >
              <div className="accordion-body">
                {/* Render Category Checkboxes */}
                {!productsLoading && (
                  <div className="form-check">
                    {categories[0].map((ct, index) => (
                      <div key={index}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`category`}
                          onChange={handleCheck}
                          defaultChecked=""
                          value={ct.categorie}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`category`}
                        >
                          {ct.categorie.toUpperCase()}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Material Filter */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button text-dark bg-light"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                Material
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              className="accordion-collapse collapse show"
              aria-labelledby="headingTwo"
            >
              <div className="accordion-body">
                <div>
                  {/* Checked checkbox */}
                  {productsLoading && (
                    <Skeleton.SkeletonThemeProvider>
                      <Skeleton
                        style={
                          {
                            // height: "auto",
                          }
                        }
                      />
                    </Skeleton.SkeletonThemeProvider>
                  )}
                  {!productsLoading &&
                    //category !== "all" &&
                    Array.from(
                      new Set(
                        products[0]
                          //.filter((p) => p.categorie === category)
                          .map((p) => p.material)
                      )
                    ).map((material, index) => {
                      return (
                        <div
                          className="form-check d-flex flex-col align-items-center justify-content-between"
                          key={index}
                        >
                          <div>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id='material'
                              defaultChecked=""
                              onChange={handleCheck}
                              value={material}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={material}
                            >
                              {material}
                            </label>
                          </div>
                          <span className="badge badge-secondary float-end">
                            {
                              Array.from(
                                new Set(
                                  products[0].filter(
                                    (p) => p.material === material

                                  )
                                )
                              ).length
                            }
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          {/* Brands Filter */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button text-dark bg-light"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                Brands
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              className="accordion-collapse collapse show"
              aria-labelledby="headingTwo"
            >
              <div className="accordion-body">
                <div>
                  {/* Checked checkbox */}
                  {productsLoading && (
                    <Skeleton.SkeletonThemeProvider>
                      <Skeleton
                        style={
                          {
                            // height: "auto",
                          }
                        }
                      />
                    </Skeleton.SkeletonThemeProvider>
                  )}
                  {!productsLoading &&
                    Array.from(new Set(brands[0].map((p) => p.name))).map(
                      (brand, index) => {
                        return (
                          <div
                            className="form-check d-flex flex-col align-items-center justify-content-between"
                            key={index}
                          >
                            <div>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={brand}
                                defaultChecked=""
                                onChange={handleCheck}
                                value={brand}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={brand}
                              >
                                {brand}
                              </label>
                            </div>
                            <span className="badge badge-secondary float-end">
                              {
                                Array.from(
                                  new Set(
                                    products[0].filter(
                                      (p) => p.brand === brand
                                      // &&  p.categorie === category
                                    )
                                  )
                                ).length
                              }
                            </span>
                          </div>
                        );
                      }
                    )}
                  
                </div>
              </div>
            </div>
          </div>

          
         

         

<div className="accordion-item">
      {/* ... (existing code) */}
      <div>
        {/* Checked checkbox */}
        {!productsLoading &&
          Array.from(
            new Set(
              products[0].flatMap((p) => p.sizeTypes.flatMap((sizeType) => sizeType.sizes.map((size) => size.name)))
            )
          ).map((sizeName, index) => (
            <div
              className="form-check d-flex flex-col align-items-center justify-content-between"
              key={index}
            >
              <div>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id='size'
                  defaultChecked=""
                  onChange={handleCheck}
                  value={sizeName}
                />
                <label
                  className="form-check-label"
                  htmlFor={sizeName}
                >
                  {sizeName}
                </label>
              </div>
              <span className="badge badge-secondary float-end">
                {
                  products[0].filter(
                    (p) => p.sizeTypes.some((sizeType) => sizeType.sizes.some((size) => size.name === sizeName))
                  ).length
                }
              </span>
            </div>
          ))}
      </div>
    </div>



          {/* <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button text-dark bg-light"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#panelsStayOpen-collapseThree"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseThree"
              >
                Price
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseThree"
              className="accordion-collapse collapse show"
              aria-labelledby="headingThree"
            >
              <div className="accordion-body">
                <div className="range">
                  <input
                    type="range"
                    className="form-range"
                    id="customRange1"
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <p className="mb-0">Min</p>
                    <div className="form-outline">
                      <input
                        type="number"
                        id="typeNumber"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="typeNumber">
                        $0
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <p className="mb-0">Max</p>
                    <div className="form-outline">
                      <input
                        type="number"
                        id="typeNumber"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="typeNumber">
                        $1,0000
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-white w-100 border border-secondary"
                >
                  apply
                </button>
              </div>
            </div>
          </div> */}
          {/* <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button text-dark bg-light"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#panelsStayOpen-collapseFive"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseFive"
              >
                Ratings
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseFive"
              className="accordion-collapse collapse show"
              aria-labelledby="headingThree"
            >
              <div className="accordion-body">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="five-star"
                    defaultChecked=""
                  />
                  <label className="form-check-label" htmlFor="five-star">
                    <i className="fas fa-star text-warning" />
                    <i className="fas fa-star text-warning" />
                    <i className="fas fa-star text-warning" />
                    <i className="fas fa-star text-warning" />
                    <i className="fas fa-star text-warning" />
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="four-star"
                    defaultChecked=""
                  />
                  <label className="form-check-label" htmlFor="four-star">
                    <i className="fas fa-star text-warning" />
                    <i className="fas fa-star text-warning" />
                    <i className="fas fa-star text-warning" />
                    <i className="fas fa-star text-warning" />
                    <i className="fas fa-star text-secondary" />
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="three-star"
                    defaultChecked=""
                  />
                  <label className="form-check-label" htmlFor="three-star">
                    <i className="fas fa-star text-warning" />
                    <i className="fas fa-star text-warning" />
                    <i className="fas fa-star text-warning" />
                    <i className="fas fa-star text-secondary" />
                    <i className="fas fa-star text-secondary" />
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="two-star"
                    defaultChecked=""
                  />
                  <label className="form-check-label" htmlFor="two-star">
                    <i className="fas fa-star text-warning" />
                    <i className="fas fa-star text-warning" />
                    <i className="fas fa-star text-secondary" />
                    <i className="fas fa-star text-secondary" />
                    <i className="fas fa-star text-secondary" />
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="one-start"
                    defaultChecked=""
                  />
                  <label className="form-check-label" htmlFor="one-start">
                    <i className="fas fa-star text-warning" />
                    <i className="fas fa-star text-secondary" />
                    <i className="fas fa-star text-secondary" />
                    <i className="fas fa-star text-secondary" />
                    <i className="fas fa-star text-secondary" />
                  </label>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
