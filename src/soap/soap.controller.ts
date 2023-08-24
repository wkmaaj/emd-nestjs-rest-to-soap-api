import { Body, Controller, Get, Post } from '@nestjs/common';
import { SoapService } from './soap.service';

@Controller('soap')
export class SoapController {
  constructor(private readonly soapService: SoapService) {}

  @Get()
  healthCheck(): string {
    return this.soapService.upAndRunning();
  }

  @Post('convert')
  async convert(
    @Body()
    request: {
      getCountryRequest: {
        country: {
          name: string;
          capital: string;
          currency: string;
          abbreviation: string;
        };
      };
    },
  ): Promise<string> {
    console.log(
      `SoapController | convert | Incoming request: ${JSON.stringify(
        request,
        null,
        2,
      )}`,
    );
    return this.soapService.convert(request);
  }
}
