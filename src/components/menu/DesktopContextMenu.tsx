// DesktopContextMenu.tsx (只处理数据和触发右键点击)
import { MouseEvent, useState } from 'react';
import { MenuItem } from '../../types';
import { BaseMenuUI } from './BaseMenuUI';
import { RefreshRounded } from '@mui/icons-material';

// 1. 定义桌面的固定菜单数据
const DESKTOP_MENU_ITEMS: MenuItem[] = [
    { label: '刷新', action: () => alert('刷新'), icon: <RefreshRounded /> },
    { label: '新建', subMenu: [ /* ... */ ] },
    // ...
];

export const DesktopContextMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [anchorPoint, setAnchorPoint] = useState<{ x: number, y: number } | null>(null);

    const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setAnchorPoint({ x: e.clientX, y: e.clientY });
    };

    const handleClose = () => setAnchorPoint(null);

    return (
        <div onContextMenu={handleContextMenu}>
            {children}
            
            <BaseMenuUI
                open={Boolean(anchorPoint)}
                anchorElement={anchorPoint} // 传递鼠标坐标
                menuItems={DESKTOP_MENU_ITEMS}
                onClose={handleClose}
            />
        </div>
    );
};