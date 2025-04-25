import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import Loader from "../../components/loader/Loader";

const Order = () => {
  const userid = JSON.parse(localStorage.getItem("user")).user.uid;
  const context = useContext(myContext);
  const { mode, loading, order } = context;

  const userOrders = order.filter((obj) => obj.userid === userid);

  return (
    <Layout>
      {loading && <Loader />}
      <div
        className="min-h-screen py-10 px-4 sm:px-10"
        style={{ backgroundColor: mode === "dark" ? "#121212" : "#f3f4f6" }}
      >
        <h1
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: mode === "dark" ? "white" : "#111827" }}
        >
          Your Orders
        </h1>

        {userOrders.length > 0 ? (
          userOrders.map((orderItem, orderIndex) => (
            <div
              key={orderIndex}
              className="mb-10 rounded-lg shadow-lg p-6"
              style={{
                backgroundColor: mode === "dark" ? "#1f2937" : "white",
                color: mode === "dark" ? "white" : "#111827",
              }}
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold">
                  Order #{orderIndex + 1}
                </h2>
                {orderItem?.addressInfo?.date && (
                  <p className="text-sm text-gray-400">
                    {orderItem.addressInfo.date}
                  </p>
                )}
              </div>

              {orderItem.cartItems.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center gap-4 py-4 border-b last:border-none border-gray-200"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-between flex-grow">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <span className="mt-2 font-bold text-pink-600">
                      ₹ {item.price}
                    </span>
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <h4 className="font-semibold">Shipping Details</h4>
                <p className="text-sm text-gray-400">
                  {orderItem?.addressInfo?.name},{" "}
                  {orderItem?.addressInfo?.address}
                </p>
                <p className="text-sm text-gray-400">
                  Phone: {orderItem?.addressInfo?.phoneNumber}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-20">
            <h2
              className="text-xl font-semibold"
              style={{ color: mode === "dark" ? "white" : "#1f2937" }}
            >
              You have no orders yet.
            </h2>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Order;
