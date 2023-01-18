/* eslint-disable prettier/prettier */
import { BaseEntity, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { stateEnum } from './state.enum';


@Entity()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn()
  public idApp!: number;

  /*@Column({ type: 'decimal', precision: 12, scale: 2 })
  public price!: number;
*/
  /*
   * Relation IDs
   */

  @Column({ type: 'integer' })
  public idOffer!: number;

  @Column({ type: 'integer' })
  public idUser!: number;

  @Column({ type: 'enum', 
    enum:stateEnum,
    default: stateEnum.PENDING})
  public state!: stateEnum;


  @DeleteDateColumn()
  deletedAt?: Date;

}
