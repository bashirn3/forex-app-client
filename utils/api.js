import { Platform } from 'react-native';

let BASE_URL = Platform.OS === 'web' ? 'http://localhost:3001/api/v1' : 'http://ec2d751cd018.ngrok.io/api/v1';
// let BASE_URL = 'http:// 192.168.8.101/api/v1'
export default BASE_URL;
