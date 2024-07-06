import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType, UpdateTheme } from "../../slices/types";
import { Button } from "react-bootstrap";
import { myMessageFunction, showConfirm, showError, showSuccess } from "../Swal";
import Loader from "../PreviewWindow/Samples/Loader";
import { updateTheme } from "../../slices/affiliateTheme";
import { defaultThemeOptions } from "../../siteTheme";
import { loadSavedTheme, editorThemeState } from "../../state/themeSlice";
import { HandleAPIError } from "../../commonFunction";
import { AppDispatch } from "../../app/store";
import { useAppSelector } from "../../app/hooks";

function EditorControls() {
  const dispatch = useDispatch<AppDispatch>();
  const id = useSelector((state: RootStateType) => state.id);
  const editorState = useSelector((state: RootStateType) => state.editorThemeState);
  const affiliateTheme = useSelector((state: RootStateType) => state.affiliateTheme);
  const themeOptions = useSelector((state: RootStateType) => state.themeOptions);
  const loading = useAppSelector((state) => state.affiliateName.loading);
  const username = useSelector((state: RootStateType) => state.affiliate?.username);
  console.log(username)
  const auth = useSelector((state: RootStateType) => state.auth);
  console.log(auth)

  const updateThemeApi = async (request: UpdateTheme) => {
    try {
      const response = await dispatch(updateTheme(request)).unwrap();
      console.log(response)
      dispatch(editorThemeState(true));
      if (request.action === "PR") {
        showSuccess("Success", "Raise publish request successfully");
      } else {
        showSuccess("Success", "Theme saved successfully");
      }
    } catch (error) {
      showError("Error", error as string);
    }
  };

  const saveAndRaiseRequest = () => {
    if (!username) {
      showError("Error", "Username not found");
      return;
    }
    const request: UpdateTheme = {
      action: "PR",
      username: username,
      theme: {
        live: {}, // Placeholder or default structure
        preview: {}, // Placeholder or default structure
        ...themeOptions, // Spread the existing themeOptions properties
      },
    };
    updateThemeApi(request);
  };

  const saveTheme = () => {
    if (!username) {
      showError("Error", "Username not found");
      return;
    }
    const request: UpdateTheme = {
      action: "S",
      username: username,
      theme: {
        live: {}, // Placeholder or default structure
        preview: {}, // Placeholder or default structure
        ...themeOptions, // Spread the existing themeOptions properties
      },
    };
    updateThemeApi(request);
  };

  const resetTheme = async () => {
    try {
      let confirmed = await showConfirm("Confirm", "Are you sure you want to reset the theme?");
      if (confirmed.isConfirmed) {
        dispatch(loadSavedTheme(defaultThemeOptions));
        showSuccess("Success", "Theme reset successfully");
      }
    } catch (error) {
      HandleAPIError(error);
    }
  };

  const discardChanges = async () => {
    try {
      let confirmed = await showConfirm("Confirm", "Are you sure you want to discard the changes?");
      if (confirmed.isConfirmed) {
        dispatch(editorThemeState(true));
        dispatch(loadSavedTheme(affiliateTheme));
        showSuccess("Success", "Changes discarded successfully");
      }
    } catch (error) {
      HandleAPIError(error);
    }
  };

  const handleDiscardAndresetChange = () => {
    if (editorState) {
      discardChanges();
    } else {
      resetTheme();
    }
  };

  const handleChange = async () => {
    let confirmed = await myMessageFunction(auth);
    if (confirmed.isConfirmed) {
      saveAndRaiseRequest();
    } else if (confirmed.isDenied) {
      saveTheme();
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="d-flex justify-content-end p-2">
        {id !== null ? (
          <>
            <div className="px-1">
              <Button className="btn-success shadow-md" onClick={handleChange} size="sm">
                Save Theme
              </Button>
            </div>
            <div className="px-1">
              <Button className="btn-secondary shadow-md" onClick={handleDiscardAndresetChange} size="sm">
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
