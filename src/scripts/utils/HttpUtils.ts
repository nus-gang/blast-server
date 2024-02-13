import axios, { AxiosRequestConfig } from 'axios';
import * as http from 'http';
import * as https from 'https';

const httpAgent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 60 * 1000,
});

const httpsAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 60 * 1000,
});

export class HttpUtils {
  public static async post(endpoint: string, body: object, headers = { 'Content-Type': 'application/json' }, timeout: number = 1000 * 60, config?: AxiosRequestConfig) {
    const response = await axios.post(`${endpoint}`, body, {
      ...config,
      httpAgent: httpAgent,
      httpsAgent: httpsAgent,
      headers: headers,
      timeout: timeout,
    });

    return {
      status: response.status,
      data: response.data,
    };
  }

  public static async get(endpoint: string, headers = { 'Content-Type': 'application/json' }, timeout: number = 1000 * 60, config?: AxiosRequestConfig) {
    const response = await axios.get(`${endpoint}`, {
      ...config,
      httpAgent: httpAgent,
      httpsAgent: httpsAgent,
      headers: headers,
      timeout: timeout,
    });

    return {
      status: response.status,
      data: response.data,
    };
  }
}
