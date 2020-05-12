import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';
import { Observable, of } from 'rxjs';
import { Mob } from './mobs.model';

@Controller('mobs')
export class MobsController {
  private repository: { [key: string]: Mob } = {};

  constructor() {
    this.repository['lesDaltons'] = {
      id: 'lesDaltons',
      duration: 10,
      mobers: ['Joe', 'Jack', 'William', 'Averell']
    };
  }

  @Get()
  findAll(): Observable<Mob[]> {
    return of(Object.values(this.repository).filter(data => !!data.id));
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Mob id' })
  findOne(@Param('id') id: string): Observable<Mob> {
    if (this.repository[id] === undefined) {
      throw new NotFoundException(`Mob '${id}' not found`);
    }
    return of(this.repository[id]);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Mob created' })
  @ApiBody({ type: Mob })
  createMob(@Body() mob: Mob) {
    this.repository[mob.id] = mob;
  }

  @Put(':id')
  @HttpCode(204)
  @ApiBody({ type: Mob })
  @ApiNoContentResponse({ description: 'Mob updated' })
  @ApiNotFoundResponse({ description: "Mob doesn't exists" })
  updateMob(@Param('id') id: string, @Body() mob: Mob) {
    if (id !== mob.id) {
      throw new BadRequestException(`Requested id doesn't match body id '${mob.id}'`);
    }
    if (this.repository[id] === undefined) {
      throw new NotFoundException(`Mob '${id}' not found`);
    }
    this.repository[id] = mob;
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Mob id' })
  delete(@Param('id') id: string) {
    if (this.repository[id] === undefined) {
      throw new NotFoundException(`Mob '${id}' not found`);
    }
    delete this.repository[id];
  }
}
