import apiclient from "@/app/utilities/createclient";

export const getCandidateById = async (id) => {
  try {
    const { data } = await apiclient.get(`/api/candidate/${id}`);
    return data;
  } catch (error) {
    return null;
  }
};

export const getCandidateParentById = async (id) => {
  try {
    const { data } = await apiclient.get(`/api/candidate/parent/${id}`);
    return data;
  } catch (error) {
    return null;
  }
};
