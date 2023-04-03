import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    customer_settings_page_wrapper: {
      height: "100%",
    },
    form_wrapper: {
      padding: 8,
    },
  };
});

export default useStyles;
