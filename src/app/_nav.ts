interface NavAttributes {
    [propName: string]: any;
  }
interface NavWrapper {
    attributes: NavAttributes;
    element: string;
  }
interface NavBadge {
    text: string;
    variant: string;
  }
interface NavLabel {
    class?: string;
    variant: string;
  }

export interface NavData {
    name?: string;
    url?: string;
    icon?: string;
    badge?: NavBadge;
    title?: boolean;
    children?: NavData[];
    variant?: string;
    attributes?: NavAttributes;
    divider?: boolean;
    class?: string;
    label?: NavLabel;
    wrapper?: NavWrapper;
  }

export const navItems: NavData[] = [
    {
      title: true,
      name: 'Exercises'
    },
    {
      name: 'ES1',
      url: '/exercises/es1',
      icon: 'fas fa-running'
    },
    {
      name: 'ES2',
      url: '/exercises/es2',
      icon: 'fas fa-running'
    },
    {
      title: true,
      name: 'Components'
    },
    {
      name: 'Base',
      url: '/base',
      icon: 'fas fa-puzzle-piece',
      children: [
        {
          name: 'Cards',
          url: '/base/cards',
          icon: 'fas fa-puzzle-piece'
        },
        {
          name: 'Carousels',
          url: '/base/carousels',
          icon: 'fas fa-puzzle-piece'
        },
      ]
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'fas fa-star',
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'fas fa-star'
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'fas fa-star'
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'fas fa-star'
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'fas fa-star'
        }
      ]
    },
    {
      name: 'Disabled',
      url: '/dashboard',
      icon: 'fas fa-ban',
      badge: {
        variant: 'secondary',
        text: 'NEW'
      },
      attributes: { disabled: true },
    },
    {
      name: 'Download CoreUI',
      url: 'http://coreui.io/angular/',
      icon: 'icon-cloud-download',
      class: 'mt-auto',
      variant: 'success',
      attributes: { target: '_blank', rel: 'noopener' }
    },
    {
      name: 'Try CoreUI PRO',
      url: 'http://coreui.io/pro/angular/',
      icon: 'icon-layers',
      variant: 'danger',
      attributes: { target: '_blank', rel: 'noopener' }
    }
  ];
