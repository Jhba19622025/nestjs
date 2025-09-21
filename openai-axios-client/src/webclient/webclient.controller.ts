import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebclientService } from './webclient.service';
import { CreateWebclientDto } from './dto/create-webclient.dto';
import { UpdateWebclientDto } from './dto/update-webclient.dto';

@Controller('webclient')
export class WebclientController {
  constructor(private readonly webclientService: WebclientService) {}

  @Post()
  create(@Body() createWebclientDto: CreateWebclientDto) {
    return this.webclientService.create(createWebclientDto);
  }

  @Get()
  findAll() {
    return this.webclientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webclientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebclientDto: UpdateWebclientDto) {
    return this.webclientService.update(+id, updateWebclientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webclientService.remove(+id);
  }
}
