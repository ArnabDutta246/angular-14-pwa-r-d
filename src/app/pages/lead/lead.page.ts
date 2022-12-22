import { Component, OnInit } from '@angular/core';
import { I_LEAD } from './interface/lead.interface';
import { LeadServiceService } from './service/lead.service';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.page.html',
  styleUrls: ['./lead.page.scss'],
})
export class LeadPage implements OnInit {

  constructor(
    private LeadServiceService: LeadServiceService
  ) { }

  ngOnInit() {
  }
  getLeadDetails() {
    let obj: I_LEAD = {
      "region": "",
      "depot": "",
      "advertiseYn": "",
      "leadSource": "",
      "leadStatus": "",
      "leadSubStatus": "",
      "leadType": "",
      "fromDate": "01/04/2022",
      "toDate": "17/11/2022",
      "leadDateColumn": "Lead Date",
      "ceGrade": "",
      "ceDesignation": "",
      "ceCoomonSearch": "",
      "dealerCommonSearch": "",
      "painter": "",
      "userId": "murthy"
    }
    this.LeadServiceService
      .GetDetailsSummaryPost(obj)
      .subscribe((res) => {
        console.log(res.data);

      })
  }
}
