import React from 'react';

import PlaygroundExample from 'components/PlaygroundExample';
import { SafeAreaView } from 'react-native';

// import  './components/DropdownView/index';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PlaygroundExample />
      {/*<DropdownView />*/}
    </SafeAreaView>
  );
};

export default App;
