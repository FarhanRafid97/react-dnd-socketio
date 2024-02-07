import { io } from 'socket.io-client';
import { SOCKET_BE_URL } from './constant';

export const socket = io(SOCKET_BE_URL);
