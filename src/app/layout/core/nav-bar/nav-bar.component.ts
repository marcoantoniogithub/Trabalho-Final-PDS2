import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  logado: boolean = false;   

  constructor(private loginService: LoginService,
              private router: Router ) { }

  ngOnInit(): void {
  }

  abreSideNav() {
    this.sidenav.open();
  }

  fechaSideNav() {
    this.sidenav.close();
  }

  isLogado(): boolean {
    return this.logado = this.loginService.logado();
  }

  sair() {
     this.loginService.sair();
     this.router.navigate(['/login']);  
  }
}
