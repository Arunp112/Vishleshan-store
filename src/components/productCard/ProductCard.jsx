import React, { useContext, useEffect } from "react";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const ProductCard = () => {
  const context = useContext(myContext);
  const {
    mode,
    product,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
  } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="w-full mb-10 text-center">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Our Latest Collection
            </h1>
            <div className="h-1 w-24 bg-pink-600 rounded mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product
              .filter((obj) =>
                obj.title.toLowerCase().includes(searchkey.toLowerCase())
              )
              .filter((obj) =>
                obj.category.toLowerCase().includes(filterType.toLowerCase())
              )
              .filter((obj) =>
                obj.price
                  .toString()
                  .toLowerCase()
                  .includes(filterPrice.toLowerCase())
              )
              .map((item, index) => (
                <div key={index}>
                  <div
                    onClick={() =>
                      (window.location.href = `/productinfo/${item.id}`)
                    }
                    className="h-full flex flex-col justify-between border rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300 ease-in-out"
                    style={{
                      backgroundColor:
                        mode === "dark" ? "rgb(46 49 55)" : "",
                      color: mode === "dark" ? "white" : "",
                      borderColor: "rgba(229, 231, 235, 0.5)",
                      minHeight: "430px",
                      cursor: "pointer",
                    }}
                  >
                    <div className="h-60 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                      />
                    </div>

                    <div className="p-4 flex flex-col flex-grow justify-between">
                      <div className="space-y-2">
                        <h2 className="text-sm uppercase tracking-wide font-semibold text-pink-500">
                          {item.category}
                        </h2>
                        <h3 className="text-lg font-bold break-words">
                          {item.title}
                        </h3>
                        <p className="text-sm">₹{item.price}</p>
                      </div>

                      <div className="mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // prevent redirect
                            addCart(item);
                          }}
                          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 rounded-lg transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCard;
