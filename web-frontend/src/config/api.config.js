// API Configuration
const API_CONFIG = {
    // Development URL - Update this to your Laragon URL if different
    BASE_URL: 'http://localhost:8000/api/v1',

    // Production URL - Update when deploying
    // BASE_URL: 'https://your-production-url.com/api/v1',

    TIMEOUT: 30000, // 30 seconds

    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
};

export default API_CONFIG;
