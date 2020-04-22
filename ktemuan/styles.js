// https://colorhunt.co/palette/169700
// https://colorhunt.co/palette/9506
// https://colorhunt.co/palette/170083
// https://colorhunt.co/palette/171720
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';

const screen = Dimensions.get('screen');
const statusBarHeight = Constants.statusBarHeight;
const backgroundOpacity = 0.85
export const styles = {
  card: {
    game: {
      borderColor: '#EC7373'
    },
    meetup: {
      borderColor: '#FFE196'
    },
    bussiness: {
      borderColor: '#D8B5B5'
    },
    study: {
      borderColor: '#05DFD7'
    },
    shadow: {
      elevation: 2
    }
  },
  widthFullScreen: {
    width: screen.width,
    height: screen.width
  },
  fullScreenBox: {
    width: screen.width - 50,
    height: screen.width - 50,
    margin: 15
  },
  cardInfoBox: {
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  cardInfo: {
    game: {
      backgroundColor: `rgba(236, 115, 115, ${backgroundOpacity})`
    },
    meetup: {
      backgroundColor: `rgba(255, 225, 150, ${backgroundOpacity})`
    },
    bussiness: {
      backgroundColor: `rgba(216, 181, 181, ${backgroundOpacity})`
    },
    study: {
      backgroundColor: `rgba(5, 223, 215, ${backgroundOpacity})`
    }
  },
  shadow: {
    elevation: 6
  },
  bg: {
    game: {
      backgroundColor: '#EC7373'
    },
    meetup: {
      backgroundColor: '#FFE196'
    },
    bussiness: {
      backgroundColor: '#D8B5B5'
    },
    study: {
      backgroundColor: '#05DFD7'
    }
  },
  container: {
    flex: 1,
  },
  statusBar: {
    paddingTop: statusBarHeight
  }
}