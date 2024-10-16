import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { setItem } from '../utils/asyncStorage';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('Home');
    setItem('onboarded', '1');
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Done</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: '#FFBD73',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  style={{ flex: 1 }}
                  source={require('../assets/animations/productivity.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Boost Your Productivity',
            subtitle: 'Join our Udemig courses to enhance your skills!',
          },
          {
            backgroundColor: '#BBE9FF',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  style={{ flex: 1 }}
                  source={require('../assets/animations/workhard.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Work Without Interruptions',
            subtitle:
              'Complete your tasks smoothly with our productivity tips.',
          },
          {
            backgroundColor: '#FF6868',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  style={{ flex: 1 }}
                  source={require('../assets/animations/goals.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Reach Higher Goals',
            subtitle:
              'Utilize our platform to achieve your professional aspirations.',
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 20,
  },
});
