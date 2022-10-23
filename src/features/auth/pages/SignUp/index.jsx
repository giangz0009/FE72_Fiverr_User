import { Container } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./globalStyles.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import instance from "app/instance";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import lodashIsEmpty from "lodash.isempty";

function SignUp() {
  const [value, setValue] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "Text in a modal",
    content: "Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
  });

  const authProfile = useSelector((state) => state.authReducer.authProfile);

  const navigate = useNavigate();

  useSelector(() => {
    if (!lodashIsEmpty(authProfile)) navigate("/");
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("*Please enter your name!"),
      email: Yup.string()
        .email("*Please enter the correct email type (*@*mail.*)")
        .required("*Please enter your email!"),
      password: Yup.string().required("*Please enter your password!"),
      phone: Yup.string()
        .required("*Please enter your phone number!")
        .matches(
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
          "*Invalid phone number!"
        )
        .min(9, "*Phone number must have at least 10 characters!"),
      birthday: Yup.string()
        .required("*Please Enter your birth day!")
        .matches(
          /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i,
          "*Invalid birthday!"
        ),
      gender: Yup.string().required("*Please choose your gender!"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await instance.request({
          url: "/api/auth/signup",
          method: "POST",
          data: values,
        });

        setModalConfig({
          title: "Successful",
          content: `Congratulations ${res.data.content.name}, you have successfully registered an account`,
        });

        setOpenSuccess(true);
      } catch (error) {
        setModalConfig({
          title: "Error!",
          content: error.response.data.content || "An error occurred",
        });

        setOpen(true);
      }
    },
  });

  const handleClose = () => setOpen(false);

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    navigate("/signIn");
  };

  return (
    <div className="sign" style={{ marginTop: 130 }}>
      <Container maxWidth="lg">
        <div className="formWrapper">
          <h1>Fiverr</h1>
          <form className="formMain" onSubmit={formik.handleSubmit}>
            <div className="formGroup">
              <TextField
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                label="Full Name"
                variant="outlined"
              />
              {formik.touched.name && formik.errors.name ? (
                <p>{formik.errors.name}</p>
              ) : null}
            </div>
            <div className="formGroup">
              <TextField
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                label="Email"
                variant="outlined"
              />
              {formik.touched.email && formik.errors.email ? (
                <p>{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="formGroup">
              <TextField
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                label="Password"
                variant="outlined"
              />
              {formik.touched.password && formik.errors.password ? (
                <p>{formik.errors.password}</p>
              ) : null}
            </div>
            <div className="formGroup">
              <TextField
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                label="Phone Number"
                variant="outlined"
                type="number"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <p>{formik.errors.phone}</p>
              ) : null}
            </div>
            <div className="formGroup">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Birthday"
                  inputFormat="DD/MM/YYYY"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField
                        id="birthday"
                        name="birthday"
                        value={formik.values.birthday}
                        onInput={formik.handleChange}
                        onBlur={formik.handleBlur}
                        {...params}
                      />
                    );
                  }}
                />
              </LocalizationProvider>
              {formik.touched.birthday && formik.errors.birthday ? (
                <p>{formik.errors.birthday}</p>
              ) : null}
            </div>
            <div className="formGroup">
              <label htmlFor="gender">Gender:</label>
              <RadioGroup
                aria-labelledby="demo-gender-label"
                defaultValue="female"
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
              {formik.touched.gender && formik.errors.gender ? (
                <p>{formik.errors.gender}</p>
              ) : null}
            </div>
            <p>
              You already have an account, <Link to="/signIn">click here</Link>
            </p>
            <button type="submit">submit</button>
          </form>
        </div>
      </Container>
      <Dialog
        open={openSuccess}
        onClose={handleCloseSuccess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{modalConfig.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {modalConfig.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccess}>Cancel</Button>
          <Button onClick={handleCloseSuccess} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{modalConfig.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {modalConfig.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SignUp;
