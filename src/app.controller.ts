import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// normally, DTO is in another file, this one is here to make the example brief
class UpdateProjectNameParamsDto {
  @ApiProperty({
    description: 'Internal Id of project',
    example: '10fa8784-7006-499d-b97a-a406901df2b8',
  })
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @ApiProperty({
    description: 'The name that project should be renamed into',
    example: 'The Best Project',
  })
  @IsNotEmpty()
  @IsString()
  newName: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // was Patch in the real world example; using Get for simplicity
  @Get('/:projectId/name/:newName')
  async rename(@Param() params: UpdateProjectNameParamsDto): Promise<string> {
    return `got params.projectId equal to ${params.projectId}, params.newName equal to ${params.newName}`;
  }
}
