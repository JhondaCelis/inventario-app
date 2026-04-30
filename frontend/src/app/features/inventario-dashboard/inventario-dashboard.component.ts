import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import {
    Alerta,
    Producto,
    TipoMovimiento
} from '../../core/models/inventory.models';
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
    tiposMovimiento = Object.values(TipoMovimiento);
    alertas: Alerta[] = [];
    categorias = ['Tecnología', 'Oficina', 'Papelería'];

    cargando = false;
    guardandoMovimiento = false;
    cargandoAlertas = false;
    error = '';
    mensajeExito = '';

    filtrosForm = this.formBuilder.group({
        categoria: [''],
        bajoMinimo: [false]
    });

    movimientoForm = this.formBuilder.group({
        productoId: [null as number | null, [Validators.required]],
        tipo: [TipoMovimiento.ENTRADA, [Validators.required]],
        cantidad: [1, [Validators.required, Validators.min(1)]],
        observacion: ['']
    });

    /*
    USO DE IA:
    Consulta realizada: ¿Cómo cargar productos y aplicar filtros desde un componente Angular usando un servicio HttpClient?
    Sugerencia recibida: Crear un formulario reactivo para los filtros y llamar al servicio cada vez que el usuario aplique la búsqueda.
    Decisión técnica: Implementé filtros simples por categoría y bajo mínimo para mantener el componente claro y conectado al backend.
    */
    ngOnInit(): void {
        this.cargarProductos();
        this.cargarAlertas();
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

    /*
    USO DE IA:
    Consulta realizada: ¿Cómo implementar un formulario reactivo en Angular para registrar movimientos de inventario?
    Sugerencia recibida: Crear un FormGroup con producto, tipo, cantidad y observación, validar los campos requeridos y llamar al servicio HTTP.
    Decisión técnica: Implementé un formulario reactivo simple para registrar movimientos y actualizar la tabla después de cada operación exitosa.
    */
    registrarMovimiento(): void {
        if (this.movimientoForm.invalid) {
            this.movimientoForm.markAllAsTouched();
            return;
        }

        const productoId = Number(this.movimientoForm.value.productoId);
        const tipo = this.movimientoForm.value.tipo as TipoMovimiento;
        const cantidad = Number(this.movimientoForm.value.cantidad);
        const observacion = this.movimientoForm.value.observacion?.trim() || undefined;

        this.guardandoMovimiento = true;
        this.error = '';
        this.mensajeExito = '';

        this.inventarioService
            .registrarMovimiento(productoId, {
                tipo,
                cantidad,
                observacion
            })
            .pipe(finalize(() => (this.guardandoMovimiento = false)))
            .subscribe({
                next: respuesta => {
                    this.mensajeExito = respuesta.message;
                    this.movimientoForm.reset({
                        productoId: null,
                        tipo: TipoMovimiento.ENTRADA,
                        cantidad: 1,
                        observacion: ''
                    });

                    this.cargarProductos();
                    this.cargarAlertas();
                },
                error: error => {
                    this.error =
                        error?.error?.message || 'No fue posible registrar el movimiento.';
                }
            });
    }

    /*
USO DE IA:
Consulta realizada: ¿Cómo mostrar alertas de bajo stock en un dashboard Angular consumiendo un endpoint REST?
Sugerencia recibida: Crear un arreglo de alertas, consultar el endpoint /alertas y renderizar tarjetas visuales separadas de la tabla.
Decisión técnica: Implementé una sección independiente de alertas para que los productos críticos sean visibles sin depender del filtro de la tabla.
*/
    cargarAlertas(): void {
        this.cargandoAlertas = true;

        this.inventarioService
            .obtenerAlertas()
            .pipe(finalize(() => (this.cargandoAlertas = false)))
            .subscribe({
                next: alertas => {
                    this.alertas = alertas;
                },
                error: () => {
                    this.error = 'No fue posible cargar las alertas de inventario.';
                }
            });
    }
}
