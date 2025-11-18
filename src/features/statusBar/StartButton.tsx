import { MouseEventHandler, ReactNode, MouseEvent, useState } from "react";
// import { Avatar, Box, Button, Divider, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography, Zoom } from "@mui/material";
// import { ArrowForwardIosRounded, WindowRounded } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
import { DropdownMenuButton } from "../../components/menu/DropdownMenuButton";
import { MenuItem } from "../../types";
import { WindowRounded } from "@mui/icons-material";

const StartButton = ()=> {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOnClose = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setAnchorEl(null);
    };

    const handleOnContextMenu: MouseEventHandler = (event) => {
        event.preventDefault();
    };

    const handleOnMouseEnter = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();

        const target = event.currentTarget as HTMLElement;
        setAnchorEl(null);
        setTimeout(() => {
            setAnchorEl(target);
        }, 200);

    };

    const handleOnMouseLeave = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();

        // setAnchorEl(null)
    };

    // return (
    //     <Box>
    //         <Tooltip
    //             arrow
    //             title={'Start Menu'}
    //             placement={"top"}
    //             TransitionComponent={Zoom}
    //             PopperProps={{
    //                 sx: {
    //                     p: 0,
    //                     "& .MuiGrid-item": {
    //                         p: 0
    //                     },
    //                     "& .MuiTooltip-tooltip": {
    //                         color: '#131820',
    //                         bgcolor: '#fff',
    //                         backdropFilter: 'saturate(180%) blur(20px)',
    //                         boxShadow: '0 0 4px rgba(43, 43, 43, 0.2)'
    //                     },
    //                     "& .MuiTooltip-arrow": {
    //                         color: '#fff',
    //                         '&:before': {
    //                             content: '""',
    //                             bgcolor: '#fff',
    //                             backdropFilter: 'saturate(180%) blur(20px)',
    //                             boxShadow: '0 0 4px rgba(43, 43, 43, 0.2)'
    //                         }
    //                     }
    //                 }
    //             }}
    //             disableInteractive
    //             disableFocusListener
    //             disableTouchListener>
    //             <IconButton color={'primary'} onClick={(e) => setAnchorEl(e.currentTarget)}>
    //                 <WindowRounded />
    //             </IconButton>
    //         </Tooltip>
    //         <Menu
    //             open={Boolean(anchorEl)}
    //             anchorEl={anchorEl}
    //             anchorReference={'anchorEl'}
    //             // anchorPosition={
    //             //     contextMenu ? {
    //             //         left: contextMenu.clientX,
    //             //         top: contextMenu.clientY
    //             //     } : undefined
    //             // }
    //             onClose={handleOnClose}
    //             onContextMenu={handleOnContextMenu}
    //             // sx={{
    //             //     pointerEvents: depthLevel === 1 ? 'auto' : 'none'
    //             // }}
    //             PaperProps={{
    //                 elevation: 0,
    //                 sx: {
    //                     overflow: 'visible',
    //                     mt: 0,
    //                     color: '#131820',
    //                     bgcolor: '#fff',
    //                     backdropFilter: 'saturate(180%) blur(20px)',
    //                     boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)',
    //                     '& .MuiList-root': {
    //                         p: 0.5
    //                     },
    //                     '& .MuiAvatar-root': {
    //                         width: 24,
    //                         height: 24,
    //                         ml: -0.5,
    //                         mr: 2
    //                     },
    //                     '&:before': {
    //                         content: '""',
    //                         // display: arrow && anchorEl ? 'block' : 'none',
    //                         position: 'absolute',
    //                         top: -10,
    //                         // [left ? 'left' : 'right']: getArrowPosition(),
    //                         // transform: left ? 'translateX(-50%)' : 'translateX(50%)',
    //                         width: 10,
    //                         height: 10,
    //                         color: '#fff',
    //                         borderLeft: '6px solid transparent',
    //                         borderRight: '6px solid transparent',
    //                         borderBottom: `6px solid #fff`
    //                     }
    //                 }
    //             }}
    //             transformOrigin={{
    //                 horizontal: 'left',
    //                 vertical: 'center'
    //             }}
    //             anchorOrigin={{
    //                 horizontal: 'right',
    //                 vertical: 'center'
    //             }}
    //         >
    //             <Box>

    //             <MenuItem
    //                 sx={{
    //                     p: 0.5,
    //                     my: 0.2,
    //                     minWidth: 80,
    //                     borderRadius: 1,
    //                     cursor: 'auto',
    //                     // bgcolor: index === subAnchorEl?.index || index === subSubAnchorEl?.index ? colorMode.bgcolor : 'transparent',
    //                     bgcolor: '#fff',
    //                     '&:hover': {
    //                         // bgcolor: colorMode.hocolor
    //                     }
    //                 }}
    //                 onClick={() => { }}
    //                 onMouseEnter={handleOnMouseEnter}
    //                 onMouseLeave={handleOnMouseLeave}
    //                 onContextMenu={handleOnContextMenu}>
    //                 a
    //             </MenuItem></Box>
                
    //             {/* {
    //             menus.map((item, index) => (
    //                 <MultiMenuItem key={index} item={item} depthLevel={depthLevel} appearance={appearance} />
    //             ))
    //         } */}
    //         </Menu>
    //     </Box>
    // );

    const exampleMenuItems: MenuItem[] = [
    { label: '文件', action: () => console.log('打开文件') },
    { 
        label: '编辑', 
        subMenu: [
            { label: '剪切', shortcut: 'Ctrl+X' },
            { label: '复制', shortcut: 'Ctrl+C' },
            { label: '粘贴', shortcut: 'Ctrl+V' },
        ]
    },
    { separator: true },
    { label: '退出', action: () => alert('退出程序') },
];

    return (
        <div style={{ padding: 20 }}>
            <DropdownMenuButton
                icon={<WindowRounded />}
                menuItems={exampleMenuItems}
                variant="outlined"
            />
        </div>
    )
};

export default StartButton;
