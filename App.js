/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const slides = [
  { name: '1', id: 1, image: 'https://source.unsplash.com/user/c_v_r/1900x800' },
  { name: '2', id: 2, image: 'https://source.unsplash.com/user/c_v_r/1900x800' },
  { name: '3', id: 3, image: 'https://source.unsplash.com/user/c_v_r/1900x800' },
  { name: '4', id: 4, image: 'https://source.unsplash.com/user/c_v_r/1900x800' }


]

const { width, height } = Dimensions.get('window');


const App = () => {

  const ref = React.useRef();
  const isDarkMode = useColorScheme() === 'dark';
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Slide = ({ item, index }) => {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Image resizeMode='cover' style={{
            height: '100%', borderRadius: 25, width: '90%', marginLeft: 20,
            position: 'absolute',
            alignItems: 'center', justifyContent: 'center'
          }} source={{ uri: item.image }} />

          <Image
            source={item?.image}
            style={{ height: '100%', width, resizeMode: 'contain' }}
          />
        </View>
      </View>
    );
  };


  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };


  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.12,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>

          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                { backgroundColor: '#d5d5d5' },
                currentSlideIndex == index && {
                  backgroundColor: 'blue',
                },
              ]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.title}>view all</Text>
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.73 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item, index }) => <Slide item={item} index={index} />}
      />
      <Footer />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  subtitle: {
    color: 'white',
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
    fontFamily: 'MarkPro'
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 10,
    width: 10,
    marginHorizontal: 3,
    borderRadius: 5,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
