import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Mob } from '../mob.model';
import { MobState, TryToReConnect } from '../mob.store';
import { ConnectDialogComponent } from './connect-dialog/connect-dialog.component';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { DisconnectDialogComponent } from './disconnect-dialog/disconnect-dialog.component';

@Component({
  selector: 'app-mob',
  templateUrl: './mob.component.html',
  styleUrls: ['./mob.component.scss']
})
export class MobComponent implements OnInit {
  @Select(MobState.mob)
  mob$: Observable<Mob>;

  constructor(private store: Store, private swUpdate: SwUpdate, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
    this.store.dispatch(new TryToReConnect());
  }

  showConnectDialog() {
    this.dialog.open(ConnectDialogComponent, {
      width: '350px'
    });
  }

  showDisconnectDialog() {
    this.dialog.open(DisconnectDialogComponent, {
      width: '370px'
    });
  }

  showCreateDialog() {
    this.dialog.open(CreateDialogComponent, {
      width: '350px'
    });
  }
}
