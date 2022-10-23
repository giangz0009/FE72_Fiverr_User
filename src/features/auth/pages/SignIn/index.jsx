import { Container } from "@mui/system";

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
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import instance from "app/instance";
import { useSelector } from "react-redux";

import lodashIsEmpty from "lodash.isempty";

function SignIn() {
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
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("*Please enter the correct email type (*@*mail.*)")
        .required("*Please enter your email!"),
      password: Yup.string().required("*Please enter your password!"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await instance.request({
          url: "/api/auth/signin",
          method: "POST",
          data: values,
        });

        setModalConfig({
          title: "Successful",
          content: `Congratulations ${res.data.content.name}, you have successfully logged in`,
        });

        setOpenSuccess(true);

        localStorage.setItem(
          "authProfile",
          JSON.stringify({
            id: res.data.content.user.id,
            token: res.data.content.token,
          })
        );
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
    navigate("/");
  };

  return (
    <div className="sign" style={{ marginTop: 130 }}>
      <Container maxWidth="lg">
        <div className="formWrapper">
          <h1>Fiverr</h1>
          <form className="formMain" onSubmit={formik.handleSubmit}>
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
            <p>
              You don't have an account, <Link to="/signUp">click here</Link>
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

export default SignIn;
