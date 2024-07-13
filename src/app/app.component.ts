import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from 'app/base/sidenav/sidenav.service';
import {AuthService} from "./shared/data-access/auth/auth.service";
import {Login} from "./shared/models/auth.class";

const TRANSPARENT_NAV_PAGES = [ 'login' ];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public user: Login;
  @HostBinding('class.transparent') transparent = false;

  constructor(
    private readonly router: Router,
    private readonly sidenavService: SidenavService,
    private readonly authService: AuthService,
  ) { }

  get getExpanded(): boolean {
    return this.sidenavService.getExpanded();
  }
  get getPinned(): boolean {
    return this.sidenavService.getPinned();
  }

  ngOnInit() {
    this.authService.login$.subscribe(data => {
      this.user = data;
    });
  }

  logout() {
    this.user = null;
  }
}
