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
        getError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload,
        }),
    }

});

export const {
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
