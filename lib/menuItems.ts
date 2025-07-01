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
                href: "/dashboard/shipments"
            },
            {
                icon: "/svg/employee.svg",
                label: "Employee",
                href: "/dashboard/employees"
            },
            {
                icon: "/svg/invoice.svg",
                label: "Invoice",
                href: "/dashboard/invoices"
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