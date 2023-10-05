import apiclient from "../utilities/createclient";

export async function getOpenExams() {
  try {
    const { data } = await apiclient.get("/api/exam/open");
    return data;
  } catch (error) {
    return null;
  }
}
