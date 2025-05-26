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
                href: "/dashboard/shipment"
            },
            {
                icon: "/svg/employee.svg",
                label: "Employee",
                href: "/dashboard/employee"
            },
            {
                icon: "/svg/invoice.svg",
                label: "Invoice",
                href: "/dashboard/invoice"
            }
        ],
    },
    {
        title: "Lainnya",
        items:
            [
                {
                    icon: "/svg/profile.svg",
                    label: "Users",
                    href: "/dashboard/users"
                },
            ]
    }
]

export default menuItems;