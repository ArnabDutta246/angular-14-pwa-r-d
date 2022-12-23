import { Component, Injector, OnInit } from '@angular/core';
import { COMPONENT_THREE_TOKEN, InjectorShareService } from '../shared-injector/injectors';

@Component({
  selector: 'app-component-three',
  templateUrl: './component-three.component.html',
  styleUrls: ['./component-three.component.scss'],
})
export class ComponentThreeComponent implements OnInit {
  data: any = null;
  constructor(
    private injectorService: InjectorShareService,
    private injector: Injector
  ) { }

  ngOnInit() {
    // let data = this.injectorService.receiveToken(COMPONENT_THREE_TOKEN);
    // console.log("three data:", data);
    this.data = this.injector.get(COMPONENT_THREE_TOKEN)
    console.log("one data:", this.data);
  }

}
