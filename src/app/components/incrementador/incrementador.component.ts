import { Component,EventEmitter,Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html'
})
export class IncrementadorComponent implements OnInit {
  ngOnInit()  {
    this.btnClass = `btn ${this.btnClass}`
  }
  @Input('valor') progreso: number = 50
  @Input() btnClass: string = 'btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor(valor:number){
    if((this.progreso <= 0 && valor<0 )|| (valor>0 && this.progreso >= 100 )){
      return
    }
    this.progreso += valor
    this.valorSalida.emit(this.progreso)
  }
}
