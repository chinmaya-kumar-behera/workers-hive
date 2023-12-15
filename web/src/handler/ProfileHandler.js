import React from 'react'
import { getUserDetailsService } from '../services/profileService';

const ProfileHandler = () => {

    const getUserUserDetailsHandler = async(id) => {
        return getUserDetailsService(id);
    }
  return { getUserUserDetailsHandler };
}

export default ProfileHandler