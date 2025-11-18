import React, { useState, MouseEvent, useCallback, useMemo } from 'react';
import { Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { BaseMenuUI } from './BaseMenuUI'; // 假设路径正确
import { MenuItem } from '../../types'; // 假设路径正确

interface DropdownMenuButtonProps {
    /** 按钮上显示的文本 */
    label?: string;
    icon?: React.ReactNode;
    /** 菜单项数据 */
    menuItems: MenuItem[];
    /** 按钮变体 */
    variant?: 'text' | 'outlined' | 'contained';
    /** 按钮颜色 */
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

export const DropdownMenuButton: React.FC<DropdownMenuButtonProps> = ({
    label,
    icon,
    menuItems,
    variant = 'contained',
    color = 'primary',
}) => {
    // 状态：用于锚定菜单的 DOM 元素（通常是按钮本身）
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // 1. 处理按钮点击事件：打开菜单
    const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
        // 设置锚点为当前的按钮元素
        setAnchorEl(event.currentTarget);
        
    }, []);

    // 2. 处理菜单关闭事件
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    // 优化：只有当 menuItems 或 open 变化时才重新计算渲染
    const menuComponent = useMemo(() => (
        <BaseMenuUI
            // 将 anchorEl 作为锚点元素传递给 BaseMenuUI
            anchorElement={anchorEl} 
            open={open}
            menuItems={menuItems}
            onClose={handleClose}
            
            // 确保 BaseMenuUI 使用正确的定位属性来作为下拉菜单
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        />
    ), [anchorEl, open, menuItems, handleClose]);

    return (
        <>
            <Button
                id="dropdown-button"
                aria-controls={open ? 'dropdown-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant={variant}
                color={color}
            >
                {label}{icon}
            </Button>
            
            {/* 渲染 BaseMenuUI，它将处理悬停子菜单 */}
            {menuComponent}
        </>
    );
};