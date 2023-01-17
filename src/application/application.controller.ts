import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ApplicationService } from './application.service';
import { APPLICATION_SERVICE_NAME, AddResponseApp, UpdateRequestApp, UpdateDataApp, UpdateResponseApp, RemoveRequestApp, RemoveResponseApp, GetRequestApp, GetResponseApp, SoftDltRequestApp, SoftDltResponseApp, RestoreRequestApp, SearchRequestApp, SearchResponseApp } from './proto/application.pb';
import { AddRequestDto } from './application.dto';

@Controller()
export class ApplicationController {
  @Inject(ApplicationService)
  private readonly service: ApplicationService;

  @GrpcMethod(APPLICATION_SERVICE_NAME, 'addApp')
  private async addApplication(data: AddRequestDto): Promise<AddResponseApp> {
    return this.service.addApplication(data);
     
  }
  @GrpcMethod(APPLICATION_SERVICE_NAME, 'updateApp')
  private async updateApplication(data: UpdateRequestApp): Promise<UpdateResponseApp> {
    return this.service.updateApplication(data);
     
  }
  @GrpcMethod(APPLICATION_SERVICE_NAME, 'removeApp')
  private async deleteApplication(payload: RemoveRequestApp): Promise<RemoveResponseApp> {
    return this.service.removeApplication(payload);
     
  }
  @GrpcMethod(APPLICATION_SERVICE_NAME, 'getApp')
  private async getApplication(payload: GetRequestApp): Promise<GetResponseApp> {
    return this.service.getByIdApplication(payload);
     
  }
  @GrpcMethod(APPLICATION_SERVICE_NAME, 'softDeleteApp')
  private async softDeleteApplication(payload: SoftDltRequestApp ): Promise<SoftDltResponseApp> {
    return this.service.softDeleteApp(payload);
     
  }
  @GrpcMethod(APPLICATION_SERVICE_NAME, 'restoreApp')
  private async restoreApplication(payload: RestoreRequestApp ): Promise<SoftDltResponseApp> {
    return this.service.removeApplication(payload);
     
  }
  @GrpcMethod(APPLICATION_SERVICE_NAME, 'searchAppByCriteria')
  private async searchAppByCriteria(payload: SearchRequestApp ): Promise<SearchResponseApp> {
    return this.service.searchAppByCriteria(payload);
     
  }



  
}
