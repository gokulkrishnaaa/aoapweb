"use client";
import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", current: false },
  {
    name: "Master",
    current: true,
    children: [
      { name: "Gender", href: "/admin/master/gender" },
      { name: "Social Status", href: "/admin/master/socialstatus" },
      { name: "Info Source", href: "/admin/master/infosource" },
      { name: "exam", href: "/admin/master/exam" },
    ],
  },
];

const DesktopNav = () => {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-pink-600 px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <Image
          priority
          src="/images/logo.svg"
          height={32}
          width={32}
          alt="Logo"
          className="w-auto h-auto"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  {!item.children ? (
                    <a
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-pink-700 text-white"
                          : "text-pink-200 hover:text-white hover:bg-pink-700",
                        "block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold"
                      )}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.current
                                ? "bg-pink-700 text-white"
                                : "text-pink-200 hover:text-white hover:bg-pink-700",
                              "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700"
                            )}
                          >
                            <ChevronRightIcon
                              className={classNames(
                                open ? "rotate-90 text-white" : "text-pink-300",
                                "h-5 w-5 shrink-0"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Disclosure.Button>

                          <Disclosure.Panel as="ul" className="mt-1 px-2">
                            {item.children.map((subItem) => (
                              <li key={subItem.name}>
                                <Disclosure.Button
                                  as="a"
                                  href={subItem.href}
                                  className={classNames(
                                    subItem.current
                                      ? "bg-pink-700 text-white"
                                      : "text-pink-200 hover:text-white hover:bg-pink-700",
                                    "block rounded-md py-2 pr-2 pl-9 text-sm leading-6"
                                  )}
                                >
                                  {subItem.name}
                                </Disclosure.Button>
                              </li>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DesktopNav;
