// Pages
import Popup from "./pages/Popup";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  wrapper: {
    width: 500,
    height: 500,
    backgroundColor: "#fff",
  },
}));

function App() {
  return <Popup />;
}

export default App;
