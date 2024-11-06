// import { StyleSheet, ScrollView, View, Platform } from "react-native";
//
// import { gradients } from "@/gradients";
// import GradientItem from "@/components/GradientItem";
//
// export default function HomeScreen() {
//   return (
//     <>
//       <ScrollView contentContainerStyle={styles.container}>
//         {gradients.map((row, rowIndex) => (
//           <View key={rowIndex} style={styles.row}>
//             {row.map(({ name, colors }, index) => (
//               <GradientItem
//                 key={index}
//                 colors={[colors[0], colors[1]]}
//                 gradientName={name}
//               // style={StyleSheet.absoluteFill}
//               />
//             ))}
//           </View>
//         ))}
//       </ScrollView>
//     </>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     paddingTop: Platform.OS == "ios" ? 130 : 0,
//   },
//    row: {
//     flexDirection: "row",
//   },
// });

import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Platform, ActivityIndicator, Text } from "react-native";
import GradientItem from "@/components/GradientItem";

export default function HomeScreen() {
  const [gradients, setGradients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch gradients from API on component mount
  useEffect(() => {
    const fetchGradients = async () => {
      try {
        const response = await fetch("http://192.168.1.19:5030/colors"); // Replace with your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch gradients");
        }
        const data = await response.json();
        console.log(data);
        setGradients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGradients();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  if (error) {
    return <View style={styles.error}><Text>{error}</Text></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        {gradients.map((item, index) => {
          // console.log(index, typeof item.name, item.colors[0], item.colors[1]);
          return (
            <GradientItem
              key={index}
              colors={[item.colors[0], item.colors[1]]}
              gradientName={item.name}
            />)
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS == "ios" ? 130 : 0,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    // marginBottom: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
