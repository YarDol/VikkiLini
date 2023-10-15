import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const ConfirmationText = styled.div`
  margin-bottom: 0.1px;
`;

const Notification = ({ open, setOpen, type }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const {t} = useTranslation();
 
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <MuiAlert
          onClose={handleClose}
          style={{
            backgroundColor: "coral",
            marginTop: "80px",
          }}
          severity={
            type === "copy"
              ? "info"
              : type === "remove"
              ? "error"
              : type === "remind"
              ? "warning"
              : "success"
          }
          variant="filled"
        >
          {type === "add"
            ? <ConfirmationText>{t('notification.1')}</ConfirmationText>
            : type === "update"
            ? <ConfirmationText>{t('notification.2')}</ConfirmationText>
            : type === "remove"
            ? <ConfirmationText>{t('notification.3')}</ConfirmationText>
            : type === "remind"
            ? <ConfirmationText>{t('notification.4')}</ConfirmationText>
            : <ConfirmationText>{t('notification.5')}</ConfirmationText>}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Notification;