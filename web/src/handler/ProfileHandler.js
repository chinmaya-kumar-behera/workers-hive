import React from 'react'
import { getUserDetailsService, updateProfileDetailService } from '../services/profileService';

const ProfileHandler = () => {

    const getUserUserDetailsHandler = async(id) => {
        return getUserDetailsService(id);
  }
  
  const updateProfileDetailHandler = async (data) => {
    return await updateProfileDetailService(data);
    
  }
  return { getUserUserDetailsHandler, updateProfileDetailHandler };
}

export default ProfileHandler