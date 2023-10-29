import React, { useEffect, useState } from "react";
import ShopItem from "../components/ShopItem";

export default function Shop() {
  const [shopItems, setShopItems] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    fetch("https://fakestoreapi.com/products", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json) => setShopItems(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="grid min-h-screen max-w-2xl grid-cols-2 items-center justify-items-center gap-2 bg-white sm:m-auto md:grid-cols-3 lg:max-w-6xl lg:grid-cols-4 ">
        {shopItems.length < 1 ? (
          <h1>Loading...</h1>
        ) : (
          shopItems.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <ShopItem {...item} />
              </React.Fragment>
            );
          })
        )}
      </div>
      ;
    </>
  );
}
