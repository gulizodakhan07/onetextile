import { Module } from "@nestjs/common";
import { ReportsController } from "./reports.controller";
import { ReportsService } from "./reports.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invoice } from "../invoice/entities/invoice.entity";
import { Client } from "../client/entities/client.entity";
import { InvoiceItem } from "../invoice-item/entities/invoice-item.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Invoice,Client,InvoiceItem])],
    controllers: [ReportsController],
    providers: [ReportsService]
})
export class ReportsModule{}