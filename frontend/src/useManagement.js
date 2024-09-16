import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
} from "@tanstack/react-query";
// import { getEntityStore } from "./store";

const BASE_URL = "http://btwob.local/wp-json/tnl-b2b/v1";

const apiRequest = async (method, url, data = null) => {
  try {
    const response = await axios({ method, url, data });
    return response.data;
  } catch (error) {
    console.error(`Error during ${method.toUpperCase()} request:`, error);
    throw new Error(`Failed to ${method} ${url}`);
  }
};

// Create API URL based on subPath provided
const createApiUrl = (entityName, subPath = "") => {
  return `${BASE_URL}/${entityName}${subPath ? `/${subPath}` : ""}`;
};

const useGenericQuery = (queryKey, queryFn, enabled = true) =>
  useQuery({
    queryKey,
    queryFn,
    enabled,
    onError: (error) => {
      console.error(`Error fetching ${queryKey}:`, error);
    },
  });

export const useManagement = (entityName) => {
  // const useStore = getEntityStore(entityName);
  // const { handleFormDialogOpen } = useStore();

  const apiUrl = (subPath) => createApiUrl(entityName, subPath);

  const useEntitiesQuery = (subPath) =>
    useGenericQuery([entityName, subPath], () =>
      apiRequest("get", apiUrl(subPath))
    );

  const useEntityQuery = (entityId, subPath) =>
    useGenericQuery(
      [entityName, entityId, subPath],
      () => apiRequest("get", apiUrl(`${subPath}/${entityId}`)),
      !!entityId
    );

  const useEntitiesQueries = (entityIdsArray, subPath) => {
    return useQueries({
      queries: entityIdsArray.map((entityId) => ({
        queryKey: [entityName, subPath, entityId],
        queryFn: () => apiRequest("get", apiUrl(`${subPath}/${entityId}`)),
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

  const useGenericMutation = (mutationFn, onSuccessFn) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn,
      onSuccess: (data) => {
        queryClient.invalidateQueries([mutationFn.queryKey]);
        onSuccessFn?.(data);
      },
      onError: (error) => {
        console.error(`Error during mutation:`, error);
      },
    });
  };

  const createMutation = useGenericMutation(
    (newEntity) => apiRequest("post", apiUrl(), newEntity),
    // (data) => {
    //   if (data?.[0]?.id) {
    //     handleFormDialogOpen('link', data.id, 'logic_blocks');
    //   }
    // }
  );

  const updateMutation = useGenericMutation((updatedEntity) =>
    apiRequest("put", apiUrl(updatedEntity.id), updatedEntity)
  );

  const deleteMutation = useGenericMutation((entityId) =>
    apiRequest("delete", apiUrl(entityId))
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
