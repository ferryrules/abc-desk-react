const defaultState = {
  company: null,
}

const companiesReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_COMPANY':
      console.log(action);
      debugger
    default:
      debugger
  }
}

export default companiesReducer
