import { Box } from "@mui/material";
// import ButtonItem from "./ButtonItem";
import { WindowRounded } from "@mui/icons-material";
import StartButton from "./StartButton";
// import StartButton from "./StartButton";

const StatusBar = () => {
    const handleOnContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    return (
        <Box onContextMenu={handleOnContextMenu}
            sx={{
                px: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                color: '#131820',
                bgcolor: '#fff',
                height: 24,
                backdropFilter: 'saturate(180%) blur(20px)',
                position: 'fixed',
                boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)',
                zIndex: 1000
            }}>
                <Box>
                    <StartButton />
                </Box>
                <Box>

                </Box>
            Status Bar
        </Box>
    );
};

export default StatusBar;
