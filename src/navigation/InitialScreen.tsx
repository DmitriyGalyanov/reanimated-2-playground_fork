import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { commonStyles } from 'shared';

import DropdownView, { ContainerStateIdEnum } from 'components/DropdownView';
import SlidingView from 'components/SlidingView';
import TestAnim from 'features/TestAnim';

const InitialScreen = () => {
  // SlidingView
  const [shouldShowSlidingView, setShouldShowSlidingView] = useState(true);

  const toggleSlidingView = () => {
    setShouldShowSlidingView((currentValue) => !currentValue);
  };

  const renderSlidingViewBlock = () => (
    <>
      <SlidingView shouldShow={shouldShowSlidingView} slideFrom={'left'}>
        <View style={styles.slidingViewContentWrap}>
          <Text style={styles.text}>
            Text inside initially shown SlidingView
          </Text>
        </View>
      </SlidingView>
      <TouchableOpacity
        style={styles.toggleSlidingViewButtonWrap}
        onPress={toggleSlidingView}
      >
        <Text>Toggle SlidingView</Text>
      </TouchableOpacity>
    </>
  );

  // DropdownView
  const renderDropdownView = () => (
    <DropdownView
      wrapStyle={styles.dropdownViewWrap}
      title={'Initially open DropdownView'}
      initialContainerState={ContainerStateIdEnum.open}
    >
      <View style={styles.dropdownViewContentWrap}>
        <View style={styles.dropdownInnerViewWrap}>
          <Text style={styles.text}>
            Text of the first view in the Dropdown View asdasd
          </Text>
        </View>
        <View style={styles.dropdownInnerViewWrap}>
          <Text style={styles.text}>
            Text of the second view in the DropdownView
          </Text>
        </View>
      </View>
    </DropdownView>
  );

  // TestAnim
  const renderTestAnim = () => (
    <View style={{ flex: 1, backgroundColor: 'gray', paddingTop: 40 }}>
      <TestAnim />
    </View>
  );

  return (
    <View style={commonStyles.screenWrap}>
      {/*{renderSlidingViewBlock()}*/}
      {/*{renderDropdownView()}*/}
      {renderTestAnim()}
    </View>
  );
};

const styles = StyleSheet.create({
  toggleSlidingViewButtonWrap: {
    marginTop: 50,
    backgroundColor: 'lightblue',
    padding: 12,
    borderRadius: 8,
  },

  dropdownViewWrap: {
    marginTop: 20,
  },
  dropdownViewContentWrap: {
    backgroundColor: 'lightgray',
    padding: 8,
  },
  dropdownInnerViewWrap: {
    backgroundColor: 'pink',
    padding: 16,
    marginBottom: 12,
  },

  slidingViewContentWrap: {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 4,
  },

  text: {
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    flexWrap: 'wrap',
  },

  imageWrap: {
    flex: 1,
    backgroundColor: 'green',
  },
  image: {
    width: 200,
    aspectRatio: 1,
  },
});

export default InitialScreen;
