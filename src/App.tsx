import AppLayout from "./Layout/AppLayout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {ROUTES} from "./constants/routes";
import './App.css'
import AVPOverride from "./pages/System/AVPOverride";
import Test from "./pages/System/Test";
import COA from "./pages/COA/COA";
import {AppDataContextProvider} from "./context/AppDataContext";
import React from "react"
function App() {
    return (
        <React.Fragment>
            <AppDataContextProvider>
                <AppLayout>
                    <BrowserRouter>
                        <Home>
                            <Routes>
                                <Route path={ROUTES.AVPOverride} element={<AVPOverride/>}/>
                                <Route path={ROUTES.Test} element={<Test/>}/>
                                <Route path={ROUTES.COA} element={<COA/>}/>
                            </Routes>
                        </Home>
                    </BrowserRouter>
                </AppLayout>
            </AppDataContextProvider>
        </React.Fragment>
    )
}

export default App
