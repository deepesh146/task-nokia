import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MarsEarthInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const sender = request.headers['x-sender'];
        const receiver = request.headers['x-receiver'];

        var responseBody = {};
        if (sender === 'earth') {
            responseBody = {
                "Response From Mars": "123",
                "Nokia Translation": "abd"
            }
        } else if (sender === 'mars') {
            responseBody = {
                "Response From Earth": "Message in english",
                "Nokia Translation": "213232"
            }
        }
        // Customize the response based on headers
        // const responseBody = {
        //     sender,
        //     receiver,
        //     message: sender === 'earth' ? 'Response from Mars' : 'Response from Earth',
        // };

        return next.handle().pipe(map(data => {
            if (sender === 'earth') {
                responseBody = {
                    "Response From Mars": data.originalMessage,
                    "Nokia Translation": data.convertedText
                }
            } else if (sender === 'mars') {
                responseBody = {
                    "Response From Earth": data.originalMessage,
                    "Nokia Translation": data.convertedText
                }
            }
            return responseBody
        }));
    }
}
