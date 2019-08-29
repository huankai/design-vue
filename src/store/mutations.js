import {updateMenu, menuSessionStoreKey} from "@/store/mutations-types";

export default {

  [updateMenu](state, menuId) {
    state.currentMenuId = menuId;
    sessionStorage.setItem(menuSessionStoreKey, menuId);
  }
}
