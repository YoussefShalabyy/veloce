// import { View, Text,Image ,SafeAreaView ,ScrollView,StyleSheet,FlatList,TouchableOpacity} from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useLocalSearchParams } from 'expo-router';
// import { db } from '../../firebase'; 

// import {
//     doc,
//     collection,
//     getDoc,
//     query,
//     getDocs,
//     where,
//     orderBy,
//     updateDoc,
//     deleteDoc,
//     addDoc,
//     setDoc
// } from 'firebase/firestore';
// import { constant } from 'lodash';

// const [image, setImage] = useState('');

//   const handleImageLoad = () => {
//     setImage('https://example.com/car-image.jpg'); // Replace with the actual image URL
//   };


// export default function Page() {
    
// const {id} = useLocalSearchParams();
// const [car, setCar]=useState({});
// useEffect(
//     ()=>{
//     getDocFunc('cars','2wNLQWLczsdcrTKBoNrF');
//     }
//     ,[]
// ) 
// async function getDocFunc ( Collection, Doc ) {
//     const docRef = doc(db, Collection, Doc);
//     const data =  (await getDoc(docRef)).data();
//     setCar(data)
//     console.log(data.price);
// }
//     return (
//         <SafeAreaView style={styles.container1}>
        
//       {/* <ScrollView contentContainerStyle={styles.container}>
//        <Image source={{ uri: car.images[0] }} style={styles.image} />
//       <View style={styles.detailsContainer}>
//         <Text style={styles.title}>{car.name}</Text>
//         <Text style={styles.subtitle}>Brand: {car.brand}</Text>
//         <Text style={styles.subtitle}>Location: {car.location}</Text>
//         <Text style={styles.subtitle}>Year: {car.year}</Text>
//         <Text style={styles.subtitle}>Color: {car.color}</Text>
//         <Text style={styles.subtitle}>Description: {car.description}</Text>
//         <Text style={styles.subtitle}>Price: ${car.price}</Text>
       
//       </View>
//     </ScrollView> */}

// {/* <ScrollView contentContainerStyle={styles.container}>
// <View style={styles.imageContainer}>
//   <Image source={{ uri: car.image }} style={styles.image} />
// </View>
// <View style={styles.detailsContainer}>
//   <Text style={styles.title}>{car.name}</Text>
//   <View style={styles.row}>
//     <Text style={styles.subtitle}>Brand:</Text>
//     <Text style={styles.info}>{car.brand}</Text>
//   </View>
//   <View style={styles.row}>
//     <Text style={styles.subtitle}>Location:</Text>
//     <Text style={styles.info}>{car.location}</Text>
//   </View>
//   <View style={styles.row}>
//     <Text style={styles.subtitle}>Year:</Text>
//     <Text style={styles.info}>{car.year}</Text>
//   </View>
//   <View style={styles.row}>
//     <Text style={styles.subtitle}>Color:</Text>
//     <Text style={styles.info}>{car.color}</Text>
//   </View>
//   <View style={styles.row}>
//     <Text style={styles.subtitle}>Description:</Text>
//     <Text style={styles.info}>{car.description}</Text>
//   </View>
//   <View style={styles.row}>
//     <Text style={styles.subtitle}>Price:</Text>
//     <Text style={[styles.info, styles.price]}>${car.price}</Text>
//   </View>
// </View>
// </ScrollView> */}
// <View style={styles.container}>
//       <View style={styles.header}>
//         {/* Icons for menu, search, and add listing would go here */}
//       </View>
//       <View style={styles.logoContainer}>
//         {/* <Image
//           // source={require('./path-to-your-mercedes-logo.png')}
//           style={styles.logo}
//           resizeMode="contain"
//         /> */}
//         <Text style={styles.noImageText}>No Images</Text>
//       </View>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.detailText}>Make: Mercedes</Text>
//         <Text style={styles.detailText}>Model: G Class</Text>
//         <Text style={styles.detailText}>Class: A/T / AMG G 63 / NIGHT EDITION</Text>
//         <Text style={styles.detailText}>Used since: 2022</Text>
//         <Text style={styles.detailText}>Km: 9,000 Km</Text>
//         <Text style={styles.detailText}>Transmission: automatic</Text>
//         <Text style={styles.detailText}>City: Tagamo3 - New Cairo</Text>
//         <Text style={styles.detailText}>Color: Gray</Text>
//         <Text style={styles.detailText}>Fuel: gas</Text>
//       </View>
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Buy Your Car Insurance</Text>
//         <Text style={styles.priceText}>Starting from 227,500 EGP / Year</Text>
//       </TouchableOpacity>
//       <View style={styles.contactContainer}>
//         <Text style={styles.contactText}>SHOW NUMBER</Text>
//       </View>
//     </View>
//       </SafeAreaView>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e1e1e1',
//   },
//   searchBar: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#d6d7da',
//     borderRadius: 15,
//     padding: 10,
//     marginRight: 10,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 20,
//   },
//   logo: {
//     width: 150,
//     height: 150,
//   },
//   noImageText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#888',
//   },
//   detailsContainer: {
//     padding: 20,
//   },
//   detailText: {
//     fontSize: 18,
//     marginBottom: 5,
//   },
//   button: {
//     backgroundColor: 'orange',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: '#fff',
//   },
//   priceText: {
//     fontSize: 16,
//     color: '#fff',
//   },
//   // container: {
//   //   padding: 20,
//   //   borderTopWidth: 1,
//   //   borderTopColor: '#e1e1e1',
//   //   alignItems: 'center',
//   // },
//   // contactText: {
//   //   fontSize: 18,
//   //   color: '#007bff',
//   // },
//   // container: {
//   //   flex: 1,
//   //   padding: 20,
//   //   backgroundColor: '#fff',
//   // },
//   // detailContainer: {
//   //   flexDirection: 'row',
//   //   justifyContent: 'space-between',
//   //   marginBottom: 10,
//   // },
//   // label: {
//   //   fontSize: 16,
//   //   fontWeight: 'bold',
//   //   color: '#333',
//   // },
//   // value: {
//   //   fontSize: 16,
//   //   color: '#666',
//   // },
//   // header: {
//   //   fontSize: 20,
//   //   fontWeight: 'bold',
//   //   color: '#333',
//   //   marginBottom: 20,
//   // },
//   // iconContainer: {
//   //   flexDirection: 'row',
//   //   justifyContent: 'flex-end',
//   // },
//   // icon: {
//   //   marginLeft: 10,
//   // },
// });



// // const styles = StyleSheet.create({
// //   container: {
// //     flexGrow: 1,
// //     backgroundColor: '#fff',
// //     padding: 20,
// //   },
// //   imageContainer: {
// //     alignItems: 'center',
// //     marginBottom: 20,
// //   },
// //   image: {
// //     width: '100%',
// //     height: 200,
// //     resizeMode: 'cover',
// //     borderRadius: 10,
// //   },
// //   detailsContainer: {
// //     marginBottom: 20,
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //   },
// //   row: {
// //     flexDirection: 'row',
// //     marginBottom: 5,
// //   },
// //   subtitle: {
// //     fontSize: 16,
// //     marginRight: 5,
// //     fontWeight: 'bold',
// //     color: '#555',
// //   },
// //   info: {
// //     fontSize: 16,
// //     color: '#333',
// //   },
// //   price: {
// //     color: 'green',
// //     fontWeight: 'bold',
// //   },
// // });
// // const styles = StyleSheet.create({
// //   container: {
// //     flexGrow: 1,
// //     backgroundColor: '#fff',
// //     padding: 20,
// //   },
// //   image: {
// //     width: '100%',
// //     height: 200,
// //     resizeMode: 'cover',
// //     marginBottom: 20,
// //   },
// //   detailsContainer: {
// //     marginBottom: 20,
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //   },
// //   subtitle: {
// //     fontSize: 16,
// //     marginBottom: 5,
// //   },
// // });



// // const styles = StyleSheet.create({
// //     container1: {
// //       position: "absolute",
// //       top: 0,
// //       bottom: 0,
// //       paddingTop: 40,
// //       paddingBottom: 20,
// //       minWidth: "100%",
// //       flex: 1,
// //       backgroundColor: "green",
// //       alignItems: "center",
// //     },
// //     innerContainer: {
// //       flex: 1,
// //       minWidth: "100%",
// //       justifyContent: "center",
// //       alignContent: "center",
// //       alignItems: "center",
// //     },
// //     HeaderView: {
// //       paddingHorizontal: 20,
// //       flexDirection: "row",
// //       justifyContent: "space-between",
// //       alignItems: "center",
// //       borderRadius: 10,
// //       shadowColor: "#000",
// //       shadowOffset: {
// //         width: 0,
// //         height: 2,
// //       },
// //       shadowOpacity: 0.25,
// //       shadowRadius: 3.84,
// //       elevation: 5,
// //       paddingVertical: 5,
// //     },
// //     LogoView: {
// //       justifyContent: "center",
// //       alignItems: "center",
// //       maxHeight: 100,
// //       minHeight: 100,
// //       maxWidth: 140,
// //       minWidth: 140,
// //       borderRadius: 100,
// //     },
// //     BrandLogo: {
// //       width: 200,
// //       height: 100,
// //       resizeMode: "contain",
// //     },
// //     BrandData: {
// //       justifyContent: "center",
// //       alignItems: "center",
// //       width: "50%",
// //     },
// //     BrandName: {
// //       fontSize: 30,
// //       fontWeight: "bold",
// //     },
// //     bodyTypesView: {
// //       marginTop: -10,
// //       paddingTop: 10,
// //       zIndex: -1,
// //       minHeight: 70,
// //       maxHeight: 70,
// //       paddingHorizontal: 24,
// //       minWidth: "100%",
// //     },
// //     BrandsList: {
// //       marginTop: -10,
// //       backgroundColor: "blue",
// //       maxHeight: 60,
// //       minHeight: 60,
// //       borderBottomLeftRadius: 10,
// //       borderBottomRightRadius: 10,
// //     },
// //     bodyTypeItem: {
// //       backgroundColor: "gray",
// //       marginTop: 15,
// //       marginBottom: 5,
// //       borderRadius: 5,
// //       marginHorizontal: 5,
// //       paddingHorizontal: 10,
// //       paddingVertical: 5,
// //       width: 100,
// //       justifyContent: "center",
// //       alignItems: "center",
// //     },
// //     selectedBodyTypeItem: {
// //       backgroundColor: "yellow",
// //     },
// //     bodyTypeText: {
// //       fontSize: 20,
// //       fontWeight: "400",
// //     },
// //   });
