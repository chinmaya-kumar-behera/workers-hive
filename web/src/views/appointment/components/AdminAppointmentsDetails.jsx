import React from 'react'

const AdminAppointmentsDetails = ({totalAppointments, pendingAppointments, resolvedAppointments ,cancelledAppointments}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="w-full max-w-[150px] flex items-center justify-center text-blue-400 border border-blue-400  rounded-lg">
        <div className="text-center px-5 py-3">
          <h2 className="text-3xl font-bold">{totalAppointments}</h2>
          <h4 className="text-sm max-w-full truncate">Total Appointments</h4>
        </div>
      </div>
      <div className="w-full max-w-[150px] flex items-center justify-center text-orange-400 border border-orange-400  rounded-lg">
        <div className="text-center px-5 py-3">
          <h2 className="text-3xl font-bold">{pendingAppointments}</h2>
          <h4 className="text-sm max-w-full truncate">Pending Appointments</h4>
        </div>
      </div>

      <div className="w-full max-w-[150px] flex items-center justify-center text-red-400 border border-red-400  rounded-lg">
        <div className="text-center px-5 py-3">
          <h2 className="text-3xl font-bold">{cancelledAppointments}</h2>
          <h4 className="text-sm max-w-full truncate">
            Cancelled Appointments
          </h4>
        </div>
      </div>
      <div className="w-full max-w-[150px] flex items-center justify-center text-green-500 border border-green-500  rounded-lg">
        <div className="text-center px-5 py-3">
          <h2 className="text-3xl font-bold">{resolvedAppointments}</h2>
          <h4 className="text-sm max-w-full truncate">
            Resolved Appointments
          </h4>
        </div>
      </div>
    </div>
  );
}

export default AdminAppointmentsDetails