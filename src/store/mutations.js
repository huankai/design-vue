import {updateMenu, menuSessionStoreKey} from "@/store/mutations-types";

export default {

  [updateMenu](state, openKeys) {
    state.currentMenuOpenKeys = openKeys;
    sessionStorage.setItem(menuSessionStoreKey, JSON.stringify(openKeys));
  }
}
