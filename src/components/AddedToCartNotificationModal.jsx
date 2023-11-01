export default function AddedToCartNotificationModal({ image }) {
  return (
    <>
      <div className="fixed left-1/2 top-10 -translate-x-1/2 transform">
        <div className="z-10 m-auto flex animate-alertOnceBounce items-center justify-center rounded-3xl bg-green-300 p-4">
          <img src={image} alt="Item Image" className="max-h-10" />
          <div className="pl-2">added to cart!</div>
        </div>
      </div>
    </>
  );
}
