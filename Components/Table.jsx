import { Indexed } from "ethers/lib/utils";

export default ({ setCreateShipmentModel, allShipmentsdata }) => {
  const convertTime = (time) => {
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat("en-us", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);
    return dataTime;
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Create Tracking
          </h3>
          <p className=" text-gray-600 mt-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
            aliquam perspiciatis recusandae veniam excepturi consequuntur
            consectetur nihil molestias odio necessitatibus?
          </p>
        </div>
        <div className="mt-3 md:mt-0 ">
          <p
            onClick={() => setCreateShipmentModel(true)}
            href="#"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-900 md:text-sm rounded-lg md:inline-flex"
          >
            Add Tracking
          </p>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Sender</th>
              <th className="py-3 px-6">Receiver</th>
              <th className="py-3 px-6">PickUpTime</th>
              <th className="py-3 px-6">Distance</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Delivery Time</th>
              <th className="py-3 px-6">Paid</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {allShipmentsdata?.map((shipment, index) => (
              <tr key={index}>
                <td>{shipment.distance}</td>
                <td>{shipment.pickupTime}</td>
                <td>{shipment.price}</td>
                <td>{shipment.receiver}</td>
             
                {/* <td>{shipment.receiver.slice(0, 15)}...</td>
                <td>{convertTime(shipment.pickupTime)}</td>
                <td>{shipment.distance} Km</td>
                <td>{shipment.price}</td>
                <td>{convertTime(shipment.deliveryTime)}</td>
                <td>{shipment.isPaid ? "completed" : "not complete"}</td> */}
                <td>
                  {shipment.status === 0
                    ? "pending"
                    : shipment.status === 1
                      ? "IN_TRANSIT"
                      : "DELIVERED"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
