import useSocket from 'socket.io-client';
import config from './config';

export default useSocket(config.socketURL);
