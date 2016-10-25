import axios from 'axios';
import {API_CONFIG} from '../../../config/api.js';

const AXIOS_INSTANCE = axios.create(API_CONFIG);

export default AXIOS_INSTANCE