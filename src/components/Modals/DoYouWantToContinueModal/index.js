import React, { useState } from "react";
import PropTypes from "prop-types";

// MUI
import { Modal, Grid, Button, Typography } from "@mui/material";

// Utils
import { getCurrentPage } from "../../../utils/utils";

// Styles
import useStyles from "./styles";

const DoYouWantToContinueModal = (props) => {
  const { open, onChangePage } = props;
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(open);

  const handleClose = () => setIsOpen(false);

  const handleContinue = () => {
    onChangePage(getCurrentPage());
    handleClose();
  };

  const handleDismissContinue = () => {
    onChangePage(undefined);
    handleClose();
  };

  return (
    <Modal open={isOpen} handleClose={handleClose}>
      <Grid className={classes.modal_wrapper}>
        <Grid item>
          <Typography>Do You want to continue?</Typography>
        </Grid>
        <Grid item>
          <Button onClick={handleContinue}>Yes!</Button>
        </Grid>
        <Grid item>
          <Button onClick={handleDismissContinue}>No</Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

DoYouWantToContinueModal.propTypes = {
  open: PropTypes.bool,
  onChangePage: PropTypes.func,
};

export default DoYouWantToContinueModal;
