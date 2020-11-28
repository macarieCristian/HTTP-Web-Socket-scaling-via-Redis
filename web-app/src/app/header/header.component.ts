import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CurrentUserService} from '../auth/current-user.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private currentUser: CurrentUserService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.currentUser.user
      .subscribe(user => {
        this.isAuthenticated = !!user;

      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
