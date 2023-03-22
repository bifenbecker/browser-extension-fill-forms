import React, { useState } from "react";

// MUI
import { Paper } from "@mui/material";

// Pages
import FillDictFormPage from "../FillDictFormPage";
import LoginPage from "../AuthPage/LoginPage";
import HomePage from "../HomePage";
import RegisterPage from "../AuthPage/RegisterPage";

// Components
import DoYouWantToContinueModal from "../../components/Modals/DoYouWantToContinueModal";

// Styles
import useStyles from "./styles";

// Constants
import {
  LOGIN_PAGE_NAME,
  FILL_FORM_PAGE_NAME,
  REGISTER_PAGE_NAME,
  CURRENT_PAGE_NAME,
} from "../../utils/constants";

const Popup = () => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState();

  const handleChangePage = (page) =>
    setCurrentPage((prevPage) => {
      localStorage.setItem("prev_page", prevPage);
      localStorage.setItem(CURRENT_PAGE_NAME, page);
      return page;
    });

  const selectPageFromState = (pageName) => {
    switch (pageName) {
      case LOGIN_PAGE_NAME:
        return <LoginPage onChangePage={handleChangePage} />;

      case FILL_FORM_PAGE_NAME:
        return <FillDictFormPage onChangePage={handleChangePage} />;
      case REGISTER_PAGE_NAME:
        return <RegisterPage onChangePage={handleChangePage} />;

      default:
        return <HomePage onChangePage={handleChangePage} />;
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
