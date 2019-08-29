const Address = () => import("@/views/emi/address/Address");
const AddressEdit = () => import("@/views/emi/address/AddressEdit");

export default {
  address: [
    {
      path: "/address",
      meta: {
        title: "地址管理"
      },
      component: Address
    }, {
      path: "/address/edit",
      meta: {
        title: "地址管理 - 修改"
      },
      component: AddressEdit
    }
  ]
}
