/* eslint-disable prettier/prettier */
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { AddRequestApp, GetRequestApp, RemoveRequestApp, RestoreRequestApp, SearchRequestApp, SoftDltRequestApp, UpdateRequestApp } from './proto/application.pb';
import { stateEnum } from './state.enum';

export class AddRequestAppDto implements AddRequestApp {
  
  @IsNumber()
  public idOffer: number;

  @IsNumber()
  public idUser: number;
}
export class GetRequestAppDto implements GetRequestApp {
  @IsNumber()
  public idApp: number;

  @IsNumber()
  public idUser: number;
}
export class SearchRequestAppDto implements SearchRequestApp {
  @IsNumber()
  @IsOptional()
  idApp: number;
  
  @IsNumber()
  @IsOptional()
  public idOffer: number;

  @IsNumber()
  public idUser: number;

  @IsEnum(stateEnum)
  @IsOptional()
  public state: stateEnum
}
export class RemoveRequestAppDto implements RemoveRequestApp {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly idApp: number;
  
  @IsNumber()
  public idUser: number;

}

export class UpdateRequestAppDto implements UpdateRequestApp {
  @IsNumber()
  public idApp: number; 

  @IsNumber()
  public idUser: number;

  @IsNumber()
  @IsOptional()
  public idOffer: number;
  
  @IsEnum(stateEnum)
  @IsOptional()
  public state: stateEnum
}
export class SoftDltRequestAppDto implements SoftDltRequestApp {
  @IsNumber()
  public idApp: number;
  
  @IsNumber()
  public idUser: number;

}
export class RestoreRequestAppDto implements RestoreRequestApp {
  @IsNumber()
  public idApp: number;
  
  @IsNumber()
  public idUser: number;

}

