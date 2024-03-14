import axios from "axios";

export const getPrompt = async prompt => {
  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${prompt}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAudio = async prompt => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/media/pronunciations/en/${prompt}-us.mp3`
    );

    const blob = await response.blob();
    return blob;
  } catch (error) {
    throw error;
  }
};
