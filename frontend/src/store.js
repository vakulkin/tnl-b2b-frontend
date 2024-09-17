import { create } from "zustand";

// Initial state for the store
const commonStoreInitialState = {
  selectedEntityId: null,
  attachmentModalOpen: false,
  isFormDialogOpen: false,
  formMode: null,
};

const formDialogHandlers = (set) => ({
  handleFormDialogOpen: (
    formMode,
    entityId = null,
    attachmentEntityKey = null
  ) => {
    set({
      formMode,
      selectedEntityId: entityId,
      isFormDialogOpen: true,
      attachmentEntityKey: attachmentEntityKey,
    });
  },
  handleFormDialogClose: () => {
    set({
      formMode: null,
      selectedEntityId: null,
      isFormDialogOpen: false,
      attachmentEntityKey: null,
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
export const useUserRoleRelationsStore = getEntityStore(
  "user_role_relations",
  formDialogHandlers
);
export const useBlockConditionUsersRelationsStore = getEntityStore(
  "product_group_relations",
  formDialogHandlers
);
export const useRuleBlockRelations = getEntityStore(
  "rule_block_relations",
  formDialogHandlers
);
export const useConditionUsersStore = getEntityStore(
  "block_user_relations",
  formDialogHandlers
);
export const useConditionProductsStore = getEntityStore(
  "block_product_relations",
  formDialogHandlers
);
export const useConditionRolesStore = getEntityStore(
  "block_role_relations",
  formDialogHandlers
);
export const useConditionGroupsStore = getEntityStore(
  "block_groups_relations",
  formDialogHandlers
);
export const useConditionTermsStore = getEntityStore(
  "block_terms_relations",
  formDialogHandlers
);




// Example entity stores without form dialog handlers
export const useProductsStore = getEntityStore("products", formDialogHandlers);
export const useUsersStore = getEntityStore("users", formDialogHandlers);
export const useTermssStore = getEntityStore("terms", formDialogHandlers);
