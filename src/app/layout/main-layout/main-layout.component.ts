import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  private _modal: MatDialogRef<any> | undefined;

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    this._modal = this.dialog.open(this.dialogTemplate, {
      width: '400px',
      panelClass: 'custom-dialog-container',
    });
  }

  closeDialog(): void {
    this._modal?.close();
  }
}
