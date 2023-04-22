import { blue, purple } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: purple[500]
    },
    secondary: {
      main: blue[500]
    }
  }
})