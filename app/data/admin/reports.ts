import apiclient from "@/app/utilities/createclient";

export const getUTMReport = async () => {
  try {
    const { data } = await apiclient.get(`/api/admin/reports/utm`);
    return data;
  } catch (error) {
    return null;
  }
};
