import apiclient from "@/app/utilities/createclient";

export const getUTMReport = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/admin/reports/utm`, input);
    return data;
  } catch (error) {
    return null;
  }
};

export const getExamCityReport = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/admin/reports/examcity`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const getStateReport = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/admin/reports/state`, input);
    return data;
  } catch (error) {
    return null;
  }
};

export const getDistrictReport = async (stateId, input) => {
  try {
    const { data } = await apiclient.post(
      `/api/admin/reports/district/${stateId}`,
      input
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const getExamRegistered = async () => {
  try {
    const { data } = await apiclient.get(`/api/admin/reports/examregistered`);
    return data;
  } catch (error) {
    return null;
  }
};

export const getReferer = async () => {
  try {
    const { data } = await apiclient.get(`/api/admin/reports/referer`);
    return data;
  } catch (error) {
    return null;
  }
};
