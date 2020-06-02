import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Connect } from '../mob.store';

@Component({
  selector: 'app-connect-dialog',
  template: `
    <h1 mat-dialog-title>Connect to a mob session</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input #mobName matInput autofocus (keyup.enter)="connect(mobName.value)" />
      </mat-form-field>
    </div>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancel</button>
      <button (click)="connect(mobName.value)" color="primary" mat-raised-button>Connect</button>
    </mat-dialog-actions>
  `
})
export class ConnectDialogComponent {
  constructor(private store: Store, private dialogRef: MatDialogRef<ConnectDialogComponent>) {}

  cancel(): void {
    this.dialogRef.close();
  }

  connect(name: string) {
    this.store.dispatch(new Connect(name));
    this.dialogRef.close();
  }
}
