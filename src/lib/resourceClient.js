import api, { extractData } from './api.js';
import { toast } from 'sonner';

const handleRequest = async (promise, { successMessage, errorContext }) => {
  try {
    const response = await promise;
    if (successMessage) {
      toast.success(successMessage);
    }
    return extractData(response);
  } catch (error) {
    const message =
      error.response?.data?.message || `Unable to complete request for ${errorContext}.`;
    toast.error(`🚫 ${message}`);
    throw error;
  }
};

export const postResource = (endpoint, payload, successMessage = 'Created successfully.') =>
  handleRequest(api.post(endpoint, payload), { successMessage, errorContext: endpoint });

export const putResource = (endpoint, payload, successMessage = 'Updated successfully.') =>
  handleRequest(api.put(endpoint, payload), { successMessage, errorContext: endpoint });

export const patchResource = (endpoint, payload, successMessage = 'Updated successfully.') =>
  handleRequest(api.patch(endpoint, payload), { successMessage, errorContext: endpoint });

export const deleteResource = (endpoint, successMessage = 'Deleted successfully.') =>
  handleRequest(api.delete(endpoint), { successMessage, errorContext: endpoint });

export const uploadFormData = (endpoint, formData, successMessage = 'Uploaded successfully.') =>
  handleRequest(
    api.post(endpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
    { successMessage, errorContext: endpoint }
  );
