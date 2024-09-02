import { gapi } from 'gapi-script';

const CLIENT_ID = '317403214124-7iuifmkk8gr4v1b6bjcbr861j1q9hn92.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

const FILE_PREFIX = "LeaguesPlanner_"; // Prefix to identify OSRS Leagues plans
const FILE_TAG = "LeaguePlan"; // Tag to add to the file's properties

export const initClient = () => {
  return new Promise((resolve, reject) => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
        scope: SCOPES,
      })
        .then(() => {
          resolve(gapi);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

export const signIn = () => {
  return gapi.auth2.getAuthInstance().signIn();
};

export const signOut = () => {
  return gapi.auth2.getAuthInstance().signOut();
};

export const savePlanToDrive = async (planData, planName = "osrs-leagues-plan") => {
  const fileContent = JSON.stringify(planData);
  const file = new Blob([fileContent], { type: 'application/json' });
  const accessToken = gapi.auth.getToken().access_token;

  const fullPlanName = `${FILE_PREFIX}${planName}.json`;

  // Check if a file with the same name already exists
  const existingFile = await fetch(`https://www.googleapis.com/drive/v3/files?q=name='${fullPlanName}' and trashed=false`, {
    method: 'GET',
    headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
  })
    .then(response => response.json())
    .then((data) => {
      return data.files.length > 0 ? data.files[0] : null;
    })
    .catch(error => {
      console.error('Error checking existing plan:', error);
      throw error;
    });

  const metadata = {
    name: fullPlanName,
    mimeType: 'application/json',
    properties: {
      customTag: FILE_TAG, // Custom property to identify the plan
    },
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file);

  let url = 'https://www.googleapis.com/upload/drive/v3/files';
  let method = 'POST';

  if (existingFile) {
    // If the file exists, use PATCH to update it
    url += `/${existingFile.id}?uploadType=multipart`;
    method = 'PATCH';
  } else {
    // If the file does not exist, create a new one
    url += '?uploadType=multipart';
  }

  return fetch(url, {
    method: method,
    headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
    body: form,
  })
    .then(response => response.json())
    .then((response) => {
      console.log('Plan saved to Google Drive:', response);
      return response;
    })
    .catch(error => {
      console.error('Error saving plan:', error);
      throw error;
    });
};

export const listPlansFromDrive = () => {
    const accessToken = gapi.auth.getToken().access_token;
  
    return fetch(`https://www.googleapis.com/drive/v3/files?q=mimeType="application/json" and properties has { key='customTag' and value='${FILE_TAG}'} and trashed=false&fields=files(id,name)`, {
      method: 'GET',
      headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
    })
      .then(response => response.json())
      .then((response) => {
        const plans = response.files.map(file => ({
          ...file,
          name: file.name.replace(/^LeaguesPlanner_/, '') // Remove the prefix from the file name
        }));
        console.log('Plans found:', plans);
        return plans;
      })
      .catch(error => {
        console.error('Error fetching plans:', error);
        throw error;
      });
  };

export const loadPlanFromDrive = (fileId) => {
  const accessToken = gapi.auth.getToken().access_token;

  return fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    method: 'GET',
    headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
  })
    .then(response => response.json())
    .then((planData) => {
      console.log('Plan loaded:', planData);
      return planData;
    })
    .catch(error => {
      console.error('Error loading plan:', error);
      throw error;
    });
};
