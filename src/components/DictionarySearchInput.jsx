import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getPrompt } from "./Api/Prompt";
import DictionarySearchOutput from "./DictionarySearchOutput";
import { useToggle } from "./context/ToggleThemeContext";
import { useFont } from "./context/FontContext";
import DropdownFont from "./dropdown/DropdownFont";

const DictionarySearchInput = () => {
  const [dictionaryOutput, setDictionaryOutput] = useState(null);
  const { toggle, handleToggleTheme } = useToggle();
  const [loading, setLoading] = useState(false);
  const { font } = useFont();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    try {
      setLoading(true);
      const userInput = data.userInput;
      const response = await getPrompt(userInput);
      setDictionaryOutput(response);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  const handleBackgroundColor = () => {
    const body = document.querySelector("body");
    body.style.backgroundColor = toggle ? "#ffffff" : "#050505";
  };

  useEffect(() => {
    handleBackgroundColor();
  }, [toggle]);

  return (
    <>
      {loading && <section className="loader"></section>}
      <section
        className={`flex items-center w-full    justify-center ${font} `}
      >
        <section className="lg:w-[700px] h-full mt-14 px-5 py-3 max-lg:w-full  text-white ">
          <section className="flex items-center justify-between mb-5 max-sm:px-3  ">
            <img src="/logo.svg" alt="" className="h-10" />
            <section className="text-lg flex items-center justify-center divide-x gap-2">
              <DropdownFont />
              <section className="flex items-center gap-3">
                <div
                  className={`w-10 h-5 ml-5 relative  rounded-full ${
                    toggle ? "bg-[#757575]" : "bg-[#a445ed]"
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full mt-[2px] ml-[1px] bg-white cursor-pointer ${
                      toggle
                        ? "transition-all duration-300 ease-in-out"
                        : "translate-x-5  transition-all duration-300 ease-in-out "
                    }`}
                    onClick={() => handleToggleTheme()}
                  />
                </div>
                <img
                  src={toggle ? "/icon-moon.svg" : " /icon-moon-purple.svg"}
                  alt=""
                  className="h-4"
                />
              </section>
            </section>
          </section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="relative">
              <input
                type="search"
                onKeyPress={handleKeyPress}
                placeholder="Search for any word..."
                className={`w-full h-16 mt-5  font-bold placeholder:text-lg text-2xl  capitalize  transition-all duration-300 ease-in-out  placeholder:text-[#757571] ${
                  toggle
                    ? "bg-[#f4f4f4] text-[#2d2d2d] transition-all duration-300 ease-in-out "
                    : "bg-[#1f1f1f] text-white "
                } pl-5  p-2 focus:outline-none rounded-2xl`}
                {...register("userInput", { required: true })}
              />{" "}
              <img
                src="/icon-search.svg"
                className="absolute top-10 right-5 h-5"
                alt=""
              />{" "}
              {errors["user-input"] && (
                <span className="text-red-500">This field is required</span>
              )}
            </section>
          </form>
          <DictionarySearchOutput data={dictionaryOutput} loading={loading} />
        </section>
      </section>
    </>
  );
};

export default DictionarySearchInput;
