const initialState = {
  status: 'redux is doing fine',
  needLogin: null,
  userCred: {
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    photo_url: null,
    access_token: null
  },
  screenLoading: false,
  screenError: null,
  events_status: {
    loading: false,
    empty: false,
    error: null,
  },
  // events: [],
  events2: [
    { 
      "id": 1,
      "datetime": "2020-04-16T15:24:18.196Z",
      "location": {
        "name": "Location 1",
        "lat": "",
        "long": ""
      },
      "UserId": 1,
      "category": "game",
      "users": [
        { "id": 1, "email": "user01@test.com" },
        { "id": 2, "email": "user02@test.com" },
        { "id": 3, "email": "user03@test.com" },
        { "id": 4, "email": "user04@test.com" }
      ],
      "description": "lorem ipsum dolor sit amet",
      "status": "status 01"
    },
    { 
      "id": 2,
      "datetime": "2020-04-16T15:24:18.196Z",
      "location": {
        "name": "Location 2",
        "lat": "",
        "long": ""
      },
      "UserId": 2,
      "category": "meetup",
      "users": [
        { "id": 1, "email": "user01@test.com" },
        { "id": 2, "email": "user02@test.com" },
        { "id": 3, "email": "user03@test.com" },
        { "id": 4, "email": "user04@test.com" }
      ],
      "description": "lorem ipsum dolor sit amet",
      "status": "status 02"
    },
    { 
      "id": 3,
      "datetime": "2020-04-16T15:24:18.196Z",
      "location": {
        "name": "Location 3",
        "lat": "",
        "long": ""
      },
      "UserId": 3,
      "category": "bussiness",
      "users": [
        { "id": 1, "email": "user01@test.com" },
        { "id": 2, "email": "user02@test.com" },
        { "id": 3, "email": "user03@test.com" },
        { "id": 4, "email": "user04@test.com" }
      ],
      "description": "lorem ipsum dolor sit amet",
      "status": "status 03"
    },
    { 
      "id": 4,
      "datetime": "2020-04-16T15:24:18.196Z",
      "location": {
        "name": "Location 4",
        "lat": "",
        "long": ""
      },
      "UserId": 4,
      "category": "study",
      "users": [
        { "id": 1, "email": "user01@test.com" },
        { "id": 2, "email": "user02@test.com" },
        { "id": 3, "email": "user03@test.com" },
        { "id": 4, "email": "user04@test.com" }
      ],
      "description": "lorem ipsum dolor sit amet",
      "status": "status 04"
    },
    { 
      "id": 5,
      "datetime": "2020-04-16T15:24:18.196Z",
      "location": {
        "name": "Location 4",
        "lat": "",
        "long": ""
      },
      "UserId": 4,
      "category": "study",
      "users": [
        { "id": 1, "email": "user01@test.com" },
        { "id": 2, "email": "user02@test.com" },
        { "id": 3, "email": "user03@test.com" },
        { "id": 4, "email": "user04@test.com" }
      ],
      "description": "lorem ipsum dolor sit amet",
      "status": "status 04"
    },
    { 
      "id": 6,
      "datetime": "2020-04-16T15:24:18.196Z",
      "location": {
        "name": "Location 4",
        "lat": "",
        "long": ""
      },
      "UserId": 4,
      "category": "study",
      "users": [
        { "id": 1, "email": "user01@test.com" },
        { "id": 2, "email": "user02@test.com" },
        { "id": 3, "email": "user03@test.com" },
        { "id": 4, "email": "user04@test.com" }
      ],
      "description": "lorem ipsum dolor sit amet",
      "status": "status 04"
    },
    { 
      "id": 7,
      "datetime": "2020-04-16T15:24:18.196Z",
      "location": {
        "name": "Location 4",
        "lat": "",
        "long": ""
      },
      "UserId": 4,
      "category": "game",
      "users": [
        { "id": 1, "email": "user01@test.com" },
        { "id": 2, "email": "user02@test.com" },
        { "id": 3, "email": "user03@test.com" },
        { "id": 4, "email": "user04@test.com" }
      ],
      "description": "lorem ipsum dolor sit amet",
      "status": "status 04"
    }
  ],
  event: {},
  ////////////////////////////////////////
  event_status: {
    postEvent: 'create', // ['create', 'success']
    postLoading: false
  },
  submitEventError: {
    datetime: null,
    name: null,
    category: null,
    description: null,
    maxAttendees: null
  },
  detail_status: {
    fetchLoading: false
  },
  atendees: [],
  category: 'All',
  categories: ['All', 'Game', 'Study', 'Bussiness', 'Meetup'],
  registerError: {
    firstname: null,
    lastname: null,
    email: null,
    photo_url: null,
    password: null
  },
  registerLoading: true,
  loginError: {
    email: null,
    password: null,
    message: null
  },
  loginLoading: false,
  testVal: ''
}

function reducers(state = initialState, actions) {
  const { type, payload } = actions;
  switch(type) {
    // case "TOGGLE_FETCH_DETAIL_LOADING": {
    //   if (payload) {
    //     return {
    //       ...state,
    //       detail_status: {
    //         ...state.detail_status,
    //         fetchLoading: payload
    //       }
    //     }
    //   } else {
    //     return {
    //       ...state,
    //       detail_status: {
    //         ...state.detail_status,
    //         fetchLoading: !state.detail_status.fetchLoading
    //       }
    //     }
    //   }
    // }
    // case "CLEAR_SUBMIT_EVENT_ERROR": {
    //   return {
    //     ...state,
    //     submitEventError: {
    //       datetime: null,
    //       name: null,
    //       category: null,
    //       description: null,
    //       maxAttendees: null
    //     }
    //   }
    // }
    // case "SET_SUBMIT_EVENT_ERROR": {
    //   return {
    //     ...state,
    //     submitEventError: {
    //       ...state.submitEventError,
    //       datetime: payload.datetime || null,
    //       name: payload.name || null,
    //       category: payload.category || null,
    //       description: payload.description || null,
    //       maxAttendees: payload.maxAttendees || null,
    //     }
    //   }
    // }
    // case "TOGGLE_SUBMIT_EVENT_LOADING": {
    //   if (!payload) {
    //     return {
    //       ...state,
    //       event_status: {
    //         ...state.event_status,
    //         postLoading: !state.event_status.postLoading
    //       }
    //     }
    //   } else {
    //     return {
    //       ...state,
    //       event_status: {
    //         ...state.event_status,
    //         postLoading: payload
    //       }
    //     }
    //   }
    // }
    // case "TOGGLE_SUBMIT_EVENT_SUCCESS": {
    //   return {
    //     ...state,
    //     event_status: {
    //       ...state.event_status,
    //       postEvent: 'success'
    //     }
    //   }
    // }
    // case "TOGGLE_SUBMIT_EVENT": {
    //   return {
    //     ...state,
    //     event_status: {
    //       ...state.event_status,
    //       postEvent: 'create'
    //     }
    //   }
    // }
    // case "TOGGLE_LOGIN_LOADING": {
    //   if (payload) {
    //     return {
    //       ...state,
    //       loginLoading: payload
    //     }
    //   } else {
    //     return {
    //       ...state,
    //       loginLoading: !state.loginLoading
    //     }
    //   }
    // }
    // case "CLEAR_LOGIN_ERROR": {
    //   return {
    //     ...state,
    //     loginError: {
    //       email: null,
    //       password: null,
    //       message: null
    //     }
    //   }
    // }
    // case "SET_LOGIN_ERROR": {
    //   return {
    //     ...state,
    //     loginError: {
    //       ...state.loginError,
    //       email: payload.email || null,
    //       password: payload.password || null,
    //       message: payload.message || null
    //     }
    //   }
    // }
    // case "TOGGLE_REGISTER_LOADING": {
    //   if (payload) {
    //     return {
    //       ...state,
    //       registerLoading: payload
    //     }
    //   } else {
    //     return {
    //       ...state,
    //       registerLoading: !state.registerLoading
    //     }
    //   }
    // }
    // case "SET_REGISTER_ERROR": {
    //   return {
    //     ...state,
    //     registerError: {
    //       firstname: payload.firstname,
    //       lastname: payload.lastname,
    //       email: payload.email,
    //       photo_url: payload.photo_url,
    //       password: payload.password
    //     }
    //   }
    // }
    // case "CLEAR_REGISTER_ERROR": {
    //   return {
    //     ...state,
    //     registerError: {
    //       firstname: null,
    //       lastname: null,
    //       email: null,
    //       photo_url: null,
    //       passowrd: null
    //     }
    //   }
    // }
    // case "CLEAR_USER_CRED": {
    //   return {
    //     ...state,
    //     userCred: {
    //       id: null,
    //       firstname: null,
    //       lastname: null,
    //       email: null,
    //       photo_url: null,
    //       access_token: null
    //     }
    //   }
    // }
    // case "SET_USER_CRED": {
    //   return {
    //     ...state,
    //     userCred: {
    //       ...state.userCred,
    //       id: payload.id,
    //       firstname: payload.name,
    //       lastname: payload.lastname,
    //       email: payload.email,
    //       photo_url: payload.photo_url,
    //       access_token: payload.access_token
    //     }
    //   }
    // }
    // case "TOGGLE_NEED_LOGIN": {
    //   if (payload !== true && payload !== false) {
    //     return {
    //       ...state,
    //       needLogin: !state.needLogin
    //     }
    //   }
    //   return {
    //     ...state,
    //     needLogin: payload
    //   }
    // }
    // case "SET_PROFILE": {
    //   if (payload) {
    //     return {
    //       ...state,
    //       profile: payload
    //     }
    //   }
    //   return {
    //     ...state
    //   }
    // }
    // case "SET_ATENDEES": {
    //   if (payload) {
    //     return {
    //       ...state,
    //       atendees: payload
    //     }
    //   }
    //   return {
    //     ...state
    //   }
    // }
    // case "SET_EVENT": {
    //   if (payload) {
    //     return {
    //       ...state,
    //       event: payload
    //     }
    //   } else {
    //     return {
    //       ...state
    //     }
    //   }
    // }
    // case "SET_CATEGORY": {
    //   if (state.categories.includes(payload)) {
    //     return {
    //       ...state,
    //       category: payload
    //     }
    //   } else {
    //     return {
    //       ...state
    //     }
    //   }
    // }
    // case "SET_EVENTS": {
    //   return {
    //     ...state,
    //     events: payload
    //   }
    // }
    // case "SET_EVENTS_STATUS": {
    //   return {
    //     ...state,
    //     events_status: payload
    //   }
    // }
    case "SET_SCREEN_ERROR": {
      return {
        ...state,
        screenError: payload
      }
    }
    case "SET_SCREEN_LOADING": {
      return {
        ...state,
        screenLoading: payload
      }
    }
    case "SET_TEST_VALUE": {
      return {
        ...state,
        testVal: payload
      }
    }
    default: {
      return state
    }
  }
}

export default reducers;