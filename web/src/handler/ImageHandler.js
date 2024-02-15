import React from 'react'

const ImageHandler = () => {
    const convertImageURL = (url) => {
      if (process.env.REACT_APP_API_NODE_ENV === 'development')
            return url;
        else
          return url.replace(
            "localhost:5000",
            "workers-hive-backend.onrender.com"
          );
    }
    return { convertImageURL };
}

export default ImageHandler