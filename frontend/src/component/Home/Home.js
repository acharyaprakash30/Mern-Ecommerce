import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import Product from './ProductCard.js'
import MetaData from '../layout/MetaData.js'
import {getProducts} from '../../actions/productAction'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../layout/Loader/Loader.js'
import { useAlert } from 'react-alert'
import './Home.css'

const Home = () => {
  const alert = useAlert();

  const dispatch = useDispatch();
  const {products,productsCount,loading,error} = useSelector(state => state.products);

  useEffect(() => {
    if(error){
      return alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch,error,alert]);


 
  return (
  <Fragment>
    {loading ? <Loader /> :
    <Fragment>
      <MetaData title="Ecommerce" />
    <div className='banner'>
        <p>Welcome to Ecommerce</p>
        <h1>Find Amazing Product Below</h1>
        <a href='#container'>
          <button>Scroll <CgMouse/></button>    
        </a>
        </div>
        <h2 className='homeHeading'>Featured Product</h2>
        <div className='container' id='container'>
          {products ? products.map(product => <Product key={product._id} product={product} />) : null}
        </div>
    </Fragment> }
  </Fragment>
  )
}

export default Home