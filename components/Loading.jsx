import {
    View,
    ActivityIndicator,
    Text,
    StyleSheet,
    useWindowDimensions
  } from "react-native";
  
  const Loading = ({ title }) => {
    return (
      <View style={[styles.container, {height: useWindowDimensions().height}]}>
        <ActivityIndicator size={"large"} />
        <Text style={styles.title}>{title || "Please, wait..."}</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    title: {
      fontSize: 15,
      fontWeight: 'bold',
    }
  });
  
  export default Loading;