import { useState } from "react";
import { prueba } from "./services/peticiones";
import Header from "./components/header";
import TablaIngredientes from "./components/search";
import toast, { Toaster } from "react-hot-toast";
import { InfinitySpin } from "react-loader-spinner";

function App() {
  const [loader, setLoader] = useState(false);
  return (
    <div>
      {loader && (
        <div className="fixed bg-black bg-opacity-90 w-full h-screen flex justify-center items-center z-10">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      )}
      <Toaster />
      <Header />
      <TablaIngredientes setLoader={setLoader} />
    </div>
  );
}

export default App;
