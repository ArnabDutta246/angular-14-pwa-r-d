import { Component, Injector, OnInit } from '@angular/core';
import { COMPONENT_ONE_TOKEN, InjectorShareService } from '../shared-injector/injectors';

@Component({
  selector: 'app-component-one',
  templateUrl: './component-one.component.html',
  styleUrls: ['./component-one.component.scss'],
})
export class ComponentOneComponent implements OnInit {
  data: any = null;
  constructor(
    private injectorService: InjectorShareService,
    private injector: Injector
  ) { }

  ngOnInit() {
    // let data = this.injectorService.receiveToken(COMPONENT_ONE_TOKEN);
    // console.log("one data:", data);
    this.data = this.injector.get(COMPONENT_ONE_TOKEN)
    console.log("one data:", this.data);
  }

}
