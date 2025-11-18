import React, { useState, MouseEvent, useCallback } from 'react';
import { Menu, MenuItem as MuiMenuItem, Box, Divider, Typography } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { MenuItem } from '../../types'; // 导入我们定义的类型

// 菜单宽度常量
const MENU_WIDTH = 180;

// --- 递归子菜单渲染器 ---
// 这个函数用于渲染菜单项，并处理悬停子菜单逻辑
interface MenuItemRendererProps {
    item: MenuItem;
    handleClose: () => void; // 关闭整个菜单的函数
}

const MenuItemRenderer: React.FC<MenuItemRendererProps> = ({ item, handleClose }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const itemRef = React.useRef<HTMLLIElement>(null);
    
    // 如果是分隔线
    if (item.separator) {
        return <Divider key={item.label || Math.random()} sx={{ my: 0.5 }} />;
    }

    const hasSubMenu = item.subMenu && item.subMenu.length > 0;
    
    // 悬停显示子菜单逻辑
    const handleMouseEnter = (event: React.MouseEvent<HTMLLIElement>) => {
        if (hasSubMenu) {
            setAnchorEl(event.currentTarget);
        }
    };

    // 鼠标移出时隐藏子菜单
    const handleMouseLeave = () => {
        // 增加短暂延迟，防止鼠标快速划过导致的闪烁
        setTimeout(() => {
            setAnchorEl(null);
        }, 100); 
    };
    
    // 处理点击操作
    const handleClick = () => {
        if (item.action) {
            item.action();
            handleClose(); // 执行操作后关闭菜单
        }
    };

    return (
        // 关键：使用 MuiMenuItem 作为容器
        <MuiMenuItem
            ref={itemRef}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            // MuiMenuItem 的 onMouseLeave 似乎有时会丢失，这里作为备用
            onMouseLeave={handleMouseLeave} 
            sx={{ 
                justifyContent: 'space-between', 
                minWidth: `${MENU_WIDTH}px`,
                // 确保子菜单可见时，当前项保持高亮
                backgroundColor: anchorEl ? 'action.hover' : 'inherit',
            }}
        >
            {/* 菜单项主体 */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {item.icon && <Box sx={{ mr: 1, display: 'flex' }}>{item.icon}</Box>}
                <Typography variant="inherit" noWrap>{item.label}</Typography>
            </Box>

            {/* 右侧指示器和快捷键 */}
            <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                {item.shortcut && (
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                        {item.shortcut}
                    </Typography>
                )}
                {hasSubMenu && <ArrowRightIcon fontSize="small" />}
            </Box>

            {/* 子菜单渲染 */}
            {hasSubMenu && (
                <Menu
                    // 关键：将 anchorEl 设为当前菜单项
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    MenuListProps={{ onMouseLeave: handleMouseLeave }} // 鼠标移出子菜单时触发关闭
                    
                    // 定位设置：使子菜单紧贴主菜单右侧
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    
                    // 确保菜单不关闭，除非点击或移出父菜单项
                    disableRestoreFocus // 防止子菜单关闭时焦点回到父菜单项
                >
                    {item.subMenu!.map((subItem, subIndex) => (
                        // 递归渲染子菜单项
                        <MenuItemRenderer 
                            key={subIndex} 
                            item={subItem} 
                            handleClose={handleClose} 
                        />
                    ))}
                </Menu>
            )}
        </MuiMenuItem>
    );
};


// --- 主 ContextMenu 逻辑组件 ---
interface ContextMenuProps {
    menuItems: MenuItem[];
    children: React.ReactNode;
}

export const ContextMenuMUI: React.FC<ContextMenuProps> = ({ menuItems, children }) => {
    const [anchorPoint, setAnchorPoint] = useState<{ x: number, y: number } | null>(null);

    // 1. 处理右键点击事件 (获取鼠标坐标)
    const handleContextMenu = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault(); // 阻止浏览器默认右键菜单
        setAnchorPoint({ x: e.clientX, y: e.clientY });
    }, []);

    // 2. 处理关闭菜单
    const handleClose = useCallback(() => {
        setAnchorPoint(null);
    }, []);

    return (
        <Box onContextMenu={handleContextMenu} sx={{ width: '100%', height: '100%' }}>
            {children}
            
            {/* MUI Menu 组件 */}
            <Menu
                open={Boolean(anchorPoint)} // 锚点存在则打开
                onClose={handleClose}
                anchorReference="anchorPosition" // 使用绝对坐标定位
                anchorPosition={
                    anchorPoint ? { top: anchorPoint.y, left: anchorPoint.x } : undefined
                }
                // 确保菜单点击不会导致焦点丢失
                keepMounted 
            >
                {menuItems.map((item, index) => (
                    // 渲染主菜单项
                    <MenuItemRenderer 
                        key={index} 
                        item={item} 
                        handleClose={handleClose} 
                    />
                ))}
            </Menu>
        </Box>
    );
};

export default ContextMenuMUI;