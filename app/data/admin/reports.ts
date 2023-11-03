import apiclient from "@/app/utilities/createclient";

export const getUTMReport = async () => {
  try {
    const { data } = await apiclient.get(`/api/admin/reports/utm`);
    return data;
  } catch (error) {
    return null;
  }
};

export const getStateReport = async () => {
  try {
    const { data } = await apiclient.get(`/api/admin/reports/state`);
    return data;
  } catch (error) {
    return null;
  }
};

export const getDistrictReport = async (stateId) => {
  try {
    const { data } = await apiclient.get(
      `/api/admin/reports/district/${stateId}`
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
