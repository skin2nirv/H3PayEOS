import React, {Component} from 'react';
import {connect} from 'react-redux';
import Splash from './Splash';

class Setup extends Component {
  render() {
    return <Splash />;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setup);
