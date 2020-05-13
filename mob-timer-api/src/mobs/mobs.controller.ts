import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger';
import { Model } from 'mongoose';
import { Response } from 'src/middleware/ServerSentEventResponse.type';
import { Mob } from './mobs.model';
import { MobDocument } from './schemas/mob.schema';

@Controller('mobs')
export class MobsController {
  constructor(@InjectModel(MobDocument.name) private readonly model: Model<MobDocument>) {}

  @Get()
  findAll(@Res() response: Response) {
    return this.model
      .find()
      .exec()
      .then(data => response.sse.send(data));
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Mob id' })
  findOne(@Param('id') id: string) {
    return this.model.findById(id).then(existingMob => {
      if (!existingMob) {
        throw new NotFoundException(`Mob '${id}' not found.`);
      }
      return existingMob;
    });
  }

  @Post()
  @ApiBody({ type: Mob })
  @ApiCreatedResponse({ description: 'Mob created' })
  @ApiUnprocessableEntityResponse({ description: 'Mob already exists' })
  createMob(@Body() mob: Mob) {
    return this.model
      .findOne({ name: mob.name })
      .exec()
      .then(existingMob => {
        if (existingMob) {
          throw new UnprocessableEntityException(`Mob '${mob.name}' already exists.`);
        }
        return new this.model(mob).save();
      });
  }

  @Put(':id')
  @HttpCode(204)
  @ApiBody({ type: Mob })
  @ApiNoContentResponse({ description: 'Mob updated' })
  @ApiNotFoundResponse({ description: "Mob doesn't exists" })
  updateMob(@Param('id') id: string, @Body() mob: Mob) {
    return this.model
      .findById(id)
      .exec()
      .then(existingMob => {
        if (!existingMob) {
          throw new NotFoundException(`Mob '${id}' not found.`);
        }
        return this.model.updateOne({ _id: id }, mob);
      });
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Mob id' })
  @ApiNotFoundResponse({ description: "Mob doesn't exists" })
  delete(@Param('id') id: string) {
    return this.model
      .findById(id)
      .exec()
      .then(existingMob => {
        if (!existingMob) {
          throw new NotFoundException(`Mob '${id}' not found.`);
        }
        return this.model.deleteOne({ _id: id });
      });
  }
}
