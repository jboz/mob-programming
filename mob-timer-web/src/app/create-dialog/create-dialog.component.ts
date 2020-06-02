import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Create } from './../mob.store';

@Component({
  selector: 'app-crate-dialog',
  template: `
    <h1 mat-dialog-title>Create a mob session</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Mob name</mat-label>
        <input #newMobName matInput />
      </mat-form-field>
    </div>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancel</button>
      <button (click)="create(newMobName.value)" mat-raised-button>Create</button>
    </mat-dialog-actions>
  `
})
export class CreateDialogComponent {
  constructor(private store: Store, private dialogRef: MatDialogRef<CreateDialogComponent>) {}

  cancel(): void {
    this.dialogRef.close();
  }

  create(name: string) {
    this.store.dispatch(new Create(name));
    this.dialogRef.close();
  }
}
