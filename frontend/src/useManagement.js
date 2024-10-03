import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
} from "@tanstack/react-query";
import { useDataStore, getEntityStore } from "./store";

const apiRequest = async (method, url, nonce, data = null) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...(nonce && { "X-WP-Nonce": nonce }),
    };

    const config = {
      headers,
      withCredentials: Boolean(nonce),
    };

    const response = await axios({ method, url, data, ...config });
    return response.data;
  } catch (error) {
    console.error(`Error during ${method.toUpperCase()} request:`, error);
    throw new Error(`Failed to ${method} ${url}`);
  }
};

// Create API URL based on subPath provided
const createApiUrl = (homeUrl, entityName, subPath = "") => {
  return `${homeUrl}/wp-json/tnl-b2b/v1/${entityName}${subPath ? `/${subPath}` : ""}`;
};

// Generic query hook
const useGenericQuery = (queryKey, queryFn, enabled = true) =>
  useQuery({
    queryKey,
    queryFn,
    enabled,
    onError: (error) => {
      console.error(`Error fetching ${queryKey}:`, error);
    },
  });

// Generic mutation hook
const useGenericMutation = (mutationFn, onSuccessFn) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([mutationFn.queryKey]);
      onSuccessFn?.(data, variables);
    },
    onError: (error) => {
      console.error(`Error during mutation:`, error);
    },
  });
};

// Main useManagement hook
export const useManagement = (entityName) => {
  // Move this inside the hook
  const { nonce, homeUrl } = useDataStore();

  const useStore = getEntityStore(entityName);
  const { handleFormDialogOpen } = useStore();

  const apiUrl = (subPath) => createApiUrl(homeUrl, entityName, subPath);

  const useEntitiesQuery = (subPath) =>
    useGenericQuery([entityName, subPath], () =>
      apiRequest("get", apiUrl(subPath), nonce)
    );

  const useEntityQuery = (entityId, subPath) =>
    useGenericQuery(
      [entityName, entityId, subPath],
      () => apiRequest("get", apiUrl(`${subPath}/${entityId}`), nonce),
      !!entityId
    );

  const useEntitiesQueries = (entityIdsArray, subPath) => {
    return useQueries({
      queries: entityIdsArray.map((entityId) => ({
        queryKey: [entityName, subPath, entityId],
        queryFn: () => apiRequest("get", apiUrl(`${subPath}/${entityId}`), nonce),
        enabled: !!entityId,
        staleTime: 1800000,
        cacheTime: 3600000,
        onError: (error) => {
          console.error(
            `Error fetching ${entityName} with ID ${entityId}:`,
            error
          );
        },
      })),
    });
  };

  const createMutation = useGenericMutation(
    (newEntity) => apiRequest("post", apiUrl(), nonce, newEntity),
    (data, variables) => {
      if (data?.id && variables.attachmentKey) {
        handleFormDialogOpen("link", data.id, variables.attachmentKey);
      }
    }
  );

  const updateMutation = useGenericMutation((updatedEntity) =>
    apiRequest("put", apiUrl(updatedEntity.id), nonce, updatedEntity)
  );

  const deleteMutation = useGenericMutation((entityId) =>
    apiRequest("delete", apiUrl(entityId), nonce)
  );

  return {
    useEntitiesQuery,
    useEntityQuery,
    useEntitiesQueries,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
