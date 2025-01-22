import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/react";
import { IoClose } from "react-icons/io5"; // Import a professional icon for the close button
import { AiOutlineCopyright } from "react-icons/ai";
import { FaFacebook, FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FilterSidebar({ isOpen, onClose }) {
  return (
    <Drawer
      isOpen={isOpen}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            x: 0,
            duration: 0.3,
          },
          exit: {
            x: 100,
            opacity: 0,
            duration: 0.3,
          },
        },
      }}
      onOpenChange={(open) => {
        if (!open) onClose(); // Close Drawer
      }}
      hideCloseButton={true}
    >
      <DrawerContent>
        <DrawerHeader className="flex flex-row justify-between items-center gap-1 border-b border-gray-200 py-4 px-6">
          <h2 className="text-xl font-semibold text-gray-800">
            FILTER RESULTS
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 p-2 rounded-full transition-all duration-300"
            aria-label="Close Sidebar"
          >
            <IoClose size={24} />
          </button>
        </DrawerHeader>

        <DrawerBody className="py-0 px-0">
          <div className="totalProducts border-b-1 px-6 h-14 flex items-center">
            <span className="text-gray-500">127 Products</span>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
