import { useState } from "react";

function ChatUI() {
  const usernames = ["skywalker23", "codeCrusader"];

  const [currentUser, setCurrentUser] = useState("Select a User");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function handleSetUser(currentUserName) {
    setCurrentUser((c) => currentUserName);
  }

  function handleMessage() {
    setMessages((m) => [...m, message]);
    setMessage("");
  }
  return (
    <>
      <section className="w-full h-screen  p-3 md:p-20 flex justify-center">
        <div className="w-full max-w-5xl bg-white/30 rounded-2xl  shadow-2xl relative">
          <div className="w-full p-5 bg-white/80 sticky top-0 rounded-t-2xl">
            <p className="font-bold">Chat Me</p>
          </div>

          <div className="flex h-[85vh] md:h-[calc(80vh-70px)] p-3 ">
            <div className="w-full  max-w-sm md:max-w-xs overflow-y-scroll scrollbar-hidden">
              <ul className="md:pr-3 ">
                {usernames.map((username, index) => (
                  <li
                    className="rounded-2xl my-1 p-2 bg-gray-300 uppercase flex gap-2 items-center shadow-sm cursor-pointer hover:bg-gray-400"
                    key={index}
                    onClick={() => handleSetUser(username)}
                  >
                    <img
                      className="rounded-full"
                      src="https://placehold.co/30x30/000000/FFF"
                      alt=""
                    />
                    {username}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-1 h-full border-l border-white/30 hidden md:block"></div>

            <div className="hidden md:flex flex-col w-full pl-2 h-full">
              <div className="p-3 bg-white w-full rounded-md flex gap-2 items-center uppercase">
                <img
                  className="rounded-full"
                  src="https://placehold.co/30x30/000000/FFF"
                  alt=""
                />
                {currentUser}
              </div>

              <div className="h-[50vh] w-full py-2 relative overflow-y-auto scrollbar-hidden">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`relative my-1 px-5 py-2 w-full max-w-xs  ${
                      index % 2 == 0
                        ? "mr-auto bg-blue-100 rounded-r-2xl rounded-t-2xl"
                        : "ml-auto bg-green-100 rounded-l-2xl rounded-t-2xl"
                    }`}
                  >
                    {message}

                    <div
                      className={`absolute  -bottom-1 ${
                        index % 2 == 0 ? "-left-1" : "-right-1"
                      }`}
                    >
                      <div
                        className={`size-5  ${
                          index % 2 == 0
                            ? "bg-blue-100  rounded-br-full rounded-tl-full"
                            : " bg-green-100  rounded-tr-full rounded-bl-full"
                        }`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 mt-auto flex gap-2">
                <input
                  type="text"
                  value={message}
                  className="rounded-md ring-1 ring-white/60 w-full py-3 px-3 text-white focus:outline-none"
                  placeholder="Send a message..."
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div
                  className="size-12 ring-1 ring-white/80 rounded-full flex justify-center items-center cursor-pointer"
                  onClick={handleMessage}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-white/80"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default ChatUI;
