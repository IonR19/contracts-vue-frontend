// export default [
//   {
//     text: "Home",
//     path: "/home",
//     icon: "home",
//   },
//   {
//     text: "Examples",
//     icon: "folder",
//     items: [
//       {
//         text: "Profile",
//         path: "/profile",
//       },
//       {
//         text: "Tasks",
//         path: "/tasks",
//       },
//     ],
//   },
// ];

export default [
  {
    text: 'العقود',
    icon: 'form',
    items: [
      {
        text: 'اضافة',
        path: '/contracts/add',
        icon: 'add',
      },
      {
        text: 'بحث',
        path: '/contracts/search',
        icon: 'add',
      },
    ],
  },
  {
    text: 'الاوامر التكليفية',
    icon: 'table',
    items: [
      {
        icon: 'add',
        path: '/orders/add',
        text: 'اضافة',
      },
      {
        icon: 'add',
        path: '/orders/search',
        text: 'بحث',
      },
    ],
  },
]
