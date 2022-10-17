import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function BasicRating({
  size = "medium",
  type = "read-only",
  initialValue = 1,
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const switchCaseToRender = () => {
    switch (type) {
      case "read-only":
        return (
          <Rating
            max={5}
            defaultValue={value}
            size={size}
            name="read-only"
            value={value}
            readOnly
          />
        );
      case "disabled":
        return (
          <Rating
            max={5}
            defaultValue={value}
            size={size}
            name="disabled"
            value={value}
            disabled
          />
        );
      case "no-value":
        return (
          <Rating
            max={5}
            defaultValue={value}
            size={size}
            name="no-value"
            value={null}
          />
        );
      default:
        return (
          <Rating
            max={5}
            defaultValue={value}
            size={size}
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        );
    }
  };

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        alignItems: "center",
        display: "flex",
      }}
    >
      {switchCaseToRender()}
    </Box>
  );
}
