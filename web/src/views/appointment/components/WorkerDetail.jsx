import React from 'react'
import ImageHandler from '../../../handler/ImageHandler';

const WorkerDetail = ({ appointmentState }) => {
  const { convertImageURL } = ImageHandler();

  return (
    <div className="w-full lg:w-[300px] mt-4 lg:mt-0">
      <div className="">
        <h3 className="text-lg font-semibold mb-2 text-center">
          Worker Details
        </h3>
        <div className="flex flex-col bg-gray-100 p-4">
          <div className="min-w-[100px] flex justify-center overflow-hidden">
            {appointmentState?.workerData?.photo ? (
              <img
                alt="Employee_image"
                src={convertImageURL(appointmentState?.workerData?.photo)}
                className="h-[60px] w-[60px] object-cover rounded-full"
              />
            ) : (
              <div className="flex items-center justify-center bg-gray-200 rounded-full h-full w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-blue-500 text-md font-semibold">
              {appointmentState?.workerData?.name}
            </h3>
            <p className="text-gray-600 text-xs">
              {appointmentState?.workerData?.description}
            </p>
            {/* Add more worker details as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetail