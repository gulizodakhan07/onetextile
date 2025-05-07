import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { PaymentMethodStatus } from "src/utils/paymentMethod.enum"

export class CreatePaymentDto {
    @IsDateString()
    @IsNotEmpty()
    paymentDate: Date

    @IsNumber()
    @IsNotEmpty()
    amount: number

    @IsEnum(PaymentMethodStatus)
    @IsNotEmpty()
    paymentMethod: PaymentMethodStatus

    @IsString()
    @IsNotEmpty()
    transactionId: string

    @IsString()
    @IsNotEmpty()
    notes: string

}

