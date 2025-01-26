import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";

function Profile(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fetchFirstName, setfetchFirstName] = useState("");
  const [fetchLastName, setfetchLastName] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchName = async () => {
    try {
      const response = await fetch(
        `https://upstrides-server.vercel.app/api/userDetails/get-name/${props.userEmail}`
      );
      const data = await response.json();
      if (response.status === 200) {
        setfetchFirstName(data.firstName);
        setfetchLastName(data.lastName);
      } else {
        setError("Error fetching user name");
      }
    } catch (error) {
      console.error("Error fetching name:", error);
      setError("An error occurred while fetching the user name.");
    }
  };

  const handleSave = async () => {
    if (!firstName || !lastName) {
      setError("First name and last name are required.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://upstrides-server.vercel.app/api/userDetails/add-name/${props.userEmail}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setError(null);
        fetchName(); // Call fetchName to update the displayed name
        onOpenChange(false); // Close the modal
      } else {
        setError(data.message || "Error updating profile");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while updating the profile.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (props.userEmail) {
      fetchName();
    }
  }, [props.userEmail]);

  return (
    <>
      <div>
        <div className="mt-5">
          <span className="text-2xl font-bold">Profile</span>
        </div>

        <div className="w-[100%] bg-white p-6 rounded-lg shadow-md mt-3">
          <div className="flex flex-col ">
            <div className="flex items-center justify-between mb-4">
              <span className="text-md font-medium text-gray-500">
                {fetchFirstName && fetchLastName
                  ? `${fetchFirstName} ${fetchLastName}`
                  : "Name"}
              </span>
              <i
                className="fi fi-rs-pencil text-blue-500 text-sm cursor-pointer hover:text-blue-600 transition duration-200 ml-2"
                onClick={onOpen} // Use onClick to open the modal
              ></i>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Email</span>
              <span className="text-base font-semibold text-gray-700 break-words">
                {props.userEmail}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mt-5">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-800">
                Addresses
              </span>
              <i className="fi fi-br-plus text-blue-500 text-base cursor-pointer hover:text-blue-600 transition-colors duration-200"></i>
            </div>

            <div className="flex items-center bg-gray-100 rounded-md p-4">
              <i className="fi fi-rr-info text-gray-500 text-lg mr-3 mt-1"></i>
              <span className="text-gray-600 text-sm">No addresses added</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for editing profile */}
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Profile
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-between flex-wrap">
                  <Input
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="lg:w-[49%] sm:w-[100%] mb-3"
                  />

                  <Input
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="lg:w-[49%] sm:w-[100%] "
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleSave();
                    onClose();
                  }}
                  isLoading={isLoading}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Profile;
