import apiclient from "../utilities/createclient";

export async function getExamCities(entranceid) {
  try {
    const { data } = await apiclient.get(`api/master/examcity/${entranceid}`);
    return data;
  } catch (error) {
    return null;
  }
}

export async function getProgrammesByApplication(applicationId) {
  try {
    const { data } = await apiclient.get(
      `/api/application/${applicationId}/programme`
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function addProgrammeToApplication(applicationId, programmeId) {
  try {
    const { data } = await apiclient.post(
      `/api/application/${applicationId}/programme`,
      {
        programmeId,
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function removeProgrammeFromApplication(
  applicationId,
  programmeId
) {
  try {
    const { data } = await apiclient.delete(
      `/api/application/${applicationId}/programme/${programmeId}`
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function updateApplicationJeeStatus(applicationId, jee) {
  try {
    const { data } = await apiclient.post(
      `/api/application/${applicationId}/jee`,
      {
        jee,
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function getApplicationJeeStatus(applicationId) {
  try {
    const { data } = await apiclient.get(
      `/api/application/${applicationId}/jee`
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function getCityByApplication(applicationId) {
  try {
    const { data } = await apiclient.get(
      `/api/application/${applicationId}/city`
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function removeCityFromApplication(applicationId, examCityId) {
  try {
    const { data } = await apiclient.delete(
      `/api/application/${applicationId}/city/${examCityId}`
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function addCityToApplication(applicationId, examcityId) {
  try {
    const { data } = await apiclient.post(
      `/api/application/${applicationId}/city`,
      {
        examcityId,
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function getApplicationByExam({ examid }) {
  try {
    const { data } = await apiclient.get(`/api/application/exam/${examid}`);
    return data;
  } catch (error) {
    return null;
  }
}
