import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval, map, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor() {

    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);

  }

  retornaObservable() {
    const obs$ = new Observable(observer => {
      let i=0
      const intervalo = setInterval(() => {
        i++
        observer.next(i)

        if(i===4){
          clearInterval(intervalo)
          observer.complete()
        }
      },1000)
    });

    obs$.subscribe(valor => console.log(valor))
  }

  retornaIntervalo() {
    const intervalo$ = interval(1000).pipe(take(4),map(valor => valor+1))

    return intervalo$
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe()
  }

}
