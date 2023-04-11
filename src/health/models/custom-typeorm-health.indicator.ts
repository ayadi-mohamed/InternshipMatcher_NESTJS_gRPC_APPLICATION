import { HealthIndicatorResult, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { PrometheusService } from '../../prometheus/prometheus.service';
import { HealthIndicator } from '../interfaces/health-indicator.interface';
import { BaseHealthIndicator } from './base-health.indicator';

export class CustomTypeOrmHealthIndicator
  extends BaseHealthIndicator
  implements HealthIndicator {
  public readonly name = 'TypeORM';
  protected readonly help = 'Status of ' + this.name;
  protected readonly promClientService: PrometheusService | undefined;

  private readonly typeormHealthIndicator: TypeOrmHealthIndicator;

  constructor(
    typeormHealthIndicator: TypeOrmHealthIndicator,
    promClientService?: PrometheusService
  ) {
    super();
    this.typeormHealthIndicator = typeormHealthIndicator;
    this.promClientService = promClientService;
    // this.registerMetrics();
    this.registerGauges();
  }

  public async isHealthy(): Promise<HealthIndicatorResult> {
    const result: Promise<HealthIndicatorResult> = this.typeormHealthIndicator.pingCheck('appdb');
    this.updatePrometheusData(true);
    return result;
  }
}