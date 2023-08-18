import React, { useEffect, useState } from "react";
import { FaCartPlus, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Goods = ({
  amount,
  id,
  img,
  price,
  title,
  goods,
  totalCost,
  setTotalCost,
  totalAmount,
  setTotalAmount,
}) => {
  const { removeItem } = useGlobalContext();
  price = parseFloat(price);
  const [count, setCount] = useState(amount);

  //   let clickIncrease = () => {
  //     setCount(count + 1);
  //   };
  amount = count;
  let handleIncrease = (id) => {
    let increase = goods.find((item) => {
      return item.id == id;
    });

    setCount((increase.amount += 1));
  };
  let handleDecrease = (id) => {
    let increase = goods.find((item) => {
      return item.id == id;
    });
    setCount((increase.amount -= 1));
    if (count == 1) {
      removeItem(id);
    }
  };

  totalCost = goods.reduce((acc, curr) => {
    acc += curr.price * curr.amount;
    return Math.round((acc + Number.EPSILON) * 100) / 100; // Math.round((num + Number.EPSILON) * 100) / 100 will round-off my value to 2dp
  }, 0);
  totalAmount = goods.reduce((acc, curr) => {
    acc += curr.amount;
    return acc; // Math.round((num + Number.EPSILON) * 100) / 100 will round-off my value to 2dp
  }, 0);
  //   console.log(totalAmount);

  useEffect(() => {
    setTotalCost(totalCost);
    setTotalAmount(totalAmount);
  }, [totalCost]); //To resolve the warning(Cannot update a component while rendering a different component), I wrap the logic that updates the state(totalCost) in the useEffect hook.

  return (
    <article className="cart-item" key={id}>
      <div className="item-header">
        <img src={img} alt={title} className="item-img" />
        <div className="item-details">
          <h4 className="item-name">{title}</h4>
          <p className="item-price">
            ${Math.round((price * count + Number.EPSILON) * 100) / 100}
          </p>
          <button className="remove-btn" onClick={() => removeItem(id)}>
            remove
          </button>
        </div>
      </div>
      <div>
        <button className="amount-btn" onClick={() => handleIncrease(id)}>
          <FaAngleUp />
        </button>
        <div className="amount">{count}</div>
        <button className="amount-btn" onClick={() => handleDecrease(id)}>
          <FaAngleDown />
        </button>
      </div>
    </article>
  );
};

export default Goods;
