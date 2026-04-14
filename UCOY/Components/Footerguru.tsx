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

/* ===== FIXED SIZE (MATCHED TO YOUR IMAGE) ===== */
const CENTER_BUTTON_SIZE = 72;
const TAB_BAR_HEIGHT = 80;
const GAP = 8;
const CURVE_DEPTH = 40;
const TAB_BAR_BORDER_RADIUS = 24;
/* ============================================= */

const COLORS = {
  primary: "#1A1CAD", // dark blue exactly like your image
  subBackground: "#ffffff",
  textActive: "#1A1CAD",
  textInactive: "#9CB1CD",
};

// Curve math for perfect semi-circle notch
const FAB_RADIUS = CENTER_BUTTON_SIZE / 2;
const CX = width / 2; // center X of screen
const LEFT_NOTCH_X = CX - FAB_RADIUS - GAP; // start of the notch
const RIGHT_NOTCH_X = CX + FAB_RADIUS + GAP; // end of the notch
const H = TAB_BAR_HEIGHT;


/* ===== ✅ FIXED: NO COMMENTS INSIDE SVG PATH! ===== */
const getPath = () => `
  M ${TAB_BAR_BORDER_RADIUS} 0
  L ${LEFT_NOTCH_X - 8} 0

  C ${LEFT_NOTCH_X + 8} 0, ${LEFT_NOTCH_X} ${CURVE_DEPTH}, ${CX} ${CURVE_DEPTH}

  C ${RIGHT_NOTCH_X} ${CURVE_DEPTH}, ${RIGHT_NOTCH_X - 8} 0, ${RIGHT_NOTCH_X + 8} 0

  L ${width - TAB_BAR_BORDER_RADIUS} 0

  Q ${width} 0 ${width} ${TAB_BAR_BORDER_RADIUS}
  L ${width} ${H}
  L 0 ${H}
  L 0 ${TAB_BAR_BORDER_RADIUS}

  Q 0 0 ${TAB_BAR_BORDER_RADIUS} 0
  Z
`;

interface Props {
  activeTab: "home" | "profile";
}

export default function Footerguru({ activeTab }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Glow animation for FAB
  const glowAnim = useRef(new Animated.Value(0.9)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1.3,
          duration: 1100,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.9,
          duration: 1100,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const glowStyle = {
    shadowColor: COLORS.primary,
    shadowOpacity: 0.45,
    shadowRadius: glowAnim.interpolate({
      inputRange: [0.9, 1.3],
      outputRange: [12, 28],
    }),
    shadowOffset: { width: 0, height: 4 },
  };


  return (
    <View style={styles.footerWrapper}>
      {/* Soft shadow layer (under tab bar) */}
      <Svg width={width} height={TAB_BAR_HEIGHT} style={styles.svgShadow}>
        <Path d={getPath()} fill="rgba(0,0,0,0.07)" />
      </Svg>

      {/* Main tab bar background */}
      <View style={styles.backgroundWrapper}>
        <Svg width={width} height={TAB_BAR_HEIGHT}>
          <Path d={getPath()} fill={COLORS.subBackground} />
        </Svg>
      </View>


      {/* Tab Buttons Container */}
      <View style={styles.tabContainer}>
        {/* HOME / BERANDA TAB */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("Guru")}
        >
          <House
            size={32}
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

        {/* Spacer for FAB notch */}
        <View style={styles.centerSpacer} />

        {/* PROFILE TAB */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("Profileguru")}
        >
          <UserRound
            size={32}
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


      {/* FLOATING CENTER BUTTON */}
      <Animated.View style={[styles.fabButton, glowStyle]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("formbuatkelas")}
          style={styles.fabInside}
        >
          <Plus size={36} color="#ffffff" strokeWidth={2.8} />
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
    zIndex: 10,
    elevation: 24,
  },

  svgShadow: {
    position: "absolute",
    bottom: -2,
    opacity: 0.8,
  },

  backgroundWrapper: {
    position: "absolute",
    bottom: 0,
    overflow: "hidden",
  },

  tabContainer: {
    flexDirection: "row",
    height: TAB_BAR_HEIGHT,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
  },

  centerSpacer: {
    width: CENTER_BUTTON_SIZE + (GAP * 2) + 16,
  },

  text: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: "500",
  },

  fabButton: {
    position: "absolute",
    top: -(CURVE_DEPTH), // perfectly align FAB inside the notch
    left: width / 2 - CENTER_BUTTON_SIZE / 2,
    width: CENTER_BUTTON_SIZE,
    height: CENTER_BUTTON_SIZE,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,

    // Platform shadow fixes
    ...Platform.select({
      android: {
        elevation: 12,
      },
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
      },
    }),
  },

  fabInside: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});