import React, {useState, Fragment} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Flag from "react-world-flags";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    select: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        }
    }
}));

export default (props) => {
    const classes = useStyles();
    const {flag, setFlag, stringValues} = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const menuId = 'primary-search-account-menu';

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = (flag) => () => {
        setFlag(flag)
        setAnchorEl(null);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose(flag)}
        >
            <MenuItem value='el' onClick={handleMenuClose('el')}><Flag code="GR" style={{width: "30px"}}/></MenuItem>
            <MenuItem value='en' onClick={handleMenuClose('en')}><Flag code="GB" style={{width: "30px"}}/></MenuItem>
        </Menu>
    );

    return (
        <Fragment>
            <div className={classes.select}>
                <Tooltip title={stringValues.selectLang}>
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        {(flag === 'el') ? <Flag code="GR" style={{width: "30px"}}/> :
                            <Flag code="GB" style={{width: "30px"}}/>}
                    </IconButton>
                </Tooltip>
            </div>
            {renderMenu}
        </Fragment>
    )

}