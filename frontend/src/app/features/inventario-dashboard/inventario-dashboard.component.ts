import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { Producto } from '../../core/models/inventory.models';
import { InventarioService } from '../../core/services/inventario.service';

@Component({
  selector: 'app-inventario-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventario-dashboard.component.html',
  styleUrl: './inventario-dashboard.component.css'
})
export class InventarioDashboardComponent implements OnInit {
  private readonly inventarioService = inject(InventarioService);
  private readonly formBuilder = inject(FormBuilder);

  productos: Producto[] = [];
  cargando = false;
  error = '';

  filtrosForm = this.formBuilder.group({
    categoria: [''],
    bajoMinimo: [false]
  });

  /*
  USO DE IA:
  Consulta realizada: ¿Cómo cargar productos y aplicar filtros desde un componente Angular usando un servicio HttpClient?
  Sugerencia recibida: Crear un formulario reactivo para los filtros y llamar al servicio cada vez que el usuario aplique la búsqueda.
  Decisión técnica: Implementé filtros simples por categoría y bajo mínimo para mantener el componente claro y conectado al backend.
  */
  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    const categoria = this.filtrosForm.value.categoria?.trim() || undefined;
    const bajoMinimo = this.filtrosForm.value.bajoMinimo ?? false;

    this.cargando = true;
    this.error = '';

    this.inventarioService
      .obtenerProductos(categoria, bajoMinimo)
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: productos => {
          this.productos = productos;
        },
        error: () => {
          this.error = 'No fue posible cargar los productos.';
        }
      });
  }

  aplicarFiltros(): void {
    this.cargarProductos();
  }

  limpiarFiltros(): void {
    this.filtrosForm.reset({
      categoria: '',
      bajoMinimo: false
    });

    this.cargarProductos();
  }
}