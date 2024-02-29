import SvgIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid/Grid';
import { AccountCircleTwoTone, Send } from '@mui/icons-material';

export function AccountIcon() {
    return (
    //    <SvgIcon component={AccountCircleIcon} inheritViewBox />
        <AccountCircleTwoTone sx={{fontSize:30}}/>
    )
}

export function SendIcon() {
    return (
        //    <SvgIcon component={AccountCircleIcon} inheritViewBox />
            <Send sx={{fontSize:30}}/>
        )
}
