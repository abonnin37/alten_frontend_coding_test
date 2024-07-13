import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {RegistrationDialogComponent} from '../../shared/ui/registration-dialog/registration-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogTypeEnum, Login} from '../../shared/models/auth.class';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    public dialog: MatDialog
  ) {}

  @Input() user: Login;
  @Input() logout: () => void;

  public userName: string;
  public userMenuItems: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-fw pi-cog', routerLink: '/user/profile' },
    { label: 'Messages', icon: 'pi pi-fw pi-envelope', routerLink: '/user/messages' },
    { label: 'Notifications', icon: 'pi pi-fw pi-bell', routerLink: '/user/notifications' },
    { label: 'Logout', icon: 'pi pi-fw pi-power-off', command: null },
  ];


  protected readonly DialogTypeEnum = DialogTypeEnum;
  openDialog(dialogType: DialogTypeEnum): void {
    const dialogRef = this.dialog.open(RegistrationDialogComponent, {
      width: '300px',
      data: {
        dialogType
      }
    });
  }
}
