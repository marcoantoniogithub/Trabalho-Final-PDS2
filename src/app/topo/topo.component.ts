import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {
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
