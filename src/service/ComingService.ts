import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AccessLogger } from '../scripts/logger/AccessLogger';
import { SubmitAddressDto } from '../scripts/model/dto/SubmitAddressDto';
import { SubmitAddressResponse } from '../scripts/model/response/SubmitAddressRes';
import { isAddress } from '../scripts/utils/CommonUtils';

@Injectable()
export class ComingService {
  constructor(
    private readonly logger: Logger,
    private readonly accessLogger: AccessLogger,
  ) {}

  public async postAddress(submitAddress: SubmitAddressDto): Promise<SubmitAddressResponse> {
    if (false === isAddress(submitAddress.address)) {
      throw new BadRequestException(`${submitAddress.address} is invalid address`);
    }

    this.logger.log(`[SubmitAddress] ${submitAddress.address}`);
    return {
      submitAddress: submitAddress,
    } as SubmitAddressResponse;
  }
}
