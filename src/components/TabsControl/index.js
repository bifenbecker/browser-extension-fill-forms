import React from "react";
import PropTypes from "prop-types";

const TabsControl = (props) => {
  const { children, activeTab: value } = props;
  return (
    <>
      {children.map((tab, index) =>
        React.cloneElement(tab, {
          index,
          value,
          key: index,
        })
      )}
    </>
  );
};

TabsControl.propTypes = {
  children: PropTypes.array,
  activeTab: PropTypes.number,
};

export default TabsControl;
