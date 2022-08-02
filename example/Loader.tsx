import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.loaderView}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default React.memo(Loader);
