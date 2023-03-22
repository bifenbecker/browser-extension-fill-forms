import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    customer_settings_page_wrapper: {
      padding: "0 15px",
    },
  };
});

export default useStyles;
