import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorias, _filter } from '../../core/register-page/register-page.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-register-purchase-item',
  templateUrl: './register-purchase-item.component.html',
  styleUrls: ['./register-purchase-item.component.css']
})
export class RegisterPurchaseItemComponent implements OnInit {

  stateGroupOptions: Observable<Categorias[]>;

  categoria: Categorias[] = [
    {
      letter: 'A',
      names: ['Açougue']
    }, {
      letter: 'C',
      names: ['Carne e Frios']
    },
    {
      letter: 'F',
      names: ['Frios e Laticínios']
    },
  ];

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { 

    this.form = fb.group({
      item: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
      categoria: [
        ''
      ],
      quantidade: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
      valor: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
      checkBox: [
        false
      ]
    });
  }

  ngOnInit(): void {
    this.stateGroupOptions = this.form.get('categoria')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  private _filterGroup(value: string): Categorias[] {
    if (value) {
      return this.categoria
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }
    return this.categoria;
  }

}
