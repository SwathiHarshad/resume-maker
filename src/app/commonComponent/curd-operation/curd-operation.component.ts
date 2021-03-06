import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

import { curdServices } from '../../services/curd.services';

@Component({
  selector: 'app-curd-operation',
  templateUrl: './curd-operation.component.html',
  styleUrls: ['./curd-operation.component.less']
})
export class CurdOperationComponent implements OnInit {
  toOpenPopUp = false
  @Input() last:boolean
  @Input() index: Number
  @Input() comp: string
  Obj: {
    status: string,
    index: number,
    component: string 
  }

  constructor(private curdOperation: curdServices,
    private elRef: ElementRef) {
      this.curdOperation.PopUpAction.subscribe(
        (PopUpData:string) => {
          (PopUpData === 'Yes')?  this.curdOperation.actionStatus.emit(
            {
              status: 'remove',
              index: +this.index,
              component: this.elRef.nativeElement.closest('.wholeContainer').attributes.id.value
            }
          ) : ''
          console.log(this.toHide)
        }
      )
     }

  ngOnInit(): void {
  }
@ViewChild('popup') toHide: any
  statusUpdate(data: string){
    this.Obj = {
      status: data,
      index: +this.index,
      component: this.elRef.nativeElement.closest('.wholeContainer').attributes.id.value
    }
    if(data !== 'remove'){
      this.curdOperation.actionStatus.emit(this.Obj)
    }
  }
}
