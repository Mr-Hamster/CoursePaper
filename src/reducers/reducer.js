const example = (state = {}, action) => {
    switch(action.type){
        case 'example':
            return {
                ...state,
                
            }
            default: 
                return state;
    }
}

export default example;