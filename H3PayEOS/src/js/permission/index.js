import Permissions from 'react-native-permissions'

export const checkPermissionAsync = async () => {
    var response = await Permissions.check('camera', { type: 'always' }).then(response => {
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        return response;
    })
    return response;
}

export const checkMultiplePermissionAsync = async () => {
    var response = await Permissions.checkMultiple(['camera', 'location']).then(response => {
      console.log('response', response);  
      //response is an object mapping type to permission
        /*
        this.setState({
          cameraPermission: response.camera,
          locationPermission: response.location,
        });
        */
        return response;
      });
    return response;
}


export const requestPermissionAsync = async (type = 'camera') => {
    var response = await Permissions.request(type, { type: 'always' }).then(response => {
        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        return response;
      })
    return response;
}
