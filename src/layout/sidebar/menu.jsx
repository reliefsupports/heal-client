import { Home, Anchor, ShoppingBag } from "react-feather";
export const MENUITEMS = [
  {
    menutitle: "General",
    menucontent: "",
    Items: [
      // {
      // title: 'Dashboard', icon: Home, type: 'sub', active: false, children: [
      //     { path: `${process.env.PUBLIC_URL}/dashboard/default`, title: 'Default', type: 'link' },
      //     { path: `${process.env.PUBLIC_URL}/dashboard/ecommerce`, title: 'Ecommerce', type: 'link' },
      // ]
      {
        title: "Home",
        type: "link",
        path: `${process.env.PUBLIC_URL}/home`,
        icon: Home,
        active: false,
      },
      {
        title: "Donations",
        type: "link",
        path: `${process.env.PUBLIC_URL}/donations/list`,
        icon: ShoppingBag,
        active: false,
      },

      // }
    ],
  },
];
