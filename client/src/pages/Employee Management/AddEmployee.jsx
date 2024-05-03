import React, { useEffect, useState } from "react";
import profImg from "../../assets/profImg.png";
import SideBar from "../../components/SideBar";
import bgImg from "../../assets/bgImg.png";
import logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import notify from "../../components/toasts/toastTemplate";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import axios from "axios";
import { ToastContainer } from "react-toastify";

function AddUsers() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    age: 0,
    telephone: "",
    nic: "",
    image:
      "https://firebasestorage.googleapis.com/v0/b/lsfs-1a314.appspot.com/o/7922268.png?alt=media&token=68706582-ebbf-4d7d-99ae-d633ee38e70f",
    attendance: false,
  });

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);
      setLoading(true);
      notify("info", "", "Uploading image...");
      try {
        const snapshot = await fileRef.put(selectedFile);
        const url = await snapshot.ref.getDownloadURL();
        setFormData({ ...formData, image: url });
        notify("success", "", "Image uploaded successfully");
        navigate("/user-pool");
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      console.log("No file selected");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/employee/addEmployee/", //add endpoint
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      notify("success", "", "New employee added successfully");
      navigate("/employee-pool");
    } catch (error) {
      console.error("Error adding employee:", error);
      notify("error", "", "Failed to add new employee");
    }
  };

  return (
    <div
      className="inline-flex flex-col items-start min-h-screen w-screen bg-cover bg-center bg-no-repeat bg-fixed "
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
      }}
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-row m-2">
          <div className="flex-col">
            <SideBar />
          </div>
          <div className="p-4 mt-3  w-full ">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold ">Employee Details</h1>
              <img src={logo} className="w-24 h-12 mr-5" alt="" />
            </div>
            <hr />
            <div className="flex flex-col  justify-center w-full">
              <div className="mx-auto mt-5">
                <img
                  src={formData.image}
                  alt="profile"
                  className=" w-32  h-32 bg-slate-800 rounded-full hover:scale-105 duration-500 ease-in-out transform mb-2"
                />
                <p className="flex flex-row justify-center font-semibold pb-5">
                  Kelly Parker
                </p>
              </div>
              <form className="mx-auto" onSubmit={handleSubmit}>
                <h1 className="font-bold text-xl mb-2">Account Information</h1>
                <div className="flex flex-row mb-5">
                  <div className="mr-5 w-full">
                    <p className="font-semibold">Full Name</p>
                    <input
                      type="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-white  p-2 rounded-xl w-96 border" // Adjusted width
                    />
                  </div>
                  <div className="mr-5 ">
                    <p className="font-semibold">Email</p>
                    <input
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      type="text"
                      className="bg-white  p-2 rounded-xl w-96 border" // Adjusted width
                    />
                  </div>
                </div>
                <div className="flex flex-row mb-5">
                  <div className="mr-5 ">
                    <p className="font-semibold">Role</p>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="bg-white  p-2 rounded-xl w-96 border" // Adjusted width
                    />
                  </div>
                  <div className="mr-5 w-full">
                    <p className="font-semibold">Age</p>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      className="bg-white  p-2 rounded-xl w-96 border" // Adjusted width
                    />
                  </div>
                </div>
                <div className="flex flex-row mb-5">
                  <div className="mr-5 ">
                    <p className="font-semibold">Telephone</p>
                    <input
                      value={formData.telephone}
                      onChange={(e) =>
                        setFormData({ ...formData, telephone: e.target.value })
                      }
                      type="tel"
                      className="bg-white  p-2 rounded-xl w-96 border" // Adjusted width
                    />
                  </div>
                  <div className="mr-5 w-full">
                    <p className="font-semibold">NIC</p>
                    <input
                      type="text"
                      value={formData.nic}
                      onChange={(e) =>
                        setFormData({ ...formData, nic: e.target.value })
                      }
                      className="bg-white  p-2 rounded-xl w-96 border" // Adjusted width
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="outline-none border-2 border-gray-100 rounded-lg p-1 w-fit mt-2"
                  />
                </div>
                <button
                  className="p-3 bg-green-800 rounded-xl text-white font-bold mr-5 mt-5 mb-10 hover:bg-green-700"
                  type="submit"
                >
                  <span
                    className="icon-[ic--twotone-system-security-update-good] mr-2"
                    style={{ width: "20px", height: "20px" }}
                  />{" "}
                  Add User
                </button>
              </form>
              <div className="flex flex-row justify-end w-auto mr-96">
                <Link to="/user-pool">
                  <button className="p-3 bg-white rounded-xl text-black border font-bold mr-5 mt-5 mb-10 hover:bg-slate-100">
                    <span
                      className="icon-[ic--twotone-system-security-update-good] mr-2"
                      style={{ width: "20px", height: "20px" }}
                    />{" "}
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddUsers;
