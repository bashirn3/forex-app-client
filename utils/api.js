import { Platform } from 'react-native';

let BASE_URL = Platform.OS === 'web' ? 'https://fathomless-hollows-94908.herokuapp.com/api/v1' : 'https://fathomless-hollows-94908.herokuapp.com/api/v1';
// let BASE_URL = Platform.OS === 'web' ? 'http://localhost:3001/api/v1' : 'http://ec2d751cd018.ngrok.io/api/v1';

export default BASE_URL;
