import {updateMenu, menuSessionStoreKey} from "@/store/mutations-types";

export default {

  [updateMenu](state, currentMenu) {
    state.currentMenu = currentMenu;
    sessionStorage.setItem(menuSessionStoreKey, JSON.stringify(currentMenu));
  }
}
