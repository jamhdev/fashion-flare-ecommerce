import React from "react";

export default function ShopItem({ image, title, price, rating }) {
  return (
    <div className="flex h-full w-full flex-col justify-center p-4 transition-all hover:shadow-lg">
      <img
        src={image}
        alt={title}
        className="h-52 object-contain hover:cursor-pointer "
      />
      <p className="truncate font-poppins">{title}</p>

      <div className="flex justify-between truncate font-oswald">
        <div className="truncate text-xl">${price}</div>
        <div className="flex items-center">
          <div>{rating.rate}</div>
          <img
            src="./images/icons/star-icon.png"
            alt="*"
            className="w-6 object-contain"
          />
          <div>
            {"("}
            {rating.count}
            {")"}
          </div>
        </div>
      </div>
      <div className="relative flex justify-center">
        <img
          src="/images/icons/minus-icon.png"
          alt="Minus One"
          className="w-5 object-contain hover:scale-110 hover:cursor-pointer"
        />
        <img
          src="/images/icons/buy-icon.png"
          alt="Buy Now"
          className="w-10 object-contain hover:scale-110 hover:cursor-pointer"
        />
        <img
          src="/images/icons/plus-icon.png"
          alt="Plus One"
          className="w-5 object-contain hover:scale-110 hover:cursor-pointer"
        />
      </div>
      <p className="truncate"></p>
    </div>
  );
}
