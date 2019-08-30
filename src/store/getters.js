import {menuSessionStoreKey} from "@/store/mutations-types";

export default {

  getCurrentMenu(state) {
    let currentMenu = state.currentMenu;
    return currentMenu == null ? JSON.parse(sessionStorage.getItem(menuSessionStoreKey)) : currentMenu;
  }
}
