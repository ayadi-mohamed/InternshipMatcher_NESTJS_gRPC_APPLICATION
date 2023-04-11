/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './application.entity';
import { AddRequestAppDto, GetRequestAppDto, RemoveRequestAppDto, RestoreRequestAppDto, SearchRequestAppDto, SoftDltRequestAppDto, UpdateRequestAppDto } from './application.dto';
import { AddResponseApp, GetResponseApp, RemoveResponseApp, RestoreResponseApp, SearchResponseApp, SoftDltResponseApp, UpdateResponseApp } from './proto/application.pb';


@Injectable()
export class ApplicationService {
  
  @InjectRepository(Application)
  private readonly repository: Repository<Application>; 

  public async addApplication(data: AddRequestAppDto): Promise<AddResponseApp> {
    let application: Application = new Application();

    application.idOffer = data.idOffer;
    application.idUser = data.idUser;

    application = await this.repository.save(application);
    
    return { idApp: application.idApp, error: null, status: HttpStatus.OK };
  }

  public async updateApplication(payload: UpdateRequestAppDto): Promise<UpdateResponseApp> {
    const idApp = payload.idApp;
    const idUser = payload.idUser;
    const param ={
      
      "idOffer":payload.idOffer,
      "state": payload.state
    }
    const app = await this.repository.preload({
      idApp,
      ...param
    });

    if(! app) {
      return { data: null, error: ['Application not found'], status: HttpStatus.NOT_FOUND };
    }
    if ( app.idUser == idUser){
      const application = await this.repository.save(app)
      return { data: application, error: null, status: HttpStatus.OK };

    }

  }



  public async removeApplication( {idApp, idUser}: RemoveRequestAppDto): Promise<RemoveResponseApp> {
    const app = await this.repository.findOne({ where: { idApp } });
    if(! app){
      return { idApp: null, error: ['Application not found'], status: HttpStatus.NOT_FOUND };

    }else

    if( app.idUser == idUser ){
        await this.repository.delete(idApp);
        return { idApp: idApp, error: null, status: HttpStatus.OK };
    }else{
      return { idApp: null, error: ['Application not found'], status: HttpStatus.NOT_FOUND };

    }
  }

  public async getByIdApplication({ idApp, idUser }: GetRequestAppDto): Promise<GetResponseApp> {
    const app: Application = await this.repository.findOne({ where: { idApp } });
    console.log(app)
    if (!app) {
      return { data: null, error: ['Application not found'], status: HttpStatus.NOT_FOUND };
    }
    if (app.idUser == idUser){
      return { data: app, error: null, status: HttpStatus.OK };

    }else{
      return { data: null, error: ['Application not found'], status: HttpStatus.NOT_FOUND };

    }

  }

  public async softDeleteApp({ idApp, idUser }: SoftDltRequestAppDto): Promise<SoftDltResponseApp> {
    const app: Application = await this.repository.findOne({ where: { idApp } });

    if (!app) {
      return { idApp: null, error: ['Application  not found'], status: HttpStatus.NOT_FOUND };
    }
    if (app.idUser != idUser){
      return { idApp: null, error: ['Application  not found'], status: HttpStatus.NOT_FOUND };


    }
    this.repository.softDelete(idApp);
    return { idApp: idApp, error: null, status: HttpStatus.OK };
  }
  public async restoreApp({ idApp, idUser }: RestoreRequestAppDto): Promise<RestoreResponseApp> {
    
    await this.repository.restore(idApp);
    const app2 = await this.repository.findOne({ where: { idApp } });
    return { data: app2, error: null, status: HttpStatus.OK };
  }


  async searchAppByCriteria({idUser , idApp , idOffer , state}:SearchRequestAppDto): Promise<SearchResponseApp>{
    const app2 = await this.repository.find({ where: { idApp , idUser, state,idOffer } });
    return { data: app2, error: null, status: HttpStatus.OK };
  }
    /*if(findTodoDto.idUser){
    if (findTodoDto.idApp || findTodoDto.idOffer  || findTodoDto.state){
      const qb = this.repository.createQueryBuilder('application');
      if (findTodoDto.idApp) {
          qb.andWhere('application.idApp LIKE :idApp And application.idUser = :idUser', {idApp: findTodoDto.idApp, idUser: findTodoDto.idUser});
      }
      if (findTodoDto.idOffer) {
          qb.andWhere('application.idOffer LIKE :idOffer And application.idUser = :idUser', {idOffer: findTodoDto.idOffer , idUser: findTodoDto.idUser});
      }
      if (findTodoDto.state) {
        qb.andWhere('application.state LIKE :state And application.idUser = :idUser ', {state: findTodoDto.state, idUser: findTodoDto.idUser});
    }
    
      const result=await qb.getMany();
      
      return { data: result, error: null , status: HttpStatus.OK  };
    }else{
    return { data: null, error: ['This application did not exist'], status: HttpStatus.NOT_FOUND };
  }
}
  else{
    return { data: null, error: ['This application did not exist'], status: HttpStatus.NOT_FOUND };
  }
*/
  }
