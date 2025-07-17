"use client"

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  MapPinIcon,
  TruckIcon,
  Cog6ToothIcon,
  UserIcon,
  UserGroupIcon,
  HomeIcon,
  BanknotesIcon,
  XMarkIcon,
  InboxStackIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { UserButton, UserProfile } from '@clerk/nextjs'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Shipment', href: '/dashboard/shipments', icon: InboxStackIcon, current: false },
  { name: 'Costing', href: '/dashboard/costings', icon: BanknotesIcon, current: false },
  { name: 'Employee', href: '/dashboard/employees', icon: UserGroupIcon, current: false },
]

const modules = [
    { id: 1, name: 'Customer', href: '/dashboard/modules/customers', icon: UserIcon, current: false },
    { id: 2, name: 'Vendor', href: '/dashboard/modules/vendors', icon: BuildingOffice2Icon, current: false },
    { id: 3, name: 'Vessel', href: '/dashboard/modules/vessels', icon: TruckIcon, current: false },
    { id: 4, name: 'Port Location', href: '/dashboard/modules/port-locations', icon: MapPinIcon, current: false },
]

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
        {/*
            This example requires updating your template:

            ```
            <html class="h-full bg-white">
            <body class="h-full">
            ```
        */}
        <div>
            <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                />

                <div className="fixed inset-0 flex">
                <DialogPanel
                    transition
                    className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
                >
                    <TransitionChild>
                    <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                        <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                        </button>
                    </div>
                    </TransitionChild>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="h-8 w-auto"
                        />
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                <a
                                    href={item.href}
                                    className={classNames(
                                    item.current
                                        ? 'bg-gray-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                    'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                    )}
                                >
                                    <item.icon
                                        aria-hidden="true"
                                        className={classNames(
                                            item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                            'size-6 shrink-0',
                                        )}
                                    />
                                    {item.name}
                                </a>
                                </li>
                            ))}
                            </ul>
                        </li>
                        <li>
                            <div className="text-xs/6 font-semibold text-gray-400">Your teams</div>
                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {modules.map((m) => (
                                <li key={m.name}>
                                    <a
                                        href={m.href}
                                        className={classNames(
                                        m.current
                                            ? 'bg-gray-50 text-indigo-600'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                        'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                        )}
                                    >
                                        <m.icon
                                            aria-hidden="true"
                                            className={classNames(
                                                m.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                'size-6 shrink-0',
                                            )}
                                        />
                                        <span className="truncate">{m.name}</span>
                                    </a>
                                </li>
                            ))}
                            </ul>
                        </li>
                        
                        </ul>
                    </nav>
                    </div>
                </DialogPanel>
                </div>
            </Dialog>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="h-8 w-auto"
                        />
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                <a
                                    href={item.href}
                                    className={classNames(
                                    item.current
                                        ? 'bg-gray-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                    'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                    )}
                                >
                                    <item.icon
                                    aria-hidden="true"
                                    className={classNames(
                                        item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                        'size-6 shrink-0',
                                    )}
                                    />
                                    {item.name}
                                </a>
                                </li>
                            ))}
                            </ul>
                        </li>
                        <li>
                            <div className="text-xs/6 font-semibold text-gray-400">Modules</div>
                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {modules.map((m) => (
                                <li key={m.name}>
                                <a
                                    href={m.href}
                                    className={classNames(
                                    m.current
                                        ? 'bg-gray-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                    'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                    )}
                                >
                                    <m.icon
                                        aria-hidden="true"
                                        className={classNames(
                                            m.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                            'size-6 shrink-0',
                                        )}
                                    />
                                    <span className="truncate">{m.name}</span>
                                </a>
                                </li>
                            ))}
                            </ul>
                        </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="lg:pl-72">
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
                    <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>

                    {/* Separator */}
                    <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <form action="#" method="GET" className="grid flex-1 grid-cols-1">
                            <input
                                name="search"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm/6"
                            />
                            <MagnifyingGlassIcon
                                aria-hidden="true"
                                className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
                            />
                        </form>
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">View notifications</span>
                                <BellIcon aria-hidden="true" className="size-6" />
                            </button>

                            {/* Separator */}
                            <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative">
                                <MenuButton className="-m-1.5 flex items-center p-1.5">
                                    <span className="sr-only">Open user menu</span>
                                    <UserButton />
                                </MenuButton>
                            </Menu>
                        </div>
                    </div>
                </div>

                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">{/* Your content */}</div>
                </main>
            </div>
        </div>
    </>
    )
}
