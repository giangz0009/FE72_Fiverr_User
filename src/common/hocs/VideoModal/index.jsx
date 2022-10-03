import React, { forwardRef, memo, useImperativeHandle, useState } from "react";
import ModalVideo from "react-modal-video";

import "./globalStyle.scss";

const VideoModal = forwardRef(({ src }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true);
    },
  }));

  return (
    <ModalVideo
      autoplay
      channel="custom"
      url={src}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  );
});

export default memo(VideoModal);
