import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../Products/ProductCard'
import Metadata from '../layout/Header/Metadata'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../../redux/pruducts/productSlice'
import Categories from './Categories/Categories'
import vegetables from '../../Images/categories/vegetables.png'
import veg from '../../Images/veg.png'
import { useAlert } from 'react-alert'
import Header from '../layout/Header/Header'
import Footer from '../layout/Footer/Footer'

const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading, error, products, productsCount} = useSelector(state => state.products);
    console.log("product1", products);

    useEffect(() => {

        if(error){
            return alert.error(error);
        }
        dispatch(getAllProducts());
    }, [dispatch, error, alert]);




    
  return (

    <>

    

    <Header />
    <div className='overflow-hidden bg-bg bg-no-repeat -mt-20'>

        {/* Categories Section */}

        <div className='flex mx-12 py-4 justify-evenly mt-20'>
            <Categories />
        </div>

        <Metadata title='Home' />
        {/* Hero Section */}


        <div className='mx-36 mt-4 flex'>
            <div className='mt-10'>
                <h1 className='text-[5.6rem] font-extrabold text-gray-700'><span className='text-[#2FA674]'>Quicker,</span> Find your <span className='text-[#2FA674]'>Grocery</span> here</h1>

                <div className='flex items-center mt-4'>

                <img className='h-16 w-16 mt-0' src={veg} alt='image not found' />
                <p className='text-[1.6rem] text-gray-500 font-semibold drop-shadow-xl'>Get your groceries at doorstep</p>

                </div>
                

            </div>

            <div className='flex justify-center'>
                <img className='h-[32rem] w-[65rem] mt-0 drop-shadow-2xl' src={vegetables} alt='image not found' />
            </div>
        </div>



        {/* product section */}

        <div className='flex justify-center my-28'>
            <div className='flex-row'>
                <div className='text-lg text-[#2FA674] font-semibold uppercase text-center'><h>Featured Products</h></div>
                <div className='text-center mb-8 text-[3.2rem] font-bold text-gray-700'>We have best quality products</div>
                <div className='flex flex-wrap justify-evenly mx-32'>

                    {products && products.map((product) => (
                        <ProductCard product={product} />    
                    ))
                    }

                </div>
            </div>
        </div>


        


    </div>

    <Footer />

    </>

  )
}

export default Home