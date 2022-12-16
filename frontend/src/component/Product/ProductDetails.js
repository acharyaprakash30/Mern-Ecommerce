import React, { Fragment,useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails } from '../../actions/productAction'
import Rating from 'react-rating-stars-component'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import ReviewCard from './ReviewCard'
import { useAlert } from 'react-alert'


const ProductDetails = ({match}) => {
  const alert = useAlert();

    const {product,loading,error} = useSelector(state => state.productDetails)
    const dispatch = useDispatch()
    useEffect(() => {
      if(error){
         alert.error(error);
         dispatch(clearErrors())
      }
        dispatch(getProductDetails(match.params.id))

    }, [dispatch, match.params.id,error,alert])
    const options = {
      edit:false,
     color:"rgba(20,20,20,0.1)",
     activeColor:"tomato",
     size:window.innerWidth < 600 ? 20 : 25,
     value:product ? product.ratings:0,
     isHalf:true,
   };
  return (
    <Fragment>
    {
      product ? (
  
        <Fragment>
        <MetaData title={`${product.name} -- ECOMMERCE`} />
        <div className="ProductDetails">
          <div>
            <Carousel>
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </div>

          <div>
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
              <p>Product # {product._id}</p>
            </div>
            <div className="detailsBlock-2">
              <Rating {...options} />
              <span className="detailsBlock-2-span">
                {" "}
                ({product.numOfReviews} Reviews)
              </span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`₹${product.price}`}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button >-</button>
                  <input readOnly type="number"  />
                  <button >+</button>
                </div>
                <button
                  disabled={product.Stock < 1 ? true : false}
                >
                  Add to Cart
                </button>
              </div>

              <p>
                Status:
                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>

            <div className="detailsBlock-4">
              Description : <p>{product.description}</p>
            </div>

            {/* <button onClick={submitReviewToggle} className="submitReview">
              Submit Review
            </button> */}
          </div>
        </div>
        
        {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
    ) : null
    }
  </Fragment>
  )
}

export default ProductDetails

