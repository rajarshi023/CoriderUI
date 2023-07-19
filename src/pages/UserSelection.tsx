import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const UserSelectionPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);

  useEffect(() => {
    fetchChatData();
  }, []);

  let fetchChatData = () => {
    fetch("https://qa.corider.in/assignment/chat?page=0")
      .then((response) => response.json())
      .then((data: ChatData) => {
        const uniqueUserIds = Array.from(
          new Set(data.chats.map((chat) => chat.sender.user_id))
        );
        setUserIds(uniqueUserIds);
        setChats(data.chats); // Save all chats in state for future reference
      })
      .catch((error) => {
        console.error("Error fetching chat data:", error);
      });
  };

  const handleUserSelection = (userId: string) => {
    navigate(`/chat/${userId}`);
  };

  const getChatByUserId = (userId: string) => {
    return chats.find((chat) => chat.sender.user_id === userId);
  };
  const sortedUserIds = userIds.sort((a, b) => {
    const chatA = getChatByUserId(a)!; // Use non-null assertion operator
    const chatB = getChatByUserId(b)!; // Use non-null assertion operator
    return chatA.sender.user_id.localeCompare(chatB.sender.user_id) || 0;
  });

  return (
    <div className="w-full text-left font-Mulish h-[100vh] bg-[#FAF9F4] p-4 pt-4 flex flex-col justify-between scrollbar-none">
      <div className="scrollbar-none">
        <h1 className="text-2xl font-extrabold">Select a User</h1>
        <div className="flex flex-col overflow-scroll scrollbar-none justify-center ">
          {sortedUserIds.map((userId) => {
            const chat = getChatByUserId(userId);
            if (!chat) return null; // Skip rendering if chat not found
            return (
              <div
                key={userId}
                className="bg-white text-black p-4 rounded-xl shadow-md  items-center w-auto gap-2 m-2 flex cursor-pointer"
                onClick={() => handleUserSelection(userId)}
              >
                <img
                  src={chat.sender.image}
                  alt="User"
                  className="w-16 h-16 rounded-full"
                />
                <span className="text-lg">id:</span>
                <p className="hover:underline font-medium text-xs">
                  {chat.sender.user_id}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserSelectionPage;
