import { SnackbarOrigin } from "@mui/material";

export interface NotificationState {
    message: string,
    open: boolean,
    variant: 'outlined' | 'plain' | 'soft' | 'solid',
    color: 'primary' | 'neutral' | 'danger' | 'success' | 'warning',
    vertical: SnackbarOrigin["vertical"],
    horizontal: SnackbarOrigin["horizontal"],
  }