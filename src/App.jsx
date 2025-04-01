import React from "react";
import Home from "./components/Home";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 py-8 px-4 font-[poppins]">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">AI Image Enhancer</h1>
        <p className="text-lg text-gray-500">Upload Your Image and let AI Enhance to in seconds!</p>
      </div>
      <Home />
      <div className="text-lg text-gray-500 mt-6">
        Powered By AI & Muhammad Adnan
      </div>
    </div>
  );
}

export default App;
