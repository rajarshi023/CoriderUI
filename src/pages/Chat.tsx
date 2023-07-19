import React from "react";
import Popup from "reactjs-popup";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";


interface Chat {
  id: string;
  message: string;
  sender: {
    image: string;
    is_kyc_verified: boolean;
    self: boolean;
    user_id: string;
  };
  time: string;
}

interface ChatData {
  chats: Chat[];
  from: string;
  message: string;
  name: string;
  status: string;
  to: string;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Chat: React.FC<{}> = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const { userId } = useParams<{ userId: string }>();



  useEffect(() => {
    fetchChatData();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let fetchChat = () => {
    fetch("https://qa.corider.in/assignment/chat?page=0")
      .then((response) => response.json())
      .then((data: Chat) => {
        updateTime(data.time);
      })
      .catch((error) => {
        console.error("Error fetching chat data:", error);
      });
  };
  const updateTime = (time: string) => {
    const timeElement = document.getElementById("time");
    if (timeElement) {
      timeElement.textContent = time;
    }
  };

  let fetchChatData = () => {
    fetch("https://qa.corider.in/assignment/chat?page=0")
      .then((response) => response.json())
      .then((data: ChatData) => {
        setChats(data.chats);
      })
      .catch((error) => {
        console.error("Error fetching chat data:", error);
      });
  };

  const filteredChats = userId
    ? chats.filter((chat) => chat.sender.user_id === userId)
    : chats;

  return (
    <div className="w-full text-left font-Mulish h-[100vh] bg-[#FAF9F4] p-4 pt-4 flex flex-col justify-between">
      <div id="header" className="z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
          <img src={process.env.PUBLIC_URL + '/icons/icon.png'} className="w-[14px] mr-4" alt="back button" />
            </Link>
            <p className="text-[24px] font-bold">Trip 1</p>
          </div>
          <img src={process.env.PUBLIC_URL + '/icons/edit-05.png'} className="w-5" alt="" />
        </div>
        <div className="flex justify-between border-b-[1px] items-center mt-2 pb-3">
          <div className="flex items-center">
          <img src={process.env.PUBLIC_URL + '/icons/groupPFP.png'} className="w-[48px] mr-4 cursor-pointer" alt="" />
            
            <div>
              <p className="font-medium text-[16px]">
                From{" "}
                <span className="font-bold text-[18px]">IGI Airport, T3</span>
              </p>
              <p className="font-medium text-[16px]m ">
                To <span className="font-bold text-[18px]">Sector 28</span>
              </p>
            </div>
          </div>
          <Popup
            trigger={
              <div className="cursor-pointer ">
                <img src={process.env.PUBLIC_URL + '/icons/threeDots.png'} className=" h-[16px] mr-2" alt="" />
              </div>
            }
            position="bottom right"
          >
            <div className="w-[156px] bg-white h-[137px] rounded-xl shadow-lg">
              <div className="p-3 flex items-center border-b-[1px]">
              <img src={process.env.PUBLIC_URL + '/icons/person.png'} className="mr-3 w-[20px]" alt="" />
                <p className="font-semibold text-[14px]">Members</p>
              </div>
              <div className="p-3 flex items-center border-b-[1px]">
              <img src={process.env.PUBLIC_URL + '/icons/phone.png'} className="mr-3 w-[20px]" alt="" />
                <p className="font-semibold text-[14px]">Share Number</p>
              </div>
              <div className="p-3 flex items-center">
              <img src={process.env.PUBLIC_URL + '/icons/cancel.png'} className="mr-3 w-[20px]" alt="" />
                <p className="font-semibold text-[14px]">Report</p>
              </div>
            </div>
          </Popup>
        </div>
      </div>
      <div id="chat" className="h-full relative z-0 ">
        <div className="bottom-0 absolute h-[100%] overflow-scroll scrollbar-none w-full">
          <div className="w-full"></div>
          {/* Message */}
          <div>
            {filteredChats.map((chat) => (
              <div>
                <div className="w-full flex items-center justify-center gap-2 mt-3">
                  <div className="w-full flex flex-grow h-[1px] bg-[#B7B7B7]"></div>
                  <p id="time" className="text-[14px] text-[#B7B7B7] text-center w-[500px]">
                    {chat.time}
                  </p>
                  <div className="w-full h-[1px] bg-[#B7B7B7]"></div>
                </div>
                <div className="flex items-start mt-3" key={chat.id}>
                  <img
                    src={chat.sender.image}
                    className=" mr-2 w-6 rounded-full"
                    alt=""
                  />
                  <p className="bg-white rounded-lg text-[#606060] rounded-tl-none shadow-md p-2 text-[14px] mr-16">
                    {chat.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute right-2">
            <div className="flex items-start mt-8">
              <p className="bg-[#1C63D5] text-white rounded-lg rounded-tr-none shadow-md p-2 text-[14px] ml-16">
                Connect with fellow travelers, share the ride and save money
                Connect with fellow travelers, share the ride and save money
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="input" className=" flex w-full justify-center items-center mb-8">
        <div className="bg-white w-full flex p-2 justify-between rounded-lg mt-7">
          <form action="" className="flex w-full p-1 px-2">
            <input
              className="text-[14px]  focus:
              outline-none w-full placeholder:text-[#B7B7B7] font"
              placeholder="Reply to @Rohit Yadav"
            />
            <div className="flex items-center">
              <Popup
                className="my-popup"
                trigger={
                    <img src={process.env.PUBLIC_URL + '/icons/link.png'} className="cursor-pointer w-[20px] mr-3" alt="" />
                }
                position="top center"
              >
                <div className="rounded-full px-5 justify-between flex bg-[#008000] w-[124px] items-center h-[44px]">
                  <img src={process.env.PUBLIC_URL + '/icons/camera-02.png'} className="w-5" alt="" />
                  <img src={process.env.PUBLIC_URL + '/icons/video.png'} className="w-5" alt="" />
                  <img src={process.env.PUBLIC_URL + '/icons/document.png'} className="w-5" alt="" />
                </div>
              </Popup>
              <button>
              <img src={process.env.PUBLIC_URL + '/icons/send-03.png'} className="w-[20px] mr-1" alt="" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
