import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html'
})
export class MedicosComponent implements OnInit,OnDestroy {

  public cargando: boolean=true;
  public medicos: Medico[] = []
  public imgSubs: Subscription;

  constructor(private medicoService:MedicoService,private modalImagenService:ModalImagenService,private busquedasService: BusquedasService){

  }

  ngOnInit(){
    this.cargarMedicos()
    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(delay(500)).subscribe(img => this.cargarMedicos())
  }

  ngOnDestroy() {
    this.imgSubs.unsubscribe()
  }

  cargarMedicos(){
    this.cargando = true
    this.medicoService.cargarMedicos().subscribe(medicos => {
      this.cargando=false
      this.medicos = medicos
    })
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal(
      'medicos',
      medico._id,
      medico.img
    );
  }

  buscar(termino: string) {
    if (termino.length === 0) {
        this.cargarMedicos()
    }

    this.busquedasService
      .buscar('medicos', termino)
      .subscribe((resultados) => (this.medicos = resultados));
    return true;
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Está a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedico(medico._id).subscribe((resp) => {
          this.cargarMedicos()
          Swal.fire(
            'Médico borrado',
            `${medico.nombre} fue eliminado corectamente`,
            'success'
          );
        });
      }
    });
  }

}
