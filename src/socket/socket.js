import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { WS_BASE_URL, STORAGE_KEYS } from '../utils/constants';

class SocketService {
  constructor() {
    this.stompClient = null;
    this.subscriptions = new Map();
    this.onConnectedCallbacks = [];
    this.isConnecting = false;
  }

  connect() {
    // 1. Check if already connected or in the process of connecting
    if (this.isConnecting || (this.stompClient && this.stompClient.active)) {
      return;
    }

    this.isConnecting = true;
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    
    this.stompClient = new Client({
      brokerURL: WS_BASE_URL.replace('http', 'ws'), // WS protocol
      webSocketFactory: () => new SockJS(WS_BASE_URL),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => {
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
          // console.log('Socket DEBUG: ' + str);
        }
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.stompClient.onConnect = (frame) => {
      this.isConnecting = false;
      console.log('Successfully connected to WebSocket: ' + frame);
      console.log("WebSocket Connected");
      
      // Execute queued callbacks
      while (this.onConnectedCallbacks.length > 0) {
        const callback = this.onConnectedCallbacks.shift();
        callback();
      }
    };

    this.stompClient.onStompError = (frame) => {
      this.isConnecting = false;
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.stompClient.onWebSocketClose = () => {
      this.isConnecting = false;
    };

    this.stompClient.activate();
  }

  isConnected() {
    return this.stompClient && this.stompClient.active && this.stompClient.connected;
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.stompClient = null;
      this.isConnecting = false;
      this.subscriptions.clear();
      this.onConnectedCallbacks = [];
    }
  }

  subscribe(destination, callback) {
    if (!this.stompClient || !this.stompClient.active || !this.stompClient.connected) {
      // Queue subscription for when connection is ready
      this.onConnectedCallbacks.push(() => {
        this.executeSubscription(destination, callback);
      });
      
      // Ensure we are trying to connect
      this.connect();
      return;
    }

    this.executeSubscription(destination, callback);
  }

  executeSubscription(destination, callback) {
    // Cleanup existing subscription to same destination if any
    this.unsubscribe(destination);

    const sub = this.stompClient.subscribe(destination, (message) => {
      try {
        const body = JSON.parse(message.body);
        callback(body);
      } catch (e) {
        console.error('Failed to parse WebSocket message body', e);
      }
    });

    this.subscriptions.set(destination, sub);
    return sub;
  }

  unsubscribe(destination) {
    const sub = this.subscriptions.get(destination);
    if (sub) {
      sub.unsubscribe();
      this.subscriptions.delete(destination);
    }
  }

  send(destination, body) {
    if (!this.stompClient || !this.stompClient.active || !this.stompClient.connected) {
      console.error('Cannot send message, WebSocket not connected. Destination: ' + destination);
      // Wait for connection and send
      this.onConnectedCallbacks.push(() => {
        this.send(destination, body);
      });
      this.connect();
      return;
    }

    this.stompClient.publish({
      destination,
      body: JSON.stringify(body),
    });
  }
}

const socketService = new SocketService();
export default socketService;
