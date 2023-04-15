import React, { useState } from "react";
import PropTypes from "prop-types";

import { Grid } from "@mui/material";

import SaveButton from "../../Buttons/ActionButtons/SaveButton";
import FormBorderLayout from "../../Layouts/FormBorderLayout";

import { camelToSnakeCase } from "../../../utils/utils";

const BaseSettings = ({ handleSubmit, data, children }) => {
  const [formData, setFormData] = useState(data);

  const onSubmit = async (data) => {
    const processData = (data) => {
      const newData = {};
      Object.keys(data).forEach((key) => {
        const newKeyName = camelToSnakeCase(key.toString());
        newData[newKeyName] = data[key];
      });
      return newData;
    };

    const processedData = processData(data);
    const responseData = await handleSubmit(processedData);
    console.info(responseData);
    setFormData(responseData);
  };

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        <FormBorderLayout>
          {React.cloneElement(children, {
            data: formData,
            onSubmit,
          })}
        </FormBorderLayout>
      </Grid>
      <Grid item xs={12} justifySelf="start" alignSelf="self-start">
        <SaveButton form={children.type.name || children.displayName} />
      </Grid>
    </Grid>
  );
};

BaseSettings.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default BaseSettings;
