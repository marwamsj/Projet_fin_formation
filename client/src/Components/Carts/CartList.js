import React, {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getAllCarts} from '../../JS/Actions/atelierCart';
import CartCart from './CartCart';
import Loading from '../../utils/loading/Loading';
import "./ContactCart.css";

function CartList() {
    const dispatch = useDispatch();
    const Cart = useSelector(state => state.atelierCart.contacts);
    const loadCarts = useSelector(state => state.atelierCart.loadCarts);

    useEffect(() => {
       dispatch(getAllCarts())
    }, [dispatch])
    return (
        <div className="cartes">
            {loadCarts? (
                <Loading/>):(Cart.map(el=>
                    <CartCart key={el._id} ContCart={el}/>))}
            
        </div>
    )
}

export default CartList
