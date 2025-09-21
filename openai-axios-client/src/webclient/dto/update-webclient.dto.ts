import { PartialType } from '@nestjs/mapped-types';
import { CreateWebclientDto } from './create-webclient.dto';

export class UpdateWebclientDto extends PartialType(CreateWebclientDto) {}
