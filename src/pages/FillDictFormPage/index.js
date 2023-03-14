import React from "react";

// Components
import FillDictFormComp from "../../components/FillDictFormComp";
// HOCs
import WithAuthHOC from "../../hoc/WithAuthHOC";

// Constants
import { LOGIN_PAGE_NAME } from "../../utils/constants";

const FillDictFormPage = (props) => {
  const { onChangePage } = props;
  return <FillDictFormComp onSubmit={() => onChangePage(LOGIN_PAGE_NAME)} />;
};

// export default FillDictFormPage;
export default WithAuthHOC(FillDictFormPage);
