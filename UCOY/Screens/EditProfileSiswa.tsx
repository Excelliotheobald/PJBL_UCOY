import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Animated,
  PanResponder,
  Dimensions,
  Alert,
} from "react-native";

import {
  ChevronLeft,
  Bell,
  User,
  Mail,
} from "lucide-react-native";

import { Picker } from "@react-native-picker/picker";

import AsyncStorage from "@react-native-async-storage/async-storage";

const avatarOptions = [
  "https://api.dicebear.com/7.x/adventurer/png?seed=Ryan",
  "https://api.dicebear.com/7.x/adventurer/png?seed=Alexa",
  "https://api.dicebear.com/7.x/adventurer/png?seed=Daniel",
  "https://api.dicebear.com/7.x/adventurer/png?seed=Sophia",
];

export default function EditProfileSiswa({
  navigation,
}: any) {
  const [user, setUser] = useState<any>(null);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nis, setNis] = useState("");

  const [gender, setGender] =
    useState("Laki-Laki");

  const [kelas, setKelas] =
    useState("11 SMK");

  const [jurusan, setJurusan] =
    useState("PPLG");

  const [selectedAvatar, setSelectedAvatar] =
    useState(avatarOptions[0]);

  const screenHeight =
    Dimensions.get("window").height;

  const INITIAL_POSITION = 250;

  const [translateY] = useState(
    new Animated.Value(INITIAL_POSITION)
  );

  // LOAD DATA
  useEffect(() => {
    const getUser = async () => {
      const data =
        await AsyncStorage.getItem("user");

      if (data) {
        const parsed = JSON.parse(data);

        setUser(parsed);

        setNama(parsed.nama || "");
        setEmail(parsed.email || "");
        setNis(parsed.nis || "");

        setGender(
          parsed.gender || "Laki-Laki"
        );

        setKelas(parsed.kelas || "11 SMK");

        setJurusan(parsed.jurusan || "PPLG");

        setSelectedAvatar(
          parsed.avatar ||
            avatarOptions[0]
        );
      }
    };

    getUser();
  }, []);

  // SAVE
  const handleSave = async () => {
    const updatedUser = {
      ...(user || {}),
      nama,
      email,
      nis,
      gender,
      kelas,
      jurusan,
      avatar: selectedAvatar,
    };

    await AsyncStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    Alert.alert(
      "Berhasil",
      "Profile berhasil diupdate!"
    );

    navigation.goBack();
  };

  // DRAG
  const panResponder =
    PanResponder.create({
      onMoveShouldSetPanResponder:
        () => true,

      onPanResponderMove: (
        _,
        gesture
      ) => {
        let newY =
          INITIAL_POSITION + gesture.dy;

        if (newY < 0) newY = 0;

        if (newY > INITIAL_POSITION)
          newY = INITIAL_POSITION;

        translateY.setValue(newY);
      },

      onPanResponderRelease: (
        _,
        gesture
      ) => {
        if (gesture.dy < -100) {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateY, {
            toValue: INITIAL_POSITION,
            useNativeDriver: true,
          }).start();
        }
      },
    });

  if (!user) {
    return (
      <Text
        style={{
          marginTop: 50,
          textAlign: "center",
        }}
      >
        Loading...
      </Text>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2417B8"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >
          <ChevronLeft
            size={28}
            color="#FFF"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Edit Profil
        </Text>

        <TouchableOpacity>
          <Bell
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>

      {/* PROFILE */}
      <View style={styles.topSection}>
        <Image
          source={{
            uri: selectedAvatar,
          }}
          style={styles.profileImage}
        />

        <Text style={styles.profileName}>
          {nama}
        </Text>
      </View>

      {/* FORM */}
      <Animated.View
        style={[
          styles.formContainer,
          {
            transform: [
              { translateY },
            ],
            height: screenHeight,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
        >
          <View style={styles.dragIndicator} />

          {/* NAMA */}
          <Text style={styles.label}>
            Nama Lengkap
          </Text>

          <View style={styles.inputWrapper}>
            <User size={20} />

            <TextInput
              style={styles.input}
              value={nama}
              onChangeText={setNama}
            />
          </View>

          {/* EMAIL */}
          <Text style={styles.label}>
            Email
          </Text>

          <View style={styles.inputWrapper}>
            <Mail size={20} />

            <Text style={styles.emailText}>
              {email}
            </Text>
          </View>

          {/* GENDER + NIS */}
          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>
                Gender
              </Text>

              <View
                style={
                  styles.pickerContainer
                }
              >
                <Picker
                  selectedValue={gender}
                  onValueChange={(
                    itemValue
                  ) =>
                    setGender(itemValue)
                  }
                >
                  <Picker.Item
                    label="Laki-Laki"
                    value="Laki-Laki"
                  />

                  <Picker.Item
                    label="Perempuan"
                    value="Perempuan"
                  />
                </Picker>
              </View>
            </View>

            <View style={styles.half}>
              <Text style={styles.label}>
                NIS
              </Text>

              <View
                style={
                  styles.inputWrapper
                }
              >
                <TextInput
                  style={styles.input}
                  value={nis}
                  onChangeText={setNis}
                />
              </View>
            </View>
          </View>

          {/* KELAS + JURUSAN */}
          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>
                Kelas
              </Text>

              <View
                style={
                  styles.pickerContainer
                }
              >
                <Picker
                  selectedValue={kelas}
                  onValueChange={(
                    itemValue
                  ) =>
                    setKelas(itemValue)
                  }
                >
                  <Picker.Item
                    label="10 SMK"
                    value="10 SMK"
                  />

                  <Picker.Item
                    label="11 SMK"
                    value="11 SMK"
                  />

                  <Picker.Item
                    label="12 SMK"
                    value="12 SMK"
                  />
                </Picker>
              </View>
            </View>

            <View style={styles.half}>
              <Text style={styles.label}>
                Jurusan
              </Text>

              <View
                style={
                  styles.pickerContainer
                }
              >
                <Picker
                  selectedValue={
                    jurusan
                  }
                  onValueChange={(
                    itemValue
                  ) =>
                    setJurusan(
                      itemValue
                    )
                  }
                >
                  <Picker.Item
                    label="PPLG"
                    value="PPLG"
                  />

                  <Picker.Item
                    label="TJKT"
                    value="TJKT"
                  />

                  <Picker.Item
                    label="DKV"
                    value="DKV"
                  />
                </Picker>
              </View>
            </View>
          </View>

          {/* AVATAR */}
          <Text style={styles.avatarTitle}>
            Avatar
          </Text>

          <View
            style={
              styles.avatarContainer
            }
          >
            {avatarOptions.map(
              (avatar, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    setSelectedAvatar(
                      avatar
                    )
                  }
                >
                  <Image
                    source={{
                      uri: avatar,
                    }}
                    style={[
                      styles.avatarOption,
                      selectedAvatar ===
                        avatar &&
                        styles.avatarActive,
                    ]}
                  />
                </TouchableOpacity>
              )
            )}
          </View>

          {/* SAVE */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveText}>
              Simpan
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1A9B",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 60,
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
  },

  topSection: {
    alignItems: "center",
    marginTop: 20,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#FFF",
  },

  profileName: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },

  formContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#F4F4F4",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    elevation: 10,
  },

  dragIndicator: {
    width: 50,
    height: 5,
    backgroundColor: "#BDBDBD",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    paddingHorizontal: 12,
    height: 50,
  },

  input: {
    flex: 1,
    marginLeft: 10,
  },

  emailText: {
    marginLeft: 10,
    color: "#777",
    fontSize: 14,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  half: {
    width: "48%",
  },

  pickerContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    height: 50,
    justifyContent: "center",
    overflow: "hidden",
  },

  avatarTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 14,
  },

  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
  },

  avatarActive: {
    borderWidth: 3,
    borderColor: "#2417B8",
  },

  saveButton: {
    alignSelf: "flex-end",
    marginTop: 30,
    marginBottom: 40,
  },

  saveText: {
    fontSize: 18,
    fontWeight: "700",
  },
});