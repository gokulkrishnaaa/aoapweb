import apiclient from "../utilities/createclient";

export async function getOpenExams() {
  try {
    const { data } = await apiclient.get("/api/exam/open");
    return data;
  } catch (error) {
    return null;
  }
}

export async function getEntrances() {
  try {
    const { data } = await apiclient.get("/api/entrance");
    return data;
  } catch (error) {
    return null;
  }
}

export async function getExamsByEntrance(entranceId) {
  try {
    const { data } = await apiclient.get(`/api/exam/${entranceId}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}
