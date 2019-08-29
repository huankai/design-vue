import {menuSessionStoreKey} from "@/store/mutations-types";

export default {

  getCurrentMenu(state) {
    let currentMenuId = state.currentMenuId;
    return currentMenuId == null ? sessionStorage.getItem(menuSessionStoreKey) : currentMenuId;
  }
}
