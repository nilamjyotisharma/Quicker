import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";

const Products = ({product}) => {

  // console.log(products);

    const options = {
        value: product.ratings,
        edit: false,
        size: window.innerWidth < 600 ? 20:20,
        activeColor: "tomato",
        isHalf: true
      };

      
  return (
    <Link to={`/product/${product._id}`}>
    <div className='w-64 h-[22rem] my-8 hover:-translate-y-4 duration-200 rounded-xl shadow-lg bg-transparent'>

    <div>
        <img className='h-40 -z-1 w-full rounded-t-xl' src={product.images[0].url} alt='image not found' />
    </div>

    <div className='p-4 text-neutral-800'>
        <div className='font-medium'>₹{product.price}</div>
        <div className='text-lg text-[#2FA674] text-ellipsis whitespace-nowrap overflow-hidden pt-4'>{product.name}</div>
        <div className='text-lg mb-4 font-semibold'><ReactStars {...options} /></div>
        <div className='flex justify-between px-1 w-full mb-2'>
          
          <div className='inline text-sm px-4 py-3 font-semibold rounded-lg border-[0.09rem] border-[#2FA674]  hover:scale-105 duration-200 text-[#2FA674] shadow-2xl cursor-pointer'><Link to='/login'>Add to cart</Link></div>

          <div className='inline text-sm px-4 py-3 font-semibold rounded-lg bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] hover:scale-105 duration-200 text-white shadow-2xl cursor-pointer'><Link to='/login'>Buy Now</Link></div>
          


        </div>
        
    </div>

    </div>
    



    </Link>
  )
}

export default Products