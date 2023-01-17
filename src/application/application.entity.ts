import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { stateEnum } from './proto/application.pb';

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
  @Column({ type: 'boolean' })
  public state!: stateEnum;

}
