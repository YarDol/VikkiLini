import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { formatAmount } from "../utility/formatAmount";
import { formatDate } from "../utility/formatDate";
import { getOrders } from "../redux/authRedux";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/darkModeContext";
import '../styles/dark.scss'
import styled from "styled-components";

const MainContainer = styled.div`
  margin: 20px auto;
  width: 90vw;
  max-width: 1000px;
  height: 65vh;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useContext(DarkModeContext);
  const orders = useSelector((state) => state.order.orders);
  const [pageSize, setPageSize] = useState(8);
  const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 110,
      renderCell: (params) => {
        return (
          <ListItem
            onClick={() => {
              navigate("/order/" + params.row._id);
            }}
          >
            {formatDate(params.row.createdAt)}
          </ListItem>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 190,
      renderCell: (params) => {
        return (
          <ListItem
            onClick={() => {
              navigate("/order/" + params.row._id);
            }}
          >
            {params.row.name}
          </ListItem>
        );
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 350,
      renderCell: (params) => {
        return (
          <ListItem
            onClick={() => {
              navigate("/order/" + params.row._id);
            }}
          >
            {params.row.address.line1}, {params.row.address.city},{" "}
            {params.row.address.country}
          </ListItem>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 140,
      renderCell: (params) => {
        return (
          <ListItem
            onClick={() => {
              navigate("/order/" + params.row._id);
            }}
          >
            {formatAmount(params.row.amount - 250)}
          </ListItem>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: (params) => {
        return (
          <ListItem
            style={{
              color:
                params.row.status === "Delivered"
                  ? "#5cb85c"
                  : params.row.status === "Shipped"
                  ? "#0275d8"
                  : params.row.status === "To Ship"
                  ? "#cc0cbf"
                  : "#d9534f",
            }}
            onClick={() => {
              navigate("/order/" + params.row._id);
            }}
          >
            {params.row.status}
          </ListItem>
        );
      },
    },
  ];

  return (
    <div className={darkMode ? "app dark" : "app"}>
    <MainContainer className={`widget`}>
      <DataGrid className={`widget`}
        rows={sortedOrders}
        disableSelectionOnClick
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        rowsPerPageOptions={[8, 16, 40]}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </MainContainer>
    </div>
  );
};
export default OrderList;