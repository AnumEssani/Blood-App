const reducer = (state, action) => {
    switch (action.type) {
        case 'USERDATA':
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                number: action.payload.number,
                bloodGroup: action.payload.bloodGroup,
                age: action.payload.age,
                medicalHistory: action.payload.medicalHistory,
                isLogin: !state.isLogin
            }
        case 'USERLOGIN':
            console.log(action.payload)
            return {
                ...state,
                name: action.payload[0].name,
                email: action.payload[0].email,
                number: action.payload[0].number,
                bloodGroup: action.payload[0].bloodGroup,
                age: action.payload[0].age,
                medicalHistory: action.payload[0].medicalHistory
            }
        case 'USERTYPEPRESS':
            return {
                ...state,
                isAcceptor: action.payload.isAcceptor,
                isDonor: action.payload.isDonor,
            }
        case 'MedicalHistoryChange':
            return {
                ...state,
                medicalHistory: action.payload
            };
        case 'Donor':
            return {
                ...state,
                donorKey: action.payload.keys,
                donorList: action.payload.obj
            }
        default:
            return state;
    }

}


export default reducer;
