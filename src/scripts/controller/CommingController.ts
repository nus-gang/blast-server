import { ComingService } from '../../service/ComingService';
import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import { SubmitAddressDto } from '../model/dto/SubmitAddressDto';
import { SubmitAddressResponse } from '../model/response/SubmitAddressRes';
import {ThrottlerBehindProxyGuard} from "../guard/ThrottlerBehindProxyGuard";
import {Throttle} from "@nestjs/throttler";


@Throttle({ default: { limit: 60, ttl: 60000 } })
@Controller('/blast/coming')
export class ComingController {
  constructor(private readonly comingService: ComingService) {}

  @Post('/submitAddress')
  public async submitAddress(@Body() submitAddressDto: SubmitAddressDto): Promise<SubmitAddressResponse> {
    return await this.comingService.postAddress(submitAddressDto);
  }
}
