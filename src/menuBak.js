export default [
    'General',
    [
      {
        to: '/',
        icon: 'desktop-mac',
        label: 'Inicio'
      }
    ],
    'Examples',
    [
      {
        to: '/tables',
        label: 'Usuarios',
        icon: 'account-circle',
        //updateMark: true
      },
      {
        to: '/forms',
        label: 'Trabajadores',
        icon: 'account-circle'
      },
      {
        to: '/profile',
        label: 'Activos',
        icon: 'square-edit-outline',
        updateMark: true
      },
      {
        to: '/login',
        label: 'Áreas',
        icon: 'lock'
      },
      {
        to: '/ActivoFicha',
        label: 'Activo',
        icon: 'lock'
      },
      {
        label: 'Administración',
        subLabel: 'Administración',
        icon: 'view-list',
        menu: [
          {
            to: '/activos',
            label: 'Activos'
          },
          {
            to: '/areas',
            label: 'Areas'
          },
          {
            to: '/categorias',
            label: 'Categorías'
          },
          {
            to: '/edificios',
            label: 'Edificios'
          },
          {
            to: '/estadomantenimiento',
            label: 'Estado Mantenimiento'
          },
          {
            to: '/periodicidades',
            label: 'Periodicidades'
          },
          {
            to: '/prioridades',
            label: 'Prioridades'
          },
          {
            to: '/tareas',
            label: 'Tareas'
          },
          {
            to: '/trabajadores',
            label: 'Trabajadores'
          },
          {
            to: '/usuarios',
            label: 'Usuarios'
          },
        ]
      }
    ],
    'Calendario',
    [
      {
        href: 'https://justboil.me/bulma-admin-template/one/',
        label: 'Materiales',
        icon: 'PaletteSwatch ',
        target: '_blank'
      },
      {
        href: 'https://github.com/vikdiesel/admin-one-vue-bulma-dashboard',
        label: 'Costos',
        icon: 'mdiPaletteSwatch ',
        target: '_blank'
      }
    ]
  ]
  