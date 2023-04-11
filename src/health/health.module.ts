import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { TerminusModule } from "@nestjs/terminus";
import { PrometheusModule } from '../prometheus/prometheus.module';
import { ApplicationModule } from "src/application/application.module"

@Module({
  imports: [TerminusModule, PrometheusModule, ApplicationModule],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService]
})
export class HealthModule {}