export const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: { requiresAuth: true },
        component: () => import('@/pages/dashboard.vue'),
      },
      {
        path: 'profil',
        name: 'profil',
        meta: { requiresAuth: true },
        component: () => import('@/pages/profil.vue'),
      },
      {
        path: 'company',
        name: 'company',
        meta: { requiresAuth: true },
        component: () => import('@/pages/configurations/company/index.vue'),
      },
      {
        path: 'cabang',
        name: 'cabang',
        meta: { requiresAuth: true },
        component: () => import('@/pages/configurations/branch/index.vue'),
      },
      {
        path: 'level',
        name: 'level',
        meta: { requiresAuth: true },
        component: () => import('@/pages/configurations/level/index.vue'),
      },
      {
        path: 'dept',
        name: 'dept',
        meta: { requiresAuth: true },
        component: () => import('@/pages/configurations/dept/index.vue'),
      },
      {
        path: 'jabatan',
        name: 'jabatan',
        meta: { requiresAuth: true },
        component: () => import('@/pages/configurations/jabatan/index.vue'),
      },
      {
        path: 'time',
        name: 'time',
        meta: { requiresAuth: true },
        component: () => import('@/pages/configurations/time/index.vue'),
      },
      {
        path: 'group',
        name: 'group_absen',
        meta: { requiresAuth: true },
        component: () => import('@/pages/master_data/group-absen/index.vue'),
      },
      {
        path: 'jadwal',
        name: 'jadwal_group_absen',
        meta: { requiresAuth: true },
        component: () => import('@/pages/master_data/jadwal-group-absen/index.vue'),
        children: [
          {
            path: '',
            name: 'jadwal-data',
            meta: { requiresAuth: true },
            component: () => import('@/pages/master_data/jadwal-group-absen/list.vue'),
          },
          {
            path: '/create',
            name: 'jadwal-create',
            meta: { requiresAuth: true },
            component: () => import('@/pages/master_data/jadwal-group-absen/create.vue'),
          },
        ]
      },
      {
        path: 'absen',
        name: 'absen',
        meta: { requiresAuth: true },
        component: () => import('@/pages/administrasi/absen/index.vue'),
      },
      {
        path: 'lembur',
        name: 'lembur',
        meta: { requiresAuth: true },
        component: () => import('@/pages/administrasi/lembur/index.vue'),
      },
      {
        path: 'cuti',
        name: 'cuti',
        meta: { requiresAuth: true },
        component: () => import('@/pages/administrasi/cuti/index.vue'),
      },
      {
        path: 'perubahan-shift',
        name: 'perubahan-shift',
        meta: { requiresAuth: true },
        component: () => import('@/pages/administrasi/perubahan-shift/index.vue'),
      },
      {
        path: 'koreksi-absen',
        name: 'koreksi-absen',
        meta: { requiresAuth: true },
        component: () => import('@/pages/administrasi/koreksi-absen/index.vue'),
      },
      {
        path: 'pengumuman',
        name: 'pengumuman',
        meta: { requiresAuth: true },
        component: () => import('@/pages/master_data/pengumuman/index.vue'),
      },
      {
        path: 'laporan-bug',
        name: 'laporan-bug',
        meta: { requiresAuth: true },
        component: () => import('@/pages/configurations/laporan-bug/index.vue'),
      },
      {
        path: 'users',
        name: 'users',
        meta: { requiresAuth: true },
        component: () => import('@/pages/master_data/users/index.vue'),
        children: [
          {
            path: '',
            name: 'users-data',
            meta: { requiresAuth: true },
            component: () => import('@/pages/master_data/users/list.vue'),
          },
          {
            path: 'create',
            name: 'users-create',
            meta: { requiresAuth: true },
            component: () => import('@/pages/master_data/users/create.vue'),
          },
          {
            path: 'edit/:id',
            name: 'users-edit',
            meta: { requiresAuth: true },
            component: () => import('@/pages/master_data/users/edit.vue'),
          },
        ],
      },
      {
        path: 'peran',
        name: 'peran',
        meta: { requiresAuth: true },
        component: () => import('@/pages/configurations/peran/index.vue'),
        children: [
          {
            path: '',
            name: 'peran-data',
            meta: { requiresAuth: true },
            component: () => import('@/pages/configurations/peran/list.vue'),
          },
          {
            path: 'create',
            name: 'peran-create',
            meta: { requiresAuth: true },
            component: () => import('@/pages/configurations/peran/create.vue'),
          },
          {
            path: 'edit/:id',
            name: 'peran-edit',
            meta: { requiresAuth: true },
            component: () => import('@/pages/configurations/peran/edit.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
    ],
  },
]
