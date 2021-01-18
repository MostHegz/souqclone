import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstant';

export default function ProductEditScreen(props) {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');

    const productDetails = useSelector(state=> state.productDetails);
    const {loading, error, product} = productDetails;

    const productUpdate = useSelector(state=> state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    const dispatch = useDispatch();
    useEffect(() =>{
        if(successUpdate){
            props.history.push('/productlist');
        }
        if (!product || (product._id !== productId ||successUpdate)) {
            dispatch({type: PRODUCT_UPDATE_RESET});
            dispatch(detailsProduct(productId));
        }else{
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setDescription(product.description)
        }
    },[product,dispatch,productId,props.history,successUpdate])

    const submitHandler =(e) =>{
        e.preventDefault();
        dispatch(updateProduct({_id: productId,name,price,image,category,brand,countInStock,description}))
    }
    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div><h1>Edit Product {productId} </h1></div>
                {loadingUpdate && <Loading></Loading>}
                {errorUpdate && <Message variant='danger'></Message>}
                {
                    loading? <Loading></Loading>
                    : error? <Message variant='danger'>{error}</Message>
                    : 
                    <>
                        <div>
                            <label htmlFor='name'>Name</label>
                            <input 
                                id='name' 
                                type='text' 
                                placeholder='Enter Product Name' 
                                value={name}
                                onChange={(e) => setName(e.target.value)}   
                            ></input>
                        </div>
                        <div>
                            <label htmlFor='price'>Price</label>
                            <input 
                                id='price' 
                                type='text' 
                                placeholder='Enter Price' 
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}   
                            ></input>
                        </div>
                        <div>
                            <label htmlFor='image'>Image</label>
                            <input 
                                id='image' 
                                type='text' 
                                placeholder='Enter Image' 
                                value={image}
                                onChange={(e) => setImage(e.target.value)}   
                            ></input>
                        </div>
                        <div>
                            <label htmlFor='category'>Category</label>
                            <input 
                                id='category' 
                                type='text' 
                                placeholder='Enter Category' 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}   
                            ></input>
                        </div>
                        <div>
                            <label htmlFor='brand'>Brand</label>
                            <input 
                                id='brand' 
                                type='text' 
                                placeholder='Enter Brand' 
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}   
                            ></input>
                        </div>
                        <div>
                            <label htmlFor='countInStock'>Count In Stock</label>
                            <input 
                                id='countInStock' 
                                type='text' 
                                placeholder='Enter Count In Stock' 
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}   
                            ></input>
                        </div>
                        <div>
                            <label htmlFor='description'>Description</label>
                            <textarea 
                                id='description'
                                row='3' 
                                type='text' 
                                placeholder='Enter Description' 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}   
                            ></textarea>
                        </div>
                        <div>
                            <label></label>
                            <button className='primary' type='submit'>Update</button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}
