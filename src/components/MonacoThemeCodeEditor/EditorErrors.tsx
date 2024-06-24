import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "../../slices/types";
import * as monaco from "monaco-editor";
import {
  Snackbar,
  IconButton,
  Collapse,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const PREFIX = "EditorErrors";

const classes = {
  root: `${PREFIX}-root`,
  errorItem: `${PREFIX}-errorItem`,
  alertRoot: `${PREFIX}-alertRoot`,
  alertIcon: `${PREFIX}-alertIcon`,
  alertMessage: `${PREFIX}-alertMessage`,
  alertDivider: `${PREFIX}-alertDivider`,
  errorLine: `${PREFIX}-errorLine`,
  expandIcon: `${PREFIX}-expandIcon`,
  expanded: `${PREFIX}-expanded`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  [`& .${classes.errorItem}`]: {
    position: "relative",
    bottom: 0,
  },
  [`& .${classes.alertRoot}`]: {
    alignItems: "flex-end",
    width: "100%",
  },
  [`& .${classes.alertIcon}`]: {
    padding: 0,
  },
  [`& .${classes.alertMessage}`]: {
    padding: "4px 0",
    flexGrow: 1,
  },
  [`& .${classes.alertDivider}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  [`& .${classes.errorLine}`]: {
    fontWeight: theme.typography.fontWeightBold,
  },
  [`& .${classes.expandIcon}`]: {
    transition: theme.transitions.create("transform"),
    "&$expanded": {
      transform: "rotate(180deg)",
    },
  },
  [`& .${classes.expanded}`]: {},
}));

const EditorErrors: React.FC<{ editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor> }> = ({ editorRef }) => {
  const errors = useSelector((state: RootStateType) => state.editor.errors);
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(errors.length < 3); // default open if 1 or 2 errors
  const handleClose = () => setOpen(false);
  const handleExpand = () => setExpanded(!expanded);
  const model = editorRef.current?.getModel();

  useEffect(() => {
    if (errors.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    if (errors.length < 3) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [errors]);

  const getErrorString = (error: any) => {
    if (!error.start) {
      return error.messageText;
    }
    const pos: any = model?.getPositionAt(error.start);
    return `Line ${pos.lineNumber}:${pos.column}. ${
      error.messageText.messageText ?? error.messageText
    }`;
  };

  const alertIcon = (
    <IconButton
      onClick={handleExpand}
      size="small"
      className={`${classes.expandIcon} ${expanded ? classes.expanded : ''}`}
    >
      <ExpandLessIcon />
    </IconButton>
  );

  const alertAction = (
    <IconButton onClick={handleClose} size="small">
      <CloseIcon />
    </IconButton>
  );

  return (
    <Root className={classes.root}>
      <Snackbar open={open} className={classes.errorItem}>
        <Alert
          severity="error"
          icon={alertIcon}
          action={alertAction}
          classes={{
            root: classes.alertRoot,
            icon: classes.alertIcon,
            message: classes.alertMessage,
          }}
        >
          <Collapse in={expanded}>
            {errors.map(e => (
              <div key={`${e.code}-${e.start}`} className={classes.errorLine}>
                {getErrorString(e)}
              </div>
            ))}
            <Divider className={classes.alertDivider} />
          </Collapse>
          <div>{`${errors.length} errors preventing save.`}</div>
        </Alert>
      </Snackbar>
    </Root>
  );
};

export default EditorErrors;
