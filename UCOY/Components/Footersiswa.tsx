import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";

import Svg, { Path } from "react-native-svg";

import {
  House,
  UserRound,
  BookOpen,
} from "lucide-react-native";

import { useNavigation } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";

const { width } = Dimensions.get("window");

const CENTER_BUTTON_SIZE = 68;
const TAB_BAR_HEIGHT = 88;
const GAP = 14;

const COLORS = {
  primary: "#2B22B6",
  background: "#FFFFFF",
  textActive: "#2B22B6",
  textInactive: "#A8B0C5",
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

export default function Footersiswa({
  activeTab,
}: Props) {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList>
    >();

  return (
    <View style={styles.footerWrapper}>
      {/* SVG BACKGROUND */}

      <Svg
        width={width}
        height={TAB_BAR_HEIGHT}
        viewBox={`0 0 ${width} ${TAB_BAR_HEIGHT}`}
        style={styles.svg}
      >
        <Path
          d={getPath()}
          fill={COLORS.background}
        />
      </Svg>

      {/* TAB */}

      <View style={styles.tabContainer}>
        {/* HOME */}

        <TouchableOpacity
          style={styles.tabLeft}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Siswa")
          }
        >
          <House
            size={25}
            strokeWidth={2.3}
            color={
              activeTab === "home"
                ? COLORS.textActive
                : COLORS.textInactive
            }
          />

          <Text
            style={[
              styles.text,
              {
                color:
                  activeTab === "home"
                    ? COLORS.textActive
                    : COLORS.textInactive,
              },
            ]}
          >
            Beranda
          </Text>
        </TouchableOpacity>

        {/* SPACER */}

        <View style={styles.centerSpacer} />

        {/* PROFILE */}

        <TouchableOpacity
          style={styles.tabRight}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Profilesiswa")
          }
        >
          <UserRound
            size={25}
            strokeWidth={2.3}
            color={
              activeTab === "profile"
                ? COLORS.textActive
                : COLORS.textInactive
            }
          />

          <Text
            style={[
              styles.text,
              {
                color:
                  activeTab === "profile"
                    ? COLORS.textActive
                    : COLORS.textInactive,
              },
            ]}
          >
            Profil
          </Text>
        </TouchableOpacity>
      </View>

      {/* FLOAT BUTTON */}

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.fabButton}
      >
        <BookOpen
          size={30}
          strokeWidth={2.4}
          color="#FFFFFF"
        />
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
    paddingTop: 6,
    justifyContent: "space-between",
    zIndex: 2,
  },

  tabLeft: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
  },

  tabRight: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 22,
  },

  centerSpacer: {
    width:
      CENTER_BUTTON_SIZE +
      GAP * 2 +
      28,
  },

  text: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: "600",
    letterSpacing: 0.1,
  },

  fabButton: {
    position: "absolute",
    top: -CURVE_DEPTH + 11,
    left:
      width / 2 -
      CENTER_BUTTON_SIZE / 2,

    width: CENTER_BUTTON_SIZE,
    height: CENTER_BUTTON_SIZE,
    borderRadius:
      CENTER_BUTTON_SIZE / 2,

    backgroundColor: COLORS.primary,

    alignItems: "center",
    justifyContent: "center",

    borderColor: "#FFFFFF",
    borderWidth: 4,

    zIndex: 3,

    ...Platform.select({
      android: {
        elevation: 12,
      },

      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 6,
      },
    }),
  },
});