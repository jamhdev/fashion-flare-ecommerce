import React, { useEffect, useState } from "react";
import ShopItem from "../components/ShopItem";

export default function Shop() {
  const [shopItems, setShopItems] = useState([]);
  const [mensFilterToggle, setMensFilterToggle] = useState(false);
  const [womansFilterToggle, setWomansFilterToggle] = useState(false);
  const [jewelryFilterToggle, setJewelryFilterToggle] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        let defaultState = json.filter((item) => {
          if (item.category === "men's clothing") return true;
          if (item.category === "women's clothing") return true;
          if (item.category === "jewelery") return true;
          return false;
        });
        setShopItems(defaultState);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredItems = shopItems.filter((item) => {
    if (!mensFilterToggle && !womansFilterToggle && !jewelryFilterToggle)
      return true;
    if (mensFilterToggle && item.category === "men's clothing") return true;
    if (womansFilterToggle && item.category === "women's clothing") return true;
    if (jewelryFilterToggle && item.category === "jewelery") return true;
    return false;
  });

  const filteredShopItems =
    filteredItems.length < 1 ? (
      <h1>loading...</h1>
    ) : (
      filteredItems.map((item, index) => <ShopItem key={index} {...item} />)
    );

  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center justify-center gap-2 font-poppins">
          <label>
            <input
              type="checkbox"
              checked={mensFilterToggle}
              onChange={() => setMensFilterToggle((prev) => !prev)}
            />
            <span className="pl-1">Mens</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={womansFilterToggle}
              onChange={() => setWomansFilterToggle((prev) => !prev)}
            />
            <span className="pl-1">Women</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={jewelryFilterToggle}
              onChange={() => setJewelryFilterToggle((prev) => !prev)}
            />
            <span className="pl-1">Jewelry</span>
          </label>
        </div>

        <div className="grid min-h-screen max-w-2xl grid-cols-2 items-center justify-items-center gap-2 bg-white sm:m-auto md:grid-cols-3 lg:max-w-6xl lg:grid-cols-4 ">
          {filteredShopItems}
        </div>
      </div>
    </>
  );
}
