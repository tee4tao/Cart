import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [goods, setGoods] = useState("");
  //   let [count, setCount] = useState(1);
  const url = "https://www.course-api.com/react-useReducer-cart-project";
  const fetchPhones = async () => {
    try {
      let resp = await fetch(url);
      if (resp.status >= 200 && resp.status <= 299) {
        let data = await resp.json();
        setGoods(data);
        setIsLoading(false);
        setIsError(false);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };
  useEffect(() => {
    fetchPhones();
  }, []);
  const removeItem = (id) => {
    let newGoods = goods.filter((item) => {
      return item.id !== id;
    });
    setGoods(newGoods);
  };
  const clearCart = () => {
    setGoods([]);
  };
  return (
    <AppContext.Provider
      value={{
        isError,
        isLoading,
        goods,
        setIsError,
        setIsLoading,
        setGoods,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
