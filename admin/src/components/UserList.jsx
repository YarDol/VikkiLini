import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useContext } from "react";
import { getMembers } from "../redux/authRedux";
import { openModal } from "../redux/modalRedux";
import styled from "styled-components";
import { DarkModeContext } from "../context/darkModeContext";
import '../styles/dark.scss'

const Table = styled.div`
  margin: 20px auto;
  width: 90vw;
  max-width: 1000px;
  height: 65vh;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
`;
const Action = styled.div`
  margin: 0 10px;
  cursor: pointer;
  color: gray;
  &:hover {
    color: black;
  }
`;

const UserList = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.member.members);
  const [pageSize, setPageSize] = useState(8);
  const { darkMode } = useContext(DarkModeContext);

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const fullName = (first, last) => {
    const firstName = first.charAt(0).toUpperCase() + first.slice(1);
    const lastName = last.charAt(0).toUpperCase() + last.slice(1);
    const completeName = firstName + " " + lastName;
    return completeName;
  };

  useEffect(() => {
    getMembers(dispatch);
  }, [dispatch]);

  const handleModal = (type) => {
    console.log(type);
    dispatch(openModal(type));
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
      renderCell: (params) => {
        return (
          <ListItem
            style={{ cursor: "pointer" }}>
            {fullName(params.row.firstname, params.row.lastname)}
          </ListItem>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 280,
      renderCell: (params) => {
        return (
          <ListItem
            style={{ cursor: "pointer" }}>
            {params.row.email}
          </ListItem>
        );
      },
    },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <ListItem
            style={{ cursor: "pointer" }}>
            {params.row.username}
          </ListItem>
        );
      },
    },
    {
      field: "action",
      headerName: "Delete User",
      width: 110,
      renderCell: (params) => {
        return (
          <>
            <Action>
              <DeleteOutlineOutlinedIcon
                onClick={() => handleModal(params.row._id)}
              />
            </Action>
          </>
        );
      },
    },
  ];

  return (
    <div className={darkMode ? "app dark" : "app"}>
    <Table className={`widget`}>
      <DataGrid
        className={`widget`}
        rows={members}
        disableSelectionOnClick
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        rowsPerPageOptions={[8, 16, 40]}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </Table>
    </div>
  );
};
export default UserList;