import React from 'react';
import { Auth } from "../slices/types";
import MySwal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import "bootstrap/dist/css/bootstrap.min.css";
import SwalTitleComponent from "./Samples/SwalTitleComponent";
import SwalHtmlComponent from "./Samples/SwalHtmlComponent";
import { faCircleCheck, faCircleInfo, faCircleXmark, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mySwal = withReactContent(MySwal)

export const showError = (title: string , message: string) => {
  return mySwal.fire({
    title: <SwalTitleComponent icon={faCircleXmark} title={title} color={"danger"}/>,
    html: <SwalHtmlComponent message={message}/>,
    showConfirmButton: true,
    confirmButtonText: "OK",
    confirmButtonColor: "#9f004f",
    allowOutsideClick: false,
    customClass: {
      container: "swal-container",
      actions: "my-actions",
      confirmButton: "order-1 left-gap",
    },
    scrollbarPadding: false,
  });
}

export const showSuccess = (title = "", message = "") => {
  return mySwal.fire({
    title: <SwalTitleComponent icon={faCircleCheck} title={title} color={"success"}/>,
    html: <SwalHtmlComponent message={message}/>,
    showConfirmButton: true,
    confirmButtonText: "OK",
    confirmButtonColor: "#9f004f",
    scrollbarPadding: false,
    allowOutsideClick: false,
    customClass: {
      actions: "my-actions",
      confirmButton: "order-1 left-gap",
    },
  })
}

export const showConfirm = (title = "Confirm", message = "Are you sure, you want to logout", confirmButtonText = "Confirm", cancelButtonText = "Cancel") => {
  return mySwal.fire({
    title: <SwalTitleComponent icon={faCircleQuestion} title={title} color={"secondary"} />,
    html: <SwalHtmlComponent message={message} />,
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonColor: "#9f004f", //"#dc3545",
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    allowEnterKey: true,
    allowEscapeKey: true,
    allowOutsideClick: false,
    scrollbarPadding: false,
    customClass: {
      actions: "my-actions",
      confirmButton: "order-1 left-gap",
      cancelButton: "order-2",
    },
  })
}

export const myMessageFunction = async (auth: Auth) => {
  let title;
  let message;
  let confirmButtonText;
  let denyButtonText;
  let cancelButtonText;

  if(auth.editor === "Y" && auth.publisher === "N" ){
    title = "Confirm";
    message = "Are you sure you want to save theme?";
    confirmButtonText = "Save and Raise Publish Request";
    denyButtonText="Save";
    cancelButtonText = "Cancel";
  }

  return mySwal.fire({
    title: <SwalTitleComponent icon={faCircleQuestion} title={title} color={"secondary"} />,
    html: <SwalHtmlComponent message={message} />,
    showDenyButton: true,
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonColor: "#9f004f", //"#dc3545",
    denyButtonColor:"#9f004f",
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    denyButtonText:denyButtonText,
    allowOutsideClick: false,
    allowEnterKey: true,
    allowEscapeKey: true,
    scrollbarPadding: false,
  })
}

export const showReject = (title: string, editorName: string, affiliateName: string) => {
  const titleContent = `
  <div class='row'>
    <div class='col-1 me-4'>
      <i class='fa fa-circle-check me-3 text-danger' style='font-size: large;'></i>
    </div>
    <div class='col-8 ps-2 ps-sm-0 px-0 d-flex justify-content-start align-items-center'>
      <h3 class='fw-bold'>${title}</h3>
    </div>
  </div>`;

  const htmlContent = `
    <div class="my-class">
      <div class="row pb-2">
        <div class="col-md-8 text-start">
          <strong>Affiliate: </strong>${affiliateName}
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 text-start">
          <strong>Editor: </strong>${editorName}
        </div>
      </div>
    </div>`;

  return mySwal.fire({
    title: <SwalTitleComponent icon={faCircleInfo} title={title} color={"secondary"} />,
    // html: <SwalHtmlComponent message={message} />,
    html: htmlContent,
    input: "textarea",
    inputPlaceholder: "Add Comment...",
    inputAttributes: {
      "aria-label": "Add Comment"
    },
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonColor: "#9f004f", //"#dc3545",
    confirmButtonText: "Reject",
    cancelButtonText: "Cancel",
    allowEnterKey: true,
    allowOutsideClick: false,
    allowEscapeKey: true,
    heightAuto: true,
    scrollbarPadding: false,
    inputValidator: (value) => {
      if (!value) {
        return 'Please add your comment!';
      }
    },
    customClass: {
      actions: "my-actions",
      confirmButton: "order-1 left-gap",
      cancelButton: "order-2",
    },  
  });
};



export default mySwal;
