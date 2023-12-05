import AppLayout from "./Layout/AppLayout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {ROUTES} from "./constants/routes";
import './App.css'
import AVPOverride from "./pages/System/AVPOverride";
import Accounting from "./pages/System/Account";
import COA from "./pages/COA/COA";
import {AppDataContextProvider} from "./context/AppDataContext";
import React from "react"
import AttributeMap from "./pages/NAS/AttributeGroup";
import ConfigNAS from "./pages/NAS/ManageNAS";
import ParameterSetting from "./pages/Parameters/ParameterSetting";
import {DialogDataContextProvider} from "./context/DialogDataContext";
import PlanAttributes from "./pages/Plans/PlanAttribute";
import PlanType from "./pages/Plans/PlanType";
import PlanParameter from "./pages/Plans/PlanParameter";
import Plan from "./pages/Plans/Plan";
import RecordFilter from "./pages/System/RecordFilter";
import LandingPage from "./pages/home/LandingPage";
import DM from "./pages/COA/DM";
import ViewSubscribers from "./pages/subscribers/ViewSubscribers";
import NASSubscribers from "./pages/NAS/NASSubscribers";
import AddSubscribers from "./pages/subscribers/AddSubscribers";

function App() {
    return (
        <React.Fragment>
            <AppDataContextProvider>
                <DialogDataContextProvider>
                    <AppLayout>
                        <BrowserRouter>
                            <Home>
                                <Routes>
                                    <Route path={ROUTES.home} element={<LandingPage/>}/>
                                    <Route path={ROUTES.root} element={<LandingPage/>}/>
                                    <Route path={ROUTES.AVPOverride} element={<AVPOverride/>}/>
                                    <Route path={ROUTES.account} element={<Accounting/>}/>
                                    <Route path={ROUTES.record_filter} element={<RecordFilter/>}/>
                                    <Route path={ROUTES.coa} element={<COA/>}/>
                                    <Route path={ROUTES.dm} element={<DM/>}/>
                                    <Route path={ROUTES.nas_attribute_map} element={<AttributeMap/>}/>
                                    <Route path={ROUTES.nas_config} element={<ConfigNAS/>}/>
                                    <Route path={ROUTES.nas_subscribers} element={<NASSubscribers/>}/>
                                    <Route path={ROUTES.parameter_setting} element={<ParameterSetting/>}/>
                                    <Route path={ROUTES.plan_type} element={<PlanType/>}/>
                                    <Route path={ROUTES.plan_attribute} element={<PlanAttributes/>}/>
                                    <Route path={ROUTES.plan_parameter} element={<PlanParameter/>}/>
                                    <Route path={ROUTES.plan} element={<Plan/>}/>
                                    <Route path={ROUTES.view_subscribers} element={<ViewSubscribers/>}/>
                                    <Route path={ROUTES.add_subscribers} element={<AddSubscribers/>}/>
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
