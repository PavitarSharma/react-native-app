import axios from "axios";

export const getPlacesData = async (type) => {
  const options = {
    method: "GET",
    url: `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
    params: {
      limit: "30",
      currency: "USD",
      lunit: "km",
      lang: "en_US",
    },
    headers: {
      "X-RapidAPI-Key": "fbdf02c5b5msh09eb5fcb04cadf3p1d7172jsn0265e479754e",
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data.data
  } catch (error) {
    console.error(error);
    return null;
  }
};
