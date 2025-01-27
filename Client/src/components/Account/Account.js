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
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import Order from "./Order";
import Profile from "./Profile";
import Cookies from "js-cookie";

export default function Account() {
  const [activeTab, setActiveTab] = useState("Orders");
  const userEmail = Cookies.get("userEmail");
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("userEmail");
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="flex justify-center pt-10 bg-gray-200 min-h-[100vh]">
      <div className="w-[80%] h-[80%]">
        <Navbar
          className="w-[100%] rounded-lg relative bg-white shadow-md"
          maxWidth="full"
        >
          <NavbarContent className="flex gap-4" justify="center">
            <NavbarItem>
              <Link
                color={activeTab === "Orders" ? "primary" : "foreground"}
                href="#"
                onPress={() => setActiveTab("Orders")}
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
                onPress={() => setActiveTab("Profile")}
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
                  <p className="font-semibold">{userEmail}</p>
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  onPress={() => setActiveTab("Orders")}
                >
                  Orders
                </DropdownItem>
                <DropdownItem
                  key="team_settings"
                  onPress={() => setActiveTab("Profile")}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </Navbar>

        <div className="mt-6">
          {activeTab === "Orders" && <Order userEmail={userEmail} />}
          {activeTab === "Profile" && <Profile userEmail={userEmail} />}
        </div>
      </div>
    </div>
  );
}
