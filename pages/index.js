import React,{useState,useEffect,useContext} from "react";
import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment} from "../Components/index";

import {TrackingContext} from "../Conetxt/TrackingContext";

const index=()=>{
  const{
    currentUser,
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,

  }=useContext(TrackingContext);
 
 
  //STATE VARIABLES
  const[createShipmentModel,setCreateShipmentModel]=useState(false);
  const[openProfile,setOpenProfile]=useState(false);
  const[startModal,setStartModal]=useState(false);
  const[completeModal,setCompleteModal]=useState(false);
  const[getModal,setGetModal]=useState(false);

  // DATA STATE VARIABLE

  const [getAllShipmentsdata,setgetAllShipmentsdata]=useState();
   
  useEffect(()=>{
    const getCampaignsData= getAllShipment();

    return async () =>{
      const allData = await getCampaignsData;
      setgetAllShipmentsdata(allData);
    };
  },[]);
  
  return (
    <>
    <Services
        setOpenProfile={setOpenProfile}
        setCompleteModal={setCompleteModal}
        setGetModal={setGetModal}
        setStartModal={setStartModal}
    />
    <Table
        setCreateShipmentModel={setCreateShipmentModel}
        getAllShipmentsdata={getAllShipmentsdata}
    />
    <Form
        createShipmentModel={createShipmentModel}
        createShipment={createShipment}
        setCreateShipmentModel={setCreateShipmentModel}
    />

    <Profile
    openProfile={openProfile}
    setOpenProfile={setOpenProfile}
    currentUser={currentUser}
    getShipmentsCoun={getShipmentsCount}
    
    />
    <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
    />

    <GetShipment
        getModal={getModal}
        setGetModal={setGetModal}
        getShipment={getShipment}

    />
    <StartShipment
     startModal={startModal}
     setStartModal={setStartModal}
     startShipment={startShipment}

    />


    </>
  );

};
export default index;