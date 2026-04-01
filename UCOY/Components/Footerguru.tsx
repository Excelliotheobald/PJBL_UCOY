import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Animated,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { House, UserRound, Plus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";

const { width } = Dimensions.get("window");

/* ====== PERUBAHAN DISINI ====== */
const CENTER_BUTTON_SIZE = 65;
const TAB_BAR_HEIGHT = 105; // ⬆️ DULU 80 → SEKARANG 105 (lebih naik & tebal)
const GAP = 15;
const CURVE_DEPTH = 55; // ⬆️ DULU 40 → SEKARANG 55 (agar proporsional)
/* ================================= */

const COLORS = {
  primary: "#1E2CC1",
  shadow: "#000000",
  subBackground: "#ffffff",
  textActive: "#1E2CC1",
  textInactive: "#9DB2CE",
};

const R = CENTER_BUTTON_SIZE / 1.5;
const CX = width / 2;
const X1 = CX - R - GAP;
const X2 = CX + R + GAP;
const H = TAB_BAR_HEIGHT;

const getPath = () => `
  M 0 0
  L ${X1} 0
  C ${X1 + 20} 0, ${X1 + 10} ${CURVE_DEPTH}, ${CX} ${CURVE_DEPTH}
  C ${X2 - 10} ${CURVE_DEPTH}, ${X2 - 20} 0, ${X2} 0
  L ${width} 0
  L ${width} ${H}
  L 0 ${H}
  Z
`;

interface Props {
  activeTab: "home" | "profile";
}

export default function Footerguru({ activeTab }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const glowAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1.6,
          duration: 700,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.9,
          duration: 700,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const glowStyle = {
    shadowColor: COLORS.primary,
    shadowOpacity: 1,
    shadowRadius: glowAnim.interpolate({
      inputRange: [0.9, 1.6],
      outputRange: [20, 40],
    }),
    shadowOffset: { width: 0, height: 0 },
  };

  return (
    <View style={styles.footerWrapper}>
      {/* SVG Background */}
      <Svg
        width={width}
        height={TAB_BAR_HEIGHT}
        viewBox={`0 0 ${width} ${TAB_BAR_HEIGHT}`}
         style={[styles.svg, { bottom: 0.3 }]}
      >
        <Path d={getPath()} fill={COLORS.shadow}opacity={0.3} />
      </Svg>

       <Svg
        width={width}
        height={TAB_BAR_HEIGHT}
        viewBox={`0 0 ${width} ${TAB_BAR_HEIGHT}`}
        style={styles.svg}
      >
        <Path d={getPath()} fill={COLORS.subBackground} />
      </Svg>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabLeft}
          onPress={() => navigation.navigate("Guru")}
        >
          <House
            size={30}
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

        <View style={styles.centerSpacer} />

        <TouchableOpacity
          style={styles.tabRight}
          onPress={() => navigation.navigate("Profileguru")}
        >
          <UserRound
            size={30}
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

      {/* Floating Button */}
      <Animated.View style={[styles.fabButton, glowStyle]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("formbuatkelas")}
          style={styles.fabInside}
        >
          <Plus size={32} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: TAB_BAR_HEIGHT,
    zIndex: 4,
    elevation: 30,
    ...Platform.select({
      android: { elevation: 30 },
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: -4 },
        shadowRadius: 10,
      },
    }),
  },

  svg: {
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },

  tabContainer: {
    flexDirection: "row",
    height: TAB_BAR_HEIGHT,
    paddingTop: 10, // dinaikkan sedikit supaya seimbang
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
    marginTop: 10,
    position: "absolute",
    top: -CURVE_DEPTH + 15,
    left: width / 2 - CENTER_BUTTON_SIZE / 2,
    width: CENTER_BUTTON_SIZE,
    height: CENTER_BUTTON_SIZE,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
    borderWidth: 1,
    borderColor: "#3246ff",
    ...Platform.select({
      android: {
        elevation: 10,
      },
      ios: {
        shadowColor: "#1E2CC1",
        shadowOffset: { width: 0, height: 0 },
      },
    }),
  },

  fabInside: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
