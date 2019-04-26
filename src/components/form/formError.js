import React from "react";

export const FormErrors = ({ formErrors }) => (
  <div className="formErrors">
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        if (fieldName === "nacimiento" || fieldName === "linkedin") {
          return (
            <p className="error" key={i}>
              {formErrors[fieldName]}
            </p>
          );
        } else {
          return (
            <p className="error" key={i}>
              {fieldName} {formErrors[fieldName]}
            </p>
          );
        }
      } else {
        return "";
      }
    })}
  </div>
);