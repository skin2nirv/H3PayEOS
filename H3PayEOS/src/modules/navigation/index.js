// import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
//import store from '../store'

export const registerScreen = (screenName, component) =>
  Navigation.registerComponent(screenName, () => component)

export const registerScreenWithRedux = (screenName, component, store) =>
  Navigation.registerComponentWithRedux(screenName, () => component, Provider, store);


export const setRoot = (type, id, children) => Navigation.setRoot({
  root: {
    [type]: {
      id,
      children: children,
    },
  },
})

export const _push = (componentId, component) => Navigation.push(componentId, component);
