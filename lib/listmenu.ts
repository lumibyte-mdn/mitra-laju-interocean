const menuItems = [
    {
        title: "Menu",
        items: [
            {
                icon: "/svg/home.svg",
                label: "Dashboard",
                href: "/dashboard"
            },
            {
                icon: "/svg/shipment.svg",
                label: "Shipment",
                href: "/shipment"
            },
            {
                icon: "/svg/employee.svg",
                label: "Employee",
                href: "/employee"
            },
            {
                icon: "/svg/invoice.svg",
                label: "Invoice",
                href: "/invoice"
            }
        ],
    },
    {
        title: "Lainnya",
        items:
            [
                {
                    icon: "/svg/settings.svg",
                    label: "Pengaturan",
                    href: "/"
                },
                {
                    icon: "/svg/profile.svg",
                    label: "Profile",
                    href: "/"
                },
                {
                    icon: "/svg/logout.svg",
                    label: "Keluar",
                    href: "/"
                },
            ]
    }
]

export default menuItems;