import React, { useState } from "react";

import { useToggle } from "./context/ToggleThemeContext";
import { useFont } from "./context/FontContext";
const DictionarySearchOutput = ({ data }) => {
  const [audioSrc, setAudioSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { toggle } = useToggle();
  const { font } = useFont();

  const handleClickPlay = async item => {
    try {
      const audioUrl = item?.phonetics[1]?.audio;
      if (!audioUrl) {
        console.error("Audio URL is not available.");
        return;
      }
      const audio = new Audio(audioUrl);
      audio.play();
      audio.addEventListener("ended", handleAudioEnded);
      setAudioSrc(audioUrl);
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  if (!data || data.length === 0) {
    return <InitialPrompt />;
  }

  const list = data[0];
  const hasAudio = list?.phonetics[1]?.audio;
  return (
    <>
      <section
        className={` pb-10 px-2  w-full   text-[14px] mt-10 ${font} ${
          toggle ? "text-[#2d2d2d]" : "text-white"
        }`}
      >
        <section className="flex justify-between  max-xs:flex-wrap items-center px-1 py-4 max-lg:w-full  ">
          <div className="w-fit ">
            <p className="  capitalize  text-6xl  font-bold">{list?.word}</p>
            <p className="text-[#a445ed]  text-3xl mt-2">
              {list?.phonetics[0]?.text}
            </p>
          </div>
          {hasAudio ? (
            isPlaying ? (
              <img
                src="/icon-pause.svg"
                className="text-5xl cursor-pointer"
                onClick={() => handleClickPlay(list)}
                alt=""
              />
            ) : (
              <img
                src="/icon-play.svg"
                className="text-5xl  cursor-pointer"
                onClick={() => handleClickPlay(list)}
                alt=""
              />
            )
          ) : null}

          {hasAudio && (
            <audio id={list?.word} onEnded={handleAudioEnded}>
              <source src={list.phonetics[0].audio} type="audio/mp3" />
            </audio>
          )}
        </section>
        <span className="flex items-center justify-center gap-3 mt-5">
          <i className="font-bold text-2xl">
            {list?.meanings[0]?.partOfSpeech}
          </i>
          <div className="w-full border border-[#3a3a3a8a] mt-1"></div>
        </span>
        <br />
        <span className=" text-[#75756a] font-medium text-lg">Meaning </span>
        <section className={`h-auto  my-3  ${font} `}>
          <ul className=" flex flex-col gap-2 ml-10  custom-list ">
            {list?.meanings[0]?.definitions?.map((list, index) => {
              return (
                <>
                  <li key={index} className=" flex items-center ">
                    <span className="line-clamp-2 ml-2 text-[15px]">
                      {list?.definition}
                    </span>{" "}
                  </li>

                  {list?.example ? (
                    <blockquote className="text-[#677575] ml-10">
                      "{list.example}"
                    </blockquote>
                  ) : null}
                </>
              );
            })}
          </ul>
        </section>
        {list?.meanings[0]?.synonyms && list.meanings[0].synonyms.length > 0 ? (
          <section className="flex gap-5 mt-5 items-center">
            <span className=" text-[#75756a] font-medium text-lg">
              Synonyms{" "}
            </span>
            <span className="text-[#a445ed] font-bold">
              {list.meanings[0].synonyms.join(" ")}
            </span>
          </section>
        ) : null}
        {list?.meanings[1]?.partOfSpeech.length > 0 ? (
          <span className="flex items-center justify-center gap-3 mt-5">
            <i className="font-bold text-2xl">
              {list?.meanings[1]?.partOfSpeech}
            </i>
            <div className="w-full border border-[#3a3a3a8a] mt-1"></div>
          </span>
        ) : null}
        <section className="h-auto  my-2 ">
          <ul className="flex flex-col gap-2 ml-10 custom-list">
            {list?.meanings[1]?.definitions &&
            list.meanings[1].definitions.length > 0
              ? list.meanings[1].definitions.map((item, index) => (
                  <React.Fragment key={index}>
                    <li className="flex items-center">
                      <span className="line-clamp-2 ml-2 text-[15px]">
                        {item.definition}
                      </span>{" "}
                    </li>
                    {item.example ? (
                      <blockquote className="text-[#677575] ml-10">
                        "{item.example}"
                      </blockquote>
                    ) : null}
                  </React.Fragment>
                ))
              : null}
          </ul>
        </section>
        {list?.meanings[1]?.synonyms && list.meanings[1].synonyms.length > 0 ? (
          <section className="flex items-center gap-5 mt-5">
            <span className=" text-[#75756a] font-medium text-lg">
              Synonyms{" "}
            </span>
            <span className="text-[#a445ed] font-bold">
              {list.meanings[1].synonyms.join(" ")}
            </span>
          </section>
        ) : null}
        <div className="w-full border border-[#3a3a3a8a] mt-5"></div>
        <div className="flex max-sm:flex-wrap gap-3 mt-2">
          Source:{" "}
          <a href={list?.sourceUrls} target="_blank" className="underline">
            {list?.sourceUrls}
          </a>
          <img src="/icon-new-window.svg" alt="" />
        </div>
      </section>
    </>
  );
};

export default DictionarySearchOutput;

const InitialPrompt = () => {
  return (
    <section className="flex flex-col items-center justify-center h-[500px]">
      <img src="/Education.svg" alt="loading" />
      <p className="mt-4 text-[#75756a] font-medium text-lg text-center">
        Welcome! Please search for something or type in the input fields to get
        started.
      </p>
    </section>
  );
};
