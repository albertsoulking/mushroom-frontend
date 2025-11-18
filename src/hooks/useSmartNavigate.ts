import { useLocation, useNavigate, NavigateOptions, To } from 'react-router-dom';

// 1. 定义一个通用的类型，用于外部使用时的提示
// 这样外部调用者就知道 smartNavigate 可以接受 string 或 number
type SmartNavigateFn = {
    (to: To, options?: NavigateOptions): void;
    (to: number, options?: NavigateOptions): void;
};

export const useSmartNavigate = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 2. 核心：在 Hook 内部定义并实现 smartNavigate 变量
    // 我们使用 SmartNavigateFn 类型，并给出完整的函数实现。
    const smartNavigate: SmartNavigateFn = (to, options) => {

        if (typeof to === 'number') {
            // ⭐️ 修复了之前的类型冲突，同时避免了 any
            (navigate as (to: To | number, options?: NavigateOptions) => void)(to, options);
            return;
        }

        // 避免重复导航：如果目标路径与当前路径相同，则不导航
        if (location.pathname !== to) {
            navigate(to, options);
        }
    };

    // 3. 这里的 smartNavigate 是 Hook 返回的值，确保它被 read
    return smartNavigate;
};