import apiclient from "../utilities/createclient";

export async function getCampus() {
  try {
    const { data } = await apiclient.get("/api/master/campus/");
    return data;
  } catch (error) {
    return null;
  }
}
