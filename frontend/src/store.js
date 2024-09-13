import { create } from "zustand";

// Initial state for the store
const commonStoreInitialState = {
  selectedEntityId: null,
  attachmentModalOpen: false,
  isFormDialogOpen: false,
  formMode: null,
};

const formDialogHandlers = (set) => ({
  handleFormDialogOpen: (formMode, entityId = null) => {
    set({
      formMode,
      selectedEntityId: entityId,
      isFormDialogOpen: true,
    });
  },
  handleFormDialogClose: () => {
    set({
      formMode: null,
      selectedEntityId: null,
      isFormDialogOpen: false,
    });
  },
});

const createEntityStore = (entityKey, additionalHandlers = () => ({})) =>
  create((set) => ({
    entityKey,
    ...commonStoreInitialState,
    ...additionalHandlers(set),
  }));
const stores = {};

export const getEntityStore = (entityKey, additionalHandlers) => {
  if (!stores[entityKey]) {
    stores[entityKey] = createEntityStore(entityKey, additionalHandlers);
  }
  return stores[entityKey];
};

// Example entity stores using form dialog handlers
export const useUserRolesStore = getEntityStore("roles", formDialogHandlers);
export const useProductGroupsStore = getEntityStore(
  "groups",
  formDialogHandlers
);
export const useRulesStore = getEntityStore("rules", formDialogHandlers);
export const useLogicBlocksStore = getEntityStore(
  "logic_blocks",
  formDialogHandlers
);
export const useConditionUsersStore = getEntityStore(
  "condition_users",
  formDialogHandlers
);
export const useConditionProductsStore = getEntityStore(
  "condition_products",
  formDialogHandlers
);
export const useConditionRolesStore = getEntityStore(
  "condition_roles",
  formDialogHandlers
);
export const useConditionGroupsStore = getEntityStore(
  "condition_groups",
  formDialogHandlers
);
export const useConditionTermsStore = getEntityStore(
  "condition_terms",
  formDialogHandlers
);
export const useBlockConditionUsersRelationsStore = getEntityStore(
  "block_condition_users_relations",
  formDialogHandlers
);
export const useUserRoleRelationsStore = getEntityStore(
  "user_role_relations",
  formDialogHandlers
);

// Example entity stores without form dialog handlers
export const useProductsStore = getEntityStore("products");
export const useUsersStore = getEntityStore("users");
