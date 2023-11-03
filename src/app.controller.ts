import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PickType } from '@nestjs/mapped-types';

// normally, DTO is in another file, this one is here to make the example brief
class ProjectDto {
  @ApiProperty({
    description: 'Internal Id of project',
    example: '10fa8784-7006-499d-b97a-a406901df2b8',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Name of project', example: 'name' })
  name: string;

  // ...
}

export class UpdateProjectNameParamsDto extends PickType(ProjectDto, [
  'id',
  'name',
] as const) {}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // was Patch in the real world example; using Get for simplicity
  @Get('/:id/name/:name')
  async rename(@Param() params: UpdateProjectNameParamsDto): Promise<string> {
    return `got params.id equal to ${params.id}, params.name equal to ${params.name}`;
  }
}
