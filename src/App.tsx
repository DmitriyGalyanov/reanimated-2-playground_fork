import React from 'react';
import { SafeAreaView } from 'react-native';

import InitialScreen from 'navigation/InitialScreen';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <InitialScreen />
    </SafeAreaView>
  );
};

export default App;
