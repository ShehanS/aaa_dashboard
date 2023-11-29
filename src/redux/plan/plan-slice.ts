import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface PlanState {
    payloadPlanAttribute: any;
    planAttributeAddSuccess: any;
    planAttributeEditSuccess: any;
    planAttributeDeleteSuccess: any;
    planAttributesGetSuccess: any;
    payloadPlanParameter: any;
    planParameterAddSuccess: any;
    planParameterEditSuccess: any;
    planParameterDeleteSuccess: any;
    planParametersGetSuccess: any;
    payloadPlanType: any;
    planTypeAddSuccess: any;
    planTypeEditSuccess: any;
    planTypeDeleteSuccess: any;
    planTypesGetSuccess: any;
    planPayload: any;
    planAddSuccess: any;
    planEditSuccess: any;
    planDeleteSuccess: any;
    plansGetSuccess: any;
    error: any;
}

const initialState: PlanState = {
    payloadPlanAttribute: null,
    planAttributeAddSuccess: null,
    planAttributeEditSuccess: null,
    planAttributeDeleteSuccess: null,
    planAttributesGetSuccess: null,
    payloadPlanParameter: null,
    planParameterAddSuccess: null,
    planParameterEditSuccess: null,
    planParameterDeleteSuccess: null,
    planParametersGetSuccess: null,
    payloadPlanType: null,
    planTypeAddSuccess: null,
    planTypeEditSuccess: null,
    planTypeDeleteSuccess: null,
    planTypesGetSuccess: null,
    planPayload: null,
    planAddSuccess: null,
    planEditSuccess: null,
    planDeleteSuccess: null,
    plansGetSuccess: null,
    error: null
};

export const PlanSlice = createSlice({
    name: "plan",
    initialState: initialState,
    reducers: {
        addPlanAttribute: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            payloadPlanAttribute: action.payload,
        }),
        addPlanAttributeSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planAttributeAddSuccess: action.payload,
        }),
        editPlanAttribute: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            payloadPlanAttribute: action.payload,
        }),
        editPlanAttributeSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planAttributeEditSuccess: action.payload,
        }),
        deletePlanAttribute: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            payloadPlanAttribute: action.payload,
        }),
        deletePlanAttributeSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planAttributeDeleteSuccess: action.payload,
        }),
        getPlansAttribute: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            payloadPlanAttribute: action.payload,
        }),
        getPlansAttributeSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planAttributesGetSuccess: action.payload,
        }),
//plan types
        addPlanType: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            payloadPlanType: action.payload,
        }),
        addPlanTypeSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planTypeAddSuccess: action.payload,
        }),
        editPlanType: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            payloadPlanType: action.payload,
        }),
        editPlanTypeSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planTypeEditSuccess: action.payload,
        }),
        deletePlanType: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            payloadPlanType: action.payload,
        }),
        deletePlanTypeSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planTypeDeleteSuccess: action.payload,
        }),
        getPlansType: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            payloadPlanType: action.payload,
        }),
        getPlansTypeSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planTypesGetSuccess: action.payload,
        }),

        //plan parameter
        addPlanParameter: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            payloadPlanParameter: action.payload,
        }),
        addPlanParameterSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planParameterAddSuccess: action.payload,
        }),
        editPlanParameter: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            payloadPlanParameter: action.payload,
        }),
        editPlanParameterSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planParameterEditSuccess: action.payload,
        }),
        deletePlanParameter: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            payloadPlanParameter: action.payload,
        }),
        deletePlanParameterSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planParameterDeleteSuccess: action.payload,
        }),
        getPlansParameter: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            payloadPlanParameter: action.payload,
        }),
        getPlansParameterSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planParametersGetSuccess: action.payload,
        }),
        getError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload,
        }),
        ////plan

        addPlan: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planPayload: action.payload,
        }),
        addPlanSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planAddSuccess: action.payload,
        }),
        editPlan: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planPayload: action.payload,
        }),
        editPlanSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planEditSuccess: action.payload,
        }),
        deletePlan: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planPayload: action.payload,
        }),
        deletePlanSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planDeleteSuccess: action.payload,
        }),
        getPlans: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            planPayload: action.payload,
        }),
        getPlanSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null,
            plansGetSuccess: action.payload,
        }),
    }

});

export const {
    addPlan,
    addPlanSuccess,
    editPlan,
    editPlanSuccess,
    deletePlan,
    deletePlanSuccess,
    getPlans,
    getPlanSuccess,
    addPlanParameter,
    addPlanParameterSuccess,
    editPlanParameter,
    editPlanParameterSuccess,
    deletePlanParameter,
    deletePlanParameterSuccess,
    getPlansParameter,
    getPlansParameterSuccess,
    addPlanType,
    addPlanTypeSuccess,
    editPlanType,
    editPlanTypeSuccess,
    deletePlanType,
    deletePlanTypeSuccess,
    getPlansType,
    getPlansTypeSuccess,
    getError,
    getPlansAttribute,
    getPlansAttributeSuccess,
    addPlanAttribute,
    addPlanAttributeSuccess,
    editPlanAttribute,
    editPlanAttributeSuccess,
    deletePlanAttribute,
    deletePlanAttributeSuccess


} = PlanSlice.actions;

export default PlanSlice.reducer;
