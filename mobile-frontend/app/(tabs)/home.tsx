import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [fullScreenMap, setFullScreenMap] = useState(false); // toggles full screen

  const warnings = [
    { title: "WEATHER WARNING", message: "🌧️ Paalala: May naka-ambang malakas na pag-ulan ngayong gabi.", icon: require("../../assets/images/rain.png") },
    { title: "FIRE SAFETY REMINDER", message: "🔥 Isigurong nakapatay ang LPG at appliances bago matulog o umalis ng bahay.", icon: require("../../assets/images/fires.png") },
    {title: "EARTHQUAKE PREPAREDNESS",
      message:
        "🌎 Drop, Cover, and Hold On! Laging alalahanin ang earthquake drill steps.",
      icon: require("../../assets/images/earthquake.png"),
    },
    {
      title: "EMERGENCY HOTLINE REMINDER",
      message:
        "📞 Sa oras ng sakuna, magreport agad sa MDRRMO, PNP, o BFP.",
      icon: require("../../assets/images/hotline.png"),
    },
    {
      title: "FLOOD READINESS",
      message:
        "🌊 Ihanda ang go-bag na may pagkain, tubig, flashlight, gamot, at importanteng dokumento.",
      icon: require("../../assets/images/flood.png"),
    },
    {
      title: "HEALTH EMERGENCY REMINDER",
      message:
        "🧑‍⚕️ Kung may lagnat o hirap huminga, agad magpakonsulta sa pinakamalapit na health center.",
      icon: require("../../assets/images/health.png"),
    },
    {
      title: "INCIDENT REPORTING TIP",
      message:
        "📸 Kapag may nakita kang aksidente o sunog, gamitin ang RES-Q emergency app para sa agarang pagrereport at pagresponde.",
      icon: require("../../assets/images/logo.png"),
    },
    {
      title: "AMBULANCE ASSISTANCE REMINDER",
      message:
        "🚨 Paalala: Kailangan ng ambulansya? Ibigay agad ang lokasyon at kondisyon ng pasyente.",
      icon: require("../../assets/images/ambulances.png"),
    },
    {
      title: "SAFETY IN TRANSPORT",
      message:
        "🚗 Ugaliing magsuot ng seatbelt o helmet. Iwasan ang pagmamaneho kung pagod, antok, o lasing.",
      icon: require("../../assets/images/driving.png"),
    },
    {
      title: "COMMUNITY ANNOUNCEMENTS",
      message:
        "📢 May scheduled brownout bukas, 1PM–5PM. Ihanda ang inyong kagamitan.",
      icon: require("../../assets/images/announce.png"),
    },
  ];

  const nextSlide = () => setSlide((prev) => (prev + 1) % warnings.length);
  const prevSlide = () => setSlide((prev) => (prev - 1 + warnings.length) % warnings.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % warnings.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [warnings.length]);

  const responders = [
    { id: 1, lat: 14.5995, lng: 120.9842, title: "Responder A" },
    { id: 2, lat: 14.6002, lng: 120.982, title: "Responder B" },
  ];

  const incidents = [
    { id: 1, lat: 14.598, lng: 120.9855, title: "Incident 1" },
  ];

  const mapRegion = {
    latitude: 14.5995,
    longitude: 120.9842,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const renderMap = () => (
    <MapView style={{ flex: 1 }} initialRegion={mapRegion}>
      {responders.map((r) => (
        <Marker
          key={r.id}
          coordinate={{ latitude: r.lat, longitude: r.lng }}
          title={r.title}
          pinColor="green"
        />
      ))}
      {incidents.map((i) => (
        <Marker
          key={i.id}
          coordinate={{ latitude: i.lat, longitude: i.lng }}
          title={i.title}
          pinColor="red"
        />
      ))}
    </MapView>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      contentInset={{ bottom: 120 }}
      scrollIndicatorInsets={{ bottom: 120 }}
    >
      {/* Warning Card */}
      <View style={styles.warningContainer}>
        <LinearGradient
          colors={["#D64219", "#920114"]}
          style={styles.warningCard}
        >
          <Text style={styles.warningTitle}>{warnings[slide].title}</Text>
          <View style={styles.warningRow}>
            <TouchableOpacity onPress={prevSlide}>
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </TouchableOpacity>
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
              <Image source={warnings[slide].icon} style={styles.warningIcon} />
              <Text style={styles.warningMessage}>{warnings[slide].message}</Text>
            </View>
            <TouchableOpacity onPress={nextSlide}>
              <Ionicons name="chevron-forward" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.dotsRow}>
            {warnings.map((_, i) => (
              <View key={i} style={[styles.dot, slide === i && styles.activeDot]} />
            ))}
          </View>
        </LinearGradient>
      </View>

      {/* Map Section */}
      <Text style={styles.sectionTitle}>Nearby Responders & Incidents</Text>

      <TouchableOpacity
        style={styles.mapContainer}
        onPress={() => setFullScreenMap(true)}
        activeOpacity={0.9}
      >
        {renderMap()}
      </TouchableOpacity>

      {/* Full Screen Map */}
      <Modal visible={fullScreenMap} animationType="slide">
        <View style={{ flex: 1 }}>
          {renderMap()}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setFullScreenMap(false)}
          >
            <Ionicons name="close-circle" size={50} color="#D30019" />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 90, paddingTop: 0 },
  warningContainer: { marginTop: 15, paddingHorizontal: 5 },
  warningCard: {
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 12,
    height: 230,
    justifyContent: "space-between",
  },
  warningTitle: { 
    textAlign: "center", 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 10 },
  warningRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    flex: 1 },
  warningIcon: { 
    width: 55, 
    height: 55, 
    alignSelf: "center", 
    marginBottom: 10 },
  warningMessage: { 
    color: "#fff", 
    textAlign: "center", 
    fontSize: 13 },
  dotsRow: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginTop: 5, 
    marginBottom: 5 },
  dot: { 
    width: 6, 
    height: 6, 
    backgroundColor: "#ffffff60", 
    borderRadius: 50, 
    marginHorizontal: 3 },
  activeDot: { 
    backgroundColor: "#fff", 
    width: 8, 
    height: 8 },
  sectionTitle: { 
    paddingHorizontal: 15, 
    marginTop: 20, 
    marginBottom: 10, 
    color: "#920114", 
    fontWeight: "bold", 
    fontSize: 16 },
  mapContainer: {
    paddingHorizontal: 5,
    height: 390,
    backgroundColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  mapStyle: { flex: 1 },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
});
