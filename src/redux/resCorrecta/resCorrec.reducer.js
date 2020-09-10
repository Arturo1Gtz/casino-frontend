const INITIAL_STATE =  {
    resCorrecta: null
}
const resCorrecReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_CURRENT_RESPUESTA':
            return {
                ...state,
                resCorrecta: action.payload
            }
        default:
            return state;
    }   
}

export default resCorrecReducer;