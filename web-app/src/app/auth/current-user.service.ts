import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  user = new BehaviorSubject<User>(null);
}
