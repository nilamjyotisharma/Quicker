import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllProducts } from '../../redux/pruducts/productSlice'
import { useParams } from 'react-router-dom'
import ProductCard from './ProductCard'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import Slider from '@material-ui/core/Slider';
// import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'
import categories from './Categories'

const ProductsPage = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const {products, loading, error, resultPerPage, productsCount} = useSelector(state => state.products)
    const {id} = useParams()


    // console.log("id",id)


    const [keyword, setKeyword] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 50000])
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0)


    console.log("keyword",keyword);

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    }

    const ratingHandler = (e, newRating) => {
        setRatings(newRating);
    }




    useEffect(() => {
        if(error){
            alert.error(error)
        }
        dispatch(getAllProducts(keyword, currentPage, price, category, ratings))
    }, [dispatch, error, alert, keyword, currentPage, price, category, ratings])


    console.log("Category", category)

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(keyword.trim()){
            window.location.href = `/products/${keyword}`
        }else{
            window.location.href = `/products`
        }

    }

    



  return (
    <>
        {/* product section */}

        <div className='flex justify-center mb-20 overflow-hidden'>
            <div className='flex-row'>
                


                <div className='flex justify-between w-screen'>

                <div className='w-1/4 px-12 py-24 bg-slate-100 left-0'>
                    <h1 className='text-[#2FA674] font-bold text-xl my-4 pb-2 border-b-2 border-[#2FA674]'>
                        Price Range
                    </h1>
                    <Slider className='w-1/4'
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        min={0}
                        max={50000}
                    />

                    <h1 className='text-[#2FA674] font-bold text-xl my-4 pb-2 border-b-2 border-[#2FA674]'>Categories</h1>
                    <ul className='text-start px-4 pb-4'>

                    {categories.map((category) => (
                        <li 
                            className="cursor-pointer text-gray-600 hover:text-[#2FA674] font-semibold my-1"
                            key={category}
                            onClick={() => setCategory(category)}
                            >
                                {category}
                            </li>
                        ))}

                    </ul>


                    <h1 className='text-[#2FA674] font-bold text-xl my-4 pb-2 border-b-2 border-[#2FA674]'>
                        Ratings above
                    </h1>
                    <Slider className='w-1/4'
                        value={ratings}
                        onChange={ratingHandler}
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
                    />
                    

                </div>


               <div className='border-l-2 border-slate-100 w-5/6'>
               <div className='flex border-b-[0.6px] justify-between items-center px-8'>

               <div className='p-4 text-[2.6rem] font-bold text-gray-600 inline'>Products</div>


               <div>

               <form className='text-center' onSubmit={onSubmitHandler}>
                    <input className='bg-slate-100 my-2 rounded-lg w-5/6 px-8 py-3 text-lg font-semibold text-gray-700 focus:outline-none'
                     type='text'
                      placeholder='Search groceries'
                        onChange={(e) => setKeyword(e.target.value)}
                      />

                      {/* <input type='submit' value={'Search'} className='bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-bold text-lg -ml-12 px-12 py-4 rounded-lg hover:scale-105 duration-200 cursor-pointer' /> */}
                </form>

               </div>

               

               </div>
               
               
                



                <div className='flex flex-wrap justify-evenly'>

                    {products && products.map((product) => (
                        <ProductCard product={product} />    
                    ))
                    }

                </div>
               </div>

                

                </div>

                
                    
                <div>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                    />
                </div>

                
            </div>
        </div>
    </>
  )
}

export default ProductsPage