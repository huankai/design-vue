const Address = () => import("@/views/emi/address/Address");
const AddressEdit = () => import("@/views/emi/address/AddressEdit");
const AddressChild = () => import("@/views/emi/address/AddressChild");

export default {
  address: [
    {
      path: "/address",
      meta: {
        title: "地址管理"
      },
      component: Address
    }, {
      path: "/address/add",
      meta: {
        parent: "/address",
        title: "地址管理 - 添加"
      },
      component: AddressEdit
    }, {
      path: "/address/child",
      meta: {
        parent: "/address",
        title: "地址管理 - 子级"
      },
      component: AddressChild
    }, {
      path: "/address/edit",
      meta: {
        parent: "/address",
        title: "地址管理 - 修改"
      },
      component: AddressEdit
    }
  ]
}
