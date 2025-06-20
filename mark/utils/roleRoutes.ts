// utils/roleRoutes.ts
export const getRedirectPath = (role: string) => {
  switch (role.toLowerCase()) {
    case 'farmer':
      return '/farmer/home';
    case 'house':
      return '/distributer/home';
    case 'transport':
      return '/transport/home';
    case 'ministry':
      return '/ministry/home';
    case 'border':
      return '/border/home';
    default:
      return '/';
  }
};
