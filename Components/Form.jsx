import React, { useState } from "react";

export default ({ setCreateShipmentModel, createShipmentModel, createShipment }) => {
  const [shipment, setShipment] = useState({
    receiver: "",
    pickupTime: "",
    distance: "",
    price: ""
  });

  const createItem = async () => {
    try {
      await createShipment(shipment);
      alert(`Shipment done!\nReceiver: ${shipment.receiver}\nPickup Time: ${shipment.pickupTime}\nDistance: ${shipment.distance}\nPrice: ${shipment.price}`);
      // Reset shipment state after successful creation
      setShipment({
        receiver: "",
        pickupTime: "",
        distance: "",
        price: ""
      });
    } catch (error) {
      console.log("Error while creation:", error);
    }
  };

  return createShipmentModel ?  (
    <div className="flex inset-0 z-10 overflow-y-auto ">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setCreateShipmentModel(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setCreateShipmentModel(false)}
            >
              Close
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">Track Product, Create Product</h4>
            <p className="text-[15px] text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam, explicabo nemo delectus nostrum culpa adipisci dolores dolorem doloribus! Magnam, laborum.
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Receiver"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      receiver: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="date"
                  placeholder="PickUpTime"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      pickupTime: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="distance"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      distance: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="price"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <button
                onClick={() => createItem()}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-400 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                Create Transaction
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
