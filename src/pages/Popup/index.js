import React, { useState } from "react";

// MUI
import { Paper } from "@mui/material";

// Pages
import FillDictFormPage from "../CustomerDictSettingsEditPage";
import LoginPage from "../AuthPage/LoginPage";
import HomePage from "../HomePage";
import RegisterPage from "../AuthPage/RegisterPage";
import ProfilePage from "../ProfilePage";
import CustomerDictSettingsEditPage from "../CustomerDictSettingsEditPage";

// Styles
import useStyles from "./styles";

// Constants
import {
  LOGIN_PAGE_NAME,
  FILL_FORM_PAGE_NAME,
  REGISTER_PAGE_NAME,
  CURRENT_PAGE_NAME,
  PROFILE_PAGE_NAME,
  EDIT_CUSTOMER_SETTINGS_NAME,
} from "../../utils/constants";

const Popup = () => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState();
  const [currentPageProps, setCurrentPageProps] = useState({});

  const handleChangePage = (page, props = {}) => {
    setCurrentPage((prevPage) => {
      localStorage.setItem("prev_page", prevPage);
      localStorage.setItem(CURRENT_PAGE_NAME, page);
      return page;
    });
    setCurrentPageProps(props);
  };

  const selectPageFromState = (pageName) => {
    switch (pageName) {
      case LOGIN_PAGE_NAME:
        return (
          <LoginPage onChangePage={handleChangePage} {...currentPageProps} />
        );

      case FILL_FORM_PAGE_NAME:
        return (
          <FillDictFormPage
            onChangePage={handleChangePage}
            {...currentPageProps}
          />
        );
      case REGISTER_PAGE_NAME:
        return (
          <RegisterPage onChangePage={handleChangePage} {...currentPageProps} />
        );
      case PROFILE_PAGE_NAME:
        return (
          <ProfilePage onChangePage={handleChangePage} {...currentPageProps} />
        );
      case EDIT_CUSTOMER_SETTINGS_NAME:
        return (
          <CustomerDictSettingsEditPage
            onChangePage={handleChangePage}
            {...currentPageProps}
          />
        );

      default:
        return (
          <HomePage onChangePage={handleChangePage} {...currentPageProps} />
        );
    }
  };

  return (
    <Paper elevation={3} className={classes.main_popup_paper}>
      {/* {getCurrentPage() !== "undefined" && <DoYouWantToContinueModal open={true} onChangePage={handleChangePage} />} */}
      {selectPageFromState(currentPage)}
    </Paper>
  );
};

export default Popup;
