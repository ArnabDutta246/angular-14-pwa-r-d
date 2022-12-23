import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { ComponentSequence, Data } from './shared-injector/data';
import { COMPONENT_ONE_TOKEN, COMPONENT_THREE_TOKEN, COMPONENT_TWO_TOKEN, InjectorShareService } from './shared-injector/injectors';
export interface I_COMPONENT_SEQ_LOAD {
  sequence: number;
  componentCode: string;
  component: any;
  willBeShow: boolean;
  injector?: any;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  componentList: I_COMPONENT_SEQ_LOAD[] = [];
  constructor(
    private ref: ChangeDetectorRef,
    private injectorService: InjectorShareService,
    private injector: Injector
  ) { }

  ngOnInit() {
    this.reArrangeComponent(1);
  }

  /** @param id  */
  public reArrangeComponent(id: number) {
    console.log("calling arrage no");
    this.componentList = [];
    this.componentList = [...ComponentSequence[`${id}`]];
    this.componentList.forEach((component: I_COMPONENT_SEQ_LOAD) => {
      if (component.componentCode == 'COMPONENT_ONE') {
        // component.injector = this.injectorService.sendInjector(COMPONENT_ONE_TOKEN, Data['one']);
        component.injector = this.sendInjector(COMPONENT_ONE_TOKEN, Data['one']);
      } else if (component.componentCode == 'COMPONENT_TWO') {
        // component.injector = this.injectorService.sendInjector(COMPONENT_TWO_TOKEN, Data['two']);
        component.injector = this.sendInjector(COMPONENT_TWO_TOKEN, Data['two']);
      } else if (component.componentCode == 'COMPONENT_THREE') {
        //component.injector = this.injectorService.sendInjector(COMPONENT_THREE_TOKEN, Data['three']);
        component.injector = this.sendInjector(COMPONENT_THREE_TOKEN, Data['three'])
      }
      console.log("injector", component.injector);

    })
    this.ref.detectChanges();
    console.log("this.componentList 1#", this.componentList);
  }

  public sendInjector(token, data: any) {
    return Injector.create({
      providers: [{ provide: token, useValue: data }],
      parent: this.injector,
    });
  }


}
