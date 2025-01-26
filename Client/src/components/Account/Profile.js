import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { Checkbox, Select, SelectItem } from "@heroui/react";
import { Country, State, City } from "country-state-city";

function Profile(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fetchFirstName, setfetchFirstName] = useState("");
  const [fetchLastName, setfetchLastName] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(null);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("IN");
  console.log("selectedCountry", selectedCountry);
  const [selectedState, setSelectedState] = useState("");
  console.log("selectedState", selectedState);

  const [selectedCity, setSelectedCity] = useState("");

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
        fetchName(); // Refresh name display
        setOpenModal(null); // Close modal
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

  useEffect(() => {
    // Load all countries
    const countryList = Country.getAllCountries();
    setCountries(countryList);
  }, []);

  useEffect(() => {
    // Load states when the selected country changes
    if (selectedCountry) {
      const stateList = State.getStatesOfCountry(selectedCountry);
      setStates(stateList);
      setSelectedState(""); // Reset state
      setCities([]); // Reset cities
    }
  }, [selectedCountry]);

  useEffect(() => {
    // Load cities when the selected state changes
    if (selectedState) {
      const cityList = City.getCitiesOfState(selectedCountry, selectedState);
      setCities(cityList);
    }
  }, [selectedState]);

  const [phoneCode, setPhoneCode] = useState("");
  const [flag, setFalg] = useState("");
  useEffect(() => {
    // Get the phone code for the selected country
    const countryData = Country.getCountryByCode(selectedCountry);
    if (countryData) {
      setPhoneCode(countryData.phonecode);
      setFalg(countryData.flag);
    }
  }, [selectedCountry]);
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
                onClick={() => setOpenModal("editName")}
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
              <i
                className="fi fi-br-plus text-blue-500 text-base cursor-pointer hover:text-blue-600 transition-colors duration-200"
                onClick={() => setOpenModal("addAddress")}
              ></i>
            </div>

            <div className="flex items-center bg-gray-100 rounded-md p-4">
              <i className="fi fi-rr-info text-gray-500 text-lg mr-3 mt-1"></i>
              <span className="text-gray-600 text-sm">No addresses added</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for editing profile */}
      <Modal
        isOpen={openModal === "editName"}
        placement="center"
        onOpenChange={() => setOpenModal(null)}
      >
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
                    className="lg:w-[49%] sm:w-[100%]"
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

      {/* Modal for adding address */}
      <Modal
        isOpen={openModal === "addAddress"}
        placement="center"
        onOpenChange={() => setOpenModal(null)}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Address
              </ModalHeader>
              <ModalBody>
                <Checkbox defaultSelected>This is my default address</Checkbox>
                {/* Country Dropdown */}
                <Select
                  label="Country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  variant="bordered"
                  className="flex-1"
                >
                  {countries.map((country) => (
                    <SelectItem key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </SelectItem>
                  ))}
                </Select>
                <Input placeholder="Address" variant="bordered" size="lg" />
                <Input
                  placeholder="Apartment, suite, etc (optional)"
                  variant="bordered"
                  size="lg"
                />
                <div className="flex flex-wrap gap-4 flex-col lg:flex-row">
                  <Select
                    label="State"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    variant="bordered"
                    className="flex-1"
                    disabled={!states.length}
                    size="sm"
                  >
                    {states.map((state) => (
                      <SelectItem key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="City"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    variant="bordered"
                    className="flex-1"
                    disabled={!cities.length}
                    size="sm"
                  >
                    {cities.map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input placeholder="PIN code" variant="bordered" size="lg" />
                </div>
                <div className="flex items-center">
                  <Input
                    value={`+${phoneCode} ${flag} `}
                    className="w-[15%] text-center mr-3"
                    variant="bordered"
                    disabled
                    size="lg"
                  />
                  <Input
                    placeholder="Phone"
                    variant="bordered"
                    size="lg"
                    className="w-[85%]"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
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
