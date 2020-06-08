import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Disconnect } from '../../mob.store';

@Component({
  selector: 'app-disconnect-dialog',
  template: `
    <h1 mat-dialog-title>Disconnect from the mob session</h1>
    <div mat-dialog-content>
      <mat-label>Would you like to disconnect from the mob session?</mat-label>
    </div>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancel</button>
      <button (click)="disconnect()" color="primary" mat-raised-button>Disonnect</button>
    </mat-dialog-actions>
  `
})
export class DisconnectDialogComponent {
  constructor(private store: Store, private dialogRef: MatDialogRef<DisconnectDialogComponent>) {}

  cancel(): void {
    this.dialogRef.close();
  }

  disconnect() {
    this.store.dispatch(new Disconnect());
    this.dialogRef.close();
  }
}
