import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { useState } from "react";
import Order from "./Order";
import Profile from "./Profile";

export default function Account() {
  const [activeTab, setActiveTab] = useState("Orders"); // Default to "Orders"

  return (
    <div className="flex justify-center pt-10 bg-gray-200 min-h-[100vh]">
      <div className="w-[80%] h-[80%]">
        <Navbar className="w-[100%] rounded-lg relative bg-white shadow-md">
          <NavbarContent className="flex gap-4" justify="center">
            <NavbarItem>
              <Link
                color={activeTab === "Orders" ? "primary" : "foreground"}
                href="#"
                onClick={() => setActiveTab("Orders")}
                className={`${
                  activeTab === "Orders" ? "font-bold" : ""
                } transition duration-200`}
              >
                Orders
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                color={activeTab === "Profile" ? "primary" : "foreground"}
                href="#"
                onClick={() => setActiveTab("Profile")}
                className={`${
                  activeTab === "Profile" ? "font-bold" : ""
                } transition duration-200`}
              >
                Profile
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar showFallback src="https://images.unsplash.com/broken" />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  onClick={() => setActiveTab("Orders")}
                >
                  Orders
                </DropdownItem>
                <DropdownItem
                  key="team_settings"
                  onClick={() => setActiveTab("Profile")}
                >
                  Profile
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </Navbar>

        <div className="mt-6">
          {activeTab === "Orders" && <Order />}
          {activeTab === "Profile" && <Profile />}
        </div>
      </div>
    </div>
  );
}
