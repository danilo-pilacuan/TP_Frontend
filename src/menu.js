export default [
  'General',
  [
    {
      to: '/',
      icon: 'desktop-mac',
      label: 'Inicio'
    }
  ],
  'Administración',
  [
    {
      to: '/activos',
      label: 'Activos',
      icon: 'table',
      //updateMark: true
    },
    {
       to: '/Mantenimiento',
      label: 'Mantenimiento',
      icon: 'wrench'
    },
    {
      to: '/Costos',
      label: 'Informes Costos',
      icon: 'book-open-page-variant'
    },
    {
      to: '/usuarios',
      label: 'Usuarios',
      icon: 'account-circle'
    },
    {
      label: 'Gestión',
      subLabel: 'Submenus Example',
      icon: 'view-list',
      menu: [
        {
          to: '/areas',
          label: 'Areas',
          icon: 'plus',
        },
        {
          to: '/categorias',
          label: 'Categorías',
          icon: 'plus',
        },
        {
          to: '/edificios',
          label: 'Edificios',
          icon: 'plus',
        },
        {
          to: '/estadomantenimiento',
          label: 'Estado Mantenimiento',
          icon: 'plus',
        },
        {
          to: '/periodicidades',
          label: 'Periodicidades',
          icon: 'plus',
        },
        {
          to: '/Materiales',
          label: 'Materiales',
          icon: 'plus',
        },
        {
          to: '/prioridades',
          label: 'Prioridades',
          icon: 'plus',
        },
        {
          to: '/tareas',
          label: 'Tareas',
          icon: 'plus',
        },
        {
          to: '/tipomantenimiento',
          label: 'Tipo Mantenimiento',
          icon: 'plus',
        },
        {
          to: '/trabajadores',
          label: 'Trabajadores',
          icon: 'plus',
        }
      ]
    }


    
  ],
  
]
