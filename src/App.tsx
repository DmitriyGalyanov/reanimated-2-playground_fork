import React from 'react';
import { SafeAreaView, View } from 'react-native';

import { commonStyles } from 'shared';
import InitialScreen from 'navigation/InitialScreen';

const App = () => {
  return (
    <View style={commonStyles.screenWrap}>
      <SafeAreaView style={commonStyles.screenWrap}>
        <InitialScreen />
      </SafeAreaView>
    </View>
  );
};

export default App;
