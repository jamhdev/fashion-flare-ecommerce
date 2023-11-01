import currency from "currency.js";

export const addShoppingCartItem = (
  id,
  title,
  price,
  image,
  shoppingCart,
  setShoppingCart
) => {
  const isItemExists = shoppingCart.some((item) => item.id === id);
  if (isItemExists) {
    setShoppingCart((prev) => {
      return prev.map((cartItem) => {
        if (cartItem.id === id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
    });
  } else {
    setShoppingCart((prev) => {
      const newState = [
        ...prev,
        { id: id, title: title, price: price, image: image, quantity: 1 },
      ];
      return newState;
    });
  }
};

export const removeShoppingCartItem = (
  id,
  title,
  price,
  image,
  shoppingCart,
  setShoppingCart
) => {
  const isItemExists = shoppingCart.some((item) => item.id === id);
  if (isItemExists) {
    setShoppingCart((prev) => {
      return prev
        .map((cartItem) => {
          if (cartItem.id === id) {
            if (cartItem.quantity === 1) {
              return null; // Return null to filter out later
            }
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        })
        .filter(Boolean); // Filter out null values
    });
  }
};

export const deleteAllOfSpecificItem = (id, shoppingCart, setShoppingCart) => {
  setShoppingCart((prev) => prev.filter((item) => item.id !== id));
};

export const calculateSubTotal = (shoppingCart) => {
  let total = currency(0);
  shoppingCart.forEach((value) => {
    total = total.add(value.price * value.quantity);
  });
  return total.value;
};
