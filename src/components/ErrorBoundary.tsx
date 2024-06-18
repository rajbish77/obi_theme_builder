import React, { useCallback } from "react"
import Typography from "@mui/material/Typography"
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/material/styles';
import { useDispatch } from "react-redux"
import { resetSiteData } from "../state/action"

const useStyles: any = makeStyles({
  errorRoot: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    overflowY: "auto",
  },
});

const ErrorBoundaryWithStyles = (props: { children: React.ReactNode }) => {
  const classes = useStyles();
  return <ErrorBoundary classes={classes} {...props} />;
};

export default ErrorBoundaryWithStyles;

interface ErrorBoundaryProps {
  classes: {
    errorRoot: string;
  };
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log("Caught Error", error)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className={this.props.classes.errorRoot}>
          <Typography variant="h2">
            Something went wrong, causing the app to crash
          </Typography>
          <Typography variant="h1" gutterBottom>{`:(`}</Typography>
          <Typography variant="h5" gutterBottom>
            This likely is caused by an error on the ThemeOptions object
          </Typography>
          <Typography variant="h5" gutterBottom>
            This can be cleared up by wiping the saved theme data...
          </Typography>
          <Typography variant="h5" gutterBottom>
            but you will lose your saved themes. Sorry :(
          </Typography>
          <Typography variant="h6" gutterBottom>
            Click the button below to reset your local storage data for this
            site
          </Typography>
          <ClearStorageButton />
        </div>
      )
    }

    return this.props.children
  }
}

const ClearStorageButton = () => {
  const dispatch = useDispatch()
  const handleClick = useCallback(() => {
    dispatch(resetSiteData())
    location.reload()
  }, [dispatch])

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      onClick={handleClick}
    >
      Reset Site Data
    </Button>
  )
}
