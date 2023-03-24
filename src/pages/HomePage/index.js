import React from "react";
import PropTypes from "prop-types";

// MUI
import { Grid, Typography, Box } from "@mui/material";

// Components
// Layouts
import BaseLayout from "../../components/Layouts/BaseLayout";
// Icons
import ProfileIcon from "../../components/Icons/ProfileIcon";
import RegisterIcon from "../../components/Icons/RegisterIcon";
import LogoutIcon from "../../components/Icons/LogoutIcon";
import LoginIcon from "../../components/Icons/LoginIcon";
// Hoc
import WithAuthHOC from "../../hoc/WithAuthHOC";

// Styles
import useStyles from "./styles";

// Utils
import { isUserAuthenticated } from "../../utils/utils";

const HomePage = (props) => {
  const { onChangePage } = props;
  const classes = useStyles();

  return (
    <BaseLayout>
      <Grid
        container
        className={classes.home_page_wrapper}
        flexDirection="column"
      >
        <Grid item>
          <Box className={classes.home_page_profile_icon_wrapper}>
            {isUserAuthenticated() ? (
              <>
                <ProfileIcon onChangePage={onChangePage} />
                <LogoutIcon onChangePage={onChangePage} />
              </>
            ) : (
              <>
                <RegisterIcon onChangePage={onChangePage} />
                <LoginIcon onChangePage={onChangePage} />
              </>
            )}
          </Box>
        </Grid>
        <Grid item className={classes.home_page_title_wrapper}>
          <Typography>FILL FORM EXTENSION</Typography>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

HomePage.propTypes = {
  onChangePage: PropTypes.func,
};

export default WithAuthHOC(HomePage);
