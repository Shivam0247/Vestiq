import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@heroui/react";

export const columns = [
  { name: "ORDER NO", uid: "orderno" },
  { name: "TOTAL PRODUCT", uid: "totalproduct" },
  { name: "ORDER STATUS", uid: "orderstatus" },
  { name: "PAYMENT METHOD", uid: "paymentmethod" },
  { name: "TOTAL", uid: "total" },
  { name: "ORDER DATE", uid: "orderdate" },

  { name: "", uid: "actions" },
];

export const users = [
  {
    id: 1,
    orderno: "222",
    totalproduct: "2",
    orderstatus: "Shipping",
    paymentmethod: "Credit Card",
    total: "2332",
    orderdate: "22 Jan 2024",
  },
  {
    id: 2,
    orderno: "222",
    totalproduct: "2",
    orderstatus: "Shipping",
    paymentmethod: "Credit Card",
    total: "2332",
    orderdate: "22 Jan 2024",
  },
  {
    id: 3,
    orderno: "222",
    totalproduct: "2",
    orderstatus: "Shipping",
    paymentmethod: "Credit Card",
    total: "2332",
    orderdate: "22 Jan 2024",
  },
  {
    id: 4,
    orderno: "222",
    totalproduct: "2",
    orderstatus: "Shipping",
    paymentmethod: "Credit Card",
    total: "2332",
    orderdate: "22 Jan 2024",
  },
  {
    id: 5,
    orderno: "222",
    totalproduct: "2",
    orderstatus: "Shipping",
    paymentmethod: "Credit Card",
    total: "2332",
    orderdate: "22 Jan 2024",
  },
];

export const EyeIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const DeleteIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const EditIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

function Order(props) {
  const [orders, setOrders] = useState([]); // To store fetched orders
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch orders by email
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:4000/api/order/get-orders/${props.userEmail}`
      );
      const data = await response.json();

      if (response.status === 200) {
        setOrders(data.orders); // Update orders state
      } else {
        setError(data.message || "Unable to fetch orders.");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.userEmail) {
      fetchOrders();
    }
  }, [props.userEmail]);
  const renderCell = React.useCallback((order, columnKey) => {
    const cellValue = order[columnKey];
    switch (columnKey) {
      case "orderno":
        return <p className="text-bold text-sm capitalize">{order.orderNo}</p>;
      case "totalproduct":
        return (
          <p className="text-bold text-sm capitalize">
            {order.products.length}
          </p>
        );
      case "orderstatus":
        return (
          <p className="text-bold text-sm capitalize">{order.orderStatus}</p>
        );
      case "paymentmethod":
        return (
          <p className="text-bold text-sm capitalize">{order.paymentMethod}</p>
        );
      case "total":
        return <p className="text-bold text-sm capitalize">₹ {order.total}</p>;
      case "orderdate":
        return (
          <>
            <p className="text-bold text-sm capitalize">
              {new Date(order.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </>
        );

      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <div>
      <div className="mt-5">
        <span className="text-2xl font-bold">Orders</span>
      </div>

      {orders.length === 0 ? (
        <div className="w-[100%] bg-white p-6 rounded-lg shadow-md mt-3">
          <div className="flex flex-col items-center">
            <span className="font-bold mb-2">No orders yet</span>
            <span className="text-center">Go to store to place an order.</span>
          </div>
        </div>
      ) : (
        <Table aria-label="Example table with custom cells" className="mt-3">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align="center">
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={orders}>
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default Order;
