import React, { Component } from 'react';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';

type Props = {};

export default class ProgressCircleComponent extends Component<Props> {
    render() {
        return (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Progress.Circle size={30} indeterminate={true} borderWidth={2} borderColor="white" fill="#e83350" />
            </View>
        );
    }
}
