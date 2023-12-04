import Navbar from '../../components/core/navbar';
import Footer from '../../components/core/footer';
import TopHeader from "../../components/core/topheader";
import getApp from '../cms/getapp';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faHighlighter,faStar,faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import "./style.css";
import Link from 'next/link';
import Fliter from '../FliterApp/Fliter';
export default async function Product({ params: { locale } }: { params: { locale: string } }) {

    // concurrent fetch

   async function Allgetproduct(){
       const res= await fetch("http://localhost:1337/api/products?populate=deep",{
        headers:{Authorization:"Bearer 27fe20a350b4e2b68a19de4e4ccbe100805600ccb7cdc1c79e7801c4f146b9c3a2a6e55d9426f9ad4324e4d4f561aca2e746b7118b62d86e3076410caa0e6a841bdbabc622aaf21f28fd5594c15b3f1c1d19ceb9290d17a6045a2bd26f516c30d65c5a3d0c57b519ec3bdbe7fa2f8241c6037a31710a8ccb57e626d34f75136f"}
       });
      const finalres =await res.json();
    //   console.log(finalres);
      return finalres.data;
     
    }
    const Allproducts= await Allgetproduct();
    const [app] = await Promise.all([
        getApp(locale),
    ]);

    return (
        <>
            <TopHeader app={app} />
            <Navbar app={app} />
            <section className='py-5 container '>
            <div className='row'>
            <div className='col-md-2'>
                <Fliter/>
            </div>
            <div className='col-md-10'>
                <div className='row gy-2'>
                {Allproducts.map((product:any,indx:any)=><div key={indx} className='col-md-3'>
                    <Link href={`/en/product/${product.id.toString()}`}>    
                <div className='product py-2'>
                    <div className='m-1 py-1 bg-fafafa'>
                    {product?.product_img.map((image:any,ibx:any)=><img className='prodctimg py-3' key={ibx} src={image.formats.thumbnail.url} alt="product"/>)}
                    <div className='d-flex justify-content-between align-items-center px-1'>
                    <div className='d-flex rating justify-content-center px-2 mx-2'>
                    <FontAwesomeIcon icon={faStar} style={{width:"15px",padding:"2px"}}/> 
                    <span className='text-white ratingp'>{product.rating}</span>
                    </div>
                    <div className='iconmarket '>
                    <FontAwesomeIcon icon={faBasketShopping} style={{width:"20px",padding:"1px",margin:"2px",color:"0aad0a"}} />
                    </div>
                    </div>
                    </div>
                    <h6 className='ps-1 pt-1 nameproduct'>{product.name}</h6>
                    <p className='ps-1   my-0 py-0 nameproduct'>{product.material} </p>
                    <p className='ps-1  my-0 py-0 nameproduct'>{product.brand} </p>
                    <div className='d-flex justify-content-start  align-items-center'>
                    <p className='fw-bold text-black ps-1 my-0 py-0'><span className='katext'>EGP </span> <span className='fs-5'>{product.lastPrice}</span></p>
                    <p  className=' px-1 my-0 py-0 text-center'><del className='fw-bolder'>{product.price}</del> </p>
                    <p className='fw-bold katext'>{product.dicount}<span className='katext'>% OFF</span></p>
                    </div> 
                </div>
                    </Link>
            </div>)}
                </div>

            </div>
            </div>

            </section>
            <Footer app={app} />
        </>
    )
}
