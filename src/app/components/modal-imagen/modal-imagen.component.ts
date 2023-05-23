import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html'
})
export class ModalImagenComponent {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(public modalImagenService: ModalImagenService,public fileUploadService: FileUploadService){

  }

  cerrarModal(){
    this.imgTemp = null
    this.modalImagenService.cerrarModal()
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) return (this.imgTemp = null);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {

    const id = this.modalImagenService.id
    const tipo = this.modalImagenService.tipo

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id)
      .then((img) => {
        Swal.fire('Guardado','Imagen de usuario actualizada','success')
        this.modalImagenService.nuevaImagen.emit(img)
      }).catch(err => {
        this.cerrarModal()
        console.log(err)
        Swal.fire('Error', 'No se pudo subir la imagen', 'error')
      })
      this.cerrarModal()
  }
}
