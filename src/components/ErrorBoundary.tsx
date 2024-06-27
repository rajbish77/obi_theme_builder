import React, { useCallback } from "react"
import { withStyles, createStyles, WithStyles } from "@mui/styles"
import { useDispatch } from "react-redux";

import { Button, Typography } from "@mui/material"
import { resetSiteData } from "../state/themeSlice"

interface ErrorBoundaryProps extends WithStyles<typeof styles> {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error }
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

const styles = createStyles({
  errorRoot: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    overflowY: "auto",
  },
})

export default withStyles(styles)(ErrorBoundary)

const ClearStorageButton: React.FC = () => {
  const dispatch = useDispatch()
  const handleClick = useCallback(() => {
    dispatch(resetSiteData())
    // location.reload()
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
