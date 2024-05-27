// import { ThemeProvider } from "@emotion/react"
// import { CssBaseline } from "@mui/material"
// import { ReactNode } from "react"
// import { theme } from "."

// declare module '@mui/material/styles' {
//   interface BreakpointOverrides {
//     xs: false; // removes the `xs` breakpoint
//     sm: false;
//     md: false;
//     lg: false;
//     xl: false;
//     mobile: true; // adds the `mobile` breakpoint
//     tablet: true;
//     laptop: true;
//     desktop: true;
//   }
// }

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles'
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ReactNode } from 'react'
import { red } from '@mui/material/colors'

const materialTheme = materialExtendTheme({
  colorSchemes:{
    light:{
      palette:{
        primary: {
          main:'#052925',
          50:  '#edfcf7',
          100: '#d4f7ea',
          200: '#9fead2',
          300: '#77dec3',
          400: '#40c7a9',
          500: '#1dac91',
          600: '#108b76',
          700: '#0d6f61',
          800: '#0d584e',
          900: '#0c4840',         
        },
        secondary:{
          main: '#d4f7ea'
        },
        error:{
          main: red[400]
        }
      }
    }
  },
  // breakpoints: {
  //   values: {
  //     mobile: 0,
  //     tablet: 640,
  //     laptop: 1024,
  //     desktop: 1200,
  //   },
  // },
})

interface AppThemeProp {
    children: ReactNode
}

export const AppTheme = ({children}: AppThemeProp) => {
  return (
    // <ThemeProvider theme={ theme }>
    //     <CssBaseline>
    //         {children}
    //     </CssBaseline>
    // </ThemeProvider>
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <CssBaseline />
          {children}
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  )
}
