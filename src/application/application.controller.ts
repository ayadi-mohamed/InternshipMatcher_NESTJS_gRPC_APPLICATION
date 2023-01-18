/* eslint-disable prettier/prettier */
import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AddRequestAppDto, GetRequestAppDto, RemoveRequestAppDto, RestoreRequestAppDto, SearchRequestAppDto, SoftDltRequestAppDto, UpdateRequestAppDto } from './application.dto';
import { ApplicationService } from './application.service';
import { AddResponseApp, APPLICATION_SERVICE_NAME, GetResponseApp, RemoveResponseApp, RestoreResponseApp, SearchResponseApp, SoftDltResponseApp, UpdateResponseApp } from './proto/application.pb';

@Controller()
export class ApplicationController {
  @Inject(ApplicationService)
  private readonly service: ApplicationService;

  @GrpcMethod(APPLICATION_SERVICE_NAME, 'addApp')
  private async addApplication(data: AddRequestAppDto): Promise<AddResponseApp> {
    return this.service.addApplication(data);
     
  }
  @GrpcMethod(APPLICATION_SERVICE_NAME, 'updateApp')
  private async updateApplication(data: UpdateRequestAppDto): Promise<UpdateResponseApp> {
    return this.service.updateApplication(data);
     
  }
  @GrpcMethod(APPLICATION_SERVICE_NAME, 'removeApp')
  private async deleteApplication(payload: RemoveRequestAppDto): Promise<RemoveResponseApp> {
    return this.service.removeApplication(payload);
     
  }
  @GrpcMethod(APPLICATION_SERVICE_NAME, 'getApp')
  private async getApplication(payload: GetRequestAppDto): Promise<GetResponseApp> {
    return this.service.getByIdApplication(payload);
     
  }
  @GrpcMethod(APPLICATION_SERVICE_NAME, 'softDeleteApp')
  private async softDeleteApplication(payload: SoftDltRequestAppDto ): Promise<SoftDltResponseApp> {
    return this.service.softDeleteApp(payload);
     
  }
  @GrpcMethod(APPLICATION_SERVICE_NAME, 'restoreApp')
  private async restoreApplication(payload: RestoreRequestAppDto ): Promise<RestoreResponseApp> {
    return this.service.restoreApp(payload);
     
  }
  @GrpcMethod(APPLICATION_SERVICE_NAME, 'searchAppByCriteria')
  private async searchAppByCriteria(payload: SearchRequestAppDto ): Promise<SearchResponseApp> {
    return this.service.searchAppByCriteria(payload);
     
  }



  
}

