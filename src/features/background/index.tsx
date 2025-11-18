import { Box } from "@mui/material"
import { useRef } from "react";

const Background = () => {
    const bgRef = useRef(null);

    const handleOnContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    const handleOnMouseMove = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    return (
        <Box
            ref={bgRef}
            sx={{
                position: 'fixed',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                bgcolor: 'transparent'
            }}
            onContextMenu={handleOnContextMenu}
            onMouseMove={handleOnMouseMove}
        ></Box>
    );
};

export default Background;
