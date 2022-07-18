import React, { Fragment,useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../../actions/productAction'


const ProductDetails = ({match}) => {
    const {product,loading,error} = useSelector(state => state.productDetails)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
    }, [dispatch, match.params.id])

  return (
    <Fragment>
        <div className='productDetails'>
        <div>
            <Carousel>
                <div>

                </div>
             </Carousel>
        </div>
        </div>
    </Fragment>
  )
}

export default ProductDetails