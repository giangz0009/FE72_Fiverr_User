import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import { NumericFormat } from "react-number-format";

import React, { useState } from "react";

import "./globalStyles.scss";
import clsx from "clsx";

const categories = [
  {
    value: null,
    content: "Category",
    amount: null,
  },
  {
    value: 0,
    content: "Guest Posting",
    amount: 9,
  },
  {
    value: 1,
    content: "Illustration",
    amount: 7,
  },
  {
    value: 2,
    content: "Mixing & Mastering",
    amount: 6,
  },
  {
    value: 3,
    content: "Voice Over",
    amount: 6,
  },
  {
    value: 4,
    content: "WordPress",
    amount: 6,
  },
  {
    value: 5,
    content: "Articles & Blog Posts",
    amount: 9,
  },
];

const sellerDetails = [
  {
    id: 1,
    title: "Seller Level",
    details: [
      {
        id: 1,
        content: "Top Rated Seller",
        amount: 6,
      },
      {
        id: 2,
        content: "Level Two",
        amount: 16,
      },
      {
        id: 3,
        content: "Level One",
        amount: 3,
      },
      {
        id: 4,
        content: "Level Two",
        amount: 9,
      },
    ],
  },
  {
    id: 2,
    title: "Seller Speaks",
    details: [
      {
        id: 1,
        content: "English",
        amount: 76,
      },
      {
        id: 2,
        content: "Spanish",
        amount: 17,
      },
      {
        id: 3,
        content: "French",
        amount: 73,
      },
      {
        id: 4,
        content: "Portuguese",
        amount: 29,
      },
    ],
  },
  {
    id: 3,
    title: "Seller Lives In",
    details: [
      {
        id: 1,
        content: "United States",
        amount: 6,
      },
      {
        id: 2,
        content: "United Kingdom",
        amount: 16,
      },
      {
        id: 3,
        content: "Canada",
        amount: 3,
      },
      {
        id: 4,
        content: "Germany",
        amount: 9,
      },
    ],
  },
];

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="$"
    />
  );
});

function FilterJobsList() {
  const [category, setCategory] = useState("");

  const [dialogContentConfig, setDialogContentConfig] = useState({
    isShowSellers: false,
    isShowBudget: false,
    isShowDelivery: false,
  });
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (isOpenDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpenDialog]);

  const handleClickOpen = (scrollType) => {
    setIsOpenDialog(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setIsOpenDialog(false);
    for (const key in dialogContentConfig) {
      dialogContentConfig[key] = false;
    }
  };

  const handleChange = (setValue) => (event) => {
    setValue(event.target.value);
  };

  const renderDelivery = () => (
    <FormControl className="deliveryDialog">
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="any"
        name="radio-buttons-group"
      >
        <FormControlLabel value="24h" control={<Radio />} label="Express 24h" />
        <FormControlLabel
          value="3days"
          control={<Radio />}
          label="Up to 3 days"
        />
        <FormControlLabel
          value="7days"
          control={<Radio />}
          label="Up to 7 days"
        />
        <FormControlLabel value="any" control={<Radio />} label="Any time" />
      </RadioGroup>
    </FormControl>
  );

  const renderBudget = () => (
    <div className="budgetDialog">
      <div className="budgetItem">
        <TextField
          label={
            <>
              <span>Min</span>
              <span>$</span>
            </>
          }
          name="numberformatMin"
          id="formatted-numberformat-input-min"
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
          variant="standard"
        />
      </div>
      <div className="budgetItem">
        <TextField
          label={
            <>
              <span>Max</span>
              <span>$</span>
            </>
          }
          name="numberformatMax"
          id="formatted-numberformat-input-max"
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
          variant="standard"
        />
      </div>
    </div>
  );

  const renderCategory = () => {
    return categories.map((category, index) =>
      category.value === null ? (
        <MenuItem
          key={index}
          className="filterItem filterItemCategory"
          value=""
        >
          <em>{category.content}</em>
        </MenuItem>
      ) : (
        <MenuItem
          key={index}
          className="filterItem filterItemCategory"
          value={category.value}
        >
          <span>{category.content}</span>
          <span>({category.amount})</span>
        </MenuItem>
      )
    );
  };

  const renderSellersDetail = () => {
    return sellerDetails.map((seller) => (
      <div key={seller.id}>
        <h3>{seller.title}</h3>
        <div>
          <FormGroup>
            {seller.details.map((item) => (
              <FormControlLabel
                control={<Checkbox />}
                label={item.content}
                key={item.id}
              />
            ))}
          </FormGroup>
        </div>
      </div>
    ));
  };

  return (
    <div className="filterJobsList" style={{ marginBottom: 16 }}>
      <div className="left">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={category}
            onChange={handleChange(setCategory)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            {renderCategory()}
          </Select>
        </FormControl>
        <Button
          className={clsx({ open: dialogContentConfig.isShowSellers })}
          onClick={() => {
            handleClickOpen("paper");
            setDialogContentConfig((prevState) => ({
              ...prevState,
              isShowSellers: true,
            }));
          }}
        >
          Seller Details
          <ArrowDropDownIcon />
        </Button>
        <Button
          className={clsx({ open: dialogContentConfig.isShowBudget })}
          onClick={() => {
            handleClickOpen("paper");
            setDialogContentConfig((prevState) => ({
              ...prevState,
              isShowBudget: true,
            }));
          }}
        >
          Budget
          <ArrowDropDownIcon />
        </Button>
        <Button
          className={clsx({ open: dialogContentConfig.isShowDelivery })}
          onClick={() => {
            handleClickOpen("paper");
            setDialogContentConfig((prevState) => ({
              ...prevState,
              isShowDelivery: true,
            }));
          }}
        >
          Delivery
          <ArrowDropDownIcon />
        </Button>
      </div>
      <div className="right">
        <FormGroup>
          <FormControlLabel control={<Switch />} label="Pro services" />
          <FormControlLabel control={<Switch />} label="Online sellers" />
        </FormGroup>
      </div>
      <Dialog
        open={isOpenDialog}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className="filterJobsDialog"
      >
        <DialogTitle id="scroll-dialog-title">
          <CloseIcon onClick={handleClose} />
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          {dialogContentConfig.isShowSellers && renderSellersDetail()}
          {dialogContentConfig.isShowBudget && renderBudget()}
          {dialogContentConfig.isShowDelivery && renderDelivery()}
        </DialogContent>
        <DialogActions>
          <Button className="clearAllBtn" onClick={handleClose}>
            Clear All
          </Button>
          <Button className="applyBtn" onClick={handleClose}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FilterJobsList;
