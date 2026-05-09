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
} from "react-native";
import {
  ChevronLeft,
  Bell,
  User,
  Mail,
  Calendar,
} from "lucide-react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfileGuru({ navigation }: any) {
  const [user, setUser] = useState<any>(null);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Laki-Laki");
  const [avatar, setAvatar] = useState("");

  // 🔥 tambahan field (biar sesuai UI kamu)
  const [mapel, setMapel] = useState("");
  const [nip, setNip] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [phone, setPhone] = useState("");

  const screenHeight = Dimensions.get("window").height;
  const INITIAL_POSITION = 250;

  const [translateY] = useState(
    new Animated.Value(INITIAL_POSITION)
  );

  // 🔥 LOAD DATA
  useEffect(() => {
    const getUser = async () => {
      const data = await AsyncStorage.getItem("user");
      if (data) {
        const parsed = JSON.parse(data);
        setUser(parsed);

        setNama(parsed.nama || "");
        setEmail(parsed.email || "");
        setGender(parsed.gender || "Laki-Laki");
        setAvatar(parsed.avatar || "");

        setMapel(parsed.mapel || "");
        setNip(parsed.nip || "");
        setTanggal(parsed.tanggal || "");
        setPhone(parsed.phone || "");
      }
    };

    getUser();
  }, []);

  // 🔥 SAVE DATA
  const handleSave = async () => {
    const updatedUser = {
      ...user,
      nama,
      email,
      gender,
      avatar,
      mapel,
      nip,
      tanggal,
      phone,
    };

    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

    navigation.goBack();
  };

  // 🔥 PAN
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      let newY = INITIAL_POSITION + gesture.dy;

      if (newY < 0) newY = 0;
      if (newY > INITIAL_POSITION) newY = INITIAL_POSITION;

      translateY.setValue(newY);
    },
    onPanResponderRelease: (_, gesture) => {
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
      <Text style={{ marginTop: 50, textAlign: "center" }}>
        Loading...
      </Text>
    );
  }

  const avatars = [
    "https://i.pravatar.cc/150?img=11",
    "https://i.pravatar.cc/150?img=12",
    "https://i.pravatar.cc/150?img=13",
    "https://i.pravatar.cc/150?img=14",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2417B8" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profil</Text>

        <TouchableOpacity>
          <Bell size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* FOTO */}
      <View style={styles.topSection}>
        <Image
          source={
            avatar
              ? { uri: avatar }
              : require("./siswa.png")
          }
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{nama}</Text>
      </View>

      {/* BOTTOM SHEET */}
      <Animated.View
        style={[
          styles.formContainer,
          {
            transform: [{ translateY }],
            height: screenHeight,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.dragIndicator} />

          {/* NAMA */}
          <Text style={styles.label}>Nama Lengkap</Text>
          <View style={styles.inputWrapper}>
            <User size={20} />
            <TextInput
              style={styles.input}
              value={nama}
              onChangeText={setNama}
            />
          </View>

          {/* EMAIL */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Mail size={20} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* GENDER + MAPEL */}
          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={gender}
                  onValueChange={setGender}
                >
                  <Picker.Item label="Laki-Laki" value="Laki-Laki" />
                  <Picker.Item label="Perempuan" value="Perempuan" />
                </Picker>
              </View>
            </View>

            <View style={styles.half}>
              <Text style={styles.label}>Mapel</Text>
              <TextInput
                style={styles.textInput}
                value={mapel}
                onChangeText={setMapel}
              />
            </View>
          </View>

          {/* NIP */}
          <Text style={styles.label}>NIP</Text>
          <TextInput
            style={styles.textInput}
            value={nip}
            onChangeText={setNip}
          />

          {/* TANGGAL */}
          <Text style={styles.label}>Tanggal Lahir</Text>
          <View style={styles.inputWrapper}>
            <Calendar size={20} color="#333" />
            <TextInput
              style={styles.input}
              placeholder="22/11/1999"
            />
          </View>

          {/* PHONE */}
          <Text style={styles.label}>Nomor Telepon</Text>
          <View style={styles.phoneRow}>
            <TextInput style={styles.countryCode} value="+62" />
            <TextInput
              style={styles.phoneInput}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* AVATAR */}
          <Text style={styles.avatarTitle}>Avatar</Text>
          <View style={styles.avatarRow}>
            {avatars.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setAvatar(item)}
              >
                <Image
                  source={{ uri: item }}
                  style={[
                    styles.avatarOption,
                    avatar === item && {
                      borderWidth: 2,
                      borderColor: "#1D1A9B",
                    },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* SAVE */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveText}>Simpan</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1D1A9B" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
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

  textInput: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    paddingHorizontal: 15,
    height: 50,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  half: { width: "48%" },

  pickerContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    height: 50,
    justifyContent: "center",
  },

  phoneRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  countryCode: {
    width: "30%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    textAlign: "center",
  },

  phoneInput: {
    width: "65%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    paddingHorizontal: 15,
  },

  avatarTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
  },

  avatarRow: {
    flexDirection: "row",
    marginBottom: 30,
  },

  avatarOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },

  saveButton: {
    alignSelf: "flex-end",
    marginBottom: 40,
  },

  saveText: {
    fontSize: 18,
    fontWeight: "700",
  },
});