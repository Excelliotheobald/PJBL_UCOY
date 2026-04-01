import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from "react-native";
import Svg, { Path } from "react-native-svg";
import { House, UserRound, Plus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";


const { width } = Dimensions.get("window");

const CENTER_BUTTON_SIZE = 70;
const TAB_BAR_HEIGHT = 90;
const GAP = 15;

const COLORS = {
  primary: "#1D1A9B",
  background: "#ffffff",
  textActive: "#1D1A9B",
  textInactive: "#9DB2CE",
};

const R = CENTER_BUTTON_SIZE / 1.5;
const CX = width / 2;
const X1 = CX - R - GAP;
const X2 = CX + R + GAP;
const CURVE_DEPTH = 50;
const H = TAB_BAR_HEIGHT;

const getPath = () => `
  M 0 0
  L ${X1} 0
  C ${X1 + 10} 0, ${X1 + 10} ${CURVE_DEPTH}, ${CX} ${CURVE_DEPTH}
  C ${X2 - 10} ${CURVE_DEPTH}, ${X2 - 10} 0, ${X2} 0
  L ${width} 0
  L ${width} ${H}
  L 0 ${H}
  Z
`;

interface Props {
  activeTab: "home" | "profile";
}

export default function Footersiswa({ activeTab }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.footerWrapper}>
      {/* SVG Background */}
      <Svg
        width={width}
        height={TAB_BAR_HEIGHT}
        viewBox={`0 0 ${width} ${TAB_BAR_HEIGHT}`}
        style={styles.svg}
      >
        <Path d={getPath()} fill={COLORS.background} />
      </Svg>

      {/* Tab Items */}
      <View style={styles.tabContainer}>
        {/* HOME */}
        <TouchableOpacity
          style={styles.tabLeft}
          onPress={() => navigation.navigate("Siswa")}
        >
          <House
            size={30}
            color={activeTab === "home" ? COLORS.textActive : COLORS.textInactive}
          />
          <Text
            style={[
              styles.text,
              { color: activeTab === "home" ? COLORS.textActive : COLORS.textInactive },
            ]}
          >
            Beranda
          </Text>
        </TouchableOpacity>

        {/* Spacer for FAB */}
        <View style={styles.centerSpacer} />

        {/* PROFILE */}
        <TouchableOpacity
          style={styles.tabRight}
          onPress={() => navigation.navigate("Profilesiswa")}
        >
          <UserRound
            size={30}
            color={activeTab === "profile" ? COLORS.textActive : COLORS.textInactive}
          />
          <Text
            style={[
              styles.text,
              { color: activeTab === "profile" ? COLORS.textActive : COLORS.textInactive },
            ]}
          >
            Profil
          </Text>
        </TouchableOpacity>
      </View>

      {/* FLOAT BUTTON */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => console.log("Tambah Data")}
      >
        <Plus size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: TAB_BAR_HEIGHT,
  },

  svg: {
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },

  tabContainer: {
    flexDirection: "row",
    height: TAB_BAR_HEIGHT,
    
    paddingTop: 5,
    justifyContent: "space-between",
    zIndex: 2,
  },

  tabLeft: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
  },

  tabRight: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 20,
  },

  centerSpacer: {
    width: CENTER_BUTTON_SIZE + GAP * 2 + 30,
  },

  text: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "600",
  },

  fabButton: {
    position: "absolute",
    top: -CURVE_DEPTH + 10,
    left: width / 2 - CENTER_BUTTON_SIZE / 2,
    width: CENTER_BUTTON_SIZE,
    height: CENTER_BUTTON_SIZE,
    borderRadius: CENTER_BUTTON_SIZE / 2,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 3,
    zIndex: 3,

    ...Platform.select({
      android: { elevation: 10 },
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
      },
    }),
  },
});
