import { NbMenuItem } from '@nebular/theme';



var items_admin = [
  {
    title: 'DASHBOARD',
    group: true,
  },
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'MANAGE DATA',
    group: true,
  },
  {
    title: 'Buyers',
    icon: 'person',
    link: '/pages/buyer',
  },

  {
    title: 'Sellers',
    icon: 'phone-call-outline',
    link: '/pages/seller',
  },

  {
    title: 'Drivers',
    icon: 'car-outline',
    link: '/pages/driver',
  },

  {
    title: 'Coupons',
    icon: 'pricetags-outline',
    link: '/pages/coupons',
  },

  {
    title: 'Products',
    icon: 'shopping-cart-outline',
    link: '/pages/product',
  },

  {
    title: 'Extras',
    icon: 'plus-circle-outline',
    link: '/pages/extras',
  },

  {
    title: 'Orders',
    icon: 'car-outline',
    link: '/pages/order',
  },

  {
    title: 'Transactions',
    icon: 'checkmark-circle-outline',
    link: '/pages/transaction',
  },
  {
    title: 'SETTINGS',
    group: true,
  },
  {
    title: 'Account Settings',
    icon: 'settings',
    link: '/pages/settings',
  },
]


  var items_seller = [
    {
      title: 'DASHBOARD',
      group: true,
    },
    {
      title: 'Dashboard',
      icon: 'home-outline',
      link: '/pages/iot-dashboard',
    },
    {
      title: 'MANAGE DATA',
      group: true,
    },
    {
      title: 'Products',
      icon: 'shopping-cart-outline',
      link: '/pages/product',
    },

    {
      title: 'Extras',
      icon: 'plus-circle-outline',
      link: '/pages/extras',
    },
    
    {
      title: 'Drivers',
      icon: 'car-outline',
      link: '/pages/driver',
    },

    {
      title: 'Coupons',
      icon: 'pricetags-outline',
      link: '/pages/coupons',
    },
  
  
    {
      title: 'Orders',
      icon: 'car-outline',
      link: '/pages/order',
    },
  
    {
      title: 'Transactions',
      icon: 'checkmark-circle-outline',
      link: '/pages/transaction',
    },
    {
      title: 'SETTINGS',
      group: true,
    },
    {
      title: 'Account Settings',
      icon: 'settings',
      link: '/pages/settings',
    },
  ]



export const MENU_ITEMS_ADMIN: NbMenuItem[] = items_admin
export const MENU_ITEMS_SELLER: NbMenuItem[] = items_seller
