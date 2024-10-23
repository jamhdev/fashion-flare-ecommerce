import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContextProvider";

export default function Home() {
  const { handleNavTabChange } = useContext(AppContext);
  const starSvg = (key) => {
    return (
      <svg
        key={key}
        xmlns="http://www.w3.org/2000/svg"
        className="size-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  };

  return (
    <>
      <section className="bg-primaryBackground">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Define Your Style,
              <strong className="font-extrabold text-indigo-700 sm:block">
                Redefine Fashion.
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block w-full rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring active:bg-indigo-500 sm:w-auto"
                to={"/shop"}
                onClick={() => {
                  handleNavTabChange("shop");
                }}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-primaryBackground">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Read Trusted Reviews from Our Customers
          </h2>

          <div className="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
            {/* Review 1 */}
            <div className="mb-8 sm:break-inside-avoid">
              <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-4">
                  <img
                    alt="Emma Thompson"
                    src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80"
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <div>
                    <div className="flex justify-center gap-0.5 text-indigo-500">
                      {[...Array(5)].map((_, index) => starSvg(index))}
                    </div>

                    <p className="mt-0.5 text-lg font-medium text-gray-900">
                      Emma Thompson
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-gray-700">
                  "I recently purchased a stunning necklace from your store, and
                  I couldn't be happier! The craftsmanship is impeccable, and it
                  perfectly complements my outfits. Shipping was swift, and
                  customer service was very helpful."
                </p>
              </blockquote>
            </div>

            {/* Review 2 */}
            <div className="mb-8 sm:break-inside-avoid">
              <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-4">
                  <img
                    alt="Liam Smith"
                    src="https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80"
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <div>
                    <div className="flex justify-center gap-0.5 text-indigo-500">
                      {/* Star Icons */}
                      {[...Array(5)].map((_, index) => starSvg(index))}
                    </div>

                    <p className="mt-0.5 text-lg font-medium text-gray-900">
                      Liam Smith
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-gray-700">
                  "The clothing selection is fantastic! I found the perfect
                  summer dress that fits beautifully and is incredibly
                  comfortable. The fabrics are high-quality, and the variety
                  ensures there's something for everyone. Highly recommend!"
                </p>
              </blockquote>
            </div>

            {/* Review 3 */}
            <div className="mb-8 sm:break-inside-avoid">
              <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-4">
                  <img
                    alt="Sophia Martinez"
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80"
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <div>
                    <div className="flex justify-center gap-0.5 text-indigo-500">
                      {/* Star Icons */}
                      {[...Array(5)].map((_, index) => starSvg(index))}
                    </div>

                    <p className="mt-0.5 text-lg font-medium text-gray-900">
                      Alex Martinez
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-gray-700">
                  "I've been searching for unique jewelry pieces, and this store
                  delivered beyond my expectations. The necklaces are exquisite,
                  and the craftsmanship is evident in every detail. Customer
                  support was also very helpful in assisting me with my
                  choices."
                </p>
              </blockquote>
            </div>

            {/* Review 4 */}
            <div className="mb-8 sm:break-inside-avoid">
              <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-4">
                  <img
                    alt="Noah Brown"
                    src="https://plus.unsplash.com/premium_photo-1682096252599-e8536cd97d2b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <div>
                    <div className="flex justify-center gap-0.5 text-indigo-500">
                      {/* Star Icons */}
                      {[...Array(5)].map((_, index) => starSvg(index))}
                    </div>

                    <p className="mt-0.5 text-lg font-medium text-gray-900">
                      Noah Brown
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-gray-700">
                  "The customer service here is exceptional! I needed help
                  selecting the perfect bracelet for a gift, and the team was
                  incredibly helpful and knowledgeable. The bracelet arrived
                  beautifully packaged and was a hit with the recipient. I'll
                  definitely return for more jewelry."
                </p>
              </blockquote>
            </div>

            {/* Review 5 */}
            <div className="mb-8 sm:break-inside-avoid">
              <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-4">
                  <img
                    alt="Olivia Davis"
                    src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80"
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <div>
                    <div className="flex justify-center gap-0.5 text-indigo-500">
                      {/* Star Icons */}
                      {[...Array(5)].map((_, index) => starSvg(index))}
                    </div>

                    <p className="mt-0.5 text-lg font-medium text-gray-900">
                      Olivia Davis
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-gray-700">
                  "The customer service here is exceptional! I needed help
                  selecting the perfect bracelet for a gift, and the team was
                  incredibly helpful and knowledgeable. The bracelet arrived
                  beautifully packaged and was a hit with the recipient. I'll
                  definitely return for more jewelry."
                </p>
              </blockquote>
            </div>

            {/* Review 6 */}
            <div className="mb-8 sm:break-inside-avoid">
              <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-4">
                  <img
                    alt="Ethan Wilson"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80"
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <div>
                    <div className="flex justify-center gap-0.5 text-indigo-500">
                      {/* Star Icons */}
                      {[...Array(5)].map((_, index) => starSvg(index))}
                    </div>

                    <p className="mt-0.5 text-lg font-medium text-gray-900">
                      Ethan Wilson
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-gray-700">
                  "Fantastic selection of men's apparel! I ordered a tailored
                  blazer and a pair of slim-fit jeans, and both items exceeded
                  my expectations. The fit is perfect, and the materials feel
                  premium. The detailed product descriptions made it easy to
                  choose the right sizes. Will definitely return for more."
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
