import axios from "axios";
const baseURL = import.meta.env.VITE_APP_BASE_URL;
const AuidoURL = import.meta.env.VITE_APP_BASE_URL_VOICE;

export const getPrompt = async prompt => {
  try {
    const response = await axios.get(`${baseURL}/${prompt}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAudio = async prompt => {
  try {
    const response = await fetch(`${AuidoURL}/${prompt}-us.mp3`);

    const blob = await response.blob();
    return blob;
  } catch (error) {
    throw error;
  }
};
