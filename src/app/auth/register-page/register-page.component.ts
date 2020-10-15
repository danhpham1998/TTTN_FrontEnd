import { ToastrHelpService } from './../../core/services/toastr-help.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  isValidName: boolean = true;
  isValidUsername: boolean = true;
  isValidPassword: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrHelpService: ToastrHelpService
  ) { }

  ngOnInit(): void {
  }

  registerUser(data) {
    this.isValidName = true;
    this.isValidPassword = true;
    this.isValidUsername = true;

    if (data.value.name == "") {
      this.isValidName = false;
    }
    if (data.value.username == "") {
      this.isValidUsername = false;
    }
    if (data.value.password == "") {
      this.isValidPassword = false;
    }

    if (this.isValidName && this.isValidPassword && this.isValidUsername) {
      // console.log(data.value);
      this.authService.createUser(data.value)
        .subscribe(rs => {
          this.toastrHelpService.showToastrSuccess("Đăng ký thành công", 'Đăng ký')
          this.router.navigateByUrl('auth/login');
        })
    }
  }

}
