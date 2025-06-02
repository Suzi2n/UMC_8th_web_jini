import { useEffect } from "react";

import {FaShoppingCart} from 'react-icons/fa';
import {useCartActions, useCartInfo} from '../hooks/useCartStore';

const Navbar = () => {
    const {amount, cartItems} = useCartInfo();
    const {calculateTotals} = useCartActions();

    useEffect(() => {
        calculateTotals();
    }, [cartItems, calculateTotals]);

    return (
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 className="text-3xl font-semibold">Jini</h1>
            <div className="flex items-center space-x-2">
                <FaShoppingCart />
                <span className="text-xl font-medium">{amount}</span>
            </div>
        </div>
    );

};
export default Navbar;