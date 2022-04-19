import axios from "../../api/axios";

export const fetchLaunchPads = async () => {
  try {
    const res = await axios.get("/launchpads");
    return res;
  } catch (err) {
    //not 200 response range
    console.log(err);
  }
};
