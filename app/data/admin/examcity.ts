import apiclient from "@/app/utilities/createclient";

export const addCityForEntrance = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/master/examcity`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const updateCityForEntrance = async ({ id, input }) => {
  try {
    const { data } = await apiclient.put(`/api/master/examcity/${id}`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const removeCityForEntrance = async (id) => {
  try {
    const { data } = await apiclient.delete(`/api/master/examcity/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
