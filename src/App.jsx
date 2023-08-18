import { useEffect, useState } from "react";
import cartItems from "./data";
import { FaCartPlus, FaAngleUp, FaAngleDown } from "react-icons/fa";
import Goods from "./Goods";
import { useGlobalContext } from "./context";

function App() {
  const { isLoading, isError, goods, clearCart } = useGlobalContext();
  let [totalCost, setTotalCost] = useState(0);
  let [totalAmount, setTottotalAmount] = useState(0);

  if (isLoading) {
    return (
      <main>
        <div className="loading"></div>
      </main>
    );
  }
  if (isError) {
    return (
      <main>
        <h1>Error...</h1>
      </main>
    );
  }
  if (goods.length === 0) {
    return (
      <main>
        <div className="nav-center">
          <div className="nav-heading">
            <h4 className="nav-title">UseReducer</h4>
            <div className="cart-container">
              <div className="cart">
                <FaCartPlus />
              </div>
              <div className="cart-unit">{goods.length}</div>
            </div>
          </div>
        </div>
        <section className="hero">
          <h2 className="hero-heading">your bag</h2>
          <p>is currently empty</p>
        </section>
      </main>
    );
  }
  return (
    <main>
      <div className="nav-center">
        <div className="nav-heading">
          <h4 className="nav-title">UseReducer</h4>
          <div className="cart-container">
            <div className="cart">
              <FaCartPlus />
            </div>
            <div className="cart-unit">{totalAmount}</div>
          </div>
        </div>
      </div>
      <section className="hero">
        <h2 className="hero-heading">your bag</h2>
        {goods.map((item) => {
          const { amount, id, img, price, title } = item;
          return (
            <Goods
              {...item}
              key={id}
              goods={goods}
              totalCost={totalCost}
              setTotalCost={setTotalCost}
              totalAmount={totalAmount}
              setTotalAmount={setTottotalAmount}
            />
          );
        })}
        <div className="underline"></div>
        <div className="total">
          <div className="total-heading">total</div>
          <div className="total-price">${totalCost}</div>
        </div>
        <button className="clear-btn" onClick={clearCart}>
          clear cart
        </button>
      </section>
    </main>
  );
}

export default App;
