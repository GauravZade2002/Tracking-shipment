import { useEffect, useState } from "react";
import React from "react";
import Web3Modal from 'web3modal';
import { ethers } from "ethers";

import tracking from "./Tracking.json";
const ContactAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";
//                    0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0
//                    0x5FbDB2315678afecb367f032d93F642f64180aa3
//                    0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
const ContractABI=tracking.abi;

const fetchContract = (signerOrProvider)=>
   new ethers.Contract(ContactAddress,ContractABI,signerOrProvider);


export const TrackingContext = React.createContext();

export const TrackingProvider = ({children})=>{
    const DappName="product Tracking Dapp";
    const [ currentUser,SetCurrentUser]=useState("");

    const createShipment= async (items)=>{
        console.log(items);
        const {receiver,pickupTime,distance,price}=items;
        try{
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const createItem = await contract.createShipment(
                receiver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseUnits(price,18),
                {
                    value:ethers.utils.parseUnits(price,18),
                }
            );
            await createItem.wait();
            console.log("this is created item",createItem);
        }catch(error){
            console.error(error);
        }
    };

    const getAllShipment=async ()=>{
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const shipments = await contract.getAllTransactions();
            const allShipments = shipments.map((shipment)=>({
                sender:shipment.sender,
                receiver:shipment.receiver,
                price:ethers.utils.formatEther(shipment.price.toString()),
                pickupTime:shipment.pickupTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance:shipment.distance.toNumber(),
                isPaid:shipment.isPaid,
                staus:shipment.staus,

            }));
            return allShipments;


        } catch (error) {
            console.error(error)
        }
    }



    const getShipmentsCount=async()=>{
                 try {
                    if(!window.ethereum) return "install metamask";
                    const accounts=await window.ethereum.request({
                        method:"eth_accounts",

                    });
                    const provider = new  ethers.providers.JsonRpcProvider();
                    const contract=fetchContract(provider);
                    const shipmentsCount=await contract.getShipmentCount(accounts[0]);
                    return shipmentsCount.toNumber();

                 } catch (error) {
                    console.error(error);
                    console.log("error in the get shipmentsCount");
                    
                 }
    };

    const completeShipment= async (completeShip)=>{
        console.log(completeShip);
        const {receiver,index}=completeShip;
        try {
            if(!window.ethereum) return "Install metamask";
            const accounts = await window.ethereum.request({
                method:"eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const conection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(conection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.completeShipment(
                accounts[0],
                receiver,
                index,
                {
                    gasLimit:300000,
                }
            );
            transaction.wait();
            console.log(transaction);


        } catch (error) {
            console.log("wrong completeshipment",error);
        }

    };


    const getShipment = async (index)=>{
        console.log(index*1);
        try {
            
            if(!window.ethereum) return "Install metamask";
            const accounts = await window.ethereum.request({
                method:"eth_accounts",
            });
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipment = await contract.getShipment( accounts[0], index*1);

            const SingleShipment = {
                sender:shipment[0],
                receiver:shipment[1],
                pickupTime:shipment[2].toNumber(),
                deliveryTime:shipment[3].toNumber(),
                distance:shipment[4].toNumber(),
                price:ethers.utils.formatEther(shipment[5].toString()),
                staus:shipment[6],
                isPaid:shipment[7],

            };
            return SingleShipment;

        } catch (error) {
            console.log("sorry no shipment");
        }
    };


    const startShipment = async (getProduct)=>{
        const {receiver,index}=getProduct;

        try {
            if(!window.ethereum) return "Install metamask";
            const accounts = await window.ethereum.request({
                method:"eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const conection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(conection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const shipment = await contract.startShipment(
                accounts[0],
                receiver,
                index*1,
            );
            shipment.wait();
            console.log(shipment);

        } catch (error) {
            console.log("sorry no shipments",error);
            
        }
    };


    //---- chheck if wallet connected
    const checkIfWalletConnected= async ()=>{
        try {
            if(!window.ethereum) return "Install metamask";
            const accounts = await window.ethereum.request({
                method:"eth_accounts",
            });

            if(accounts.lenght){
                SetCurrentUser(accounts[0]);
            }else{
                return "No account";
            }


        } catch (error) {
            return "Not Connected";
        }
    };

    //---- connect wallet function
    const connectWallet=async()=>{
        try {
            if(!window.ethereum) return "Install metamask";
            const accounts=await window.ethereum.request({
                method:"eth_requestAccounts", 
            });
            SetCurrentUser(accounts[0]);

        } catch (error) {
            return "something went wrong";
        }
    };

    useEffect(()=>{
        checkIfWalletConnected();
    },[]);


    return (
        <TrackingContext.Provider
        value={{
            connectWallet,
            createShipment,
            getAllShipment,
            completeShipment,
            getShipment,
            startShipment,
            getShipmentsCount,
            DappName,
            currentUser,
        }}
        >
            {children}

        </TrackingContext.Provider>
    );



}