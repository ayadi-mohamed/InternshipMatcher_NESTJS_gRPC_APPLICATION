/* eslint-disable prettier/prettier */
import { HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientGrpc } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { Application } from './application.entity';
import { GetResponseOffer, OfferServiceClient, OFFER_SERVICE_NAME } from './proto/offer.pb';
import { AddRequestApp, AddResponseApp, stateEnum, UpdateRequestApp, UpdateResponseApp,  RemoveRequestApp, RemoveResponseApp, GetRequestApp, GetResponseApp, SoftDltRequestApp, SoftDltResponseApp, RestoreDataApp, RestoreRequestApp, RestoreResponseApp, SearchRequestApp, SearchResponseApp } from './proto/application.pb';
import { application } from 'express';

@Injectable()
export class ApplicationService implements OnModuleInit {
  
  private offerSvc: OfferServiceClient;

  @Inject(OFFER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  @InjectRepository(Application)
  private readonly repository: Repository<Application>;

  public onModuleInit(): void {
    this.offerSvc = this.client.getService<OfferServiceClient>(OFFER_SERVICE_NAME);
  }
    

  public async addApplication(data: AddRequestApp): Promise<AddResponseApp> {
    const offer: GetResponseOffer = await firstValueFrom(this.offerSvc.getOfferById({ idOffer: data.idOffer }));

    let application: Application = new Application();

   // Application.price = product.data.price;
    application.idOffer = offer.data.idOffer;
    application.idUser = data.idUser;
    application.state = stateEnum.PENDING;

    application = await this.repository.save(application);
    
    return { idApp: application.idApp, error: null, status: HttpStatus.OK };
  }

  public async updateApplication(payload: UpdateRequestApp): Promise<UpdateResponseApp> {
    const idApp = payload.idApp;
    const idUser = payload.idUser
    const app = await this.repository.preload({
      idApp,
      ...payload
    });

    if(! app) {
      return { data: null, error: ['Application not found'], status: HttpStatus.NOT_FOUND };
    }
    if ( app.idUser == idUser){
      const application = await this.repository.save(app)
      return { data: application, error: null, status: HttpStatus.OK };

    }

  }



  public async removeApplication( {idApp, idUser}: RemoveRequestApp): Promise<RemoveResponseApp> {
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

  public async getByIdApplication({ idApp, idUser }: GetRequestApp): Promise<GetResponseApp> {
    const app: Application = await this.repository.findOne({ where: { idApp } });
    if (!application) {
      return { data: null, error: ['Application not found'], status: HttpStatus.NOT_FOUND };
    }
    if (app.idUser == idUser){
      return { data: app, error: null, status: HttpStatus.OK };

    }else{
      return { data: null, error: ['Application not found'], status: HttpStatus.NOT_FOUND };

    }

  }

  public async softDeleteApp({ idApp, idUser }: SoftDltRequestApp): Promise<SoftDltResponseApp> {
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
  public async restoreApp({ idApp, idUser }: RestoreRequestApp): Promise<RestoreResponseApp> {
    const app = await this.repository.query("select * from applicationdb where idApp = ?", [idApp]);
    if (!app) {
      return { data: null, error: ['This application did not exist'], status: HttpStatus.NOT_FOUND };
    }
    if (app.idUser != idUser ){
      return { data: null, error: ['This application did not exist'], status: HttpStatus.NOT_FOUND };

    }
    
    await this.repository.restore(idApp);
    const app2 = await this.repository.query("select * from applicationdb where idApp = ?", [idApp]);
    return { data: app2, error: null, status: HttpStatus.OK };
  }


  async searchAppByCriteria(findTodoDto?:SearchRequestApp): Promise<SearchResponseApp>{



    if(findTodoDto.idUser){}
    if (findTodoDto.idApp || findTodoDto.idOffer  || findTodoDto.state){
      const qb = this.repository.createQueryBuilder('application');
      if (findTodoDto.idApp) {
          qb.andWhere('application.idApp LIKE :idApp And application.idUser = :idUser', {idApp: findTodoDto.idApp, idUser: findTodoDto.idUser});
      }
      if (findTodoDto.idOffer) {
          qb.andWhere('application.idOffer LIKE :idOffer And application.idUser = :idUser', {idOffer: `%${findTodoDto.idOffer}%` , idUser: findTodoDto.idUser});
      }
      if (findTodoDto.state) {
        qb.andWhere('application.state LIKE :state And application.idUser = :idUser ', {state: `%${findTodoDto.state}%`, idUser: findTodoDto.idUser});
    }
    /*  qb.skip(skip);
      qb.take(take);
    */
      const result=await qb.getMany();
      
      return { data: result, error: null , status: HttpStatus.OK  };

    }else{
    return { data: null, error: ['This application did not exist'], status: HttpStatus.NOT_FOUND };

  }

    /*const take=findTodoDto.take || 2;
    const page=findTodoDto.page || 1;
    const skip=(page-1)*take;
    let data:any;
    if (findTodoDto.statut || findTodoDto.texte){
        const qb=this.todoRepository.createQueryBuilder('todo');
        if (findTodoDto.statut) {
            qb.andWhere('todo.status LIKE :statut', {statut: findTodoDto.statut});
        }
        if (findTodoDto.texte) {
            qb.andWhere('todo.name LIKE :texte OR todo.description LIKE :texte', {texte: `%${findTodoDto.texte}%`});
        }
        qb.skip(skip);
        qb.take(take);
        const [result,total]=await qb.getManyAndCount();
        data = [result,total];
    } 
    else {
        data = await this.todoRepository.findAndCount({order:{createdAt:'DESC'}, take:take, skip:skip});
    }
    return this.pagination(data,page,take);*/ 
}




}
