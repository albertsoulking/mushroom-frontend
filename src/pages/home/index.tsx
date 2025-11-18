import { Box, Typography } from "@mui/material";
import ContextMenu from "../../features/contextMenu";
import { MenuItem } from "../../types";
import { FolderRounded, RefreshRounded, SettingsRounded, TextFieldsRounded } from "@mui/icons-material";
import StatusBar from "../../features/statusBar";

const Desktop: React.FC = () => {
    return (
        <Box sx={{
            height: '100vh',
            bgcolor: '#1976d2', // MUI primary color
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4
        }}>
            <Typography variant="h5">请在蓝色区域内右键点击 (MUI 版本)</Typography>
        </Box>
    );
};

// 1. 定义菜单数据 (使用 MUI Icons)
const menuData: MenuItem[] = [
    {
        label: '查看设置', icon: <SettingsRounded fontSize="small" />, shortcut: 'V',
        subMenu: [
            { label: '大图标', action: () => alert('切换到大图标') },
            { label: '中图标', action: () => alert('切换到中图标') },
            { label: '小图标', action: () => alert('切换到小图标') },
            { separator: true },
            { label: '系统配置...', action: () => alert('打开配置面板') },
        ]
    },
    { label: '刷新', icon: <RefreshRounded fontSize="small" />, action: () => alert('刷新桌面') },
    { separator: true },
    {
        label: '新建', icon: <FolderRounded fontSize="small" />,
        subMenu: [
            { label: '文件夹', action: () => console.log('新建文件夹'), icon: <FolderRounded fontSize="small" /> },
            { label: '文本文件', action: () => console.log('新建文本文件'), icon: <TextFieldsRounded fontSize="small" /> },
        ]
    },
];

const HomePage = () => {
    return (
        <Box>
            <StatusBar />
            <ContextMenu menuItems={menuData}>
                <Desktop />
            </ContextMenu>

        </Box>
    );
};

export default HomePage;
