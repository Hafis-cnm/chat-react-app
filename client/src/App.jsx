import ChatUI from "./components/ChatUI";
import bg from "./assets/img.png";

const App = () => {
  return (
    <>
      <div
        className="bg-no-repeat bg-center bg-black"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <ChatUI />
      </div>
    </>
  );
};
export default App;
