// import {Navigation} from 'react-native-navigation';
import {goToHome} from '../../navigation';

// gets the current screen from navigation state
// function getActiveRouteName(navigationState) {
//   if (!navigationState) {
//     return null;
//   }
//   const route = navigationState.routes[navigationState.index];
//   // dive into nested navigators
//   if (route.routes) {
//     return getActiveRouteName(route);
//   }
//   return route.routeName;
// }

// function findComponentId(name) {
//   var propsById = null;

//   var propsByIdList = Navigation.store.propsById;

//   for (var k in propsByIdList) {
//     var value = propsByIdList[k];

//     if (value.name == name) {
//       propsById = k;
//       break;
//     }
//   }

//   return propsById;
// }

export const findBottomsTabIndex = name => {
  /*
  name = name.replace("rnsk.tabs.", "");
  var tabs = Navigation.store.componentsByName.rnsk.tabs;
  var index = -1;

  for (var k in tabs) {

    var i = Object.keys(tabs).indexOf(k);

    if (name == k) {
      index = i - 1;
      break;
    }
  }
  return index;
  */
};

const screenTracking = ({getState}) => next => action => {
  var state = getState();

  const result = next(action);
  return result;
};

export default screenTracking;
