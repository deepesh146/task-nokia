import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { action, nokiaKeypadTostring, stringToNokiaKeypad } from './utils/functions';

@Controller('api/earth-mars-comm')
export class EarthMarsController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }


    @Post('message') // Define the POST route under the base route
    sendMessage(@Body() body: any, @Req() request: Request): object {

        const xSender = request.headers['x-sender'];
        const xReceiver = request.headers['x-receiver'];

        console.log('Received body:', body);
        console.log('x-sender:', xSender);
        console.log('x-receiver:', xReceiver);
        const convertedText = action(body.message, xSender)


        return {
            originalMessage: body.message,
            convertedText
        };
    }
}
