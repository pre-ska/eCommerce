import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, ...rest }) => {
  return (
    <div className="group">
      <input
        type="text"
        className="form-input"
        onChange={handleChange}
        {...rest}
      />
      {label ? (
        <label
          className={`${rest.value.length ? "shrink" : ""} form-input-label`}>
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
