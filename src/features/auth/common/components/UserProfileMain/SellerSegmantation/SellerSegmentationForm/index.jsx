import { fetchSetAuthProfileAction } from "features/auth/action";
import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "./styles.module.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function SellerSegmentationForm({
  title = "Info",
  inputPlaceHolder = "Enter Your Info",
  emptyText = "Add Your Info",
  infoList = [],
  sellerObjectLabel = "label",
}) {
  const [inputValue, setInputValue] = useState("");
  const [crudListStatus, setCrudListStatus] = useState("none");
  const [updateIndex, setUpdateIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState(
    "Are you sure you want to delete this information?"
  );

  const authProfile = useSelector((state) => state.authReducer.authProfile);

  const dispatch = useDispatch();

  const handleClickAddNew = () => {
    setCrudListStatus("add");
  };

  const handleClickCancle = () => {
    setCrudListStatus("none");
  };

  const handleClickCancleUpdateForm = () => {
    setCrudListStatus("none");
    setUpdateIndex(null);
    setInputValue("");
  };

  const handleChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleClickSubmit = () => {
    setInputValue("");
    setCrudListStatus("none");

    // Call Api to Put data
    dispatch(
      fetchSetAuthProfileAction({
        ...authProfile,
        [sellerObjectLabel]: [...infoList, inputValue],
      })
    );
  };

  const handleClickSubmitUpdateForm = () => {
    const cloneInfoList = [...infoList];
    cloneInfoList[updateIndex] = inputValue;
    // Call Api to Put data
    dispatch(
      fetchSetAuthProfileAction({
        ...authProfile,
        [sellerObjectLabel]: cloneInfoList,
      })
    );

    setCrudListStatus("none");
    setUpdateIndex(null);
    setInputValue("");
  };

  const handleClickUpdateBtn = (index) => {
    setCrudListStatus("update");
    setUpdateIndex(index);
    setInputValue(infoList[index]);
  };

  const handleClickDeleteBtn = (index) => {
    setDeleteIndex(index);
    setConfirmText(`Are you sure you want to delete ${infoList[index]}?`);
    setOpen(true);
  };

  const handleCloseModal = () => setOpen(false);
  const handleSubmitModal = () => {
    const cloneInfoList = [...infoList];
    // Delete Item from position index
    cloneInfoList.splice(deleteIndex, 1);

    // Call Api to Put data
    dispatch(
      fetchSetAuthProfileAction({
        ...authProfile,
        [sellerObjectLabel]: [...cloneInfoList],
      })
    );

    setOpen(false);
    setDeleteIndex(null);
  };

  const renderInfoList = () =>
    infoList.map((skill, index) => (
      <li key={index}>
        {skill}
        <div className={styles.action}>
          <button onClick={() => handleClickUpdateBtn(index)}>
            <ModeEditIcon />
          </button>
          <button onClick={() => handleClickDeleteBtn(index)}>
            <DeleteIcon />
          </button>
        </div>
      </li>
    ));

  const renderMain = () => {
    if (crudListStatus === "add")
      return infoList.length === 0 ? (
        <div className={styles.formGroup}>
          <input
            type="text"
            value={inputValue}
            onChange={handleChangeInputValue}
            placeholder={inputPlaceHolder}
          />
          <button onClick={handleClickCancle} className={styles.cancel}>
            Cancel
          </button>
          <button
            type="button"
            className={styles.submit}
            disabled={!inputValue}
            onClick={handleClickSubmit}
          >
            Add
          </button>
        </div>
      ) : (
        <>
          <ul className={styles.skillsList}>{renderInfoList()}</ul>
          <div className={styles.formGroup}>
            <input
              type="text"
              value={inputValue}
              onChange={handleChangeInputValue}
              placeholder={inputPlaceHolder}
            />
            <button onClick={handleClickCancle} className={styles.cancel}>
              Cancel
            </button>
            <button
              type="button"
              className={styles.submit}
              disabled={!inputValue}
              onClick={handleClickSubmit}
            >
              Add
            </button>
          </div>
        </>
      );

    if (crudListStatus === "update")
      return (
        <>
          <ul className={styles.skillsList}>{renderInfoList()}</ul>
          <div className={styles.formGroup}>
            <input
              type="text"
              value={inputValue}
              onChange={handleChangeInputValue}
              placeholder={inputPlaceHolder}
            />
            <button
              onClick={handleClickCancleUpdateForm}
              className={styles.cancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.submit}
              disabled={!inputValue || inputValue === infoList[updateIndex]}
              onClick={handleClickSubmitUpdateForm}
            >
              Update
            </button>
          </div>
        </>
      );

    return (
      <>
        {infoList.length === 0 ? (
          <span>{emptyText}</span>
        ) : (
          <ul className={styles.skillsList}>{renderInfoList()}</ul>
        )}
      </>
    );
  };

  return (
    <div className={styles.sellerSegmentationForm}>
      <h3>
        <span>{title}</span>
        <button onClick={handleClickAddNew}>Add New</button>
      </h3>
      <div className={styles.sellerSegmentationFormMain}>{renderMain()}</div>
      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Modal</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmitModal} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default memo(SellerSegmentationForm);
