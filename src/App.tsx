// src/App.tsx
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

function App() {
    // 这是你的伪操作系统桌面壳
    return (
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            maxSnack={3}
            autoHideDuration={3000}
            dense>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </SnackbarProvider>
    );
}

export default App;