// Ref: https://github.com/dotnetthailand/dotnetthailand.github.io/blob/96c540837bdcfe771f1a5fcd277b11d968c15ad8/src/components/PageMetadata/Person.tsx
import React from "react";
import copy from 'copy-to-clipboard';
import IconButton from './IconButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

interface IShareButtonProps {
  url: string;
}

const ShareButton = ({ url, ...props }: IShareButtonProps) => {

  const copyToClipboard = () => {
    copy(url, {
      debug: true,
      message: 'Press #{key} to copy',
    });
    toast('Copied to the clipboard', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      });
  }

  return (
    <div {...props}>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
      <IconButton onClick={copyToClipboard}  >
        <i className="fas fa-share-alt"></i>
      </IconButton>
    </div>
  )
}

export default ShareButton;
