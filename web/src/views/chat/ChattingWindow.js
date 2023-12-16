import React, { useState } from "react";
import { CiChat1 } from "react-icons/ci";

const ChattingWindow = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <button>
        <CiChat1 className="text-xl" />
      </button>
    </div>
  );
};

export default ChattingWindow;
