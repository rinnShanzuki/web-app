import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { useDepartment } from "../contexts/DepartmentContext";

interface VoiceMessagePlayerProps {
    audioUrl: string;
    duration?: number;
}

export default function VoiceMessagePlayer({
    audioUrl,
    duration = 0,
}: VoiceMessagePlayerProps) {
    const { department } = useDepartment();
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState(0);
    const [audioDuration, setAudioDuration] = useState(duration);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const loadAudio = async () => {
        try {
            setIsLoading(true);
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: audioUrl },
                { shouldPlay: false },
                onPlaybackStatusUpdate
            );
            setSound(newSound);
            setIsLoading(false);
        } catch (error) {
            console.error("Error loading audio:", error);
            setIsLoading(false);
        }
    };

    const onPlaybackStatusUpdate = (status: any) => {
        if (status.isLoaded) {
            setPosition(status.positionMillis);
            setAudioDuration(status.durationMillis || duration);
            setIsPlaying(status.isPlaying);

            if (status.didJustFinish) {
                setIsPlaying(false);
                setPosition(0);
            }
        }
    };

    const handlePlayPause = async () => {
        if (!sound) {
            await loadAudio();
            return;
        }

        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
    };

    const handleSpeedChange = async () => {
        const speeds = [1.0, 1.5, 2.0];
        const currentIndex = speeds.indexOf(playbackSpeed);
        const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
        setPlaybackSpeed(nextSpeed);

        if (sound) {
            await sound.setRateAsync(nextSpeed, true);
        }
    };

    const formatTime = (millis: number) => {
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Voice Message</Text>

            {/* Waveform Placeholder */}
            <View style={styles.waveformContainer}>
                {[...Array(30)].map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.waveformBar,
                            {
                                height: Math.random() * 40 + 10,
                                backgroundColor:
                                    (position / audioDuration) * 30 > i
                                        ? department?.colors.primary
                                        : "#ddd",
                            },
                        ]}
                    />
                ))}
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
                <View
                    style={[
                        styles.progressBar,
                        {
                            width: `${(position / audioDuration) * 100}%`,
                            backgroundColor: department?.colors.primary,
                        },
                    ]}
                />
            </View>

            {/* Time Display */}
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(position)}</Text>
                <Text style={styles.timeText}>{formatTime(audioDuration)}</Text>
            </View>

            {/* Controls */}
            <View style={styles.controls}>
                {/* Speed Control */}
                <TouchableOpacity style={styles.speedButton} onPress={handleSpeedChange}>
                    <Text style={[styles.speedText, { color: department?.colors.primary }]}>
                        {playbackSpeed}x
                    </Text>
                </TouchableOpacity>

                {/* Play/Pause Button */}
                <TouchableOpacity
                    style={[
                        styles.playButton,
                        { backgroundColor: department?.colors.primary },
                    ]}
                    onPress={handlePlayPause}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Ionicons
                            name={isPlaying ? "pause" : "play"}
                            size={32}
                            color="#fff"
                        />
                    )}
                </TouchableOpacity>

                {/* Volume Icon (Placeholder) */}
                <TouchableOpacity style={styles.volumeButton}>
                    <Ionicons
                        name="volume-high-outline"
                        size={24}
                        color={department?.colors.primary}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
    },
    waveformContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
        marginBottom: 15,
    },
    waveformBar: {
        width: 3,
        borderRadius: 2,
    },
    progressBarContainer: {
        width: "100%",
        height: 4,
        backgroundColor: "#ddd",
        borderRadius: 2,
        marginVertical: 10,
        overflow: "hidden",
    },
    progressBar: {
        height: "100%",
        borderRadius: 2,
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    timeText: {
        fontSize: 12,
        color: "#666",
    },
    controls: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },
    speedButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
    },
    speedText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    playButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    volumeButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
    },
});
