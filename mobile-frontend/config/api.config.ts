// API Configuration
const API_CONFIG = {
    // For Expo Tunnel - use localhost, tunnel handles routing
    BASE_URL: 'http://localhost:8000/api/v1',

    // Note: When using Expo tunnel, localhost works because
    // the tunnel routes requests from your phone to your computer

    TIMEOUT: 30000, // 30 seconds

    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
};

export default API_CONFIG;
