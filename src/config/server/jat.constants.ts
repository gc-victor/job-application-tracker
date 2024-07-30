// JAT API
export const JAT_API = "/api/jat";
export const JAT_API_JOB_APPLICATION_DOCUMENT_FN = (uuid: string, name: string) => `${JAT_API}/${uuid}/document/${name}`;
