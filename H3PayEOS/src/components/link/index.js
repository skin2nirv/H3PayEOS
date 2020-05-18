import {Linking } from 'react-native';

export default linkComponent = (url) => {
    Linking.openURL(url);
}
