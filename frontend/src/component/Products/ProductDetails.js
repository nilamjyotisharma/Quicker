import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProductDetails } from '../../redux/pruducts/productDetailsSlice'
import { useParams } from 'react-router-dom'
import ProductDetailsPage from './ProductDetailsPage'
import { useAlert } from 'react-alert'

const ProductDetails = () => {

  const alert = useAlert()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { product, loading, error } = useSelector(state => state.productDetails)
  console.log("productDetails",product.ratings);

  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(getProductDetails(id))
  }, [dispatch])




  return (
    <>

      <ProductDetailsPage product={product} />

    </>
    
  )
}

export default ProductDetails