import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from "../assets";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Menu from "../components/Menu";
import { FontAwesome } from "@expo/vector-icons";
import CardItem from "../components/CardItem";
import { getPlacesData } from "../api";

const DiscoverScreen = () => {
  const navigation = useNavigation();
  const [type, setType] = useState("restaurants");
  const [isLaoding, setIsLaoding] = useState(false);
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setIsLaoding(true);
    getPlacesData(type).then((data) => {
      setData(data);
      setInterval(() => {
        setIsLaoding(false);
      }, 2000);
    });
  }, [type]);

  return (
    <SafeAreaView className="bg-white flex-1 relative">
      {/* First Section */}
      <View className="flex-row mt-8 items-center justify-between px-4">
        <View>
          <Text className="text-[32px] text-[#0B646B] font-bold">Discover</Text>
          <Text className="text-[#527283] text-[28px]">the beauty today</Text>
        </View>

        <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
          <Image
            source={Avatar}
            className="w-full h-full rounded-md object-cover"
          />
        </View>
      </View>

      <View className="flex-row items-center justify-center bg-white mx-4 rounded-xl mt-8 py-1 px-4 shadow-sm">
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: "AIzaSyDWpuVw2apN-Xgx3gmrZsgr1AG4sCxQ",
            language: "en",
          }}
        />
      </View>

      {/* Menu Conatiner */}

      {isLaoding ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#006468" />
        </View>
      ) : (
        <ScrollView>
          <View className="flex-row items-center justify-between px-4 mt-8">
            <Menu
              key="hotels"
              title="Hotels"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />
            <Menu
              key="attractions"
              title="Attraction"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />
            <Menu
              key="restaurants"
              title="Restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>

          <View className="px-4 mt-8">
            <View className="flex-row items-center justify-between">
              <Text className="text-[#2c7379] text-[24px] font-bold">
                Top Tips
              </Text>
              <TouchableOpacity className="flex-row items-center space-x-2 justify-center">
                <Text className="text-[#a0c4c7] text-[18px] font-bold">
                  Explore
                </Text>
                <FontAwesome
                  name="long-arrow-right"
                  size={24}
                  color="#a0c4c7"
                />
              </TouchableOpacity>
            </View>

            <View className="px-4 mt-8 flex-row items-center  flex-wrap">
              {data?.length > 0 ? (
                data &&
                data?.map((data, i) => (
                  <CardItem
                    key={i}
                    imageSrc={
                      data?.photo?.images?.medium?.url
                        ? data?.photo?.images?.medium?.url
                        : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
                    }
                    title={data?.name}
                    location={data?.location_string}
                    data={data}
                  />
                ))
              ) : (
                <View className="w-full h-[200px] items-center space-y-4 justify-center">
                  <Image source={NotFound} className="w-20 h-20 object-cover" />
                  <Text className="text-lg text-[#428288] font-semibold">
                    Opps...No Data Found
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default DiscoverScreen;
