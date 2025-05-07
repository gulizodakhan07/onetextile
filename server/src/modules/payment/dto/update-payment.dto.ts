import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { PaymentMethodStatus } from "src/utils/paymentMethod.enum"

export class UpdatePaymentDto{
    @IsDateString()
    @IsOptional()
    paymentDate: Date

    @IsNumber()
    @IsOptional()
    amount: number

    @IsEnum(PaymentMethodStatus)
    @IsOptional()
    paymentMethod: PaymentMethodStatus

    @IsString()
    @IsOptional()
    transactionId: string

    @IsString()
    @IsOptional()
    notes: string

}
