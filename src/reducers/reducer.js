const reducer = (state = '', action) => {

    switch(action.type){
        case 'CHANGE_EXCHANGE':
            return action.value
        default: 
            return state;
    }
}

export default reducer;