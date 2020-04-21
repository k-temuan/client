const initialState = {}

function userProfileReducer(state = initialState, actions) {
  const { type, payload } = actions;
  switch(type) {
    default: {
      return {
        ...state
      }
    }
  }
}

export default userProfileReducer