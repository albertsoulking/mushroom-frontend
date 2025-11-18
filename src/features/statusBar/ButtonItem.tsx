import { IconButton, Tooltip, Zoom } from "@mui/material";

const ButtonItem = ({
    // index,
    // item,
    // onClick,
    // colorMode,
    // setAnchorEl,
    // appearance,
    title,
    icon,
    onClick
}: {title: string, icon: React.ReactNode, onClick: () => void}) => {
    // console.log(appearance)
    // const handleOnClick = event => {
    //     event.preventDefault();
    //     console.log('gg')
    //     if (item.onClick) {
    //         item.onClick();
    //         return;
    //     }
        
    //     // setAnchorEl({
    //     //     index,
    //     //     clientX: event.clientX,
    //     //     clientY: event.clientY,
    //     //     target: event.currentTarget
    //     // });
    // };

    return (
        <Tooltip
            arrow
            title={<span>{title}</span>}
            placement={"top"}
            TransitionComponent={Zoom}
            PopperProps={{
                sx: {
                    p: 0,
                    "& .MuiGrid-item": {
                        p: 0
                    },
                    "& .MuiTooltip-tooltip": {
                        color: '#131820',
                        bgcolor: '#fff',
                        backdropFilter: 'saturate(180%) blur(20px)',
                        boxShadow: '0 0 4px rgba(43, 43, 43, 0.2)'
                    },
                    "& .MuiTooltip-arrow": {
                        color: '#fff',
                        '&:before': {
                            content: '""',
                            bgcolor: '#fff',
                            backdropFilter: 'saturate(180%) blur(20px)',
                            boxShadow: '0 0 4px rgba(43, 43, 43, 0.2)'
                        }
                    }
                }
            }}
            disableInteractive
            disableFocusListener
            disableTouchListener
        >
            <IconButton
                size={'small'}
                sx={{
                    p: 0.2,
                    mx: 0.2,
                    borderRadius: 0.5,
                    color: '#131820',
                    cursor: 'auto',
                    '&:hover': {
                        // bgcolor: colorMode.hocolor
                    },
                    "& .MuiGrid-root": {
                        p: 0
                    }
                }}
                onClick={onClick}
            >
                {icon}
            </IconButton>
        </Tooltip>
    );
};

export default ButtonItem;
