import React, { useEffect, useState } from "react";
import PageContainer from "../components/shared/PageContainer";
import Navbar from "../views/Navbar";
import ProfileHandler from "../handler/ProfileHandler";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AuthState } from "../atom/authState";
import { MdAddToPhotos } from "react-icons/md";
import EditProfilePicModal from "../views/profile/EditProfilePicModal";
import EditPersonalDetailModal from "../views/profile/EditPersonalDetailModal";
import EditWorkingDetailModal from "../views/profile/EditWorkingDetailModal";
import { FaRegUser } from "react-icons/fa";
import { PhotoState } from "../atom/photoState";
import ChatHandler from "../handler/ChatHandler";
import { ChatWindow } from "../atom/chatState";
import ImageHandler from "../handler/ImageHandler";

const ProfilePage = () => {
  const { getUserUserDetailsHandler } = ProfileHandler();
  const { createChatHandler } = ChatHandler();
  const { convertImageURL } = ImageHandler();
  const { id } = useParams();
  const [userData, setUserData] = useState();
  const [editWorkingDetailModal, setEditWorkingDetailModal] = useState(false);
  const [editprofilePicModal, setEditProfilePicModal] = useState(false);
  const [editPersonalDetails, setEditPersonalDetails] = useState(false);

  const setPhotoModal = useSetRecoilState(PhotoState);

  const authData = useRecoilValue(AuthState);

  const [isExpanded, setIsExpanded] = useRecoilState(ChatWindow);

  const toggleChatWindow = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    getUserUserDetailsHandler(id)
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const startConvHandler = () => {
    createChatHandler({ users: [authData._id, userData._id] })
      .then((res) => {
        console.log(res);
        toggleChatWindow();
      })
      .catch((err) => console.log(err));
  };  

  return (
    <div>
      <Navbar />
      <PageContainer className="mt-2 rounded relative">
        <div className="bg-gray-100">
          <div className="container mx-auto p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
              <div className="w-full md:w-3/12 md:mx-2">
                <div className="bg-white p-3 border-t-4 border-green-400">
                  <div className=" overflow-hidden flex justify-center ">
                    <div className="relative h-[100px] w-[100px]">
                      <img
                        className="mx-auto h-[100px] w-[100px] bg-red-100 rounded-full overflow-hidden object-cover object-center"
                        src={userData?.photo && convertImageURL(userData.photo)}
                        alt="profileImage"
                      />
                      {userData?.id === authData?._id && (
                        <div className="absolute top-[70px] -translate-y-[10px] right-0 ">
                          <button
                            className="p-1.5 rounded-full bg-gray-800"
                            onClick={() => setEditProfilePicModal(true)}
                          >
                            <MdAddToPhotos className="text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 text-center">
                    {userData?.name}
                  </h1>
                  <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li className="flex items-center py-3">
                      <span>Status</span>
                      <span className="ml-auto">
                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                          Active
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span>Member since</span>
                      <span className="ml-auto">
                        {userData?.createdAt &&
                          new Date(userData.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                    {authData._id !== id && (
                      <li className="py-3">
                        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition-all">
                          Book An Appointment
                        </button>
                      </li>
                    )}
                  </ul>
                  <div className="py-3 flex justify-center">
                    <button
                      className="w-md px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition-all"
                      onClick={startConvHandler}
                    >
                      Start Conversation
                    </button>
                  </div>
                </div>
                {authData._id !== id && (
                  <div className="bg-white p-3 hover:shadow mt-4">
                    <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                      <span className="text-green-500">
                        <svg
                          className="h-5 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </span>
                      <span>Similar Profiles</span>
                    </div>
                    {/* <div className="grid grid-cols-3">
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16 rounded-full mx-auto"
                        src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        Kojstantin
                      </a>
                    </div>
                  </div> */}
                  </div>
                )}
              </div>

              {/* // Personal details section */}
              <div className="w-full md:w-9/12 mx-2 h-64">
                <div className="bg-white p-3 shadow-sm rounded-sm">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="text-green-500 bg-gray-100 p-2 rounded-full">
                      <FaRegUser />
                    </span>
                    <span className="tracking-wide">Personal Details</span>
                  </div>

                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          First name
                        </div>
                        <div className="px-4 py-2">
                          {userData?.name && userData?.name?.split(" ")[0]}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Last Name</div>
                        <div className="px-4 py-2">
                          {userData?.name && userData.name.split(" ")[1]}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Email.</div>
                        <div className="px-4 py-2">
                          <a
                            className="text-blue-800"
                            href="mailto:jane@example.com"
                          >
                            {userData?.email}
                          </a>
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Gender</div>
                        <div className="px-4 py-2">
                          {userData?.gender && userData.gender}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Contact No.
                        </div>
                        <div className="px-4 py-2">{userData?.phone}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Current Address
                        </div>
                        <div className="px-4 py-2">
                          {userData?.address?.city && userData.address.city},{" "}
                          {userData?.address?.country &&
                            userData.address.country}
                        </div>
                      </div>
                    </div>
                  </div>

                  {authData?._id === id && (
                    <div className="w-full flex justify-between mt-3">
                      <button
                        className="px-10 py-1 rounded-lg text-xs bg-gray-200 text-blue-700 transition-all"
                        onClick={() => setEditPersonalDetails(true)}
                      >
                        Edit Personal Details
                      </button>
                    </div>
                  )}
                </div>

                <div className="my-4"></div>

                {/* // Working Details */}
                <div className="bg-white p-3 shadow-sm rounded-sm">
                  {userData?.role === "worker" || userData?.role === "admin" ? (
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-5">
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                          <span className="text-green-500 bg-gray-100 p-2 rounded-full">
                            <svg
                              className="h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </span>
                          <span className="tracking-wide">Working Details</span>
                        </div>
                        <div className="relative bg-gray-100 text-gray-600 py-2 px-3 mt-3 divide-y rounded shadow-sm">
                          <div className="flex items-center py-3">
                            <h2>{userData?.category?.heading}</h2>
                          </div>
                          <div className="absolute -top-0 -translate-y-1/2 left-5 px-4 py-1 rounded-md text-white bg-blue-500">
                            <h5 className="text-xs font-semibold">Category</h5>
                          </div>
                        </div>

                        <div className="relative bg-gray-100 text-gray-600 py-2 px-3 mt-3 divide-y rounded shadow-sm">
                          <div className="flex items-center py-3">
                            <h2>{userData?.subCategory?.heading}</h2>
                          </div>
                          <div className="absolute -top-0 -translate-y-1/2 left-5 px-4 py-1 rounded-md text-white bg-blue-500">
                            <h5 className="text-xs font-semibold">
                              Sub Category
                            </h5>
                          </div>
                        </div>

                        <div className="relative bg-gray-100 text-gray-600  py-2 px-3 mt-3 divide-y rounded shadow-sm">
                          <div className="flex items-center py-3">
                            <h2>{userData?.description}</h2>
                          </div>
                          <div className="absolute -top-0 -translate-y-1/2 left-5 px-4 py-1 rounded-md text-white bg-blue-500">
                            <h5 className="text-xs font-semibold">
                              Description
                            </h5>
                          </div>
                        </div>

                        {authData?._id === id && (
                          <div className="w-full">
                            <button
                              className="px-10 py-1 rounded-lg text-xs bg-gray-200 text-blue-700 transition-all"
                              onClick={() => setEditWorkingDetailModal(true)}
                            >
                              Edit Working Details
                            </button>
                          </div>
                        )}
                      </div>

                      {/* // Working photos */}
                      <div>
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                          <span className="tracking-wide">Photos</span>
                        </div>
                        {userData.workingPhotos?.length > 0 ? (
                          <div className="h-28 w-44 flex flex-wrap gap-5 overflow-hidden">
                            {userData?.workingPhotos?.map((value, index) => (
                              <div
                                className=""
                                key={index}
                                onClick={() =>
                                  setPhotoModal({ isOpen: true, photo: value })
                                }
                              >
                                <img
                                  key={index}
                                  src={convertImageURL(value)}
                                  alt="working_photo"
                                  className="object-cover object-center h-28 w-44 rounded-md hover:scale-105 transition-all duration-500 shadow-md"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm py-2 text-red-400">
                            Hasn't provided any photos !
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold">Working Details</h2>
                      <p> You can't access the working details fields.</p>{" "}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {editWorkingDetailModal && (
          <EditWorkingDetailModal
            isOpen={editWorkingDetailModal}
            onClose={() => setEditWorkingDetailModal(false)}
          />
        )}
        {editprofilePicModal && (
          <EditProfilePicModal
            isOpen={editprofilePicModal}
            onClose={() => setEditProfilePicModal(false)}
          />
        )}
        {editPersonalDetails && (
          <EditPersonalDetailModal
            isOpen={editPersonalDetails}
            onClose={() => setEditPersonalDetails(false)}
          />
        )}
      </PageContainer>
    </div>
  );
};

export default ProfilePage;
