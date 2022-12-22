import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { I_API_RESPONSE } from 'src/app/services/db/apiResponse';
import { DbService } from 'src/app/services/db/db.service';
import { environment } from 'src/environments/environment';
import { I_LEAD, I_LEAD_SUMMARY_LIST } from '../interface/lead.interface';

/********METHOD NAME **********/
export enum LEAD_SERVICE_METODS {
  GetDetailsSummaryPost = 'GetDetailsSummaryPost'
}


@Injectable({
  providedIn: 'root'
})
export class LeadServiceService {

  /********SERVICE CONSTRUCTOR NAME **********/
  constructor(
    private db: DbService
  ) { }


  /******** API CALL **********/
  GetDetailsSummaryPost(obj: I_LEAD): Observable<I_API_RESPONSE<I_LEAD_SUMMARY_LIST[]>> {
    return this.db.postHttpApi<I_LEAD, I_LEAD_SUMMARY_LIST[]>(this.db.buildApiUrl(environment.XP_MODULE, LEAD_SERVICE_METODS.GetDetailsSummaryPost), obj)
  }
}
