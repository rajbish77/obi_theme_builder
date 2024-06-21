import React from "react"
import Modal from "react-bootstrap/Modal";
import imageLoaderSrc from "../../../images/loadingImage.gif";

interface TProps {
  loading: boolean
}

function Loader(props: TProps) {
  const { loading } = props;
  return (
    loading ? (
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={loading}
        className={"loader-model"}
        style={{ zIndex: "9999" }}
      >
        <Modal.Body>
          <div className="text-center">
            <img
              alt="Loading..."
              src={imageLoaderSrc}
              className={"loader-img"}
            />
            <h5 className="text-dark mt-3">Loading...</h5>
          </div>
        </Modal.Body>
      </Modal>
    ) : null
  )
}
export default Loader;




