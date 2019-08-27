const Address = () => import("@/views/emi/address/Address");

export default {
  address: [
    {
      path: "/address",
      meta: {
        title: "地址管理"
      },
      component: Address
    }
  ]
}
