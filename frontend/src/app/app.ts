import { Component } from '@angular/core';
import { InventarioDashboardComponent } from './features/inventario-dashboard/inventario-dashboard.component';

@Component({
  selector: 'app-root',
  imports: [InventarioDashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}