import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCartContext } from "../Router";

export default function ItemPage() {
  const { itemId } = useParams();
  const [itemData, setItemData] = useState(null);
  const { addShoppingCartItem, removeShoppingCartItem, shoppingCart } =
    useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const itemInCart =
    itemData && shoppingCart.find((value) => value.id === itemData.id);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://fakestoreapi.com/products/${itemId}`, {
      signal: controller.signal,
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItemData(json);
      })
      .catch((err) => {
        console.error(err);
        navigate("/shop");
      });

    return () => controller.abort();
  }, [itemId, navigate]);

  return (
    <>
      {itemData === null ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <div className="m-auto flex max-w-4xl flex-col items-center justify-center font-oswald md:mt-10 md:flex-row">
          <div>
            <img
              src={itemData.image}
              alt="Item Image"
              className="max-h-80 max-w-xs p-2"
            />
          </div>
          <div className="flex flex-col p-2">
            <div className="text-center">{itemData.title}</div>
            <div className="flex flex-col items-center justify-center md:flex-row md:justify-around">
              <div className="flex items-center">
                <div>{itemData.rating.rate}</div>
                <img
                  src="/images/icons/star-icon.png"
                  alt="stars"
                  className="w-6 object-contain"
                />
                <div>
                  {"("}
                  {itemData.rating.count}
                  {")"}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <span>${itemData.price}</span>
                <button
                  className="m-2 rounded-3xl bg-orange-400 p-4 font-poppins transition-all hover:scale-110 hover:bg-orange-500"
                  onClick={() => {
                    if (!itemInCart) {
                      addShoppingCartItem(
                        itemData.id,
                        itemData.title,
                        itemData.price,
                        itemData.image
                      );
                    }
                  }}
                >
                  {itemInCart && itemInCart.quantity > 0 ? (
                    <div className="flex">
                      <img
                        src="/images/icons/minus-icon.png"
                        alt="Minus One"
                        className="w-5 object-contain transition-all hover:scale-110 hover:cursor-pointer"
                        onClick={() => {
                          removeShoppingCartItem(
                            itemData.id,
                            itemData.title,
                            itemData.price,
                            itemData.image
                          );
                        }}
                      />
                      <div className="m-1 mb-0 mt-0 font-oswald text-xl">
                        {itemInCart.quantity}
                      </div>
                      <img
                        src="/images/icons/plus-icon.png"
                        alt="Plus One"
                        className="w-5 object-contain transition-all hover:scale-110 hover:cursor-pointer"
                        onClick={() => {
                          addShoppingCartItem(
                            itemData.id,
                            itemData.title,
                            itemData.price,
                            itemData.image
                          );
                        }}
                      />
                    </div>
                  ) : (
                    <span>Add to cart</span>
                  )}
                </button>
              </div>
            </div>
            <p className="font-poppins">{itemData.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
