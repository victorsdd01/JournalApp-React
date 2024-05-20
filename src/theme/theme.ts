import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";



export const theme =  createTheme({
    palette: {
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
})