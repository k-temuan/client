const initialState = {
  tags: [],
};

function tagReducer(state = initialState, actions) {
  switch (actions.type) {
    case "SET_TAGS":
      for (let i = 0; i < actions.payload.length; i++) {
        actions.payload[i].id = actions.payload[i].id.toString();
      }
      return {
        ...state,
        tags: actions.payload,
      };
    default: {
      return {
        ...state,
      };
    }
  }
}

export default tagReducer;
