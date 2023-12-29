import React from "react";
import Skeleton from "../../../components/ui/Skeleton";
import ChatName from "./ChatName";

const ChatList = ({ chatNotFound, data }) => {
  return (
    <div className="space-y-0">
      {data.length < 1 && chatNotFound ? (
        <div className="mx-auto">
          {Array.from({ length: 6 }, (_, index) => index + 1).map(
            (value, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Skeleton className={"min-w-[50px] h-[50px] rounded-full"} />
                <Skeleton className={"rounded-3xl w-full h-[50px]"} />
              </div>
            )
          )}
        </div>
      ) : (
        data.map((value, index) => <ChatName key={index} data={value} />)
      )}
    </div>
  );
};

export default ChatList;
