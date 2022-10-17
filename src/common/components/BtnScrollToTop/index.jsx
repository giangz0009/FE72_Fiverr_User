import { Box, Fab, Fade, useScrollTrigger } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useLocation } from "react-router-dom";

function BtnScrollToTop(props) {
  const location = useLocation();

  const isAtHomePage = location.pathname === "/";

  function ScrollTop(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });

    if (isAtHomePage) {
      // If at home page add scroll listen event for window
      if (trigger) {
        addDataScrolled();
      } else {
        removeDataScrolled();
      }
    } else {
      // Else remove listen scroll event of window
      addDataScrolled();
    }

    const handleClick = (event) => {
      scrollTop();
    };

    return (
      <Fade in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          {children}
        </Box>
      </Fade>
    );
  }

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  const addDataScrolled = () => {
    document.body.dataset.scrolled = "true";
  };

  const removeDataScrolled = () => {
    delete document.body.dataset.scrolled;
  };

  ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };

  return (
    <ScrollTop {...props}>
      <Fab size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
  );
}

export default BtnScrollToTop;
