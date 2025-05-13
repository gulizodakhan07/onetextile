import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiOperation, ApiQuery, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Get()
    @ApiOperation({
        summary: 'Turli hisobotlarni olish',
        description: `
      Ushbu endpoint orqali quyidagi hisobotlarni olish mumkin:
      - Sotuvlar hisoboti
      - Qarzdorlik hisoboti
      - Haqdorlik hisoboti
      - Ombor qoldig‘i hisoboti
      - Bo‘yoqxona hisoboti

      Filtrlash imkoniyatlari mavjud: sana, mijoz.
    `,
    })
    @ApiQuery({
        name: 'startDate',
        required: false,
        description: 'Boshlanish sanasi (YYYY-MM-DD formatda)',
        example: '2025-05-01',
    })
    @ApiQuery({
        name: 'endDate',
        required: false,
        description: 'Tugash sanasi (YYYY-MM-DD formatda)',
        example: '2025-05-12',
    })
    @ApiQuery({
        name: 'clientId',
        required: false,
        description: 'Mijoz IDsi (client jadvalidan)',
        example: 3,
    })
    // @ApiQuery({
    //     name: 'productType',
    //     required: false,
    //     description: 'Mahsulot turi (masalan: "ip", "bo\'yalgan ip", "to\'qilgan mato")',
    //     example: 'ip',
    // })
    @ApiResponse({
        status: 200,
        description: 'Hisobotlar muvaffaqiyatli qaytarildi.',
    })
    async getReports(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('clientId') clientId?: number,
    ) {
        return this.reportsService.getReports(startDate, endDate, clientId);
    }
}
