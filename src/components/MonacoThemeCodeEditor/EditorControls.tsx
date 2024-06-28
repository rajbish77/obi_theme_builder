import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../slices/types";
import { Button } from "react-bootstrap";
import { updateTheme } from "../../apicalls";
// import Loader from "src/components/PreviewWindow/Samples/Loader";
import { myMessageFunction, showConfirm, showError, showSuccess } from "../Swal";
import { HandleAPIError } from "../../commonFunction";
import { UpdateTheme } from "../../types";
import { defaultThemeOptions } from "../../siteTheme";
import { editorThemeState, loadSavedTheme } from "../../state/themeSlice";
import Loader from "../PreviewWindow/Samples/Loader";

function EditorControls() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const id = useSelector((state: RootStateType) => state.id);
  const auth = useSelector((state: RootStateType) => state.auth);
  const editorState = useSelector((state: RootStateType) => state.editorThemeState);
  const affiliateTheme = useSelector((state: RootStateType) => state.affiliateTheme); // Assuming this should be `state.editor.affiliateTheme`
  const themeOptions = useSelector((state: RootStateType) => state.themeOptions); // Assuming this should be `state.editor.themeOptions`

  const updateThemeApi = async (request: UpdateTheme) => {
    try {
      setLoading(true);
      const response = await updateTheme(request);
      if (response?.status === 0) {
        dispatch(editorThemeState(true));
        if (request.action === "PR") {
          showSuccess("Success", "Raise publish request successfully");
        } else {
          showSuccess("Success", "Theme saved successfully");
        }
      } else {
        showError("Error", response?.statusMessage);
      }
    } catch (error) {
      HandleAPIError(error);
    } finally {
      setLoading(false);
    }
  };

  const saveAndRaiseRequest = async () => {
    const request = {
      affiliateid: id,
      action: "PR",
      username: auth.username,
      theme: JSON.stringify(themeOptions), // Use `themeOptions` from Redux state
    };
    updateThemeApi(request);
  };

  const saveTheme = async () => {
    const request = {
      affiliateid: id,
      action: "S",
      username: auth.username,
      theme: JSON.stringify(themeOptions), // Use `themeOptions` from Redux state
    };
    updateThemeApi(request);
  };

  const resetTheme = async () => {
    try {
      let confirmed = await showConfirm("Confirm", "Are you sure you want to reset the theme?");
      if (confirmed.isConfirmed) {
        setLoading(true);
        dispatch(loadSavedTheme(defaultThemeOptions)); // Dispatch action from `editorSlice`
        showSuccess("Success", "Theme reset successfully");
      }
    } catch (error) {
      HandleAPIError(error);
    } finally {
      setLoading(false);
    }
  };

  const discardChanges = async () => {
    try {
      let confirmed = await showConfirm("Confirm", "Are you sure you want to discard the changes?");
      if (confirmed.isConfirmed) {
        dispatch(editorThemeState(true)); // Dispatch action from `editorSlice`
        dispatch(loadSavedTheme(affiliateTheme)); // Dispatch action from `editorSlice`
        showSuccess("Success", "Changes discarded successfully");
      }
    } catch (error) {
      HandleAPIError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDiscardAndresetChange = async () => {
    if (editorState) {
      discardChanges();
    } else {
      resetTheme();
    }
  };

  const handleChange = async () => {
    let confirmed = await myMessageFunction(auth);
    if (confirmed.isConfirmed) {
      if (auth?.editor === "Y") {
        saveAndRaiseRequest();
      }
    } else if (confirmed.isDenied) {
      if (auth?.editor === "Y") {
        saveTheme();
      }
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <div className={`d-flex justify-content-end p-2`}>
        {id !== null ? (
          <>
            <div className="px-1">
              <Button
                className="btn-success shadow-md"
                onClick={handleChange}
                size="sm"
              >
                Save Theme
              </Button>
            </div>
            <div className="px-1">
              <Button
                className="btn-secondary shadow-md"
                onClick={handleDiscardAndresetChange}
                size="sm"
              >
                {editorState ? "Discard Changes" : "Reset Theme"}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-3"></div>
        )}
      </div>
    </>
  );
}

export default EditorControls;
