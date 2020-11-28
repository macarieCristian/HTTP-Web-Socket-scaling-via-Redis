import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  onSubmit(authForm: NgForm): void {
    if (!authForm.valid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(authForm.value.username, authForm.value.password).subscribe(_ => {
      this.error = null;
      this.isLoading = false;
      this.router.navigate(['/products']);
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });

    authForm.reset();
  }
}
