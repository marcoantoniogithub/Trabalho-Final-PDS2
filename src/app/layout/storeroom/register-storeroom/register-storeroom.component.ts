import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StoreroomService } from 'src/app/service/storeroom.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Storeroom } from 'src/app/models/storeroom.model';

@Component({
  selector: 'app-register-storeroom',
  templateUrl: './register-storeroom.component.html',
  styleUrls: ['./register-storeroom.component.css']
})
export class RegisterStoreroomComponent implements OnInit {

  form: FormGroup; 
  title:string;
  storeroom: Storeroom;
  id:number;

  constructor(
    private fb: FormBuilder,
    private storeroomService: StoreroomService, 
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute    
  ) {

    this.form = fb.group({
      title:[
        '', 
        [
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');

    if(this.id != 0){
      this.title = 'Alteração de Despensa';
      this.storeroomService.getStoreroom(this.id).subscribe(
        (storeroom: Storeroom) => {
          this.storeroom = storeroom;
          this.form.controls['title'].setValue(this.storeroom.title);
        },
        (error) => {
          this.snackBar.open('Ops, algo deu errado!','', { duration: 2000 });
        }
      );
    } else {
      this.title = 'Cadastro de Despensa';
    }
  }

  submit(){
    this.storeroomService.addStoreroom(this.form.value).subscribe(
      (data) => {
        this.router.navigate(['/despensa']);
      },
      (error) => {
        this.snackBar.open('Ops, algo deu errado!','', { duration: 2000 });
      },
    )
  }

  update(){ 
    let storeroom = this.form.getRawValue() as Storeroom;    
    storeroom.id =  this.storeroom.id;    
    this.storeroomService.updateStoreroom(storeroom).subscribe(
      (data) => {
        this.router.navigate(['/despensa']);
      },
      (error) => {
        this.snackBar.open('Ops, algo deu errado!','', { duration: 2000 });
      },
    )
  }

}
