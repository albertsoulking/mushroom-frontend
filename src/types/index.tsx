// types.ts
import { ReactNode } from 'react';

export interface MenuItem {
    label?: string; // 菜单项显示的文本
    action?: (id?: string) => void; // 点击后的操作函数
    icon?: ReactNode; // 菜单左侧的图标
    shortcut?: string; // 快捷键提示
    separator?: boolean; // 是否为分隔线
    subMenu?: MenuItem[]; // 子菜单项
}