import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AddMober, MobState, RemoveMober, SelectMober } from '../mob.store';

@Component({
  selector: 'app-mobers',
  templateUrl: './mobers.component.html',
  styleUrls: ['./mobers.component.scss']
})
export class MobersComponent implements OnInit {
  form = this.fb.group({ name: [''] });

  @Select(MobState.mobers)
  mobers$: Observable<string[]>;

  selection: string;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(MobState.selectedMober)
      .pipe(tap(mober => (this.selection = mober)))
      .subscribe();
  }

  addMober() {
    if (this.form.value.name) {
      this.store.dispatch(new AddMober(this.form.value.name)).subscribe(() => this.form.patchValue({ name: '' }));
    }
  }

  removeMober(mober: string) {
    this.store.dispatch(new RemoveMober(mober));
  }

  selectMober(mober: string) {
    this.store.dispatch(new SelectMober(mober));
  }
}
