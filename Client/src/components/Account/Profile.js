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
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@heroui/autocomplete";
function Profile(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fetchFirstName, setfetchFirstName] = useState("");
  const [fetchLastName, setfetchLastName] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const [locFirstName, setLocFirstName] = useState("");
  const [locLastName, setLocLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [isDefault, setIsDefault] = useState(true);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [flag, setFlag] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true); // Added loading state for addresses

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
        fetchName();
        setOpenModal(null);
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

  const handleDeleteAddress = async (index) => {
    try {
      // Send delete request to the server
      const response = await fetch(
        `https://upstrides-server.vercel.app/api/userDetails/delete-address/${props.userEmail}/${index}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        // Remove the deleted address from the state
        const updatedAddresses = [...addresses];
        updatedAddresses.splice(index, 1); // Remove the address at the specified index
        setAddresses(updatedAddresses); // Update the state with the new addresses array
        console.log(data.message); // Log the success message
      } else {
        setError(data.message || "Error deleting address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      setError("An error occurred while deleting the address.");
    }
  };

  const handleAddAddress = async () => {
    if (
      !locFirstName ||
      !locLastName ||
      !address ||
      !selectedCountry ||
      !selectedState ||
      !selectedCity ||
      !pincode ||
      !phone
    ) {
      setError("All address fields are required.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://upstrides-server.vercel.app/api/userDetails/add-address/${props.userEmail}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: locFirstName,
            lastName: locLastName,
            address,
            apartment,
            country: selectedCountry,
            state: selectedState,
            city: selectedCity,
            pincode,
            phone: `+${phoneCode} ${phone}`,
            default: isDefault,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setError(null);
        setOpenModal(null);
        console.log("Address added successfully");
      } else {
        setError(data.message || "Error adding address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      setError("An error occurred while adding the address.");
    } finally {
      setIsLoading(false);
      fetchAddresses();
    }
  };

  const fetchAddresses = async () => {
    setLoadingAddresses(true); // Set loading state to true
    try {
      const response = await fetch(
        `https://upstrides-server.vercel.app/api/userDetails/get-addresses/${props.userEmail}`
      );
      const data = await response.json();
      if (response.status === 200) {
        const updatedAddresses = data.addresses.map((addr) => {
          const countryName =
            Country.getCountryByCode(addr.country)?.name || addr.country;
          const stateName =
            State.getStateByCodeAndCountry(addr.state, addr.country)?.name ||
            addr.state;
          return {
            ...addr,
            country: countryName,
            state: stateName,
          };
        });
        setAddresses(updatedAddresses);
      } else {
        setError("Error fetching addresses");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setError("An error occurred while fetching the addresses.");
    } finally {
      setLoadingAddresses(false); // Set loading state to false after fetching is complete
    }
  };

  useEffect(() => {
    if (props.userEmail) {
      fetchName();
      fetchAddresses();
    }
  }, [props.userEmail]);

  useEffect(() => {
    const countryList = Country.getAllCountries();
    setCountries(countryList);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const stateList = State.getStatesOfCountry(selectedCountry);
      setStates(stateList);
      setSelectedState("");
      setCities([]);
    }
  }, [selectedCountry]);
  useEffect(() => {
    if (selectedState) {
      const cityList = City.getCitiesOfState(selectedCountry, selectedState);
      setCities(cityList);
    }
  }, [selectedState, selectedCountry]);

  useEffect(() => {
    const countryData = Country.getCountryByCode(selectedCountry);
    if (countryData) {
      setPhoneCode(countryData.phonecode);
      setFlag(countryData.flag);
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

        <div className="w-full bg-white p-6 rounded-lg shadow-md mt-5 mb-5">
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
            {loadingAddresses ? ( // Show loader when fetching addresses
              <div className="flex justify-center items-center h-[50vh]">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              </div>
            ) : addresses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 cursor-pointer">
                {addresses.map((addr, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col bg-gray-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <span className="font-bold text-lg">{`${addr.firstName} ${addr.lastName}`}</span>
                    <span className="mt-2 text-gray-700">
                      {addr.apartment}, {addr.address},
                    </span>
                    <span className="mt-1 text-gray-700">{`${addr.city}, ${addr.state}, ${addr.country} - ${addr.pincode}`}</span>
                    <span className="mt-1 text-gray-700">{addr.phone}</span>
                    {addr.default && (
                      <span className="mt-2 text-blue-500 text-sm">
                        Default Address
                      </span>
                    )}
                    <i
                      className="fi fi-rr-trash absolute text-lg text-red-500 group-hover:opacity-100 transform scale-100 group-hover:scale-125 transition-all duration-300 cursor-pointer top-6 right-5"
                      onClick={() => handleDeleteAddress(index)}
                    ></i>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center bg-gray-100 rounded-md p-4">
                <span className="text-gray-600 text-sm">
                  No addresses added
                </span>
              </div>
            )}
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
                <Checkbox
                  defaultSelected={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                >
                  This is my default address
                </Checkbox>

                <Autocomplete
                  label="Country"
                  value={selectedCountry}
                  onSelectionChange={(value) => {
                    setSelectedCountry(value);
                    setSelectedState(""); // Reset state when country changes
                    setCities([]); // Reset cities
                  }}
                  variant="bordered"
                  className="flex-1"
                  defaultInputValue="IN"
                >
                  {countries.map((country) => (
                    <AutocompleteItem
                      key={country.isoCode}
                      value={country.isoCode}
                    >
                      {country.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>

                <div className="flex justify-between flex-wrap">
                  <Input
                    placeholder="First Name"
                    className="lg:w-[49%] sm:w-[100%] mb-3"
                    variant="bordered"
                    size="lg"
                    value={locFirstName}
                    onChange={(e) => setLocFirstName(e.target.value)}
                  />

                  <Input
                    placeholder="Last Name"
                    className="lg:w-[49%] sm:w-[100%]"
                    variant="bordered"
                    size="lg"
                    value={locLastName}
                    onChange={(e) => setLocLastName(e.target.value)}
                  />
                </div>
                <Input
                  placeholder="Address"
                  variant="bordered"
                  size="lg"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Input
                  placeholder="Apartment, suite, etc (optional)"
                  variant="bordered"
                  size="lg"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                />
                <div className="flex flex-wrap gap-4 flex-col lg:flex-row">
                  <Autocomplete
                    label="State"
                    value={selectedState}
                    onSelectionChange={(value) => {
                      setSelectedState(value);
                      setSelectedCity(""); // Reset city when state changes
                    }}
                    variant="bordered"
                    className="flex-1"
                    disabled={!states.length}
                  >
                    {states.map((state) => (
                      <AutocompleteItem
                        key={state.isoCode}
                        value={state.isoCode}
                      >
                        {state.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>

                  <Autocomplete
                    label="City"
                    value={selectedCity}
                    onSelectionChange={(value) => setSelectedCity(value)}
                    variant="bordered"
                    className="flex-1"
                    disabled={!cities.length}
                  >
                    {cities.map((city) => (
                      <AutocompleteItem key={city.name} value={city.name}>
                        {city.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>

                  <Input
                    placeholder="PIN code"
                    variant="bordered"
                    size="lg"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <Input
                    value={`${flag} +${phoneCode}`}
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleAddAddress();
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
