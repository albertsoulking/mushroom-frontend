// // 放在 DesktopPage.tsx 或 App.tsx 的 useEffect 中
// useEffect(() => {
//     if (!isLoggedIn) {
//         // 使用 windowManagerContext 自动打开登录窗口
//         openWindow({
//             title: "System Login",
//             content: <LoginPageComponent />, // 实际的登录表单组件
//             initialSize: { width: 400, height: 300 },
//             locked: true, // 锁定：直到登录成功，用户不能拖拽或关闭
//         });
//     }
// }, [isLoggedIn, openWindow]); // 依赖登录状态