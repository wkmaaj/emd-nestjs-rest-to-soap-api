import { Injectable } from '@nestjs/common';
import { HttpService } from '../http/http.service';
import { Namespace } from './soap.convert';
import { SoapUtil } from './soap.util';

@Injectable()
export class SoapService {
  constructor(
    private readonly soapUtil: SoapUtil,
    private readonly httpService: HttpService,
  ) {}

  envelope =
    '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">' +
    '<SOAP-ENV:Header/>' +
    '<SOAP-ENV:Body>' +
    '<ns2:GetCountryResponse xmlns:ns2="llc:jaradatbros:emd:api:soap:mongo">' +
    '<ns2:country>' +
    '<ns2:name>Japan</ns2:name>' +
    '<ns2:capital>Tokyo</ns2:capital>' +
    '<ns2:currency>JPY</ns2:currency>' +
    '</ns2:country>' +
    '</ns2:GetCountryResponse>' +
    '</SOAP-ENV:Body>' +
    '</SOAP-ENV:Envelope>';

  async convert(request: {
    getCountryRequest: {
      country: Partial<{
        name: string;
        capital: string;
        currency: string;
        abbreviation: string;
      }>;
    };
    namespace?: Partial<Namespace>;
    namespaces?: Partial<Namespace>[];
  }): Promise<string> {
    return this.httpService.sendRequest(
      this.soapUtil.convertRestToSoap(request),
    );
  }

  upAndRunning(): string {
    return 'SOAP service is up and running.';
  }
}
