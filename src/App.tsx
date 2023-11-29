import AppLayout from "./Layout/AppLayout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {ROUTES} from "./constants/routes";
import './App.css'
import AVPOverride from "./pages/System/AVPOverride";
import Accounting from "./pages/System/Accounting";
import COA from "./pages/COA/COA";
import {AppDataContextProvider} from "./context/AppDataContext";
import React from "react"
import AttributeMap from "./pages/NAS/AttributeMap";
import ConfigNAS from "./pages/NAS/NASConfig";
import ParameterSetting from "./pages/Parameters/ParameterSetting";
import {DialogDataContextProvider} from "./context/DialogDataContext";
import PlanAttributes from "./pages/Plans/PlanAttribute";
import PlanType from "./pages/Plans/PlanType";

function App() {
    return (
        <React.Fragment>
            <AppDataContextProvider>
                <DialogDataContextProvider>
                    <AppLayout>
                        <BrowserRouter>
                            <Home>
                                <Routes>
                                    <Route path={ROUTES.AVPOverride} element={<AVPOverride/>}/>
                                    <Route path={ROUTES.Account} element={<Accounting/>}/>
                                    <Route path={ROUTES.COA} element={<COA/>}/>
                                    <Route path={ROUTES.NAS_ATTRIBUTE_MAP} element={<AttributeMap/>}/>
                                    <Route path={ROUTES.NAS_CONFIG} element={<ConfigNAS/>}/>
                                    <Route path={ROUTES.PARAMETER_SETTINGS} element={<ParameterSetting/>}/>
                                    <Route path={ROUTES.PLAN_TYPE} element={<PlanType/>}/>
                                    <Route path={ROUTES.PLAN_ATTRIBUTES} element={<PlanAttributes/>}/>
                                </Routes>
                            </Home>
                        </BrowserRouter>
                    </AppLayout>
                </DialogDataContextProvider>
            </AppDataContextProvider>
        </React.Fragment>
    )
}

export default App
