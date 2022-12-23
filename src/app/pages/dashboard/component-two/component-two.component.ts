import { Component, Injector, OnInit } from '@angular/core';
import { COMPONENT_TWO_TOKEN, InjectorShareService } from '../shared-injector/injectors';

@Component({
  selector: 'app-component-two',
  templateUrl: './component-two.component.html',
  styleUrls: ['./component-two.component.scss'],
})
export class ComponentTwoComponent implements OnInit {

  constructor(
    private injectorService: InjectorShareService,
    private injector: Injector
  ) { }

  ngOnInit() {
    // let data = this.injectorService.receiveToken(COMPONENT_TWO_TOKEN);
    // console.log("two data:", data);
    let data = this.injector.get(COMPONENT_TWO_TOKEN)
    console.log("one data:", data);
  }

}
