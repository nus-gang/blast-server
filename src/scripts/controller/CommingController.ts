import { ComingService } from '../../service/ComingService';
import { Body, Controller, Post } from '@nestjs/common';
import { SubmitAddressDto } from '../model/dto/SubmitAddressDto';
import { SubmitAddressResponse } from '../model/response/SubmitAddressRes';

@Controller('/blast/coming')
export class ComingController {
  constructor(private readonly comingService: ComingService) {}

  @Post('/submitAddress')
  public async submitAddress(@Body() submitAddressDto: SubmitAddressDto): Promise<SubmitAddressResponse> {
    return await this.comingService.postAddress(submitAddressDto);
  }
}
