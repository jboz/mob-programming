import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UIErrorHandler extends ErrorHandler {
  constructor(private injector: Injector) {
    super();
  }

  handleError(error: { message: string }) {
    super.handleError(error);
    this.injector.get<MatSnackBar>(MatSnackBar).open(error.message, 'X', { duration: 2000 });
  }
}
