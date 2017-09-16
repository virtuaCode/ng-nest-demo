import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../entities/user.entity';
import { classToPlain } from 'class-transformer';

@Interceptor()
export class UserInterceptor implements NestInterceptor {
    intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<User | User[]>): Observable<any> {
        return stream$.map((user) => classToPlain(user));
    }
}