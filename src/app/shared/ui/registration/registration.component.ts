import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../data-access/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {RegistrationDialogComponent} from '../registration-dialog/registration-dialog.component';
import {DialogTypeEnum} from '../../models/auth.class';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @Input() dialogType: DialogTypeEnum;
  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RegistrationDialogComponent>
  ) { }
  registrationForm: FormGroup;

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid && this.dialogType === DialogTypeEnum.Signup) {
      this.signup();
    } else if (this.registrationForm.valid && this.dialogType === DialogTypeEnum.Login) {
      this.login();
    }
  }

  signup = () => {
    console.log(this.registrationForm.value);
    this.authService.signup(this.registrationForm.value).subscribe(
      data => {
        this.snackBar.open(data.message, 'Fermer', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      },
      (error) => {
        this.snackBar.open(error.message, 'Fermer', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      });
    this.dialogRef.close();
  }

  login = () => {
    this.authService.login(this.registrationForm.value).subscribe(
      data => {
        if (data) {
          this.snackBar.open('Vous êtes connecté.', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
        }
      },
      (error) => {
        this.snackBar.open(error.message, 'Fermer', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      });
    this.dialogRef.close();
  }
}
