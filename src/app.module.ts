import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConvertController } from './convert/convert.controller';
import { ConvertService } from './convert/convert.service';
import { HttpService } from './http/http.service';
import { SoapController, SoapConvert, SoapService, SoapUtil } from './soap';

@Module({
  imports: [],
  controllers: [AppController, ConvertController, SoapController],
  providers: [
    AppService,
    SoapService,
    ConvertService,
    HttpService,
    SoapUtil,
    SoapConvert,
  ],
})
export class AppModule {}
