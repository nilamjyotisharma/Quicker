import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import ReviewCard from './ReviewCard'
import Slider from "react-slick";


const ProductDetailsPage = ({product}) => {

    const options = {
        value: product.ratings,
        edit: false,
        size: window.innerWidth < 600 ? 20:20,
        activeColor: "tomato",
        isHalf: true
      };

      
    const settings = {
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

      console.log(product.ratings)


  return (
    <>

      

      {/* main div */}
      <div className='mx-24 my-24'>

        {/* div for padding and displayType */}
        <div className='flex justify-evenly'>

          {/* carousel show here */}
          <div className='w-1/2'>

            <Carousel className='px-32'>
              {
                product.images && product.images.map((image, i) => <img key={image._id} className='h-96 w-96 object-contain' src={image.url} alt='image not found' />)
              }
            </Carousel>

          </div>


          {/* product details show here */}
          <div className='w-1/2 px-12 py-4'>

                <h1 className='text-[2.5rem] font-bold text-gray-800'>{product.name}</h1>
                <h4 className='text-[1.3rem] text-gray-500'>{product.description}</h4>
                <div className='flex space-x-4 text-[#2FA674] font-medium py-2'>
                <h2 className='text-[1rem]'>#{product.category}</h2>
                <h3 className='text-[1rem]'>Stock: {product.stock}</h3>
                </div>
                
                <h1 className='text-[3rem] font-bold text-neutral-700'>₹{product.price}</h1>


                <div className='flex space-x-4 text-[#2FA674] font-medium py-2 items-center'>
                <h2 className='text-[1.2rem]'><ReactStars {...options} /></h2>
                <h3 className='text-[1.2rem]'>{product.numOfReviews} Reviews</h3>
                </div>
                

                <div className='flex justify-start space-x-8 w-full my-8'>
          
                <Link className='hover:-translate-y-2 duration-200' to='/login'><div className='inline text-lg px-20 py-3 font-semibold rounded-lg border-[0.09rem] border-[#2FA674] hover:-translate-y-2 duration-200 text-[#2FA674] shadow-2xl cursor-pointer'>Add to cart</div></Link>

                  <Link className='hover:-translate-y-2 duration-200' to='/login'><div className='inline text-lg px-24 py-3 font-semibold rounded-lg bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] hover:-translate-y-2 duration-200 text-white shadow-2xl cursor-pointer'>Buy Now</div></Link>
          


                </div>

                
                {/* review section */}

                <div className='pt-4'>
                  {product.reviews && product.reviews[0] ? (
                    <>
                    <div>
                        <Slider {...settings}>
                        
                        {product.reviews && product.reviews.map((review) => (
                        
                            
                            <ReviewCard review={review} />

                        
                        ))}
          
                        
          
                        </Slider>
                    </div>
                    </>
                  )
                     : <h1 className='text-[1.2rem] font-semibold text-gray-500 text-center'>Opps! No Reviews Yet</h1>
                  
                  }
                </div>



          </div>

          

        </div>
      </div>
      
            
          

          
    </>
  )
}

export default ProductDetailsPage






// (product.reviews && product.reviews.map((review) => (
                        
//     <ReviewCard review={review} />
   


// )))