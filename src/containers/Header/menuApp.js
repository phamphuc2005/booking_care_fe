export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.user-manage',
        menus: [
            {
                name: 'menu.admin.crud-user', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.admin-manage', link: '/system/user-admin',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage',  },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.admin.doctor-manage', link: '/system/doctor-manage'
            },
            {
                name: 'menu.admin.patient-manage', link: '/system/user-patient'
            },
            { //quản lý kế hoạch khám bệnh
                name: 'menu.doctor.schedule-manage', link: '/system/schedule-manage'
            }
        ]
    },
    { //quản lý phỏng khám
        name: 'menu.admin.clinic-manage',
        menus: [
            {
                name: 'menu.admin.crud-clinic', link: '/system/clinic-manage'
            }
        ]
    },
    { //quản lý chuyên khoa
        name: 'menu.admin.specialty-manage',
        menus: [
            {
                name: 'menu.admin.crud-specialty', link: '/system/specialty-manage'
            }
        ]
    },
    { //quản lý cẩm nang
        name: 'menu.admin.handbook-manage',
        menus: [
            {
                name: 'menu.admin.crud-handbook', link: '/system/handbook-manage'
            }
        ]
    },
];

export const doctorMenu = [
    { //quản lý kế hoạch khám bệnh
        name: 'menu.doctor.doctor-manage',
        menus: [
            {
                name: 'menu.doctor.user-manage', link: '/doctor/doctor-manage'
            },
            {
                name: 'menu.doctor.schedule-manage', link: '/doctor/schedule-manage'
            },
            {
                name: 'menu.doctor.appointment-manage', link: '/doctor/appointment-manage'
            },
            {
                name: 'menu.doctor.patient-manage', link: '/doctor/patient-manage'
            },
        ] 
    }
];
