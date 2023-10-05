import apiclient from "../utilities/createclient";

export default async function createCandidate(input) {
  console.log("callapi", input);

  const { data } = await apiclient.put("/api/candidate", input);
  return data;
}
