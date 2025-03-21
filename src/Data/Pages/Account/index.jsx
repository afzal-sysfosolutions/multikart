import { RiBankLine, RiCoinLine, RiFileTextLine, RiHomeLine, RiNotificationLine, RiWalletLine, RiMapPinLine, RiDownload2Line, RiMoneyDollarCircleLine, RiUser2Line, RiKeyLine  } from 'react-icons/ri';

export const sidebarMenu = [
  {
    title: 'Dashboard',
    icon: <RiHomeLine className='me-2'/>,
    id: 'dashboard',
    path: '/account/dashboard',
  },
  // {
  //   title: 'Notifications',
  //   icon: <RiNotificationLine className='me-2'/>,
  //   id: 'notification',
  //   path: '/account/notification',
  // },
  // {
  //   title: 'BankDetails',
  //   icon: <RiBankLine className='me-2'/>,
  //   id: 'bank-details',
  //   path: '/account/bank-details',
  // },
  // {
  //   title: 'MyWallet',
  //   icon: <RiWalletLine className='me-2'/>,
  //   id: 'wallet',
  //   path: '/account/wallet',
  // },
  // {
  //   title: 'EarningPoints',
  //   icon: <RiCoinLine className='me-2'/>,
  //   id: 'point',
  //   path: '/account/point',
  // },
  {
    title: 'My Orders',
    icon: <RiFileTextLine className='me-2'/>,
    id: 'order',
    path: '/account/order',
  },
  {
    title: 'Profile',
    icon: <RiUser2Line className='me-2'/>,
    id: 'downloads',
    path: '/account/profile',
  },
  {
    title: 'Change Password',
    icon: <RiKeyLine className='me-2'/>,
    id: 'refund',
    path: '/account/changepass',
  },
  {
    title: 'Saved Address',
    icon: <RiMapPinLine className='me-2'/>,
    id: 'address',
    path: '/account/addresses',
  },
];
