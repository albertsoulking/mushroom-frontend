// BaseMenuUI.tsx (修正版本)

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Menu, MenuProps, Divider, Typography, Box, MenuItem as MuiMenuItem } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { MenuItem } from "../../types"; // 确保路径正确
import MenuItemRenderer from './MenuItemRenderer';

// --- 类型定义 ---

// 抽象的锚点类型
type Anchor = HTMLElement | { x: number, y: number } | null;

interface BaseMenuProps {
    open: boolean;
    anchorElement: Anchor; // 使用抽象锚点类型
    anchorOrigin?: MenuProps['anchorOrigin'];
    transformOrigin?: MenuProps['transformOrigin'];
    menuItems: MenuItem[];
    onClose: () => void;
}

// 确保 MenuItemRenderer 在这里或单独的文件中定义
// [省略 MenuItemRenderer 和 SubMenu 的代码，假设其逻辑正确并调用了 handleClose]
// (需要确保你之前的悬停和递归逻辑也粘贴到这个文件或导入)

// --- 核心菜单渲染逻辑 (BaseMenuUI) ---

export const BaseMenuUI: React.FC<BaseMenuProps> = ({
    menuItems,
    open,
    anchorElement,
    onClose,
    // 默认值用于确保下拉菜单的正确性
    anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
    transformOrigin = { vertical: 'top', horizontal: 'left' },
}) => {
    
    // 1. 确定锚点类型和值
    
    const isCoordinateAnchor = anchorElement && 'x' in anchorElement && 'y' in anchorElement;

    // 根据锚点类型，设置 Menu 的定位属性
    const menuProps: Partial<MenuProps> = useMemo(() => {
        if (isCoordinateAnchor) {
            // A. 如果是坐标对象 (用于右键菜单)
            return {
                anchorReference: "anchorPosition",
                anchorPosition: {
                    top: anchorElement.y as number,
                    left: anchorElement.x as number,
                },
                // 右键菜单通常不需要 origin 属性
            };
        } else {
            // B. 如果是 DOM 元素 (用于下拉按钮)
            return {
                anchorEl: anchorElement as HTMLElement | null,
                anchorOrigin: anchorOrigin,
                transformOrigin: transformOrigin,
            };
        }
    }, [anchorElement, anchorOrigin, transformOrigin, isCoordinateAnchor]);


    // 2. 渲染菜单项
    const renderMenuItems = useMemo(() => (
        menuItems.map((item, index) => (
            <MenuItemRenderer
                key={index} 
                item={item} 
                handleClose={onClose} // 传递关闭函数
            />
        ))
    ), [menuItems, onClose]);
    
    // 3. 渲染主 Menu 容器
    return (
        <Menu
            open={open}
            onClose={onClose}
            keepMounted
            
            // ⭐️ 核心修正：解构展开 menuProps，确保只使用正确的属性
            {...menuProps} 
        >
            {renderMenuItems}
        </Menu>
    );
}

// 导出修正后的组件
// export default BaseMenuUI; 
// 确保你同时将 MenuItemRenderer 和其依赖的子组件代码也一并放到这个文件或导入