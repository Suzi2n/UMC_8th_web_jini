import type { Lp } from "../types/cart";
import { useCartActions } from "../hooks/useCartStore";

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
  const { increase, decrease, removeItem } = useCartActions();

  const handleIncreaseAmount = () => {
    increase(lp.id);
  };

  const handleDecreaseAmount = () => {
    if (lp.amount === 1) {
      removeItem(lp.id);
      return;
    }
    decrease(lp.id);
  };

  return (
    <div className="flex items-center p border-b border-gray-200">
      <img
        src={lp.img}
        alt={lp.title}
        className="w-20 h-20 object-cover rounded mr-4"
      />
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{lp.title}</h3>
        <p className="text-sm text-gray-600">{lp.singer}</p>
        <p className="text-md font-bold text-gray-800">${lp.price}</p>
      </div>
      <div className="flex items-center">
         <button
          onClick={handleDecreaseAmount}
          className="px-3 py-1 bg-gray-300 text-gray-800 rounded-r hover:bg-gray-400 cursor-pointer"
        >
          -
        </button>
        <span className="px-4 py-[3px] border-t border-gray-300">
          {lp.amount}
        </span>
        <button
          onClick={handleIncreaseAmount}
          className="px-3 py-1 bg-gray-300 text-gray-800 rounded-r hover:bg-gray-400 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
