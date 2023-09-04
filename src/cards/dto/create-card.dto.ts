import { IsNumber, IsNotEmpty, IsString, Min, Max, Length } from 'class-validator';

export class CreateCardDto {

    @IsString()
    @Length(15, 16)
    @IsNotEmpty({ message: "All the fields are required" })
    cardNumber: string;

    @IsString()
    @IsNotEmpty({ message: "All the fields are required" })
    cardHolder: string;

    @IsString()
    @IsNotEmpty({ message: "All the fields are required" })
    @Length(3, 3)
    cvc: string;

    @IsNumber()
    @Min(1)
    @Max(12)
    expirationMonth: number;

    @IsNumber()
    @Min(1900)
    @Max(2100)
    expirationYear: number;

    @IsString()
    @IsNotEmpty({ message: "All the fields are required" })
    cardType: string;

}