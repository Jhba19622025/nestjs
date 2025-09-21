import { Injectable } from '@nestjs/common';
import { CreateWebclientDto } from './dto/create-webclient.dto';
import { UpdateWebclientDto } from './dto/update-webclient.dto';

@Injectable()
export class WebclientService {
  create(createWebclientDto: CreateWebclientDto) {
    return 'This action adds a new webclient';
  }

  findAll() {
    return `This action returns all webclient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} webclient`;
  }

  update(id: number, updateWebclientDto: UpdateWebclientDto) {
    return `This action updates a #${id} webclient`;
  }

  remove(id: number) {
    return `This action removes a #${id} webclient`;
  }
}
