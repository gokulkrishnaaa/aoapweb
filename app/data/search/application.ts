import apiclient from "@/app/utilities/createclient";

export async function searchApplication(input) {
  try {
    const { data } = await apiclient.post(`/api/search/application`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}
