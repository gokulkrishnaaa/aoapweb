import apiclient from "../utilities/createclient";

export async function getProgrammesByEntrance(entranceId, q, campusid) {
  try {
    const { data } = await apiclient.get(
      `api/master/entrance/${entranceId}/programme?campusid=${campusid}&q=${q}`
    );
    return data;
  } catch (error) {
    return null;
  }
}
