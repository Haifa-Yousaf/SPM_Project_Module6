import { Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

@Injectable()
export class DailyService {

  private apiKey = "94c4545d9d279c4f57743ea7c1102fb61b899b20a7a6859aa387041c68a11d8e";
  private domain = "THAN";

  async createMeeting(title: string) {
    try {
      const response = await axios.post(
        'https://api.daily.co/v1/rooms',
        {
          name: `meeting-${Date.now()}`,
          properties: {
            enable_chat: true,
            enable_screenshare: true,
            start_video_off: false,
            start_audio_off: false,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return {
        id: response.data.id,
        url: response.data.url,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create meeting');
    }
  }
}