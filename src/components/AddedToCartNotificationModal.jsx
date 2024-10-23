export default function AddedToCartNotificationModal({ image }) {
  return (
    <>
      <div className="fixed left-1/2 top-10 z-50 -translate-x-1/2 transform bg-white">
        <div className="relative rounded-lg border border-gray-200 shadow-lg">
          <div className="flex items-center gap-4 p-4">
            <img
              alt=""
              src={image}
              className="max-h-10 rounded-lg object-cover"
            />

            <div>
              <p className="line-clamp-1 text-lg text-gray-500">
                Item added to cart!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
