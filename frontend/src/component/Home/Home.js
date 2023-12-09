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
    <div className='overflow-hidden'>

        {/* Categories Section */}

        <div className='flex mx-12 pt-8 pb-2 justify-evenly'>
            <Categories />
        </div>

        <Metadata title='Home' />
        {/* Hero Section */}


        <div className='mx-32 mt-4 flex'>
            <div className='mt-4'>
                <h1 className='text-[6.9rem] font-extrabold text-gray-700'><span className='text-[#2FA674]'>Quicker,</span> Find your <span className='text-[#2FA674]'>Grocery</span> here</h1>

                <div className='flex items-center mt-4'>

                <img className='h-20 w-20 mt-0' src={veg} alt='image not found' />
                <p className='text-[2rem] text-gray-500 font-semibold drop-shadow-xl'>Get your groceries at doorstep</p>

                </div>
                

            </div>

            <div className='flex justify-center'>
                <img className='h-[35rem] w-[70rem] mt-0 drop-shadow-2xl' src={vegetables} alt='image not found' />
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
  )
}

export default Home