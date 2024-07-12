import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import Loader from "../PreviewWindow/Samples/Loader";
import { defaultThemeOptions } from "../../siteTheme";
import { editorThemeState, affiliateTheme, loadSavedTheme } from "../../slices/Common Slice/themeUpdate";
import { myMessageFunction, showConfirm, showError, showSuccess } from "../Swal";
import { HandleAPIError } from "../../commonFunction";
import { useAppSelector } from "../../app/hooks";
import { updateTheme } from "../../slices/updateThemeSlice";
import { ThemeOptionsType, UpdateTheme, UpdateThemeResponse } from "../../slices/types";
import { AppDispatch, RootState } from "../../app/store";
import { setPreview } from "../../slices/Common Slice/preview"

function EditorControls() {
  const dispatch = useDispatch<AppDispatch>();

  const id = useAppSelector((state: RootState) => state.affiliateName.affiliates[0]?.affiliateid || null);
  const editorState = useAppSelector((state: RootState) => state.theme.editorThemeState);
  const themeOptions = useAppSelector((state: RootState) => state.theme.themeOptions);
  const loading = useAppSelector((state: RootState) => state.affiliateData.loading);

  const updateThemeApi = async (request: UpdateTheme) => {
    try {
      const response = await dispatch(updateTheme(request));
      console.log(response);
  
      if (updateTheme.rejected.match(response)) {
        showError("Error", response.error.message ?? "An error occurred");
      } else {
        const payload = response.payload as UpdateThemeResponse;
        console.log(payload);
        dispatch(editorThemeState(true));
        if (request.action === "PR") {
          showSuccess("Success", "Raise publish request successfully");
        } else {
          showSuccess("Success", "Theme saved successfully");
        }
      }
    } catch (error) {
      showError("Error", error as string);
    }
  };

  const saveAndRaiseRequest = () => {
    if (!id) {
      showError("Error", "Affiliate ID not found");
      return;
    }
    const request: UpdateTheme = {
      action: "PR",
      affiliateid: id,
      theme: JSON.stringify(themeOptions),
    };
    updateThemeApi(request);
  };

  const saveTheme = () => {
    if (!id) {
      showError("Error", "Affiliate ID not found");
      return;
    }
    const request: UpdateTheme = {
      action: "S",
      affiliateid: id,
      theme: JSON.stringify(themeOptions),
    };
    updateThemeApi(request);
  };

  const resetTheme = async () => {
    try {
      let confirmed = await showConfirm("Confirm", "Are you sure you want to reset the theme?");
      if (confirmed.isConfirmed) {
        dispatch(loadSavedTheme(JSON.stringify(defaultThemeOptions)));
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
        dispatch(editorThemeState(false));
        dispatch((affiliateTheme(themeOptions)));
        console.log(affiliateTheme(themeOptions));
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
    let confirmed = await myMessageFunction(); // Assuming this function exists
    if (confirmed.isConfirmed) {
      saveAndRaiseRequest();
    } else if (confirmed.isDenied) {
      saveTheme();
    }
  };

  return (
    <>
       {/* <Loader loading={loading} />  */}
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
