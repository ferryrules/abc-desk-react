const defaultState = {
  company: null,
  employees: [],
  payrolls: [],
  tickets: []
}

const companiesReducer = (state=defaultState, action) => {
  switch (action.type) {
    // TODO: move to types
    case 'SET_CURRENT_COMPANY':
      return { ...state, company: action.payload, employees: action.payload.employees }
    default:
      return state
  }
}

export default companiesReducer
