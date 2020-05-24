import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

export interface Categorias {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent implements OnInit {
  
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
