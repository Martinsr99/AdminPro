import { Component,EventEmitter,Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html'
})
export class IncrementadorComponent {
  @Input('valor') progreso: number = 50

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor(valor:number){
    if((this.progreso <= 0 && valor<0 )|| (valor>0 && this.progreso >= 100 )){
      return
    }
    this.progreso += valor
    this.valorSalida.emit(this.progreso)
  }
}
