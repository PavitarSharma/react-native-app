import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { HeroImage } from "../assets";
import * as Animatable from "react-native-animatable";

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1 relative">
      {/* First Section */}
      <View className="flex-row px-4 mt-8 items-center space-x-2">
        <View className="w-14 h-14 rounded-full bg-black items-center justify-center">
          <Text className="text-[#00BCC9] text-2xl font-semibold">Go</Text>
        </View>

        <Text className="text-[#2a2b4b] text-2xl font-semibold">Travel</Text>
      </View>

      <View className="px-6 mt-6 space-y-3">
        <Text className="text-[#3c6072] text-[30px]">Enjoy the trip with</Text>
        <Text className="text-[#00bcc9] font-bold text-[28px]">
          Good Moments
        </Text>

        <Text className="text-[#3c6072] text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Reprehenderit
        </Text>
      </View>

      {/* circle section */}

      <View className="w-[300px] h-[300px] rounded-full bg-[#00BCC9] absolute bottom-20 -right-20"></View>
      <View className="w-[300px] h-[300px] rounded-full bg-[#E99265] absolute -bottom-36 -left-20"></View>

      {/* image container */}
      <View className="flex-1 relative items-center justify-center">
        <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={HeroImage}
          className="object-cover mt-20 h-full w-full "
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Discover")}
          className="absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center"
        >
          <Animatable.View
            animation={"pulse"}
            easing="ease-in-out"
            iterationCount={"infinite"}
            className="w-20 h-20 items-center justify-center rounded-full bg-[#00BCC9]"
          >
            <Text className="text-gray-50 text-[36px] font-semibold">Go</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
