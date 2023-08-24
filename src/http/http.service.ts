import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HttpService {
  async sendRequest(
    data?: { [key: string]: string } | string,
  ): Promise<string> {
    try {
      console.log(data);
      const response = await axios.request({
        method: 'POST',
        url: 'http://localhost:8080/ws/countries',
        headers: {
          'Content-Type': 'text/xml',
        },
        data,
      });

      console.log(
        `HttpService | sendRequest | Received response: ${response.data}`,
      );
      return response.data;
    } catch (e: unknown) {
      console.error(e);
      return '';
    }
  }
}
